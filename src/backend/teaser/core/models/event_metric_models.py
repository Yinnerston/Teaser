"""
Models for events from the app and various metrics derived from the event.
"""
from core.models.user_auth_models import TeaserUserModel
from django.db import models


class EventMetricsTypeModel(models.Model):
    type = models.CharField(
        max_length=20,
        primary_key=True,
        help_text="Events created by a user: Clicks, watch, swipe right, etc..",
    )


class EventMetricsModel(models.Model):
    user_id = models.ForeignKey(TeaserUserModel, on_delete=models.CASCADE)
    event_type = models.ForeignKey(EventMetricsTypeModel, on_delete=models.DO_NOTHING)
    event_data = models.JSONField()
    timestamp = models.DateTimeField(auto_now_add=True, blank=True)
