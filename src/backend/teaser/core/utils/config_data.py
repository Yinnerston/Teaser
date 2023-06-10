import unicodedata
from core.models.user_auth_models import TeaserUserModel
from core.models.post_models import PostsModel
from teaser.settings import env
from core.errors.user_auth_errors import UserAlreadyExistsValidationError


def get_or_create_util_users_data():
    # deprecated
    # TODO: Run Core on setup
    nfc_username = unicodedata.normalize("NFC", "Deleted")
    TeaserUserModel.objects.get_or_create(
        nfc_username=nfc_username, phone_str="XXX", dob_date="01/01/1990"
    )


def get_or_create_sentinel_post_data():
    """
    Sentinel method for the post
    """
    nfc_username = unicodedata.normalize("NFC", "Deleted")
    deleted_user = TeaserUserModel.objects.get(nfc_username=nfc_username)
    return PostsModel.objects.get_or_create(
        description="Deleted",
        is_private=True,
        has_comments=False,
        user_id=deleted_user,
        nfc_username=nfc_username,
        post_type=PostsModel.PostTypes.TEASER_TYPE,
        post_data={},
        video_mode=PostsModel.VideoModes.PORTRAIT,
        status=PostsModel.PostStatuses.NOT_STARTED,
    )[0]


def get_or_create_sentinel_post_data_id():
    return get_or_create_sentinel_post_data().id


def config_core_data():
    # get_or_create_util_users_data()
    get_or_create_sentinel_post_data()
