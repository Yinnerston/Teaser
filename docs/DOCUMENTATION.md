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
PROSODY_PASSWORD=???
PROSODY_DOMAIN=wocchit.com
PROSODY_VIRTUAL_HOSTS=wocchit.com
GF_SECURITY_ADMIN_PASSWORD='???'
```
- Unicode: https://unicode.org/faq/normalization.html
  - nfkc_username --> Use for identifier
  - nfc_username --> Use for general text display
- Setup PostCategoriesModel by running `python manage.py shell < core/utils/populate_categories.py
` in backend_django container
- Create user with username `uploader` --> This is used for uploading etl
- Create user with username `Deleted` --> This is used in the sentinel pattern for PostModel foreign keys

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

# Setup Grafana + prometheus
- Install Docker plugin for Loki `docker plugin install grafana/loki-docker-driver:latest --alias loki --grant-all-permissions` in shell.
- Run `docker run -ti --user root --entrypoint bash teaser_grafana` then in container run `chown -R root:root etc/grafana && chmod -R a+r /etc/grafana && chown -R grafana:root /var/lib/grafana && chown -R grafana:root /usr/share/grafana` based on https://grafana.com/docs/grafana/latest/setup-grafana/installation/docker/#migrate-to-v51-or-later
- Add a password `GF_SECURITY_ADMIN_PASSWORD=PASSWORD_HERE` to the `.env` file
- Go to localhost:3000
- Login to grafana admin:admin --> Change password(You added the password to the .env file)
- In your the grafana interface in your browser:
    - Go Configuration > Data Sources
    - Add data source > Pick Prometheus
    - Set URL as http://prometheus:9090
    - Save and Test
- Setup loki data source
    - Add data source > Pick Loki
    - Set URL as http://loki:3100
    - Save and Test
- Import the dashboards (*.json files) from the `src/grafana/data:/grafana/data` directory
  - Make sure the data sources are correct --> E.G. might have `prometheus` instead of `prometheus-1`
- (Unused) Define REDIS_USERNAME and REDIS_PASSWORD in .env file
- If you get a permission denied error on starting prometheus container, run `sudo chown nobody:nogroup src/prometheus`

# Postgres

- Run psql shell with `docker exec -it ${container_id} psql teaser -U teaseruser`
-
# Known Bugs:
- `... Invariant Violation:` --> Check first error
- https://github.com/henninghall/react-native-date-picker#why-does-the-android-app-crash-in-production
-
```
Error: Call to function 'ExponentImagePicker.launchImageLibraryAsync' has been rejected.
Caused by: kotlin.UninitializedPropertyAccessException: lateinit property imageLibraryLauncher has not been initialized
```
- https://github.com/expo/expo/issues/19512
- Unexpected end of stream https://github.com/expo/expo/issues/22668#issuecomment-1566344119
  - Solved by changing node version to v18.16.0 (see frontend dockerfile)

# Firewall:

- Need to add port mappings to your modem if you are hosting locally
- HTTPS: 443:443
- HTTP: 80:80
- Frontend Expo Dev Client: 8081:8081
- XMPP c2s: 5222:5222
- XMPP s2s: 5269:5269
- XMPP http: 5280:5280
