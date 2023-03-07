"""teaser URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path

# Import services
from core.services.user_auth_services import (
    register_user_service,
    login_user_service,
    invalidate_auth_token_service,
    create_auth_token,
)

# Import schemas
from core.schemas.user_auth_schemas import *

# Basic Sanitizers
from core.utils import sanitization_utils

# Auth bearer token
from core.services.user_auth_services import AuthBearer

from ninja import NinjaAPI

api = NinjaAPI(
    description="""
    # Documentation for Teaser API V1
    """
)
# Define exceptions

from core.errors.user_auth_errors import *


@api.exception_handler(InvalidTokenError)
def invalid_dob_validation_error(request, exc):
    return api.create_response(
        request,
        {"message": f"User Unauthorized: {exc}"},
        status=401,
    )


@api.exception_handler(InvalidDOBValidationError)
def invalid_dob_validation_error(request, exc):
    return api.create_response(
        request,
        {"message": f"Invalid DOB: {exc}"},
        status=460,
    )


@api.exception_handler(TermsOfServiceNotAcceptedValidationError)
def terms_of_service_not_accepted_validation_error(request, exc):
    return api.create_response(
        request,
        {"message": f"Must accept ToS to use Teaser: {exc}"},
        status=461,
    )


@api.exception_handler(PatternMatchValidationError)
def terms_of_service_not_accepted_validation_error(request, exc):
    return api.create_response(
        request,
        {"message": f"Invalid input: {exc}"},
        status=462,
    )


@api.exception_handler(UserAlreadyExistsValidationError)
def invalid_dob_validation_error(request, exc):
    return api.create_response(
        request,
        {"message": f"User already exists: {exc}"},
        status=463,
    )


@api.exception_handler(InvalidLoginCredentialsValidationError)
def invalid_login_credentials_validation_error(request, exc):
    return api.create_response(
        request,
        {"message": f"Could not login: {exc}"},
        status=464,
    )


# Define Auth Bearer


# Define API urls here
@api.post(
    "register",
    response={
        200: RegisterUserOutSchema,
        460: UserAuthError,
        461: UserAuthError,
        462: UserAuthError,
        463: UserAuthError,
    },
    tags=["users"],
)
def register_user_endpoint(request, payload: TeaserUserSchema):
    """
    Register user endpoint.
    Try it out:
    curl -X POST -d '{"username": "", "password":"", "email":"", "phone":"", "dob":"", "terms_of_service_accepted":true}' http://localhost:8000/api/v1/register
    TODO: Restrict permission for AccountCreation?
    """
    teaser_user_dict = payload.dict()
    # Get unsafe fields from payload
    us_username = teaser_user_dict["username"]
    us_email = teaser_user_dict["email"]
    us_phone = teaser_user_dict["phone"]
    us_password = teaser_user_dict["password"]
    us_dob = teaser_user_dict["dob"]
    # safe because automatically validated as bool by schema
    s_terms_of_service_accepted = teaser_user_dict["terms_of_service_accepted"]
    # Sanitize the input
    s_username = sanitization_utils.sanitize_str(us_username)
    s_email = sanitization_utils.sanitize_str(us_email)
    s_phone = sanitization_utils.sanitize_str(us_phone)
    s_dob = sanitization_utils.sanitize_str(us_dob)
    # Call the service layer to run business logic --> Returns JSON to return
    return register_user_service(
        s_username=s_username,
        s_email=s_email,
        s_phone=s_phone,
        us_password=us_password,
        s_dob=s_dob,
        s_terms_of_service_accepted=s_terms_of_service_accepted,
    )


@api.post(
    "login", response={200: LoginUserOutSchema, 464: UserAuthError}, tags=["users"]
)
def login_user_endpoint(request, payload: LoginUserSchema):
    teaser_user_dict = payload.dict()
    # Get unsafe fields from payload
    us_username = teaser_user_dict["username"]
    us_password = teaser_user_dict["password"]
    # Sanitize username input
    s_username = sanitization_utils.sanitize_str(us_username)
    return login_user_service(
        request=request, s_username=s_username, us_password=us_password
    )


@api.get("get_data", auth=AuthBearer())
def get_data(request, payload):
    if not request.user.is_authenticated:
        raise InvalidLoginCredentialsValidationError(414, request.user)
    else:
        return f"Authenticated user {request.auth} {request.user}"


# Token routes
@api.post("token/invalidate", tags=["token"])  # TODO: add this back?, auth=AuthBearer()
def invalidate_token(request, payload: AuthTokenSchema):
    """
    Invalidate a token.
    @raises 401 InvalidTokenError
    """
    teaser_user_dict = payload.dict()
    # Get unsafe fields from payload
    us_token = teaser_user_dict["token"]
    s_token = sanitization_utils.sanitize_str(us_token)
    invalidate_auth_token_service(s_token)


@api.post("token/create", tags=["token"])  # , auth=AuthBearer()
def create_token(request, payload: LoginUserSchema):
    teaser_user_dict = payload.dict()
    # Get unsafe fields from payload
    us_username = teaser_user_dict["username"]
    us_password = teaser_user_dict["password"]
    # Sanitize username input
    s_username = sanitization_utils.sanitize_str(us_username)
    token_hash, token_expiry_datetime = create_auth_token(s_username, us_password)
    return {"token_hash": token_hash, "token_expiry_date": token_expiry_datetime}


urlpatterns = [
    path("admin/", include("admin_honeypot.urls", namespace="admin_honeypot")),
    path("ratio/", admin.site.urls),
    path("api/v1/", api.urls),
]
