"""
Relationships between posts and users
"""
from core.models.user_auth_models import TeaserUserModel
from core.models.post_models import PostsModel
from django.db import models


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
        indexes = [models.Index(fields=["user_id", "post_id", "n_shares"])]


class CommentsModel(models.Model):
    """
    Comments model.
    """

    post_id = models.ForeignKey(PostsModel, on_delete=models.CASCADE)
    user_id = models.ForeignKey(TeaserUserModel, on_delete=models.CASCADE)
    comment_text = models.CharField(max_length=500)
    likes = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True, blank=True)
    updated_at = models.DateTimeField(auto_now_add=True, blank=True)

    class Meta:
        indexes = [models.Index(fields=["user_id", "post_id", "comment_text"])]


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
