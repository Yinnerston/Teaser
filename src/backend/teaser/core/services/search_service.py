from core.models.post_models import PostsModel
from core.models.event_metric_models import EventMetricsModel
from django.contrib.postgres.search import SearchVector, SearchQuery, SearchRank
from django.db.models import F
from core.utils.search_validator import validate_query_str
from django.db.models import CharField
from django.db.models.functions import Cast
import json


def search_posts_suggestions_service(query_str):
    return [
        {"suggestion": "Amateur", "is_hot": True, "is_trending": True},
        {"suggestion": "Roleplay", "is_hot": False, "is_trending": True},
        {"suggestion": "Lesbian", "is_hot": True, "is_trending": False},
        {"suggestion": "Group", "is_hot": False, "is_trending": False},
        {"suggestion": "Anal", "is_hot": True, "is_trending": False},
        {"suggestion": "Social Media", "is_hot": False, "is_trending": False},
        {"suggestion": "Romantic", "is_hot": False, "is_trending": False},
        {"suggestion": "MILF", "is_hot": True, "is_trending": False},
    ]


def search_posts_results_service(s_query_str):
    s_query_str = validate_query_str(s_query_str)
    # TODO: SearchVector doesn't consider category aliases
    search_vector = SearchVector(
        "description", "nfc_username", Cast("post_data__data__categories", CharField())
    )
    search_query = SearchQuery(s_query_str, search_type="websearch")
    # TODO: is search_vector_idx being used correctly here?
    # Create event metric for search
    EventMetricsModel.objects.create(
        event_type=EventMetricsModel.EventMetricTypes.SEARCH,
        event_data={"query_str": s_query_str},
    )
    # TODO: https://stackoverflow.com/a/46303264 weighted search vector?
    return (
        PostsModel.objects.annotate(search=search_vector)
        .filter(search=search_query)
        .annotate(rank=SearchRank(search_vector, search_query))
        .order_by("-rank")
        .select_related("user_id")
        .values(
            "description",
            "video_url",
            "thumbnail_url",
            "video_mode",
            "post_data",
            "reddit_score",
            "user_id",
            post_id=F("id"),
            username=F("user_id__nfc_username"),
            stage_name=F("user_id__stage_name"),  #
            profile_photo_url=F("user_id__profile_photo_url"),  #
        )
        .all()
    )
