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
class UserProfileModelAdmin(admin.ModelAdmin):
    """
    UserProfileModel admin
    """

    def get_username(self, obj):
        if obj.user_id:
            return obj.user_id.nfc_username

    list_display = ["user_id", "get_username", "description"]


@admin.register(UserCategoriesModel)
class UserCategoriesModelAdmin(admin.ModelAdmin):
    """
    UserCategoriesModel admin for intersection table between TeaserUserModel and CategoriesModel
    """

    def get_username(self, obj):
        if obj.user_id:
            return obj.user_id.nfc_username

    list_display = ["user_id", "get_username", "categories_id"]


@admin.register(CategoriesModel)
class CategoriesModelAdmin(admin.ModelAdmin):
    """
    CategoriesModel admin.
    """

    list_display = ["title", "alias"]
    ordering = ("alias",)
