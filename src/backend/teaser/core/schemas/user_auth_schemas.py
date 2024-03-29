from ninja import Schema, Field
from datetime import datetime


class TeaserUserSchema(Schema):
    """
    Schema for TeaserUser in /api/v1/register endpoint.
    """

    username: str = Field(example="testuser1")
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
    token_hash: str = Field(example="Bearer Token")
    token_expiry_date: datetime = Field(example="Time the token expires")


class LogoutUserSchema(Schema):
    """
    Schema output for /api/v1/logout endpoint.
    """

    username: str = Field(example="testuser1")


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
