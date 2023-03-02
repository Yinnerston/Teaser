"""
Services layer for user_auth_services models.
"""

from core.models.user_auth_models import TeaserUserModel


def register_user_service(
    s_username: str,
    s_email: str,
    s_phone: str,
    us_password: str,
    s_dob: str,
    s_terms_of_service_accepted: bool,
):
    """
    Register a user.
    """

    # Validate user input
    # Check that the the inputs follow the business rules
    # Convert dob to date and validate is valid date + over 18
    # E.G. Correct length, valid regex pattern, etc
    # Normalize unicode text
    # Raise business logic errors
    # Check that the username is unique.
    # Check that the phone number is unique
    # Persist the model to the database
    # Send SMS code
    # Return JSON


def activate_user_account_service(s_username: str, s_2fa_otp: str):
    """
    Activate an user's account if the 2fa OTP matches.
    """
    pass


def delete_user_account_service(s_auth_token: str, s_username: str):
    pass


def update_user_account_service(s_auth_token: str, s_payload: dict):
    pass


def login_user_service(s_username: str, us_password: str):
    pass
