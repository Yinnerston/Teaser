from django.contrib import admin
from core.models.event_metric_models import EventMetricsModel


@admin.register(EventMetricsModel)
class EventMetricsModelAdmin(admin.ModelAdmin):
    """
    Event metrics admin.
    """

    def get_username(self, obj):
        if obj.user_id:
            return obj.user_id.nfc_username

    def get_ordering(self, request):
        return ["-timestamp"]

    list_display = ("event_type", "event_data", "timestamp", "user_id", "get_username")
