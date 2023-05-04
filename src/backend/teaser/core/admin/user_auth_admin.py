from django.contrib import admin
from core.models.user_auth_models import TeaserUserModel, LocationsModel, AuthTokenModel


@admin.register(TeaserUserModel)
class TeaserUserModelAdmin(admin.ModelAdmin):
    """
    TeaserUserModel admin. 1:1 mapping to user
    """

    list_display = (
        "nfc_username",
        "phone_str",
        "dob_date",
        "user_id",
        "location_id",
    )


@admin.register(LocationsModel)
class LocationsModelAdmin(admin.ModelAdmin):
    """
    LocationsModel admin.
    """

    list_display = ("address", "country_code", "state", "city")


@admin.register(AuthTokenModel)
class AuthTokenModelAdmin(admin.ModelAdmin):
    """
    AuthTokenModel admin for user related authentication tokens.
    """

    def get_username(self, obj):
        if obj.teaser_user_id:
            return obj.teaser_user_id.nfc_username

    list_display = (
        "token_hash",
        "teaser_user_id",
        "get_username",
        "expiry_date",
        "created_date",
        "is_valid",
    )
    search_fields = ["teaser_user_id__nfc_username"]
