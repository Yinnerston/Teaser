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
    created_at = models.DateTimeField(auto_now_add=True, blank=True)


class BookmarkedPostsModel(models.Model):
    """
    Bookmarked posts model.
    """

    user_id = models.ForeignKey(TeaserUserModel, on_delete=models.CASCADE)
    post_id = models.ForeignKey(PostsModel, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True, blank=True)
