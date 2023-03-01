"""
Models for Comments on a post.
Represented by a Closure Table.
"""
from core.models.user_auth_models import TeaserUserModel
from core.models.post_models import PostsModel
from django.db import models


class CommentsModel(models.Model):
    """
    Comments model.
    """

    post_id = models.ForeignKey(PostsModel, on_delete=models.CASCADE)
    user_id = models.ForeignKey(TeaserUserModel, on_delete=models.CASCADE)
    comment_text = models.CharField(max_length=500)
    likes = models.PositiveIntegerField(default=0)


class CommentPathsModel(models.Model):
    """
    Closure Table model for comments.
    Query depth through CommentPathsModel.objects.filter()
    """

    ancestor = models.OneToOneField(
        CommentsModel, on_delete=models.DO_NOTHING, null=True, related_name="ancestor"
    )
    descendent = models.OneToOneField(
        CommentsModel, on_delete=models.DO_NOTHING, null=True, related_name="descendent"
    )
    depth = models.PositiveIntegerField(default=0)
