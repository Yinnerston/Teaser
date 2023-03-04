from django.contrib import admin
from core.models.user_auth_models import TeaserUserModel, LocationsModel


@admin.register(TeaserUserModel)
class TeaserUserModelAdmin(admin.ModelAdmin):
    list_display = (
        "nfc_username",
        "nfc_email_address",
        "phone_str",
        "dob_date",
        "user_model",
        "location_id",
    )


@admin.register(LocationsModel)
class LocationsModelAdmin(admin.ModelAdmin):
    list_display = ("address", "country_code", "state", "city")
