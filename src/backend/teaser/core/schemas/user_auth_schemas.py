from ninja import Schema, Field


class TeaserUserSchema(Schema):
    """
    Schema for TeaserUser in /api/v1/register endpoint.
    """

    username: str = Field(example="testuser1")
    email: str = Field(example="testuser1@tester.com")
    phone: str = Field(example="+61499499499")
    password: str = Field(example="AmongUsS8SSY!FR")
    dob: str = Field(example="21/12/1995")
    terms_of_service_accepted: bool = Field(default=True)
