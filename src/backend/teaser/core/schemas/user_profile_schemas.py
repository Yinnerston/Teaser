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
