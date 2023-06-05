from ninja import Schema, Field


class SearchSuggestionSchema(Schema):
    suggestion: str = Field(example="Funny")
    is_hot: bool = Field(example=False)
    is_trending: bool = Field(example=False)


class SearchResultSchema(Schema):
    # Caption data / Author fields
    post_id: str = Field(example="uuid4")
    description: str = Field(example="Some Post")
    username: str = Field("testuser1")
    profile_photo_url: str = Field(
        example="https://teasernsfw-dev.s3.ap-southeast-2.amazonaws.com/amogus.png"
    )
    # Video data
    video_url: str = Field(example="https://i.imgur.com/xaAAjDk.mp4")
    thumbnail_url: str = Field(
        example="https://teasernsfw-dev.s3.ap-southeast-2.amazonaws.com/amogus.png"
    )
    video_mode: int = Field(example=0, description="Portrait=0, Landscape=1")
    # sidebar fields
    n_likes: int = Field(example=30)
    n_bookmarks: int = Field(example=20)
    n_shares: int = Field(example=10)
    n_comments: int = Field(example=5)
