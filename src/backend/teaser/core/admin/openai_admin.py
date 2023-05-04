from django.contrib import admin
from core.models.openai_models import (
    OpenaiGeneratedImagesModel,
)


@admin.register(OpenaiGeneratedImagesModel)
class OpenaiGeneratedImagesModelAdmin(admin.ModelAdmin):
    """
    Generated images admin
    """

    list_display = ("request_id", "prompt", "url", "file_path")
