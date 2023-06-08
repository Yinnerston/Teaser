from core.models.user_post_relationship_models import (
    LikedPostsModel,
    BookmarkedPostsModel,
    SharedPostsModel,
    CommentsModel,
    CommentPathsModel,
    LikedCommentsModel,
    UserPostActivitiesModel,
)
from core.models.event_metric_models import EventMetricsModel
from core.models.post_models import PostsModel
from django.db import transaction
from django.db.models import Case, Value, When, F
import json
from datetime import datetime


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
            liked_post.updated_at = datetime.now()
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
            bookmarked_post.updated_at = datetime.now()
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


def get_post_comments_service(us_post_id: int):
    # TODO: Validate
    # TODO: Catch and return standardized error
    top_level_paths = (
        CommentPathsModel.objects.filter(post_id__id=us_post_id)
        .select_related("ancestor")
        .select_related("descendent")
        .select_related("descendent__user_id")
        .filter(descendent__depth=0)
    )
    # Already ordered by newest
    # ^ annotate so each field matches TopLevelPostCommentsResponseSchema
    return top_level_paths.values(
        comment_id=F("descendent__id"),
        username=F("descendent__user_id__nfc_username"),
        profile_photo_url=F("descendent__user_id__profile_photo_url"),
        comment_text=F("descendent__comment_text"),
        n_likes=F("descendent__n_likes"),
        created_at=F("descendent__created_at"),
        updated_at=F("descendent__updated_at"),
        has_replies=F("descendent__has_replies"),
        depth=F("descendent__depth"),
    ).all()


def get_post_comment_replies_service(us_post_id: int, us_comment_id: int):
    parent_comment = CommentsModel.objects.get(id=us_comment_id)
    comment_replies = top_level_paths = CommentPathsModel.objects.filter(
        post_id__id=us_post_id, ancestor=parent_comment
    )
    pass
    # What processing and format can I return comments in to load them on my frontend?


def comment_on_post_service(
    s_teaser_user,
    us_post_id: int,
    s_comment_text: str,
    us_comment_ancestor_id: int = None,
):
    parent_comment = None
    new_comment_model = None
    ancestor_paths = []
    with transaction.atomic():
        # Get related post and create new comment model
        post_model = PostsModel.objects.get(id=us_post_id)
        # Get all descendents of the parent and insert
        if us_comment_ancestor_id != None:
            parent_comment = CommentsModel.objects.get(id=us_comment_ancestor_id)
            ancestor_paths = CommentPathsModel.objects.filter(
                post_id=post_model, ancestor__id=us_comment_ancestor_id
            )
        # Create new comment and specify depth if the comment has a parent
        if parent_comment:
            # TODO: Set parent_comment.has_replies?
            # add ^ to response schema
            new_comment_model = CommentsModel.objects.create(
                post_id=post_model,
                user_id=s_teaser_user,
                comment_text=s_comment_text,
                depth=parent_comment.depth + 1,
            )
        else:
            new_comment_model = CommentsModel.objects.create(
                post_id=post_model, user_id=s_teaser_user, comment_text=s_comment_text
            )
        # insert self-referencing new leaf comment path node
        CommentPathsModel.objects.create(
            post_id=post_model, ancestor=new_comment_model, descendent=new_comment_model
        )
        post_model.n_comments += 1
        post_model.save()
        # Create a relationship with all ancestor_paths including the immediate parent
        for ancestor_path in ancestor_paths:
            ancestor_path.descendent.has_replies = True
            ancestor_path.descendent.save()
            CommentPathsModel.objects.create(
                post_id=post_model,
                ancestor=ancestor_path.descendent,
                descendent=new_comment_model,
            )
    return {"comment_id": new_comment_model.id}


def like_post_comment_service(s_teaser_user, us_comment_id):
    # TODO: validate comment_id?
    # Upsert liked post
    with transaction.atomic():
        comment_model = CommentsModel.objects.get(id=us_comment_id)
        liked_comment, created = LikedCommentsModel.objects.update_or_create(
            user_id=s_teaser_user, comment_id=comment_model
        )

        if created:
            # Increment likes
            comment_model.n_likes = comment_model.n_likes + 1
        else:
            liked_comment.is_liked = not liked_comment.is_liked
            liked_comment.updated_at = datetime.now()
            liked_comment.save()
            # Increment or decrement based on liked_post.is_liked
            if liked_comment.is_liked:
                comment_model.n_likes += 1
            else:
                # decrement likes
                comment_model.n_likes = max(comment_model.n_likes - 1, 0)
        comment_model.save()
    # Record metric ()
    EventMetricsModel.objects.create(
        event_type=EventMetricsModel.EventMetricTypes.COMMENT_LIKE,
        event_data=json.loads(
            '{"comment_id": "%s", "is_liked": "%r"}'
            % (us_comment_id, liked_comment.is_liked)
        ),
        user_id=s_teaser_user,
    )
    return {"liked_comment": liked_comment.is_liked, "created": created}
