from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User
from core.models.user_auth_models import TeaserUserModel, LocationsModel

# TODO: Import this in admin --> Not in admin.py


# Inline descriptor for TeaserUser model
class TeaserUserInline(admin.StackedInline):
    model = TeaserUserModel
    can_delete = False
    verbose_name_plural = "teaser user"


# Define a new User admin
class UserAdmin(BaseUserAdmin):
    inlines = (TeaserUserInline,)


@admin.register(TeaserUserModel)
class TeaserUserModelAdmin(admin.ModelAdmin):
    pass


@admin.register(LocationsModel)
class LocationsModelAdmin(admin.ModelAdmin):
    pass


# Re-register UserAdmin
admin.site.unregister(User)
admin.site.register(User, UserAdmin)
