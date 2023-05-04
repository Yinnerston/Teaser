from core.utils.post_validator import (
    validate_create_post_service,
    validate_create_song_service,
    NO_SONG_CHOSEN_FOREIGN_KEY,
    TEASER_POST_TYPE,
)
from django.db import transaction
from django.db.models import F
from core.models.user_auth_models import TeaserUserModel
from core.models.post_models import PostsModel, SongsModel, PostCategoriesModel
from core.models.user_profile_models import CategoriesModel, UserCategoriesModel
from teaser.settings import env
from uuid import uuid4
import requests
from ninja.files import UploadedFile
from time import time
from hashlib import sha256
from tusclient import client
from mimetypes import guess_type


def create_post_service(
    s_description: str,
    s_teaser_user: int,
    s_song_id: int,
    s_post_type: int,
    s_post_data: dict,
    s_is_nsfw: bool,
    s_is_private: bool,
    s_has_comments: bool,
    us_file: UploadedFile,  # Temporarily uploaded file if 2.5+ Mb
):
    """
    Create a post entry that can be filled in later
    TODO: set VIDEO_MODE.
    @returns
    """
    # Validate inputs
    validate_create_post_service(
        s_description, s_teaser_user, s_song_id, s_post_type, s_post_data, s_is_private
    )
    s_categories = s_post_data["data"]["categories"]
    # TODO: Rate limit to reduce spam?
    # TODO: Check that user is still valid? Possibility of account deletion
    with transaction.atomic():
        # Create post
        teaser_user_model = s_teaser_user
        # TODO: create video
        post_model = PostsModel.objects.create(
            description=s_description,
            is_nsfw=s_is_nsfw,
            is_private=s_is_private,
            has_comments=s_has_comments,
            user_id=teaser_user_model,
            song_id=SongsModel.objects.get(id=s_song_id)
            if s_song_id != NO_SONG_CHOSEN_FOREIGN_KEY
            else None,
            post_type=s_post_type,
            post_data=s_post_data,
        )
        # Link post categories to post
        for category in s_categories:
            categories_model = CategoriesModel.objects.get(title=category)
            PostCategoriesModel.objects.create(
                post_id=post_model, category_id=categories_model
            )

    # Send the video file to the storage / video server
    library_id = str(env("CDN_VIDEO_LIBRARY_ID"))
    api_key = str(env("CDN_API_KEY"))
    url = "https://video.bunnycdn.com/library/" + library_id + "/videos"
    payload = (
        '{"title":"' + "".join(filter(str.isalnum, s_description)) + '"}'
    )  # Bunny.net doesn't accept unicode
    headers = {
        "accept": "application/json",
        "content-type": "application/*+json",
        "AccessKey": api_key,
    }
    create_video_response = requests.post(url, data=payload, headers=headers)
    if create_video_response.status_code != 200:
        raise Exception()  # TODO:
    # Upload the video data to the created video
    video_id = create_video_response.json()["guid"]
    upload_url = url + "/" + str(video_id)
    pull_zone = str(env("CDN_PULL_ZONE_URL"))
    upload_response = requests.put(
        upload_url, files={"file": us_file.read()}, headers=headers
    )
    if upload_response.status_code != 200:
        raise Exception()  # TODO:
    # Setup tus client to upload video
    unix_expiry_time = int(time() + 60)
    authorization_signature = sha256(
        str(library_id + api_key + str(unix_expiry_time) + str(video_id)).encode(
            "utf-8"
        )
    ).hexdigest()
    upload_headers = {
        "AuthorizationSignature": str(authorization_signature),
        "AuthorizationExpire": str(unix_expiry_time),
        "VideoId": str(video_id),
        "LibraryId": str(library_id),
    }
    upload_metadata = {
        "filetype": us_file.content_type,
        "title": us_file.name,
    }
    my_client = client.TusClient("https://video.bunnycdn.com/tusupload", upload_headers)

    uploader = my_client.uploader(
        file_stream=us_file,
        chunk_size=us_file.DEFAULT_CHUNK_SIZE,
        metadata=upload_metadata,
    )
    uploader.upload()
    post_model.video_id = video_id
    post_model.upload_url = upload_url
    post_model.video_url = (
        "https://" + pull_zone + ".b-cdn.net/" + str(video_id) + "/play_720p.mp4"
    )
    # TODO: figure out a way to make this preview.webp given possible data rate constraints?
    post_model.thumbnail_url = (
        "https://" + pull_zone + ".b-cdn.net/" + str(video_id) + "/thumbnail.jpg"
    )
    # TODO: post_model.video_mode
    post_model.save()
    return {
        "upload_url": upload_url,
    }


def etl_post_service(
    s_description: str,
    s_reddit_id: str,
    s_reddit_score: int,
    s_post_data: dict,
    us_file,  # Opened file handle
):
    """
    Create a post entry that can be filled in later
    TODO: set VIDEO_MODE.
    @returns
    """
    s_categories = s_post_data["data"]["categories"]
    # TODO: Rate limit to reduce spam?
    # TODO: Check that user is still valid? Possibility of account deletion
    with transaction.atomic():
        # Create post
        teaser_user_model = TeaserUserModel.objects.get(nfc_username="uploader")
        # TODO: create video
        post_model = PostsModel.objects.create(
            description=s_description,
            is_private=False,
            has_comments=True,
            user_id=teaser_user_model,
            song_id=None,
            post_type=TEASER_POST_TYPE,
            post_data=s_post_data,
            reddit_id=s_reddit_id,
            reddit_score=s_reddit_score,
        )
        # Link post categories to post
        for category in s_categories:
            categories_model = CategoriesModel.objects.get(title=category)
            PostCategoriesModel.objects.create(
                post_id=post_model, category_id=categories_model
            )

    # Send the video file to the storage / video server
    library_id = str(env("CDN_VIDEO_LIBRARY_ID"))
    api_key = str(env("CDN_API_KEY"))
    url = "https://video.bunnycdn.com/library/" + library_id + "/videos"
    payload = '{"title":"' + "".join(filter(str.isalnum, s_description)) + '"}'
    headers = {
        "accept": "application/json",
        "content-type": "application/*+json",
        "AccessKey": api_key,
    }
    create_video_response = requests.post(url, data=payload, headers=headers)
    if create_video_response.status_code != 200:
        raise Exception()  # TODO:
    # Upload the video data to the created video
    video_id = create_video_response.json()["guid"]
    upload_url = url + "/" + str(video_id)
    pull_zone = str(env("CDN_PULL_ZONE_URL"))
    upload_response = requests.put(
        upload_url, files={"file": us_file.read()}, headers=headers
    )
    if upload_response.status_code != 200:
        raise Exception()  # TODO:
    # Setup tus client to upload video
    unix_expiry_time = int(time() + 60)
    authorization_signature = sha256(
        str(library_id + api_key + str(unix_expiry_time) + str(video_id)).encode(
            "utf-8"
        )
    ).hexdigest()
    upload_headers = {
        "AuthorizationSignature": str(authorization_signature),
        "AuthorizationExpire": str(unix_expiry_time),
        "VideoId": str(video_id),
        "LibraryId": str(library_id),
    }
    upload_metadata = {
        "filetype": guess_type(url=us_file.name)[0],
        "title": us_file.name,
    }
    my_client = client.TusClient("https://video.bunnycdn.com/tusupload", upload_headers)

    uploader = my_client.uploader(
        file_stream=us_file,
        metadata=upload_metadata,
    )
    uploader.upload()
    post_model.video_id = video_id
    post_model.upload_url = upload_url
    # https://{pull_zone_url}.b-cdn.net/{video_id}/play_{resolution_height}p.mp4
    post_model.video_url = (
        "https://" + pull_zone + ".b-cdn.net/" + str(video_id) + "/play_720p.mp4"
    )
    # TODO: post_model.video_mode
    post_model.save()
    return {
        "upload_url": upload_url,
    }


def update_post_status_service(us_library_id: int, us_video_id: str, us_status: int):
    """
    only update post status if finished.
    # TODO: If status is failed, ?delete post?
    """
    if us_library_id != int(env("CDN_VIDEO_LIBRARY_ID")):
        raise Exception()  # TODO:
    if us_status != PostsModel.PostStatuses.FINISHED:
        return
    # TODO: Other validiation?
    post = PostsModel.objects.get(video_id=us_video_id)
    post.status = us_status
    post.save()
    return {}


def get_general_feed_service():
    """
    Get general feed for all users / users that aren't logged in
    """
    # TODO: upload_url --> video_url, thumbnail_url
    # return PostsModel.objects.alias(
    #     author_id="user_id__id", username="user_id__nfc_username", stage_name="user_id__stage_name"
    #     ).values(
    #     "id", "description", "author_id", "username", "stage_name", "video_url", "thumbnail_url", "video_mode", "post_data", "reddit_score").all()
    # TODO: THIS IS A N+1 PROBLEM:
    vanilla_category_aliases = [
        "Amateur",
        "Roleplay",
        "Romantic",
        "Funny",
        "Fitness",
        "How To / Educational",
        "Video Games",
        "Dance",
        "Oral",
    ]
    output = (
        PostCategoriesModel.objects.filter(
            category_id__alias__in=vanilla_category_aliases
        )
        .select_related("post_id", "post_id__user_id")
        .filter(post_id__status=PostsModel.PostStatuses.FINISHED)
        .values(
            "post_id",  #
            description=F("post_id__description"),
            user_id=F("post_id__user_id__id"),  #
            username=F("post_id__user_id__nfc_username"),
            stage_name=F("post_id__user_id__stage_name"),  #
            profile_photo_url=F("post_id__user_id__profile_photo_url"),  #
            video_url=F("post_id__video_url"),
            thumbnail_url=F("post_id__thumbnail_url"),
            video_mode=F("post_id__video_mode"),
            post_data=F("post_id__post_data"),
            reddit_score=F("post_id__reddit_score"),
        )
        .all()
    )
    return output


def get_feed_for_you_service(s_teaser_user):
    """
    Returns a paginated feed for a user.
    """
    # Get the categories the user likes
    # Get all posts (TODO: within a range?) for those categories sorted by score
    # Get all posts (TODO: within a range?) in other categories sorted by score
    # return posts with the format https://{pull_zone_url}.b-cdn.net/{video_id}/play_{resolution_height}p.mp4
    return get_general_feed_service()


def create_song_service(s_title: str, s_author: str, s_song_url: str):
    """
    Validate song details then Create a song.
    """
    validate_create_song_service(s_title, s_author, s_song_url)
    # Do not insert duplicates
    SongsModel.objects.get_or_create(
        title=s_title, author=s_author, song_url=s_song_url
    )
    return {}
