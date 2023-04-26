"""
Models related to user profiles.
Includes services, purchases, purchase methods and links on a user's profile.
"""
from core.models.user_auth_models import TeaserUserModel
from django.db import models


class UserProfileModel(models.Model):
    """
    User Profile Model
    """

    user_id = models.OneToOneField(
        TeaserUserModel, primary_key=True, on_delete=models.CASCADE
    )
    description = models.CharField(max_length=200, default="Add a bio")


class CategoriesModel(models.Model):
    """
    Lookup table for categories that a user can assign to themselves.
    """

    title = models.CharField(max_length=50, primary_key=True)


class UserCategoriesModel(models.Model):
    """
    Categories a user has assigned to themselved.
    """

    user_id = models.ForeignKey(TeaserUserModel, on_delete=models.CASCADE)
    categories_id = models.ForeignKey(CategoriesModel, on_delete=models.CASCADE)
    colour_code = models.CharField(
        max_length=7, help_text="#?????? colour code identifier specified by user"
    )

    class Meta:
        indexes = [models.Index(fields=["user_id"])]


class ProfileLinkTypesModel(models.Model):
    """
    Lookup table for types of links on a profile. Maps to type of logo displayed by frontend.
    """

    type = models.CharField(max_length=20, primary_key=True)


class ProfileLinksModel(models.Model):
    """
    Represents a link displayed on a user profile
    """

    user_id = models.OneToOneField(TeaserUserModel, on_delete=models.CASCADE)
    link_type = models.OneToOneField(ProfileLinkTypesModel, on_delete=models.CASCADE)
    link_url = models.URLField()


class ServicesModel(models.Model):
    """
    Services offered by a user including Donation.
    TODO: Make table Service Posts? --> Link posts to a service?
    """

    user_id = models.ForeignKey(TeaserUserModel, on_delete=models.CASCADE)
    cost = models.DecimalField(default=0, decimal_places=2, max_digits=10)
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=500)


class PaymentMethodsModel(models.Model):
    """
    Payment methods available to a user.
    """

    user_id = models.ForeignKey(TeaserUserModel, on_delete=models.CASCADE)
    payment_details = models.JSONField()


class PurchasesModel(models.Model):
    """
    Purchases made by a user.
    TODO: Should I make another model just for donations and make this service purchases?
    TODO: Add foreign key for service?
    TODO: Should this be the table keep track of services that are scheduled in the future??
    """

    seller_id = models.ForeignKey(
        TeaserUserModel, on_delete=models.DO_NOTHING, related_name="seller_id"
    )
    buyer_id = models.ForeignKey(
        TeaserUserModel, on_delete=models.DO_NOTHING, related_name="buyer_id"
    )
    name = models.CharField(
        max_length=300, help_text="Donations, Purchases for services"
    )
    purchase_date = models.DateTimeField()
    payment_method = models.ForeignKey(PaymentMethodsModel, on_delete=models.DO_NOTHING)
