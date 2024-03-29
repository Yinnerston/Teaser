from django.contrib import admin
from core.models.post_models import PostsModel, SongsModel, PostCategoriesModel


@admin.register(PostsModel)
class PostsModelAdmin(admin.ModelAdmin):
    """
    PostsModel admin with PostCategories
    """

    def get_username(self, obj):
        if obj.user_id:
            return obj.user_id.nfc_username

    def get_post_data_categories(self, obj):
        if obj.post_data:
            return obj.post_data["data"]["categories"]

    get_post_data_categories.admin_order_field = ""
    list_display = [
        "description",
        "user_id",
        "get_username",
        "get_post_data_categories",
        "song_id",
        "video_id",
        "video_url",
        "upload_url",
        "n_likes",
        "n_bookmarks",
        "n_shares",
        "n_comments",
    ]
    search_fields = [
        "description",
        "user_id__nfc_username",
        "postcategoriesmodel__category_id__title",
    ]


@admin.register(SongsModel)
class SongsModelAdmin(admin.ModelAdmin):
    """
    Songs model admin.
    """

    pass


@admin.register(PostCategoriesModel)
class PostCategoriesAdmin(admin.ModelAdmin):
    """
    PostCategories admin for intersection table between posts and categories.
    """

    def get_post_description(self, obj):
        if obj.post_id:
            return obj.post_id.description

    list_display = ["post_id", "get_post_description", "category_id"]
    search_fields = ["post_id__id", "category_id__title"]
