---
sidebar_position: 2
sidebar_label: "Data Models"
---

# Data Models

**SEE [data models](../getting-started/04_data_model.md)**

**TODO: Link to code**
```python
class TeaserUserModel(models.Model):
    """
    Teaser User model.
    TODO: Define some indexes to improve performance?
    """

    user_id = models.OneToOneField(User, on_delete=models.CASCADE)
    nfc_username = models.CharField(
        max_length=32
    )  # TODO: on change, change PostsModel denormalized nfc_username
    phone_str = models.CharField(max_length=16)
    profile_photo_url = models.URLField(
        default="http://teasernsfw.b-cdn.net/teaser-32x32.png", blank=True
    )
    stage_name = models.CharField(max_length=64, default="", blank=True)
    dob_date = models.DateField()
    is_verified = models.BooleanField(default=False)
    location_id = models.ForeignKey(
        LocationsModel, on_delete=models.DO_NOTHING, null=True, blank=True
    )
    terms_of_service_accepted = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True, blank=True)

```
