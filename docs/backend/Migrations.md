# Migrations:

- TODO: flatten migrations again
- Keep note of `src/backend/teaser/core/migrations/0009_postsmodel_nfc_username.py`. Added denormalization function so can't just delete migration and recreate using `makemigrations`

# Denormalisation:

- nfc_username from TeaserUserModel is denormalized in PostsModel
