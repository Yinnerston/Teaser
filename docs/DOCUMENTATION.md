# Documentation
- Env files:\
- `.frontend.env`:
```bash
EXPO_DEVTOOLS_LISTEN_ADDRESS='???'
CHOKIDAR_USEPOLLING='true'
REACT_NATIVE_PACKAGER_HOSTNAME='???'
```
- `.backend.env`:
```bash
DJANGO_SECRET_KEY=???
POSTGRES_PASSWORD=???
PRIVATE_IP=???
DEBUG=1
OPENAI_API_KEY=???
CDN_VIDEO_LIBRARY_ID=???
CDN_API_KEY=???
```
- `.env`:
```bash
POSTGRES_PASSWORD=???
```
- Unicode: https://unicode.org/faq/normalization.html
  - nfkc_username --> Use for identifier
  - nfc_username --> Use for general text display
- Setup PostCategoriesModel by running `python manage.py shell < core/utils/populate_categories.py
` in backend_django container
- Create user with username `uploader` --> This is used for uploading etl

# Setup

- (Git): For development, Install requirements in a venv and run `pre-commit install` to add black code auto-formatting on your commits
- Install postgres 13.9 with PGAdmin. This project assumes postgres runs on port 5432. (Default  for first time postgres installation).
- For postgres setup, I follow this tutorial: https://www.digitalocean.com/community/tutorials/how-to-use-postgresql-with-your-django-application-on-ubuntu-20-04
- In postgres shell:
```sql
CREATE DATABASE teaser;
CREATE USER teaseruser WITH PASSWORD 'PUT_YOU_PASSWORD_HERE';
ALTER ROLE teaseruser SET client_encoding TO 'utf8';
ALTER ROLE teaseruser SET default_transaction_isolation TO 'read committed';
ALTER ROLE teaseruser SET timezone TO 'Australia/Sydney';
GRANT ALL PRIVILEGES ON DATABASE teaser TO teaseruser;
```
- Do the same for Database teaser_prod with user teaseruser_prod
Add the password to the .env file in root directory, `POSTGRES_PASSWORD=PUT_YOU_PASSWORD_HERE`. I would recommend generating a password with
```
openssl rand -hex 32
```
in another terminal.
- `docker-compose up -d --build`
- Run initial migration `docker-compose exec backend_django python manage.py migrate --noinput`
- Check default Django tables were created `docker-compose exec db psql --username=teaseruser --dbname=teaser`
- Create a reddit personal use script in https://www.reddit.com/prefs/apps/
- Add praw.ini file to `src\teaser`
```ini
[TeaserScript]
client_id=SCRIPT_CLIENT_ID
client_secret=SCRIPT_CLIENT_SECRET
password=YOUR_PASSWORD
username=YOUR_USERNAME
user_agent=Python-Slim:teaser-script:v1.0.0 (by u/YOUR_USERNAME)
```
- Change the list of subreddits if you want in `from core.utils.user_profile_validator import ALL_CATEGORIES_TEMP`
- Download data from reddit using the django `manage.py shell` --> `RedditETL().run_pipeline()`
- Use black python code formatter


# Postgres

- Run psql shell with `docker exec -it ${container_id} psql teaser -U teaseruser`
-
# Known Bugs:
- `... Invariant Violation:` --> Check first error
- https://github.com/henninghall/react-native-date-picker#why-does-the-android-app-crash-in-production
- ```
Error: Call to function 'ExponentImagePicker.launchImageLibraryAsync' has been rejected.
Caused by: kotlin.UninitializedPropertyAccessException: lateinit property imageLibraryLauncher has not been initialized
``` https://github.com/expo/expo/issues/19512
