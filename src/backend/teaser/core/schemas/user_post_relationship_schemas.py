from ninja import Schema, Field


class UserPostActivitySchema(Schema):
    post_id: int = Field(example=1)
