---
sidebar_position: 2
sidebar_label: 'Setup'
---

# Local Setup on Ubuntu

### Production setup:

- If you are forking this repository and hosting Teaser on your own production domain, change all mentions of `wocchit.com` to your domain.

### .env files
Create `.env` files in the root directory to use with docker-compose for local development.
```bash title=".frontend.env"
EXPO_DEVTOOLS_LISTEN_ADDRESS='0.0.0.0'
CHOKIDAR_USEPOLLING='true'
REACT_NATIVE_PACKAGER_HOSTNAME='???'
```

- `EXPO_DEVTOOLS_LISTEN_ADDRESS` is currently not used. I want to add expo devtools in the near future.
- `REACT_NATIVE_PACKAGER_HOSTNAME` is the IPv4 address your frontend development environment container is running on. (Mine is to my private ip).

```bash title=".backend.env"
DJANGO_SECRET_KEY=???
POSTGRES_PASSWORD=???
PRIVATE_IP=???
DEBUG=1
OPENAI_API_KEY=???
CDN_VIDEO_LIBRARY_ID=???
CDN_API_KEY=???
```
- `OPENAI_API_KEY` used for the functions at `openai/image/...`. I recommend setting a rate limit on your OpenAI account in case somebody tries to abuse this endpoint.
- `CDN_VIDEO_LIBRARY_ID` and `CDN_API_KEY` are for Bunny.net Streaming. These are required to store and serve video / other multimedia files. We use bunny.net as a CDN and as a storage server.

```bash title=".env"
POSTGRES_PASSWORD=???
PROSODY_PASSWORD=???
PROSODY_DOMAIN=wocchit.com
PROSODY_VIRTUAL_HOSTS=wocchit.com
GF_SECURITY_ADMIN_PASSWORD='???'
```

- `PROSODY_*` is currently not implemented yet.
- `GF_SECURITY_ADMIN_PASSWORD` is your grafana admin password. The default is username: admin, password: admin.

- Setup PostCategoriesModel by running `python manage.py shell < core/utils/populate_categories.py
` in backend_django container
- Create user with username `uploader` --> This is used for uploading etl
- Create user with username `Deleted` --> This is used in the sentinel pattern for PostModel foreign keys

:::tip Get in contact!
Email teaseradmin@teasernsfw.com and I can send you a pg_dump of an already populated database!
:::

### Development Setup

- `(Git)`: For development, Install requirements in a venv and run `pre-commit install` to add black code auto-formatting on your commits
- Install [postgres 15](https://www.postgresql.org/download/linux/ubuntu/) and PGAdmin. This project assumes postgres runs on port 5432. (Default  for first time postgres installation).
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

### (Optional) Pull data from Reddit

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
- Exec `bash` in your `backend-django` container
  - Find the backend-django CONTAINER_ID with `docker container ls`.
  - Execute an interactive bash shell in the container with `docker exec -it CONTAINER_ID bash`
  - Download data from reddit using the django `manage.py shell` --> `RedditETL().run_pipeline()`

### Setup Grafana + prometheus
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
