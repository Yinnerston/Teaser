from ninja.errors import HttpError


class InvalidDOBValidationError(HttpError):
    pass


class TermsOfServiceNotAcceptedValidationError(HttpError):
    pass


class PatternMatchValidationError(HttpError):
    pass


class UserAlreadyExistsValidationError(HttpError):
    pass


class InvalidLoginCredentialsValidationError(HttpError):
    pass
