from core.models.user_auth_models import TeaserUserModel, AuthTokenModel
from datetime import datetime
from core.errors.user_auth_errors import InvalidTokenError
import uuid
import pytz

utc = pytz.UTC


def make_auth_token_hash():
    return uuid.uuid4().hex


def invalidate_auth_token(token_hash):
    """
    Set the is_valid field of a token to false.
    @raises 401 InvalidTokenError
    @returns (token_hash: str, teaser_user_id: int)
    """
    try:
        auth_token = AuthTokenModel.objects.get(token_hash=token_hash)
        auth_token.is_valid = False
        auth_token.save()
    except AuthTokenModel.DoesNotExist:
        raise InvalidTokenError(401, "Invalid Token")
    return (token_hash, auth_token.teaser_user_id)


def check_auth_token_is_valid(token_hash) -> str:
    auth_token = AuthTokenModel.objects.get(token_hash=token_hash)
    token_expiry_datetime = auth_token.expiry_date.replace(tzinfo=utc)
    utc_now_datetime = utc.localize(datetime.now())
    if auth_token is None:
        raise InvalidTokenError(401, "Invalid Token")
    elif not auth_token.is_valid or utc_now_datetime > token_expiry_datetime:
        raise InvalidTokenError(401, "Invalid Token")
    return auth_token.token_hash
