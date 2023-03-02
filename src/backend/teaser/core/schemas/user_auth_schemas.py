from ninja import Schema


class TeaserUserSchema(Schema):
    """
    Schema for TeaserUser in /api/v1/register endpoint.
    """

    username: str
    email: str
    phone: str
    password: str
    dob: str
    terms_of_service_accepted: bool
