from django.contrib import admin
from core.models.post_models import PostsModel, SongsModel, PostCategoriesModel


@admin.register(PostsModel)
class PostsModelAdmin(admin.ModelAdmin):
    list_display = [
        "description",
        "user_id",
        "song_id",
        "video_id",
        "video_url",
        "upload_url",
    ]


@admin.register(SongsModel)
class SongsModelAdmin(admin.ModelAdmin):
    pass


@admin.register(PostCategoriesModel)
class SongsModelAdmin(admin.ModelAdmin):
    pass
