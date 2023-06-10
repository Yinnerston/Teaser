from django.db import models
from core.models.post_models import PostsModel
from core.models.user_post_relationship_models import CommentsModel


class PostReportsModel(models.Model):
    """
    Data model for reports on a post.
    TODO: Add descriptive features of a report
    """

    post_id = models.ForeignKey(CommentsModel, on_delete=models.SET_NULL, null=True)
    created_at = models.DateTimeField(auto_now_add=True, blank=True)


class CommentReportsModel(models.Model):
    """
    Data model for reports on a comment.
    TODO: Add descriptive features of a report
    """

    comment_id = models.ForeignKey(CommentsModel, on_delete=models.SET_NULL, null=True)
    created_at = models.DateTimeField(auto_now_add=True, blank=True)
