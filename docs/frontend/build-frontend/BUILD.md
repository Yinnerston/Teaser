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


<!-- - https://www.vinnie.work/blog/2022-12-02-building-expo-locally
- `cd src/frontend/teaser`
- `./build.sh`
- `yarn expo prebuild` or `npx expo prebuild` with `expo@47.0.12`
- `./eas.sh ./gradlew app:assembleDebug`
- Ran into error:
```
A problem occurred evaluating project ':react-native-navigation'. > Plugin with id 'kotlin-android' not found.
```
and applied fix: https://github.com/react-native-webview/react-native-webview/issues/1407#issuecomment-634436481
```
// Add to android/build.gradle file
buildscript {
    ext {
        ...
        kotlinVersion = "1.3.72"
    }
    dependencies {
        ...
        classpath "org.jetbrains.kotlin:kotlin-gradle-plugin:$kotlinVersion"
    }
}
```
- Installed android studio and added -->
