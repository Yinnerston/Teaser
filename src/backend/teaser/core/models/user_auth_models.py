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
    """

    user_model = models.OneToOneField(User, on_delete=models.CASCADE)
    phone = models.CharField(max_length=16)
    profile_photo_url = models.URLField()
    stage_name = models.CharField(max_length=64)
    dob = models.DateField()
    is_verified = models.BooleanField(default=False)
    location_id = models.ForeignKey(LocationsModel, on_delete=models.DO_NOTHING)
