from core.errors import user_auth_errors
from datetime import datetime
from dateutil.relativedelta import relativedelta
from re import match


def validate_username(s_username: str):
    if match("^[a-zA-Z0-9_.]{6,32}", s_username) is None:
        raise user_auth_errors.PatternMatchError()
    return s_username


def validate_password(us_password: str):
    if (
        match("/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/", us_password)
        and len(us_password) < 32 is None
    ):
        raise user_auth_errors.PatternMatchError()
    return us_password


def validate_email(s_email: str):
    if (
        match(
            "([A-Za-z0-9]+[.-_])*[A-Za-z0-9]+@[A-Za-z0-9-]+(\.[A-Z|a-z]{2,})+", s_email
        )
        is None
        or len(s_email) > 255
    ):
        raise user_auth_errors.PatternMatchError()
    return s_email


def validate_phone(s_phone):
    if (
        match(
            "\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$",
            s_phone,
        )
        is None
        or len(s_phone) > 14
    ):
        raise user_auth_errors.PatternMatchError()
    return s_phone


def validate_dob(s_dob: str):
    dob_datetime = datetime.strptime(s_dob, "%d/%m/%Y")
    eighteen_years_ago_datetime = datetime.now() - relativedelta(years=18)
    if dob_datetime >= eighteen_years_ago_datetime:
        raise user_auth_errors.InvalidDOBError()
    return dob_datetime


def validate_terms_of_service_accepted(terms_of_service_accepted: bool):
    if terms_of_service_accepted is not True:
        raise user_auth_errors.TermsOfServiceNotAcceptedError()
    return terms_of_service_accepted


def validate_register(
    s_username: str,
    s_email: str,
    s_phone: str,
    us_password: str,
    s_dob: str,
    s_terms_of_service_accepted: bool,
):
    # Ok what is Django going to do for me?
    # Do i need to do stuff like constraint validation here
    # Do regex validation here? YES
    validate_username(s_username)
    validate_email(s_email)
    validate_dob(s_dob)
    validate_password(us_password)
    validate_phone(s_phone)
    validate_terms_of_service_accepted(s_terms_of_service_accepted)
