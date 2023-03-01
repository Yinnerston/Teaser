from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User
from core.models.user_auth_models import TeaserUser


# Inline descriptor for TeaserUser model
class TeaserUserInline(admin.StackedInline):
    model = TeaserUser
    can_delete = False
    verbose_name_plural = "teaser user"


# Define a new User admin
class UserAdmin(BaseUserAdmin):
    inlines = (TeaserUserInline,)


# Re-register UserAdmin
admin.site.unregister(User)
admin.site.register(User, UserAdmin)
