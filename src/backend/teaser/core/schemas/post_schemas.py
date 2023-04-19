from ninja import Schema, Field
from core.utils.post_validator import NO_SONG_CHOSEN_FOREIGN_KEY


class CreatePostSchema(Schema):
    """
    Schema for TeaserUser in /api/v1/register endpoint.
    """

    description: str = Field(example="testuser1")
    is_private: bool = Field(example=False)
    song_id: int = Field(example=1, default=NO_SONG_CHOSEN_FOREIGN_KEY)
    post_type: int = Field(example=0, description="ENUM {TEASER: 0, QUESTION: 1}")
    post_data: dict = Field(default={"data": {}, "question": {}})


class CreateSongSchema(Schema):
    title: str = Field(example="AmongUS SUS Noises")
    author: str = Field(example="AmongUs Composer", default="Anonymous")
    song_url: str = Field(
        example="https://teasernsfw-dev.s3.ap-southeast-2.amazonaws.com/sus15.opus"
    )
