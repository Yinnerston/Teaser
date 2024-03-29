"""
Models for Post Object, and (Tags + Post Tags, Songs) that relate to a post.
"""
from core.models.user_auth_models import TeaserUserModel
from core.models.user_profile_models import CategoriesModel
from django.db import models
import uuid
from django.utils.timezone import now
from django.contrib.postgres.indexes import GinIndex
from django.contrib.postgres.search import SearchVector
from django.db.models.functions import Cast


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

    class Meta:
        indexes = [models.Index(fields=["title", "author"])]


# class PostModelsManager(models.Manager):
#     def bias_vanilla(self, *args, **kwargs):
#         qs = self.get_query_set().filter(*args, **kwargs)
#         return sorted(qs, key=lambda n: ())


class PostsModel(models.Model):
    """
    Posts model.
    Video and image URLs are contained in post_data
    """

    class PostStatuses(models.IntegerChoices):
        """
        Statuses from https://docs.bunny.net/docs/stream-webhook
        """

        NOT_STARTED = -1
        QUEUED = 0
        PROCESSING = 1
        ENCODING = 2
        FINISHED = 3
        RESOLUTION_FINISHED = 4
        FAILED = 5
        PRESIGNED_UPLOAD_STARTED = 6
        PRESIGNED_UPLOAD_FINISHED = 7
        PRESIGNED_UPLOAD_FAILED = 8

    class PostTypes(models.IntegerChoices):
        TEASER_TYPE = 0
        Q_AND_A_TYPE = 1

    class VideoModes(models.IntegerChoices):
        PORTRAIT = 0
        LANDSCAPE = 1

    # objects = PostModelsManager()

    video_id = models.UUIDField(
        blank=True,
        null=True,
        help_text="UUID used by bunny.net for categorizing videos",
    )
    description = models.CharField(max_length=200)
    is_pinned = models.BooleanField(default=False)
    is_nsfw = models.BooleanField(default=True)
    is_private = models.BooleanField(default=False)
    has_comments = models.BooleanField(default=True)
    user_id = models.ForeignKey(TeaserUserModel, on_delete=models.CASCADE)
    nfc_username = models.CharField(
        max_length=32, null=True
    )  # denormalised nfc_username field from user_id for gin index
    song_id = models.ForeignKey(
        SongsModel, on_delete=models.DO_NOTHING, blank=True, null=True
    )
    # ENUM {TEASER: 0, QUESTION: 1}
    post_type = models.IntegerField(
        choices=PostTypes.choices, default=PostTypes.TEASER_TYPE
    )
    post_data = models.JSONField(
        help_text="data: {urls, categories, thumbnails, ...}, question: {question_text, voiceover_url}"
    )
    upload_url = models.URLField(default="")
    video_url = models.URLField(default="")
    thumbnail_url = models.URLField(default="")
    video_mode = models.IntegerField(
        choices=VideoModes.choices, default=VideoModes.PORTRAIT
    )

    status = models.IntegerField(choices=PostStatuses.choices, default=-1)
    created_at = models.DateTimeField(auto_now_add=True, blank=True)
    reddit_id = models.CharField(
        max_length=8, blank=True, null=True
    )  # marked to be deprecated
    n_likes = models.PositiveIntegerField(default=0)
    n_bookmarks = models.PositiveIntegerField(default=0)
    n_shares = models.PositiveIntegerField(default=0)
    n_comments = models.PositiveIntegerField(default=0)

    class Meta:
        indexes = [
            models.Index(fields=["status"]),
            models.Index(fields=["video_id"]),
            models.Index(fields=["description"]),
            models.Index(fields=["is_nsfw"]),
            GinIndex(
                # GIN index on description, #tags, username and category
                SearchVector(
                    "description",
                    "nfc_username",
                    Cast("post_data__data__categories", models.CharField()),
                    config="english",
                ),
                name="search_vector_idx",
            ),  # TODO: What if post_data__data__categories, description or nfc_username changes? Will the model update?
        ]
        ordering = ("status", "-created_at")


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


class PostCategoriesModel(models.Model):
    """
    Model for categories in a post.
    """

    post_id = models.ForeignKey(PostsModel, on_delete=models.CASCADE)
    category_id = models.ForeignKey(CategoriesModel, on_delete=models.CASCADE)
