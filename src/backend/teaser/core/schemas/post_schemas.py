from ninja import Schema, Field
from core.utils.post_validator import NO_SONG_CHOSEN_FOREIGN_KEY
from uuid import uuid4


class CreatePostSchema(Schema):
    """
    Schema for TeaserUser in /api/v1/register endpoint.
    """

    description: str = Field(example="testuser1")
    has_comments: bool = Field(example=True)
    is_private: bool = Field(example=False)
    song_id: int = Field(example=1, default=NO_SONG_CHOSEN_FOREIGN_KEY)
    post_type: int = Field(example=0, description="ENUM {TEASER: 0, QUESTION: 1}")
    post_data: dict = Field(default={"data": {"categories": []}, "question": {}})


class UpdatePostStatusSchema(Schema):
    """
    Schema for bunny.net webhook to update the status of an uploaded video.
    https://docs.bunny.net/docs/stream-webhook
    """

    VideoLibraryId: int = Field(example=123)
    VideoGuid: str = Field(example=str(uuid4()))
    Status: int = Field(
        example=3,
        description="ENUM {QUEUED: 0, PROCESSING: 1, ENCODING: 2, FINISHED: 3, ...}. See https://docs.bunny.net/docs/stream-webhook",
    )


class CreateSongSchema(Schema):
    """
    Schema to create a song.
    """

    title: str = Field(example="AmongUS SUS Noises")
    author: str = Field(example="AmongUs Composer", default="Anonymous")
    song_url: str = Field(
        example="https://teasernsfw-dev.s3.ap-southeast-2.amazonaws.com/sus15.opus"
    )


class PostsFeedResponseSchema(Schema):
    """
    Output schema of /posts/feed
    """

    # Caption data / Author fields
    id: str = Field(example="uuid4")
    description: str = Field(example="Some Post")
    user_id__id: int = Field(example=1)
    user_id__nfc_username: str = Field("testuser1")
    user_id__stage_name: str = Field("Cat Person")
    user_id__profile_photo_url: str = Field(
        example="https://teasernsfw-dev.s3.ap-southeast-2.amazonaws.com/amogus.png"
    )
    # Video data
    video_url: str = Field(example="https://i.imgur.com/xaAAjDk.mp4")
    thumbnail_url: str = Field(
        example="https://teasernsfw-dev.s3.ap-southeast-2.amazonaws.com/amogus.png"
    )
    post_data: dict = Field(example={})
    video_mode: int = Field(example=0, description="Portrait=0, Landscape=1")
    # sidebar fields
    reddit_score: int = None
    # n_likes: int = Field(example=30)
    # n_bookmarks: int = Field(example=20)
    # n_shares: int = Field(example=10)
    # n_comments: int = Field(example=5)
