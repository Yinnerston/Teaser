"""
Models for events from the app and various metrics derived from the event.
"""
from core.models.user_auth_models import TeaserUserModel
from django.db import models


class EventMetricsModel(models.Model):
    """
    Event metrics taken to generate insights.
    Register / Login times, search histories, etc.
    """

    class EventMetricTypes(models.IntegerChoices):
        """
        Types of event metrics.
        """

        UNDEFINED = 0
        LOGIN = 1
        REGISTER = 2
        SEARCH = 3
        LIKE = 4
        BOOKMARK = 5
        SHARE = 6
        COMMENT = 7

    user_id = models.ForeignKey(TeaserUserModel, on_delete=models.CASCADE, null=True)
    event_type = models.IntegerField(
        choices=EventMetricTypes.choices, default=EventMetricTypes.UNDEFINED
    )
    event_data = models.JSONField()
    timestamp = models.DateTimeField(auto_now_add=True, blank=True)

    class Meta:
        indexes = [models.Index(fields=["event_type", "timestamp"])]
        ordering = ["event_type", "-timestamp"]
