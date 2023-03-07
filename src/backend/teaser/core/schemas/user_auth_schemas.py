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


class RegisterUserOutSchema(Schema):
    """
    TODO: Output for 2fa?
    """

    pass


class LoginUserSchema(Schema):
    """
    Schema input for /api/v1/login endpoint.
    """

    username: str = Field(example="testuser1")
    password: str = Field(example="AmongUsS8SSY!FR")


class LoginUserOutSchema(Schema):
    """
    Schema output for /api/v1/login endpoint.
    """

    username: str = Field(example="testuser1")
    access: str = Field(example="Access Token")
    refresh: str = Field(example="Refresh Token")


class AuthTokenSchema(Schema):
    """
    Schema containing the token.
    """

    token: str = Field(example="token")


class UserAuthError(Schema):
    """
    Format of an error.
    """

    message: str = Field(example="See docs/error_codes/ERRORS.md")
