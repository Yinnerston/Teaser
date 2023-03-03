from teaser.urls import api
from core.errors.user_auth_errors import *


@api.exception_handler(InvalidDOBValidationError)
def invalid_dob_validation_error(request, exc):
    return api.create_response(
        request,
        {"message": "Invalid DOB"},
        status=410,
    )


@api.exception_handler(TermsOfServiceNotAcceptedValidationError)
def terms_of_service_not_accepted_validation_error(request, exc):
    return api.create_response(
        request,
        {"message": "Must accept ToS to use Teaser"},
        status=411,
    )


@api.exception_handler(PatternMatchValidationError)
def terms_of_service_not_accepted_validation_error(request, exc):
    return api.create_response(
        request,
        {"message": f"Invalid input in {exc}"},
        status=412,
    )
