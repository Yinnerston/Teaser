from core.models.post_models import PostsModel, SongsModel
from django.db import models
from core.utils.user_profile_validator import ALL_CATEGORIES_TEMP, validate_categories

NO_SONG_CHOSEN_FOREIGN_KEY = -1
SONGS_MODEL = 1
# POST TYPES ENUM
TEASER_POST_TYPE = 0
QUESTION_POST_TYPE = 1
POST_TYPES = [TEASER_POST_TYPE, QUESTION_POST_TYPE]


def validate_foreign_key(model_type: int, foreign_key: int):
    if model_type == SONGS_MODEL:
        try:
            if foreign_key != NO_SONG_CHOSEN_FOREIGN_KEY:
                SongsModel.objects.get(id=foreign_key)
        except SongsModel.DoesNotExist:
            raise ValueError  # TODO: Should this be a


def validate_description(description):
    if len(description) > 200:
        raise ValueError  # TODO:
    return description


def validate_post_type(post_type):
    if not post_type in POST_TYPES:
        raise ValueError  # TODO:
    return post_type


def validate_post_data(post_data):
    # TODO: Urls, Thumbnails
    validate_categories(post_data["data"]["categories"])
    return post_data


def validate_create_post_service(
    s_description: str,
    s_teaser_user: int,
    s_song_id: int,
    s_post_type: int,
    s_post_data: dict,
    s_is_private: bool,
):
    validate_description(s_description)
    validate_foreign_key(s_song_id, SONGS_MODEL)
    validate_post_type(s_post_type)
    validate_post_data(s_post_data)


def validate_create_song_service(s_title: str, s_author: str, s_song_url: str):
    # TODO: Raise validation errors.
    pass
