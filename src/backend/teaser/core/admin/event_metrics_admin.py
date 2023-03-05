from django.contrib import admin
from core.models.event_metric_models import EventMetricsModel, EventMetricsTypeModel


@admin.register(EventMetricsModel)
class EventMetricsModelAdmin(admin.ModelAdmin):
    list_display = ("event_type", "event_data", "timestamp", "user_id")


@admin.register(EventMetricsTypeModel)
class EventMetricsTypeModelAdmin(admin.ModelAdmin):
    list_display = ("type",)
