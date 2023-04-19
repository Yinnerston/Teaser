"""
Models for Post Object, and (Tags + Post Tags, Songs) that relate to a post.
"""
from core.models.user_auth_models import TeaserUserModel
from django.db import models
import uuid


class SongsModel(models.Model):
    """
    Song model.
    TODO: Add entry for no song.
    """

    title = models.CharField(max_length=100)
    song_url = models.URLField()
    duration = models.IntegerField(default=0)
    author = models.CharField(default="Anonymous", max_length=64)
    thumbnail = models.URLField(blank=True)
    original_url = models.URLField(
        help_text="Original url the song was downloaded from", blank=True
    )


class PostsModel(models.Model):
    """
    Posts model.
    Video and image URLs are contained in post_data
    """

    video_id = models.UUIDField(
        blank=True,
        null=True,
        editable=False,
        help_text="UUID used by bunny.net for categorizing videos",
    )
    description = models.CharField(max_length=200)
    is_private = models.BooleanField(default=False)
    user_id = models.ForeignKey(TeaserUserModel, on_delete=models.CASCADE)
    song_id = models.ForeignKey(
        SongsModel, on_delete=models.DO_NOTHING, blank=True, null=True
    )
    # ENUM {TEASER: 0, QUESTION: 1}
    post_type = models.IntegerField(default=0)
    post_data = models.JSONField(
        help_text="data: {urls, thumbnails, ...}, question: {question_text, voiceover_url}"
    )
    upload_url = models.URLField(default="")
    is_uploaded = models.BooleanField(default=False)


class TagsModel(models.Model):
    """
    Tags model for posts.
    """

    name = models.CharField(max_length=50, primary_key=True)


class PostTagsModel(models.Model):
    """
    Model for tags in a post.
    """

    post_id = models.ForeignKey(PostsModel, on_delete=models.CASCADE)
    tag_id = models.ForeignKey(TagsModel, on_delete=models.CASCADE)
