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
    list_display = ["user_id", "description"]


@admin.register(UserCategoriesModel)
class UserCategoriesAdmin(admin.ModelAdmin):
    list_display = ["user_id", "categories_id"]


@admin.register(CategoriesModel)
class CategoriesAdmin(admin.ModelAdmin):
    list_display = ["title", "alias"]
    ordering = ("alias",)
