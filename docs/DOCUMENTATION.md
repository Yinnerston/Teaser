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
