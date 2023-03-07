from core.errors import user_auth_errors
from datetime import datetime
from dateutil.relativedelta import relativedelta
from re import match


def validate_username(s_username: str):
    """
    Validate a username.
    6-32 characters
    @raises 462 PatternMatchValidationError
    @returns username: str
    """
    if (
        match("^[a-zA-Z0-9_.]{6,32}", s_username) is None
        or len(s_username) < 6
        or len(s_username) > 32
    ):
        raise user_auth_errors.PatternMatchValidationError(
            462, "Username Validation Error"
        )
    return s_username


def validate_password(us_password: str):
    """
    Validates a password.
    8-32 length.
    @raises 462 PatternMatchValidationError
    @returns password: str
    """
    if (
        match(
            "^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$",
            us_password,
        )
        is None
        or len(us_password) > 32
        or len(us_password) < 8
    ):
        raise user_auth_errors.PatternMatchValidationError(
            462, f"Password Validation Error:"
        )
    return us_password


def validate_email(s_email: str):
    """
    Validates a password.
    <256 length.
    @raises 462 PatternMatchValidationError
    @returns email: str
    """
    if (
        match(
            "([A-Za-z0-9]+[.-_])*[A-Za-z0-9]+@[A-Za-z0-9-]+(\.[A-Z|a-z]{2,})+", s_email
        )
        is None
        or len(s_email) > 255
    ):
        raise user_auth_errors.PatternMatchValidationError(
            462, "Email Validation Error"
        )
    return s_email


def validate_phone(s_phone):
    """
    Validates a phone number, must include a country code.
    <15 length.
    @raises 462 PatternMatchValidationError
    @returns phone: str
    """
    if (
        match(
            "\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$",
            s_phone,
        )
        is None
        or len(s_phone) > 14
    ):
        raise user_auth_errors.PatternMatchValidationError(
            462, "Phone number validation error"
        )
    return s_phone


def validate_dob(s_dob: str):
    """
    Validates the date of birth >18 years old.
    @raises InvalidDOBValidationError
    @returns dob: datetime
    """
    try:
        dob_datetime = datetime.strptime(s_dob, "%d/%m/%Y")
    except ValueError:
        raise user_auth_errors.InvalidDOBValidationError(
            460, r"Invalid DOB Format %d/%m/%Y"
        )
    eighteen_years_ago_datetime = datetime.now() - relativedelta(years=18)
    if dob_datetime > eighteen_years_ago_datetime:
        raise user_auth_errors.InvalidDOBValidationError(460, "DOB is not 18 Years Old")
    return dob_datetime


def validate_terms_of_service_accepted(terms_of_service_accepted: bool):
    """
    Validates the tos was accepted.
    @raises TermsOfServiceNotAcceptedValidationError
    @returns tos_accepted: bool
    """
    if terms_of_service_accepted is not True:
        raise user_auth_errors.TermsOfServiceNotAcceptedValidationError(
            461, "ToS not accepted"
        )
    return terms_of_service_accepted


def validate_register(
    s_username: str,
    s_email: str,
    s_phone: str,
    us_password: str,
    s_dob: str,
    s_terms_of_service_accepted: bool,
):
    """
    Validate register inputs for a new user is syntactically correct.
    @raises TermsOfServiceNotAcceptedValidationError ToS not accepted
    @raises InvalidDOBValidationError <18 y/o
    @raises PatternMatchValidationError Invalid regex match in str fields
    """
    # Ok what is Django going to do for me?
    # Do i need to do stuff like constraint validation here
    # Do regex validation here? YES
    return {
        "username": validate_username(s_username),
        "email": validate_email(s_email),
        "dob": validate_dob(s_dob),
        "password": validate_password(us_password),
        "phone": validate_phone(s_phone),
        "terms_of_service": validate_terms_of_service_accepted(
            s_terms_of_service_accepted
        ),
    }


def validate_login_params(s_username: str, us_password: str):
    """
    Validate login for a user is syntactically correct.
    @raises PatternMatchValidationError Invalid regex match in str fields
    """
    return {
        "username": validate_username(s_username),
        "password": validate_password(us_password),
    }
