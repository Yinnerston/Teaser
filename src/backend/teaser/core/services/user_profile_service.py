from core.utils.user_profile_validator import validate_categories
from core.models.user_profile_models import (
    CategoriesModel,
    UserCategoriesModel,
    UserProfileModel,
)
from core.models.user_auth_models import TeaserUserModel
from core.utils.user_auth_validator import validate_username
from core.models.post_models import PostsModel


def create_user_categories_service(s_teaser_user, s_categories):
    # Validate categories
    validate_categories(s_categories)
    added_categories = []
    for category in s_categories:
        category_to_add_to_user = CategoriesModel.objects.get(title=category)
        teaser_user_model = s_teaser_user
        user_category_model, _ = UserCategoriesModel.objects.get_or_create(
            user_id=teaser_user_model,
            categories_id=category_to_add_to_user,
            colour_code="#ffffff",
        )
        added_categories.append(
            (
                user_category_model.user_id.id,
                user_category_model.user_id.nfc_username,
                user_category_model.categories_id.title,
            )
        )
    return added_categories


def get_authenticated_user_profile_service(s_teaser_user):
    """
    Get your own profile as a validated user.
    """
    teaser_user_model = s_teaser_user
    user_profile_model = UserProfileModel.objects.get(user_id=teaser_user_model)
    return {
        "display_name": teaser_user_model.stage_name,
        "username": teaser_user_model.nfc_username,
        "description": user_profile_model.description,
        "profile_photo_url": teaser_user_model.profile_photo_url,
        "n_following": 1,  # TODO:
        "n_followers": 2,  # TODO:
        "n_likes": 3,  # TODO:
    }


def get_user_profile_from_username_service(us_username: str):
    # Validate username
    s_username = validate_username(us_username)
    # Get profile
    teaser_user_model = TeaserUserModel.objects.get(nfc_username=s_username)
    user_profile_model = UserProfileModel.objects.get(user_id=teaser_user_model)
    return {
        "display_name": teaser_user_model.stage_name,
        "username": teaser_user_model.nfc_username,
        "description": user_profile_model.description,
        "profile_photo_url": teaser_user_model.profile_photo_url,
        "n_following": 1,  # TODO:
        "n_followers": 2,  # TODO:
        "n_likes": 3,  # TODO:
    }


def get_profile_posts_service(us_username):
    """
    Get the profile of a user given a username
    """
    # validate username
    s_username = validate_username(us_username)
    s_teaser_user = TeaserUserModel.objects.get(nfc_username=s_username)
    # Get posts made by the user
    return (
        PostsModel.objects.filter(user_id=s_teaser_user)
        .order_by("is_pinned", "created_at")
        .values(
            "id",
            "is_pinned",
            "description",
            "video_url",
            "thumbnail_url",
            "video_mode",
            "post_data",
            "n_likes",
        )
        .all()
    )


def get_own_profile_posts_service(s_teaser_user):
    """
    Get the profile of a user given a user.
    Different from get_profile_posts_service because it can potentially return private user post information
    """
    # Get posts made by the user
    return (
        PostsModel.objects.filter(user_id=s_teaser_user)
        .order_by("is_pinned", "created_at")
        .values(
            "id",
            "is_pinned",
            "description",
            "video_url",
            "thumbnail_url",
            "video_mode",
            "post_data",
            "n_likes",
        )
        .all()
    )
