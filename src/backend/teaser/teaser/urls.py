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
from django.http import HttpRequest, HttpResponse
from django.urls import include, path
import json
from django.contrib.staticfiles.urls import staticfiles_urlpatterns

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
    get_general_feed_service,
    get_feed_for_you_service,
)
from core.services.user_profile_service import (
    create_user_categories_service,
    get_authenticated_user_profile_service,
    get_user_profile_from_username_service,
    get_profile_posts_service,
    get_own_profile_posts_service,
)
from core.services.search_service import (
    search_posts_suggestions_service,
    search_posts_results_service,
)
from core.services.user_post_relationship_service import (
    like_post_service,
    bookmark_post_service,
    comment_on_post_service,
    like_post_comment_service,
    get_post_comments_service,
    get_post_comment_replies_service,
)
from core.services.moderation_services import (
    report_post_service,  # TODO: report post endpoint
    report_comment_service,
)

# Import schemas
from core.schemas.user_auth_schemas import *
from core.schemas.openai_schemas import *
from core.schemas.post_schemas import *
from core.schemas.user_profile_schemas import *
from core.schemas.search_schemas import *
from core.schemas.user_post_relationship_schemas import *

# Basic Sanitizers
from core.utils import sanitization_utils

# Auth bearer token
from core.services.user_auth_services import AuthBearer

# Views
from core.views.views import IndexView, OpenAIGeneratedImageView

from ninja import File
from ninja.files import UploadedFile

from ninja_extra import api_controller, route, NinjaExtraAPI
from ninja_extra.pagination import (
    paginate,
    PageNumberPaginationExtra,
    PaginatedResponseSchema,
)
from typing import List

api = NinjaExtraAPI(
    description="""
    # Documentation for Teaser API V1
    """
)
# Define exceptions

from core.errors.user_auth_errors import *

from django.views.decorators.common import wraps
from django.core.cache import cache


def api_cached(key, has_auth, uses_controller, timeout):
    """
    Wrapper for caching with key and timeout.
    https://github.com/vitalik/django-ninja/issues/148#issuecomment-1088680636
    """

    def inner(f):
        @wraps(f)
        def wrapper(*args, **kwargs):
            # find token hash from args
            initial_key = [key]
            if has_auth:
                if uses_controller:
                    initial_key += [kwargs["request"].auth.token_hash]
                else:
                    initial_key += [args[0].auth.token_hash]
            # Attach values like pageParam to end of key joined by "/"
            key_with_params = "/".join(
                initial_key + [str(val) for val in kwargs.values()]
            )
            value = cache.get(key_with_params)
            if value:
                return value
            value = f(*args, **kwargs)
            cache.set(key_with_params, value, timeout)
            return value

        return wrapper

    return inner


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
    s_auth_token = sanitization_utils.sanitize_str(request.auth.token_hash)
    logout_user_service(request, s_auth_token)


@api.post(
    "users/categories",
    tags=["users"],
    auth=AuthBearer(),
)
def add_user_category_endpoint(request, payload: CreateUserCategorySchema):
    category_dict = payload.dict()
    # Get unsafe fields from payload
    us_categories = category_dict["categories"]
    # Sanitize us_categories input
    s_teaser_user = request.auth.teaser_user_id
    s_categories = [
        sanitization_utils.sanitize_str(category) for category in us_categories
    ]
    return create_user_categories_service(s_teaser_user, s_categories)


@api.get(
    "users/profile",
    tags=["users"],
    auth=AuthBearer(),
)
@api_cached(
    key="api/v1/users/profile", has_auth=True, uses_controller=False, timeout=60
)
def get_authenticated_user_profile_endpoint(request):
    """
    Get user profile requiring authentication
    """
    return get_authenticated_user_profile_service(request.auth.teaser_user_id)


@api.get(
    "users/{username}/profile",
    tags=["users"],
)
@api_cached(
    key="api/v1/{username}/profile", has_auth=False, uses_controller=False, timeout=60
)
def get_user_profile_from_username_endpoint(request, username: str):
    """
    Get profile from username without authentication
    """
    us_username = sanitization_utils.sanitize_str(username)
    return get_user_profile_from_username_service(us_username)


# TODO: Change password endpoint
# Creates another token with invalidate_other_tokens=True


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
    us_token = request.auth.token_hash
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
def generate_image_endpoint(request, payload: OpenaiImageGenerationSchema):
    openai_text_completion_dict = payload.dict()
    # Get unsafe fields from payload
    us_prompt = openai_text_completion_dict["prompt"]
    # Sanitize username input
    s_prompt = sanitization_utils.sanitize_str(us_prompt)
    outputs = image_generation_service(s_prompt=s_prompt)
    return {"output": outputs}


@api.post("posts/create", tags=["posts"], auth=AuthBearer())
def create_post_endpoint(
    request, payload: CreatePostSchema, file: UploadedFile = File(...)
):
    """
    Create a post with an uplaoded file
    """
    post_dict = payload.dict()
    # Get unsafe fields from payload
    us_description = post_dict["description"]
    us_post_type = post_dict["post_type"]
    us_post_data = post_dict["post_data"]
    us_file = file
    # Sanitize username input
    s_description = sanitization_utils.sanitize_str(us_description)
    if not request.auth:
        raise InvalidLoginCredentialsValidationError
    s_teaser_user = request.auth.teaser_user_id
    us_song_id = post_dict["song_id"]
    s_song_id = sanitization_utils.sanitize_foreign_key_allow_values(
        us_song_id, [NO_SONG_CHOSEN_FOREIGN_KEY]
    )
    s_post_type = sanitization_utils.sanitize_foreign_key(us_post_type)
    # s_post_data = sanitization_utils.CleanJson(us_post_data).get()

    s_is_private = post_dict["is_private"]
    s_is_nsfw = post_dict["is_nsfw"]
    s_has_comments = post_dict["has_comments"]
    return create_post_service(
        s_description=s_description,
        s_teaser_user=s_teaser_user,
        s_song_id=s_song_id,
        s_post_type=s_post_type,
        s_post_data=us_post_data,  # TODO: Validations on fields
        s_is_nsfw=s_is_nsfw,
        s_is_private=s_is_private,
        s_has_comments=s_has_comments,
        us_file=us_file,  # TODO: Validation on data?
    )


@api.post("posts/update_status", tags=["posts"])
def update_posts_status_endpoint(request, payload: UpdatePostStatusSchema):
    """
    Bunny.net webhook for updating the status of a post on video encoding completion.
    """
    post_status_dict = payload.dict()
    us_library_id = post_status_dict["VideoLibraryId"]
    us_video_id = post_status_dict["VideoGuid"]
    us_status = post_status_dict["Status"]
    # TODO: Sanitize
    return update_post_status_service(us_library_id, us_video_id, us_status)


@api.post("posts/like", tags=["posts"], auth=AuthBearer())
def like_post_endpoint(request, payload: UserPostActivitySchema):
    post_dict = payload.dict()
    s_teaser_user = request.auth.teaser_user_id
    us_post_id = post_dict["post_id"]
    return like_post_service(s_teaser_user, us_post_id)


@api.post("posts/bookmark", tags=["posts"], auth=AuthBearer())
def bookmark_post_endpoint(request, payload: UserPostActivitySchema):
    post_dict = payload.dict()
    s_teaser_user = request.auth.teaser_user_id
    us_post_id = post_dict["post_id"]
    return bookmark_post_service(s_teaser_user, us_post_id)


@api.post(
    "posts/comment",
    tags=["posts"],
    auth=AuthBearer(),
    response=UserPostCommentResponseSchema,
)
def comment_on_post_endpoint(request, payload: UserPostCommentSchema):
    post_dict = payload.dict()
    s_teaser_user = request.auth.teaser_user_id
    us_post_id = post_dict["post_id"]
    us_comment_ancestor_id = post_dict["comment_ancestor_id"]
    s_comment_text = sanitization_utils.sanitize_str(post_dict["comment_text"])
    return comment_on_post_service(
        s_teaser_user,
        us_post_id=us_post_id,
        us_comment_ancestor_id=us_comment_ancestor_id,
        s_comment_text=s_comment_text,
    )


@api.post("posts/comment/like", tags=["posts"], auth=AuthBearer())
def like_post_comment_endpoint(request, payload: LikePostCommentSchema):
    post_dict = payload.dict()
    s_teaser_user = request.auth.teaser_user_id
    us_comment_id = post_dict["comment_id"]
    return like_post_comment_service(
        s_teaser_user=s_teaser_user, us_comment_id=us_comment_id
    )


@api.post("posts/comment/report", tags=["posts"])
def report_post_comment_endpoint(request, payload: LikePostCommentSchema):
    post_dict = payload.dict()
    us_comment_id = post_dict["comment_id"]
    return report_comment_service(us_comment_id=us_comment_id)


# @api.post("posts/share", tags=["posts"], auth=AuthBearer())
# def share_post_endpoint(request, payload: UserPostActivitySchema):
#     post_dict = payload.dict()
#     s_teaser_user = request.auth.teaser_user_id
#     us_post_id = post_dict["post_id"]


@api_controller("/posts")
class PostsFeedController:
    """
    For /posts endpoints that require pagination
    """

    @route.get(
        "/feed",
        tags=["posts"],
        response=PaginatedResponseSchema[PostsFeedResponseSchema],
    )
    @paginate(PageNumberPaginationExtra, page_size=50)
    @api_cached(
        key="api/v1/posts/feed", has_auth=False, uses_controller=True, timeout=60
    )
    def get_posts_general_feed_endpoint(self):
        """
        General feed endpoint (login not required).
        """
        return get_general_feed_service()

    @route.get(
        "/forYou",
        tags=["posts"],
        response={
            200: PaginatedResponseSchema[PostsFeedResponseSchema],
            462: UserAuthError,
        },
        auth=AuthBearer(),
    )
    @paginate(PageNumberPaginationExtra, page_size=50)
    @api_cached(
        key="api/v1/posts/forYou", has_auth=True, uses_controller=True, timeout=60
    )
    def get_posts_for_you_feed_endpoint(
        self, request: HttpRequest, response: HttpResponse
    ):
        """
        User specific endpoint. Auth / login required.
        """
        s_teaser_user = request.auth.teaser_user_id
        return get_feed_for_you_service(s_teaser_user)

    @route.get(
        "/users/{username}",
        tags=["posts"],
        response=PaginatedResponseSchema[ProfileFeedResponseSchema],
    )
    @paginate(PageNumberPaginationExtra, page_size=50)
    @api_cached(
        key="api/v1/posts/users", has_auth=False, uses_controller=True, timeout=60
    )
    def get_profile_posts(self, username):
        """
        Get posts from a user's profile. Auth not required
        """
        return get_profile_posts_service(username)

    @route.get(
        "/self",
        tags=["posts"],
        response=PaginatedResponseSchema[ProfileFeedResponseSchema],
        auth=AuthBearer(),
    )
    @paginate(PageNumberPaginationExtra, page_size=50)
    @api_cached(
        key="api/v1/posts/self", has_auth=True, uses_controller=True, timeout=60
    )
    def get_own_profile_posts(self, request: HttpRequest, response: HttpResponse):
        """
        Get your own posts, auth required.
        TODO: May contain sensitive data?
        """
        s_teaser_user = request.auth.teaser_user_id
        return get_own_profile_posts_service(s_teaser_user)

    @route.get(
        "/comments/top_level/{post_id}",
        tags=["posts"],
        # request=UserPostActivitySchema,
        response={200: PaginatedResponseSchema[TopLevelPostCommentsResponseSchema]},
    )
    @paginate(PageNumberPaginationExtra, page_size=50)
    @api_cached(
        key="api/v1/posts/comments/top_level",
        has_auth=False,
        uses_controller=True,
        timeout=60,
    )
    def get_top_level_post_comments_endpoint(self, post_id: int):
        """
        Get the comments attached to a post.
        """
        us_post_id = post_id
        return get_post_comments_service(us_post_id)

    @route.get(
        "/comments/replies/{post_id}/{comment_id}",
        tags=["posts"],
        # request=UserPostActivitySchema,
        response={200: PaginatedResponseSchema[TopLevelPostCommentsResponseSchema]},
    )
    @paginate(PageNumberPaginationExtra, page_size=50)
    @api_cached(
        key="api/v1/posts/comments/replies",
        has_auth=True,
        uses_controller=True,
        timeout=60,
    )
    def get_post_comment_replies_endpoint(self, post_id: int, comment_id: int):
        """
        Get the replies to a comment attached to a post.
        """
        us_post_id = post_id
        us_comment_id = comment_id
        return get_post_comment_replies_service(
            us_post_id=us_post_id, us_comment_id=us_comment_id
        )


@api_controller("/search")
class SearchController:
    """
    Controller for search endpoints
    """

    @route.get(
        "/suggestions/{query_str}",
        tags=["search"],
        response=List[SearchSuggestionSchema],
    )
    @api_cached(
        key="api/v1/posts/search/suggestions",
        has_auth=False,
        uses_controller=True,
        timeout=60,
    )
    def get_search_suggestions_endpoint(
        self, query_str: str, request: HttpRequest, response: HttpResponse
    ):
        """
        Get static search suggestions as the user creates a search query.
        """
        return search_posts_suggestions_service(query_str)

    @route.get(
        "/query/{query_str}",
        tags=["search"],
        response=PaginatedResponseSchema[SearchResultSchema],
    )
    @paginate(PageNumberPaginationExtra, page_size=50)
    @api_cached(
        key="api/v1/posts/search/query",
        has_auth=False,
        uses_controller=True,
        timeout=60,
    )
    def get_search_results_endpoint(
        self, query_str: str, request: HttpRequest, response: HttpResponse
    ):
        """
        Search for a post by the query_str.
        """
        s_query_str = sanitization_utils.sanitize_str(query_str)
        return search_posts_results_service(s_query_str)


@api.post("songs/create", tags=["songs"], auth=AuthBearer())
def create_song_endpoint(request, payload: CreateSongSchema):
    """
    Create a song record in the db.
    """
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


api.register_controllers(PostsFeedController)
api.register_controllers(SearchController)

urlpatterns = [
    path("", IndexView, name="Index View"),
    path("admin/", include("admin_honeypot.urls", namespace="admin_honeypot")),
    path("ratio/", admin.site.urls),
    path("api/v1/", api.urls),
    path(
        "openai/image/<uuid:request_id>",
        OpenAIGeneratedImageView,
        name="OpenAI Images",
    ),
    path("", include("django_prometheus.urls")),
]
urlpatterns += (
    staticfiles_urlpatterns()
)  # static files in dev mode https://stackoverflow.com/a/12801140
