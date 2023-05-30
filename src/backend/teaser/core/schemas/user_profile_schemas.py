from ninja import Schema, Field


class GetUserProfileSchema(Schema):
    display_name: str = Field(example="FirstName LastName")
    username: str = Field(example="testuser1")
    description: str = Field("Your profile's bio!")
    profile_photo_url: str = Field(
        "https://teasernsfw-dev.s3.ap-southeast-2.amazonaws.com/amogus.png"
    )
    n_following: int = Field(example=0)
    n_followers: int = Field(example=0)
    n_likes: int = Field(example=0)


class CreateUserCategorySchema(Schema):
    categories: list = Field(example=["Amateur", "Fitness"])


class ProfileFeedResponseSchema(Schema):
    """
    Output schema of /posts/feed
    """

    # Caption data / Author fields
    id: str = Field(example="uuid4")
    is_pinned: bool = Field(example=False)
    description: str = Field(example="Some Post")
    # Video data
    video_url: str = Field(example="https://i.imgur.com/xaAAjDk.mp4")
    thumbnail_url: str = Field(
        example="https://teasernsfw-dev.s3.ap-southeast-2.amazonaws.com/amogus.png"
    )
    post_data: dict = Field(example={})
    video_mode: int = Field(example=0, description="Portrait=0, Landscape=1")
    # sidebar fields
    n_likes: int = Field(example=30)
