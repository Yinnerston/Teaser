from ninja import Schema, Field


class CreatePostSchema(Schema):
    """
    Schema for TeaserUser in /api/v1/register endpoint.
    """

    description: str = Field(example="testuser1")
    is_private: bool = Field(example=False)
    song_id: int = Field(example=1)
    post_type: int = Field(example=0, description="ENUM {TEASER: 0, QUESTION: 1}")
    post_data: dict = Field(default={"data": {}, "question": {}})


class CreateSongSchema(Schema):
    title: str = Field(example="AmongUS SUS Noises")
    author: str = Field(example="AmongUs Composer", default="Anonymous")
    song_url: str = Field(
        example="https://teasernsfw-dev.s3.ap-southeast-2.amazonaws.com/sus15.opus"
    )
