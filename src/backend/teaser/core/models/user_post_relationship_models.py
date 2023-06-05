"""
Relationships between posts and users
"""
from core.models.user_auth_models import TeaserUserModel
from core.models.post_models import PostsModel
from django.db import models
from core.utils.config_data import (
    get_or_create_sentinel_post_data,
    get_or_create_sentinel_post_data_id,
)


class LikedPostsModel(models.Model):
    """
    Liked posts model.
    """

    user_id = models.ForeignKey(TeaserUserModel, on_delete=models.CASCADE)
    post_id = models.ForeignKey(PostsModel, on_delete=models.CASCADE)
    is_liked = models.BooleanField(default=True)
    updated_at = models.DateTimeField(auto_now_add=True, blank=True)

    class Meta:
        unique_together = (("user_id", "post_id"),)
        indexes = [models.Index(fields=["user_id", "post_id", "is_liked"])]


class BookmarkedPostsModel(models.Model):
    """
    Bookmarked posts model.
    """

    user_id = models.ForeignKey(TeaserUserModel, on_delete=models.CASCADE)
    post_id = models.ForeignKey(PostsModel, on_delete=models.CASCADE)
    is_bookmarked = models.BooleanField(default=True)
    updated_at = models.DateTimeField(auto_now_add=True, blank=True)

    class Meta:
        unique_together = (("user_id", "post_id"),)
        indexes = [models.Index(fields=["user_id", "post_id", "is_bookmarked"])]


class SharedPostsModel(models.Model):
    """
    Shared posts model.
    TODO: Going to change this instead of counting the number of shares,
    to instead return the information used on the share post screen
    """

    user_id = models.ForeignKey(TeaserUserModel, on_delete=models.CASCADE)
    post_id = models.ForeignKey(PostsModel, on_delete=models.CASCADE)
    n_shares = models.PositiveIntegerField(default=0)
    updated_at = models.DateTimeField(auto_now_add=True, blank=True)

    class Meta:
        unique_together = (("user_id", "post_id"),)
        indexes = [models.Index(fields=["user_id", "post_id"])]


class CommentsModel(models.Model):
    """
    Comments model.
    Searching on comments is not supported.
    Supports query for most recent comments on a post, most liked comments on a post.
    Rankings are done based on this model.
    """

    post_id = models.ForeignKey(
        PostsModel, on_delete=models.CASCADE
    )  # TODO: may not be required
    user_id = models.ForeignKey(TeaserUserModel, on_delete=models.CASCADE)
    comment_text = models.CharField(max_length=500)
    n_likes = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True, blank=True)
    updated_at = models.DateTimeField(auto_now_add=True, blank=True)
    depth = models.PositiveIntegerField(default=0)

    class Meta:
        """
        TODO: Define functional index constraints that only apply where depth=0
        """

        ordering = [
            "post_id",
            "depth",
            "-created_at",
        ]  # defaults to sort by most recent
        indexes = [
            models.Index(fields=["post_id", "n_likes"]),  # used to sort by likes
            models.Index(fields=["user_id", "post_id"]),  # used to sort by user
            models.Index(
                fields=["post_id", "-created_at"]
            ),  # used to sort by most recent
            models.Index(fields=["post_id", "depth"]),  # sort by depth
        ]


class CommentPathsModel(models.Model):
    """
    Closure Table model for comments.
    In a closure table, each insert creates two rows:
    1. Store one row in the table for each pair of nodes that shares an ancestor/descendent relationship
    2. Store a row for each node to reference itself (ancestor = descendent)
    Query depth through CommentPathsModel.objects.filter()
    We trade off storage space for faster queries.
    """

    post_id = models.ForeignKey(
        PostsModel,
        on_delete=models.SET(get_or_create_sentinel_post_data),
        default=get_or_create_sentinel_post_data_id,
    )  # get_or_create_sentinel_post_data
    ancestor = models.ForeignKey(
        CommentsModel, on_delete=models.DO_NOTHING, null=True, related_name="ancestor"
    )
    descendent = models.ForeignKey(
        CommentsModel, on_delete=models.DO_NOTHING, null=True, related_name="descendent"
    )

    class Meta:
        ordering = [
            "post_id",
            "ancestor",
        ]  # TODO: post_id, ancestor=null || depth=0, -ranking
        unique_together = (("post_id", "ancestor", "descendent"),)
        indexes = [
            # composite index --> can query by parts as fields are covered by index
            models.Index(fields=["post_id", "ancestor", "descendent"])
        ]


class LikedCommentsModel(models.Model):
    """
    Liked comments model.
    """

    user_id = models.ForeignKey(TeaserUserModel, on_delete=models.DO_NOTHING)
    comment_id = models.ForeignKey(CommentsModel, on_delete=models.DO_NOTHING)
    is_liked = models.BooleanField(default=True)
    updated_at = models.DateTimeField(auto_now_add=True, blank=True)

    class Meta:
        unique_together = (("user_id", "comment_id"),)
        indexes = [models.Index(fields=["user_id", "comment_id", "is_liked"])]


class UserPostActivitiesModel(models.Model):
    """
    Denormalized data model showing the user's engagement with a post in the main feed.
    I.E. Editor Sidebar will show if a user liked, bookmarked or shared a post based on this model.
    Avoids keyless entry antipatterns through nullable foreign key constraints.
    """

    user_id = models.ForeignKey(TeaserUserModel, on_delete=models.CASCADE)
    post_id = models.ForeignKey(PostsModel, on_delete=models.CASCADE)
    liked_post = models.ForeignKey(
        LikedPostsModel, on_delete=models.SET_NULL, null=True, blank=True
    )
    bookmarked_post = models.ForeignKey(
        BookmarkedPostsModel, on_delete=models.SET_NULL, null=True, blank=True
    )
    shared_post = models.ForeignKey(
        SharedPostsModel, on_delete=models.SET_NULL, null=True, blank=True
    )

    class Meta:
        unique_together = (("user_id", "post_id"),)
        indexes = [models.Index(fields=["user_id", "post_id"])]
