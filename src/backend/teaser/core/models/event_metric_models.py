"""
Models for events from the app and various metrics derived from the event.
"""
from core.models.user_auth_models import TeaserUserModel
from django.db import models


class EventMetricsModel(models.Model):
    class EventMetricTypes(models.IntegerChoices):
        UNDEFINED = 0
        LOGIN = 1
        REGISTER = 2
        SEARCH = 3

    user_id = models.ForeignKey(TeaserUserModel, on_delete=models.CASCADE, null=True)
    event_type = models.IntegerField(
        choices=EventMetricTypes.choices, default=EventMetricTypes.UNDEFINED
    )
    event_data = models.JSONField()
    timestamp = models.DateTimeField(auto_now_add=True, blank=True)
