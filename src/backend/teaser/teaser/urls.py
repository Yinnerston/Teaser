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
    logout_user_service,
    invalidate_auth_token_service,
    create_auth_token,
    refresh_auth_token_service,
)
from core.services.openai_service import (
    text_completion_service,
    image_generation_service,
)
from core.services.post_service import (
    create_post_service,
    create_song_service,
    update_post_status_service,
)

# Import schemas
from core.schemas.user_auth_schemas import *
from core.schemas.openai_schemas import *
from core.schemas.post_schemas import *

# Basic Sanitizers
from core.utils import sanitization_utils

# Auth bearer token
from core.services.user_auth_services import AuthBearer

# Views
from core.views.views import OpenAIGeneratedImageView

from ninja import NinjaAPI, File
from ninja.files import UploadedFile

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
    curl -X POST -d '{"username": "", "password":"", "phone":"", "dob":"", "terms_of_service_accepted":true}' http://localhost:8000/api/v1/register
    TODO: Restrict permission for AccountCreation?
    """
    teaser_user_dict = payload.dict()
    # Get unsafe fields from payload
    us_username = teaser_user_dict["username"]
    us_phone = teaser_user_dict["phone"]
    us_password = teaser_user_dict["password"]
    us_dob = teaser_user_dict["dob"]
    # safe because automatically validated as bool by schema
    s_terms_of_service_accepted = teaser_user_dict["terms_of_service_accepted"]
    # Sanitize the input
    s_username = sanitization_utils.sanitize_str(us_username)
    s_phone = sanitization_utils.sanitize_str(us_phone)
    s_dob = sanitization_utils.sanitize_str(us_dob)
    # Call the service layer to run business logic --> Returns JSON to return
    return register_user_service(
        s_username=s_username,
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


@api.post(
    "logout",
    response={200: None, 464: UserAuthError},
    tags=["users"],
    auth=AuthBearer(),
)
def logout_user_endpoint(request):
    """
    Logout a user.
    TODO: Logout on all devices?
    """
    s_auth_token = sanitization_utils.sanitize_str(request.auth)
    logout_user_service(request, s_auth_token)


# TODO: Change password endpoint
# Creates another token with invalidate_other_tokens=True


@api.get("get_data", auth=AuthBearer())
def get_data_endpoint(request, payload):
    if not request.user.is_authenticated:
        raise InvalidLoginCredentialsValidationError(464, request.user)
    else:
        return f"Authenticated user {request.auth} {request.user}"


# Token routes
@api.post("token/invalidate", tags=["token"])  # TODO: add this back?, auth=AuthBearer()
def invalidate_token_endpoint(request, payload: AuthTokenSchema):
    """
    Invalidate a token.
    @raises 401 InvalidTokenError
    @returns {}
    """
    teaser_user_dict = payload.dict()
    # Get unsafe fields from payload
    us_token = teaser_user_dict["token"]
    s_token = sanitization_utils.sanitize_str(us_token)
    invalidate_auth_token_service(s_token)


@api.post("token/create", tags=["token"])  # , auth=AuthBearer()
def create_token_endpoint(request, payload: LoginUserSchema):
    """
    Create a new token given a username and password.
    Does not invalidation other tokens for the user.
    @raises 464 InvalidLoginCredentialsValidationError
    @returns {token_hash: str, token_expiry_date: datetime}
    """
    teaser_user_dict = payload.dict()
    # Get unsafe fields from payload
    us_username = teaser_user_dict["username"]
    us_password = teaser_user_dict["password"]
    # Sanitize username input
    s_username = sanitization_utils.sanitize_str(us_username)
    token_hash, token_expiry_datetime = create_auth_token(
        s_username, us_password, invalidate_other_tokens=False
    )
    return {"token_hash": token_hash, "token_expiry_date": token_expiry_datetime}


@api.get("token/refresh", tags=["token"], auth=AuthBearer())
def refresh_token_endpoint(request):
    """
    Refresh an access token.
    Requires an valid bearer token in the Authorization header.
    @raises 401 Unauthorized User
    @returns {token_hash: str, token_expiry_date: datetime}
    """
    # Get unsafe fields from payload
    us_token = request.auth
    s_token = sanitization_utils.sanitize_str(us_token)
    token_hash, token_expiry_datetime = refresh_auth_token_service(s_token)
    return {"token_hash": token_hash, "token_expiry_date": token_expiry_datetime}


@api.post("openai/text_completion", tags=["openai"], auth=AuthBearer())
def complete_text_endpoint(request, payload: OpenaiTextCompletionSchema):
    openai_text_completion_dict = payload.dict()
    # Get unsafe fields from payload
    us_prompt = openai_text_completion_dict["prompt"]
    s_temperature = openai_text_completion_dict["temperature"]
    # Sanitize username input
    s_prompt = sanitization_utils.sanitize_str(us_prompt)
    outputs = text_completion_service(s_prompt=s_prompt, s_temperature=s_temperature)
    return {
        "output1": outputs[0].text,
        "output2": outputs[1].text,
        "output3": outputs[2].text,
    }


@api.post("openai/image_generation", tags=["openai"], auth=AuthBearer())
def generate_image(request, payload: OpenaiImageGenerationSchema):
    openai_text_completion_dict = payload.dict()
    # Get unsafe fields from payload
    us_prompt = openai_text_completion_dict["prompt"]
    # Sanitize username input
    s_prompt = sanitization_utils.sanitize_str(us_prompt)
    outputs = image_generation_service(s_prompt=s_prompt)
    return {"output": outputs}


@api.post("posts/create", tags=["posts"], auth=AuthBearer())
def create_post(request, payload: CreatePostSchema, file: UploadedFile = File(...)):
    post_dict = payload.dict()
    # Get unsafe fields from payload
    us_description = post_dict["description"]
    us_post_type = post_dict["post_type"]
    us_post_data = post_dict["post_data"]
    us_file = file
    # Sanitize username input
    s_description = sanitization_utils.sanitize_str(us_description)
    if not request.user.is_authenticated:
        raise InvalidLoginCredentialsValidationError
    s_user_id = request.user
    us_song_id = post_dict["song_id"]
    s_song_id = sanitization_utils.sanitize_foreign_key_allow_values(
        us_song_id, [NO_SONG_CHOSEN_FOREIGN_KEY]
    )
    s_post_type = sanitization_utils.sanitize_foreign_key(us_post_type)
    # s_post_data = { # TODO:
    #     "data": us_post_data["data"],
    #     "question": s_post_data["question"]
    # }
    s_is_private = post_dict["is_private"]
    return create_post_service(
        s_description=s_description,
        s_user_id=s_user_id,
        s_song_id=s_song_id,
        s_post_type=s_post_type,
        s_post_data=us_post_data,  # TODO: Validations on fields
        s_is_private=s_is_private,
        us_file=us_file,  # TODO: Validation on data?
    )


@api.post("posts/update_status", tags=["posts"])
def update_posts_status(request, payload: UpdatePostStatusSchema):
    post_status_dict = payload.dict()
    us_library_id = post_status_dict["VideoLibraryId"]
    us_video_id = post_status_dict["VideoGuid"]
    us_status = post_status_dict["Status"]
    # TODO: Sanitize
    return update_post_status_service(us_library_id, us_video_id, us_status)


@api.post("songs/create", tags=["songs"], auth=AuthBearer())
def create_song(request, payload: CreateSongSchema):
    song_dict = payload.dict()
    # Get unsafe fields from payload
    us_title = song_dict["title"]
    us_author = song_dict["author"]
    us_song_url = song_dict["song_url"]
    # Sanitize username input
    s_title = sanitization_utils.sanitize_str(us_title)
    s_author = sanitization_utils.sanitize_str(us_author)
    s_song_url = sanitization_utils.sanitize_str(us_song_url)
    return create_song_service(
        s_title=s_title, s_author=s_author, s_song_url=s_song_url
    )


urlpatterns = [
    path("admin/", include("admin_honeypot.urls", namespace="admin_honeypot")),
    path("ratio/", admin.site.urls),
    path("api/v1/", api.urls),
    path(
        "openai/image/<uuid:request_id>",
        OpenAIGeneratedImageView,
        name="OpenAI Images",
    ),
]
