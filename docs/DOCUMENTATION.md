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
```
- Unicode: https://unicode.org/faq/normalization.html
  - nfkc_username --> Use for identifier
  - nfc_username --> Use for general text display

# Known Bugs:
- `... Invariant Violation:` --> Check first error
- https://github.com/henninghall/react-native-date-picker#why-does-the-android-app-crash-in-production
