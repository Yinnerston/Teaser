from typing import Optional
from ninja import Schema, Field
from datetime import datetime


class UserPostActivitySchema(Schema):
    """
    Schema for creating a post activity.
    """

    post_id: int = Field(example=1)


class TopLevelPostCommentsResponseSchema(Schema):
    """
    Schema returned by top level post comments endpoint.
    """

    comment_id: int = Field(example=1)
    username: str = Field(example="Yinnerston")
    profile_photo_url: str = Field(
        example="https://avatars.githubusercontent.com/u/57548788?v=4"
    )
    comment_text: str = Field(example="This is a comment.")
    n_likes: int = Field(example=0)
    created_at: datetime = Field(example="")
    updated_at: datetime = Field(example="")
    has_replies: bool = Field(example=False)
    depth: int = Field(example=0)


class UserPostCommentSchema(Schema):
    """
    Schema for creating a comment.
    """

    post_id: int = Field(example=1)
    comment_ancestor_id: Optional[int] = Field(example=1, default=None)
    comment_text: str = Field(example="This is a comment")


class UserPostCommentResponseSchema(Schema):
    """
    Response schema to post comment, used to confirm comments were posted
    """

    comment_id: int = Field(example=1)


class LikePostCommentSchema(Schema):
    """
    Schema for liking a comment.
    """

    comment_id: int = Field(example=1)
