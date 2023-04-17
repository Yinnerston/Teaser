from core.utils.post_validator import (
    validate_create_post_service,
    validate_create_song_service,
    NO_SONG_CHOSEN_FOREIGN_KEY,
)
from django.db import transaction
from core.models.user_auth_models import TeaserUserModel
from core.models.post_models import PostsModel, SongsModel
from teaser.settings import env
from uuid import uuid4


def create_post_service(
    s_description: str,
    s_user_id: int,
    s_song_id: int,
    s_post_type: int,
    s_post_data: dict,
    s_is_private: bool,
):
    """
    Create a post entry that can be filled in later
    @returns
    """
    # Validate inputs
    validate_create_post_service(
        s_description, s_user_id, s_song_id, s_post_type, s_post_data, s_is_private
    )
    # TODO: Rate limit to reduce spam?
    # TODO: Check that user is still valid? Possibility of account deletion
    video_id = uuid4()
    with transaction.atomic():
        # Create post
        teaser_user_model = TeaserUserModel.objects.get(user_id=s_user_id)
        post_model = PostsModel.objects.create(
            video_id=video_id,
            description=s_description,
            is_private=s_is_private,
            user_id=teaser_user_model,
            song_id=SongsModel.objects.get(id=s_song_id)
            if s_song_id != NO_SONG_CHOSEN_FOREIGN_KEY
            else None,
            post_type=s_post_type,
            post_data=s_post_data,
            upload_url="https://video.bunnycdn.com/library/"
            + str(env("VIDEO_LIBRARY_ID"))
            + "/videos/"
            + str(video_id),
        )

    return {
        "upload_url": post_model.upload_url,
    }


def create_song_service(s_title: str, s_author: str, s_song_url: str):
    validate_create_song_service(s_title, s_author, s_song_url)
    # Do not insert duplicates
    SongsModel.objects.get_or_create(
        title=s_title, author=s_author, song_url=s_song_url
    )
    return {}
