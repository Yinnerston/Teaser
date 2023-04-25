from core.utils.user_profile_validator import validate_categories
from core.models.user_profile_models import (
    CategoriesModel,
    UserCategoriesModel,
    UserProfileModel,
)
from core.models.user_auth_models import TeaserUserModel


def create_user_categories_service(s_user, s_categories):
    # Validate categories
    validate_categories(s_categories)
    for category in s_categories:
        category_to_add_to_user = CategoriesModel.objects.get(title=category)
        teaser_user_model = TeaserUserModel.objects.get(user_id=s_user)
        UserCategoriesModel.objects.get_or_create(
            user_id=teaser_user_model,
            categories_id=category_to_add_to_user,
            colour_code="#ffffff",
        )


def get_user_profile_service(s_user):
    teaser_user_model = TeaserUserModel.objects.get(user_id=s_user)
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
