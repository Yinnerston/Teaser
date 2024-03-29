"""
Models for the user, and the related categories.
"""
from django.contrib.auth.models import User
from django.db import models
from datetime import datetime
from django.db.models.signals import post_save, post_init


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

    user_id = models.OneToOneField(User, on_delete=models.CASCADE)
    nfc_username = models.CharField(
        max_length=32
    )  # TODO: on change, change PostsModel denormalized nfc_username
    phone_str = models.CharField(max_length=16)
    profile_photo_url = models.URLField(
        default="http://teasernsfw.b-cdn.net/teaser-32x32.png", blank=True
    )
    stage_name = models.CharField(max_length=64, default="", blank=True)
    dob_date = models.DateField()
    is_verified = models.BooleanField(default=False)
    location_id = models.ForeignKey(
        LocationsModel, on_delete=models.DO_NOTHING, null=True, blank=True
    )
    terms_of_service_accepted = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True, blank=True)


class AuthTokenModel(models.Model):
    teaser_user_id = models.ForeignKey(
        TeaserUserModel, on_delete=models.CASCADE, db_index=True
    )
    token_hash = models.CharField(max_length=32, primary_key=True)
    expiry_date = models.DateTimeField()
    created_date = models.DateTimeField(auto_now_add=True)
    is_valid = models.BooleanField(default=True)
