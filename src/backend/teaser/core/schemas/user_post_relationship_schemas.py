from typing import Optional
from ninja import Schema, Field


class UserPostActivitySchema(Schema):
    """
    Schema for creating a post activity.
    """

    post_id: int = Field(example=1)


class UserPostCommentSchema(Schema):
    """
    Schema for creating a comment.
    """

    post_id: int = Field(example=1)
    comment_ancestor_id: Optional[int] = Field(example=1, default=None)
    comment_text: str = Field(example="This is a comment")
