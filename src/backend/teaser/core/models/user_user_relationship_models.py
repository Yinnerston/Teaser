"""
Models relating to relationships between two users.
Following, Blocked, subscriptions made to another user and the billing period
"""
from core.models.user_auth_models import TeaserUserModel
from django.db import models


class FollowedUsersModel(models.Model):
    """
    Model for follow relationships between users.
    """

    followed_id = models.ForeignKey(
        TeaserUserModel, on_delete=models.CASCADE, related_name="followed_id"
    )
    follower_id = models.ForeignKey(
        TeaserUserModel, on_delete=models.CASCADE, related_name="follower_id"
    )


class BlockedUsersModel(models.Model):
    """
    Model for follow relationships between users.
    """

    blocked_id = models.ForeignKey(
        TeaserUserModel, on_delete=models.CASCADE, related_name="blocked_id"
    )
    blocker_id = models.ForeignKey(
        TeaserUserModel, on_delete=models.CASCADE, related_name="blocker_id"
    )


class BillingPeriodModel(models.Model):
    """
    Lookup table for billing period
    TODO: Add discount for longer billing period?
    """

    time_range = models.CharField(
        max_length=20,
        primary_key=True,
        help_text="Weekly, Fortnightly, Monthly, Yearly, etc..",
    )


class SubscriptionsModel(models.Model):
    creator_id = models.ForeignKey(
        TeaserUserModel, on_delete=models.CASCADE, related_name="creator_id"
    )
    subscriber_id = models.ForeignKey(
        TeaserUserModel, on_delete=models.CASCADE, related_name="subscriber_id"
    )
    is_subscribed = models.BooleanField(default=False)
    price = models.DecimalField(decimal_places=2, max_digits=10)
    billing_period = models.ForeignKey(BillingPeriodModel, on_delete=models.DO_NOTHING)
