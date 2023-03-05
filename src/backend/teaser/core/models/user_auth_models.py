"""
Models for the user, and the related categories.
"""
from django.contrib.auth.models import User
from django.db import models


class LocationsModel(models.Model):
    """
    Location model.
    """

    address = models.CharField(max_length=300)
    country_code = models.CharField(max_length=3)
    state = models.CharField(max_length=30)
    city = models.CharField(max_length=30)


class TeaserUserModel(models.Model):
    """
    Teaser User model.
    TODO: Define some indexes to improve performance?
    """

    user_model = models.OneToOneField(User, on_delete=models.CASCADE)
    nfc_username = models.CharField(max_length=32)
    nfc_email_address = models.CharField(max_length=255)
    phone_str = models.CharField(max_length=16)
    profile_photo_url = models.URLField(default="", blank=True)
    stage_name = models.CharField(max_length=64, default="", blank=True)
    dob_date = models.DateField()
    is_verified = models.BooleanField(default=False)
    location_id = models.ForeignKey(
        LocationsModel, on_delete=models.DO_NOTHING, null=True, blank=True
    )
    terms_of_service_accepted = models.BooleanField(default=False)
