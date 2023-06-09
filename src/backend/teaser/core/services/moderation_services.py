from core.models.moderation_models import PostReportsModel, CommentReportsModel
from core.models.post_models import PostsModel
from core.models.user_post_relationship_models import CommentsModel
from django.db import transaction


def report_post_service(us_post_id: int):
    # TODO: Add more report features
    with transaction.atomic():
        post_to_report = PostsModel.objects.get(id=us_post_id)
        PostReportsModel.objects.create(post_id=post_to_report)


def report_comment_service(us_comment_id: int):
    with transaction.atomic():
        comment_to_report = CommentsModel.objects.get(id=us_comment_id)
        CommentReportsModel.objects.create(comment_id=comment_to_report)
