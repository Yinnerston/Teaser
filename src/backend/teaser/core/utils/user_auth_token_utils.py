from core.models.user_auth_models import TeaserUserModel, AuthTokenModel
from datetime import datetime
from core.errors.user_auth_errors import InvalidTokenError
import uuid
from django.db.models import Model


def make_auth_token_hash():
    return uuid.uuid4().hex


def invalidate_auth_token(token_hash):
    """
    Set the is_valid field of a token to false.
    @raises 401 InvalidTokenError
    """
    try:
        auth_token = AuthTokenModel.objects.get(token_hash=token_hash)
        auth_token.is_valid = False
        auth_token.save()
    except Model.DoesNotExist:
        raise InvalidTokenError(401, "Invalid Token")
    return (auth_token.token_hash == token_hash, auth_token.teaser_user_id)


def check_auth_token_is_valid(token_hash) -> str:
    auth_token = AuthTokenModel.objects.get(token_hash=token_hash)
    if auth_token is None:
        raise InvalidTokenError(401, "Invalid Token")
    elif not auth_token.is_valid or datetime.now() > auth_token.expiry_date:
        raise InvalidTokenError(401, "Invalid Token")
    return auth_token.token_hash
