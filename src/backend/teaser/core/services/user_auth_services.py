"""
Services layer for user_auth_services models.
"""

from core.models.user_auth_models import TeaserUserModel
from core.utils.user_auth_validator import validate_register
from core.errors.user_auth_errors import UserAlreadyExistsValidationError
import unicodedata
from django.contrib.auth.models import User


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
    nfc_email_address = unicodedata.normalize("NFC", validated_dict["emal"])
    nfkc_email_address = unicodedata.normalize(
        "NFKC", validated_dict["emal"]
    ).casefold()
    # Check that the username, phone, email is unique.
    if User.objects.filter(nfkc_username=nfkc_username).exists():
        # TODO: Can you overload User^ object with nfkc_username attr or put in TeaserUser?
        raise UserAlreadyExistsValidationError(413, "Duplicate username!")
    if User.objects.filter(nfkc_email_address=nfkc_email_address).exists():
        raise UserAlreadyExistsValidationError(413, "Duplicate email!")
    if User.objects.filter(phone=validated_dict["phone"]).exists():
        raise UserAlreadyExistsValidationError(413, "Duplicate phone number!")
    # Persist the model to the database

    # Send SMS code
    # Return JSON
    return {"Hello": "world"}


def activate_user_account_service(s_username: str, s_2fa_otp: str):
    """
    Activate an user's account if the 2fa OTP matches.
    """
    pass


def delete_user_account_service(s_auth_token: str, s_username: str):
    pass


def update_user_account_service(s_auth_token: str, s_payload: dict):
    pass


def login_user_service(s_username: str, us_password: str):
    pass
