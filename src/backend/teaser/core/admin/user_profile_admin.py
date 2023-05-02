from core.models.user_profile_models import (
    UserProfileModel,
    CategoriesModel,
    UserCategoriesModel,
    ProfileLinkTypesModel,
    ProfileLinksModel,
    ServicesModel,
    PurchasesModel,
)
from django.contrib import admin


@admin.register(UserProfileModel)
class UserProfileAdmin(admin.ModelAdmin):
    def get_username(self, obj):
        if obj.user_id:
            return obj.user_id.nfc_username

    list_display = ["user_id", "get_username", "description"]


@admin.register(UserCategoriesModel)
class UserCategoriesAdmin(admin.ModelAdmin):
    def get_username(self, obj):
        if obj.user_id:
            return obj.user_id.nfc_username

    list_display = ["user_id", "get_username", "categories_id"]


@admin.register(CategoriesModel)
class CategoriesAdmin(admin.ModelAdmin):
    list_display = ["title", "alias"]
    ordering = ("alias",)
