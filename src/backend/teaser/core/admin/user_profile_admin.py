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
class PostsModelAdmin(admin.ModelAdmin):
    pass


@admin.register(CategoriesModel)
class SongsModelAdmin(admin.ModelAdmin):
    pass
