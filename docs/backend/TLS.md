# Django Strict Transport Security

<!-- - Following this guide https://timonweb.com/django/https-django-development-server-ssl-certificate/
- Install mkcert
- Goto root of django project `src/backend/teaser`
- Generate key.pem, cert.pem using `mkcert -install` -->
- I tried: https://jsavoie.github.io/2021/06/01/letsencrypt.html and encountered exception:
```
Encountered exception during recovery: certbot.errors.PluginError: Unable to determine base domain for _acme-challenge.infranet.teasernsfw.com using names: ['_acme-challenge.infranet.teasernsfw.com', 'infranet.teasernsfw.com', 'teasernsfw.com', 'com'].
Unable to determine base domain for _acme-challenge.infranet.teasernsfw.com using names: ['_acme-challenge.infranet.teasernsfw.com', 'infranet.teasernsfw.com', 'teasernsfw.com', 'com'].
```
- Putting this on the backburner. Will add strict TLS security in prod.

# Production:

- TODO: Let's encrypt
