# EAS Cli

- https://docs.expo.dev/build/setup/#1-install-the-latest-eas-cli
- Debug with flipper https://docs.expo.dev/guides/using-flipper/

# Local Builds (Android)

- https://docs.expo.dev/build-reference/apk/
- Development build: Run `npx eas build --platform android --profile development` in the frontend docker container. Eas setting automatically builds development build as apk
- Get the link when the build finishes and download the .apk file
- `adb devices` --> Get device ID for your phone E.G `DEVICE_ID=R5CY60QXRXA`
- `sudo adb -s ${DEVICE_ID} install ${DOWNLOADED_APPLICATION_NAME}.apk `
-
- ^ Requirements:
  - Have developer settings enabled on your android device
  - Plug your android device into the computer running the docker container
  - Install adb

# ffmpeg

- https://medium.com/@hizmitamir/react-native-expo-react-native-ffmpeg-501348efc447
- Ran into issue:
- `uses-sdk:minSdkVersion 21 cannot be smaller than version 24 declared in library [:react-native-ffmpeg].`
  - Fixed with adding ```json
      [
        "expo-build-properties",
        {
          "android": {
            "compileSdkVersion": 31,
            "targetSdkVersion": 31,
            "buildToolsVersion": "31.0.0",
            "minSdkVersion": 24
          },
          "ios": {
            "deploymentTarget": "13.0"
          }
        }
      ]

``` to app.json
- Ran into issue https://github.com/expo/expo/issues/17450
    - Fix: Add `"kotlinVersion": "1.7.0"` to the `android` section in ` "expo-build-properties",` in file: `app.json`
- https://github.com/facebook/react-native/issues/25537#issuecomment-1327436296
    - Upgraded to react native 0.71
