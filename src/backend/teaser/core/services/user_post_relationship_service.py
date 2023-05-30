from core.models.user_post_relationship_models import (
    LikedPostsModel,
    BookmarkedPostsModel,
    SharedPostsModel,
    UserPostActivitiesModel,
)
from core.models.event_metric_models import EventMetricsModel
from core.models.post_models import PostsModel
from django.db import transaction
from django.db.models import Case, Value, When, F
import json


def like_post_service(s_teaser_user, us_post_id):
    # TODO: validate post_id?
    # Upsert liked post
    with transaction.atomic():
        post_model = PostsModel.objects.get(id=us_post_id)
        liked_post, created = LikedPostsModel.objects.update_or_create(
            user_id=s_teaser_user, post_id=post_model
        )
        (
            user_post_activity,
            _user_post_activity_created,
        ) = UserPostActivitiesModel.objects.get_or_create(
            user_id=s_teaser_user, post_id=post_model
        )

        if created:
            # Increment likes
            post_model.n_likes = post_model.n_likes + 1
            user_post_activity.liked_post = liked_post
        else:
            liked_post.is_liked = not liked_post.is_liked
            liked_post.save()
            # Increment or decrement based on liked_post.is_liked
            if liked_post.is_liked:
                post_model.n_likes += 1
                user_post_activity.liked_post = liked_post
            else:
                # decrement likes and remove UserPostActivitiesModel
                post_model.n_likes = max(post_model.n_likes - 1, 0)
                user_post_activity.liked_post = None
        user_post_activity.save()
        post_model.save()
    # Record metric ()
    EventMetricsModel.objects.create(
        event_type=EventMetricsModel.EventMetricTypes.LIKE,
        event_data=json.loads(
            '{"post_id": "%s", "is_liked": "%r"}' % (us_post_id, liked_post.is_liked)
        ),
        user_id=s_teaser_user,
    )
    return {"liked_post": liked_post.is_liked, "created": created}


def bookmark_post_service(s_teaser_user, us_post_id):
    # TODO: validate post_id?
    # Upsert bookmarked post
    with transaction.atomic():
        post_model = PostsModel.objects.get(id=us_post_id)
        bookmarked_post, created = BookmarkedPostsModel.objects.update_or_create(
            user_id=s_teaser_user, post_id=post_model
        )
        (
            user_post_activity,
            _user_post_activity_created,
        ) = UserPostActivitiesModel.objects.get_or_create(
            user_id=s_teaser_user, post_id=post_model
        )

        if created:
            # Increment bookmarks
            post_model.n_bookmarks = post_model.n_bookmarks + 1
            user_post_activity.bookmarked_post = bookmarked_post
        else:
            bookmarked_post.is_bookmarked = not bookmarked_post.is_bookmarked
            bookmarked_post.save()
            # Increment or decrement based on bookmarked_post.is_bookmarked
            if bookmarked_post.is_bookmarked:
                post_model.n_bookmarks += 1
                user_post_activity.bookmarked_post = bookmarked_post
            else:
                # decrement bookmarks and remove UserPostActivitiesModel
                post_model.n_bookmarks = max(post_model.n_bookmarks - 1, 0)
                user_post_activity.bookmarked_post = None
        user_post_activity.save()
        post_model.save()
    # Record metric ()
    EventMetricsModel.objects.create(
        event_type=EventMetricsModel.EventMetricTypes.BOOKMARK,
        event_data=json.loads(
            '{"post_id": "%s", "is_bookmarked": "%r"}'
            % (us_post_id, bookmarked_post.is_bookmarked)
        ),
        user_id=s_teaser_user,
    )
    return {"bookmarked_post": bookmarked_post.is_bookmarked, "created": created}