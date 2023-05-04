from django.contrib import admin
from core.models.event_metric_models import EventMetricsModel, EventMetricsTypeModel


@admin.register(EventMetricsModel)
class EventMetricsModelAdmin(admin.ModelAdmin):
    """
    Event metrics admin.
    """

    def get_username(self, obj):
        if obj.user_id:
            return obj.user_id.nfc_username

    list_display = ("event_type", "event_data", "timestamp", "user_id", "get_username")


@admin.register(EventMetricsTypeModel)
class EventMetricsTypeModelAdmin(admin.ModelAdmin):
    """
    Admin for type of event metric
    """

    list_display = ("type",)
