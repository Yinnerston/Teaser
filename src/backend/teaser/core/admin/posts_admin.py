from django.contrib import admin
from core.models.post_models import PostsModel, SongsModel


@admin.register(PostsModel)
class PostsModelAdmin(admin.ModelAdmin):
    pass


@admin.register(SongsModel)
class SongsModelAdmin(admin.ModelAdmin):
    pass
