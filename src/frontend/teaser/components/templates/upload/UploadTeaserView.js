// import {Camera} from 'react-native-vision-camera';
import { View, Text } from "react-native";

/**
 * View for uploading videos
 * TODO: Rename this? Should have it's own sub nav stack for:
 * --> Video camera / upload video to get to 15 seconds
 * --> Cuts + overlayed components like Sound, caption
 * --> Post details
 * @returns
 */
export default function UploadTeaserView() {
  // const newCameraPermission = await Camera.requestCameraPermission()
  // const newMicrophonePermission = await Camera.requestMicrophonePermission()
  // const devices = useCameraDevices()
  // const device = devices.back

  if (true)
    return (
      <View>
        <Text>No device</Text>
      </View>
    );
  // return (
  //     <Camera
  //       style={StyleSheet.absoluteFill}
  //       device={device}
  //       isActive={true}
  //     />
  //   )
}
