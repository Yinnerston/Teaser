from django.contrib import admin
from core.models.post_models import PostsModel, SongsModel, PostCategoriesModel


@admin.register(PostsModel)
class PostsModelAdmin(admin.ModelAdmin):
    pass


@admin.register(SongsModel)
class SongsModelAdmin(admin.ModelAdmin):
    pass


@admin.register(PostCategoriesModel)
class SongsModelAdmin(admin.ModelAdmin):
    pass
