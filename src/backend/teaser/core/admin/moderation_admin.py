from core.models.moderation_models import *
from django.contrib import admin


@admin.register(PostReportsModel)
class PostReportsModelAdmin(admin.ModelAdmin):
    """
    PostReportsModel admin.
    """

    def get_ordering(self, request):
        return ["-created_at"]

    list_display = ("post_id", "created_at")


@admin.register(CommentReportsModel)
class CommentReportsModelAdmin(admin.ModelAdmin):
    """
    CommentReportsModel admin.
    """

    def get_ordering(self, request):
        return ["-created_at"]

    list_display = ("comment_id", "created_at")
