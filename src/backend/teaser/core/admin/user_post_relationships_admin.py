from django.contrib import admin
from core.models.user_post_relationship_models import (
    LikedPostsModel,
    BookmarkedPostsModel,
    SharedPostsModel,
    UserPostActivitiesModel,
)


@admin.register(LikedPostsModel)
class LikedPostsModelAdmin(admin.ModelAdmin):
    def get_username(self, obj):
        if obj.user_id:
            return obj.user_id.nfc_username

    def get_ordering(self, request):
        return ["-updated_at"]

    list_display = ["user_id", "post_id", "get_username", "is_liked", "updated_at"]


@admin.register(BookmarkedPostsModel)
class BookmarkedPostsModelAdmin(admin.ModelAdmin):
    def get_username(self, obj):
        if obj.user_id:
            return obj.user_id.nfc_username

    def get_ordering(self, request):
        return ["-updated_at"]

    list_display = ["user_id", "post_id", "get_username", "is_bookmarked", "updated_at"]


@admin.register(SharedPostsModel)
class SharedPostsModelAdmin(admin.ModelAdmin):
    def get_username(self, obj):
        if obj.user_id:
            return obj.user_id.nfc_username

    def get_ordering(self, request):
        return ["-updated_at"]

    list_display = ["user_id", "post_id", "get_username", "n_shares", "updated_at"]


@admin.register(UserPostActivitiesModel)
class UserPostActivitiesModelAdmin(admin.ModelAdmin):
    def get_username(self, obj):
        if obj.user_id:
            return obj.user_id.nfc_username

    list_display = [
        "user_id",
        "post_id",
        "liked_post",
        "bookmarked_post",
        "shared_post",
    ]
