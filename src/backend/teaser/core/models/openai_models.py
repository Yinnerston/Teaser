from django.db import models
import uuid


class OpenaiGeneratedImagesModel(models.Model):
    """
    Lookup table for types of post.
    """

    request_id = models.UUIDField(default=uuid.uuid4, db_index=True)
    prompt = models.CharField(max_length=500)
    url = models.URLField(max_length=500)
    file_path = models.URLField(max_length=500)  # TODO:
