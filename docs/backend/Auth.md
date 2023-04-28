# JWT

- Not used. https://news.ycombinator.com/item?id=16157002
- Access token expiry: 1 hour
- Refresh token expiry: 69 days

# Auth Tokens:

- Access token expiry: 69 days
- Contains reference to TeaserUserModel
- Get the user id by `request.auth.teaser_user_id`

# TODO: Race condition where the same token is getting refreshed by two API calls
# TODO: Race condition where a token was refreshed, but
