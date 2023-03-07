"""
Services layer for user_auth_services models.
"""

from django.http import HttpRequest
from core.models.user_auth_models import TeaserUserModel, AuthTokenModel
from core.models.event_metric_models import EventMetricsModel, EventMetricsTypeModel
from core.utils.user_auth_validator import validate_register, validate_login
from core.errors.user_auth_errors import (
    UserAlreadyExistsValidationError,
    InvalidLoginCredentialsValidationError,
    InvalidTokenError,
)
from core.utils.user_auth_token_utils import *
import unicodedata
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.db import transaction
import json
from ninja_jwt.tokens import RefreshToken
from ninja.security import HttpBearer
from datetime import datetime


class AuthBearer(HttpBearer):
    def authenticate(self, request: HttpRequest, token: str):
        return check_auth_token_is_valid(token)


def invalidate_auth_token_service(token: str):
    """
    Invalidate auth token.
    Example use cases: Change of password, user logout.
    @raises 401 InvalidTokenError
    """
    invalidate_auth_token(token)
    # TODO: Return success?


def create_auth_token(s_username, us_password):
    pass
    # TODO: Validate user
    validated_dict = validate_login(s_username, us_password)
    # Normalize
    nfc_username = unicodedata.normalize("NFC", validated_dict["username"]).casefold()
    nfkc_username = unicodedata.normalize("NFKC", validated_dict["username"]).casefold()
    # Authenticate
    authenticated_user = authenticate(
        username=nfkc_username, password=validated_dict["password"]
    )

    # Invalidate user's auth tokens
    # Create new token
    new_token_hash = make_auth_token_hash()
    new_token = AuthTokenModel.objects.create(
        teaser_user_id=teaser_user,
        token_has=new_token_hash,
        expiry_date=datetime.now() + datetime.timedelta(days=60),
    )
    # Return to user


def refresh_auth_token_service(token):
    # Get hash for new token
    # Invalidate old token
    correct_token, teaser_user = invalidate_auth_token(token)
    new_token_hash = make_auth_token_hash()
    new_token = AuthTokenModel.objects.create(
        teaser_user_id=teaser_user,
        token_has=new_token_hash,
        expiry_date=datetime.now() + datetime.timedelta(days=60),
    )

    # create new auth token
    # TODO: Race condition where the same token is getting refreshed by two API calls
    # TODO: Race condition where a token was refreshed, but


def validate_auth_token_service(token):
    check_auth_token_is_valid(token)


def register_user_service(
    s_username: str,
    s_email: str,
    s_phone: str,
    us_password: str,
    s_dob: str,
    s_terms_of_service_accepted: bool,
):
    """
    Register a user.
    """
    # Validate user input is syntactically correct
    validated_dict = validate_register(
        s_username, s_email, s_phone, us_password, s_dob, s_terms_of_service_accepted
    )
    # Normalize unicode text
    nfc_username = unicodedata.normalize("NFC", validated_dict["username"])
    nfkc_username = unicodedata.normalize("NFKC", validated_dict["username"]).casefold()
    nfc_email_address = unicodedata.normalize("NFC", validated_dict["email"])
    nfkc_email_address = unicodedata.normalize(
        "NFKC", validated_dict["email"]
    ).casefold()
    # Check that the username, phone, email is unique.
    if User.objects.filter(username=nfkc_username).exists():
        # TODO: Can you overload User^ object with nfkc_username attr or put in TeaserUser?
        raise UserAlreadyExistsValidationError(413, "Duplicate username!")
    if User.objects.filter(email=nfkc_email_address).exists():
        raise UserAlreadyExistsValidationError(413, "Duplicate email!")
    if TeaserUserModel.objects.filter(phone_str=validated_dict["phone"]).exists():
        raise UserAlreadyExistsValidationError(413, "Duplicate phone number!")
    # Persist the model to the database
    with transaction.atomic():
        # TODO: This needs to have fields username
        # Not nfkc_* / nfc_&
        user_model = User.objects.create_user(
            username=nfkc_username,
            email=nfkc_email_address,
            password=validated_dict["password"],
        )
        user_model.full_clean()
        user_model.save()
        # Update or create TeaserUserModel
        teaser_user_model = TeaserUserModel.objects.create(
            user_model=user_model,
            nfc_username=nfc_username,
            nfc_email_address=nfc_email_address,
            phone_str=validated_dict["phone"],
            dob_date=validated_dict["dob"],
            terms_of_service_accepted=validated_dict["terms_of_service"],
        )
        teaser_user_model.full_clean()
        teaser_user_model.save()
        # Log register Action
        # TODO: Should I have the logging in the same atomic commit or another commit?
        register_event_type, created = EventMetricsTypeModel.objects.get_or_create(
            type="REGISTER"
        )
        register_event_metric = EventMetricsModel.objects.create(
            event_type=register_event_type,
            event_data=json.loads("{}"),
            user_id=teaser_user_model,
        )

    # TODO: Send SMS code? Use TOTP?

    # Return JSON
    # Not exposing the nfkc user_model attributes
    return {
        "username": teaser_user_model.nfc_username,
        "dob": teaser_user_model.dob_date,
        "phone": teaser_user_model.phone_str,
        "email": teaser_user_model.nfc_email_address,
        "terms_of_service_accepted": teaser_user_model.terms_of_service_accepted,
    }


def activate_user_account_service(s_username: str, s_2fa_otp: str):
    """
    Activate an user's account if the 2fa OTP matches.
    """
    pass


def delete_user_account_service(s_auth_token: str, s_username: str):
    pass


def update_user_account_service(s_auth_token: str, s_payload: dict):
    pass


def login_user_service(request, s_username: str, us_password: str):
    # if request.user.is_authenticated:
    #     # User already logged in
    #     # TODO: Raise an error?
    #     return {"is_authenticated": request.user.is_authenticated}

    # Validate input
    validated_dict = validate_login(s_username, us_password)
    # Normalize
    nfc_username = unicodedata.normalize("NFC", validated_dict["username"]).casefold()
    nfkc_username = unicodedata.normalize("NFKC", validated_dict["username"]).casefold()
    # Authenticate
    authenticated_user = authenticate(
        username=nfkc_username, password=validated_dict["password"]
    )
    if authenticated_user is not None:
        # Backend authenticated the credentials
        login(request, authenticated_user)
        with transaction.atomic():
            # Get logged in user
            logged_in_user = TeaserUserModel.objects.get(nfc_username=nfc_username)
            # Log login Action
            # TODO: Should I have the logging in the same atomic commit or another commit?
            login_event_type, created = EventMetricsTypeModel.objects.get_or_create(
                type="LOGIN"
            )
            register_event_metric = EventMetricsModel.objects.create(
                event_type=login_event_type,
                event_data=json.loads("{}"),
                user_id=logged_in_user,
            )
            # TODO: https://eadwincode.github.io/django-ninja-jwt/creating_tokens_manually/
            # Return auth token, username, expiry date
    else:
        # failed authentication
        # Get logged in user
        try:
            logged_in_user = TeaserUserModel.objects.get(nfc_username=nfc_username)
        except TeaserUserModel.DoesNotExist:
            logged_in_user = None
        with transaction.atomic():
            # Log failed login Action
            # TODO: Should I have the logging in the same atomic commit or another commit?
            login_event_type, created = EventMetricsTypeModel.objects.get_or_create(
                type="LOGIN"
            )
            register_event_metric = EventMetricsModel.objects.create(
                event_type=login_event_type,
                event_data=json.loads('{"login_fail": true}'),
                user_id=logged_in_user,
            )
        raise InvalidLoginCredentialsValidationError(414, "Invalid login credentials!")
    refresh = RefreshToken.for_user(logged_in_user.user_model)
    return {
        "refresh": str(refresh),
        "access": str(refresh.access_token),
        "username": logged_in_user.nfc_username,
    }
