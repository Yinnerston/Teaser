from ninja import Schema, Field
from core.utils.post_validator import NO_SONG_CHOSEN_FOREIGN_KEY
from uuid import uuid4


class CreatePostSchema(Schema):
    """
    Schema for TeaserUser in /api/v1/register endpoint.
    """

    description: str = Field(example="testuser1")
    is_private: bool = Field(example=False)
    song_id: int = Field(example=1, default=NO_SONG_CHOSEN_FOREIGN_KEY)
    post_type: int = Field(example=0, description="ENUM {TEASER: 0, QUESTION: 1}")
    post_data: dict = Field(default={"data": {}, "question": {}})


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
