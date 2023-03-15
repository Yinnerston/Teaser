import { Camera, useCameraDevices } from "react-native-vision-camera";
import { useIsFocused } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Button,
} from "react-native";
import { useRef } from "react";
import LoadingView from "../LoadingView";
/**
 * View for uploading videos
 * TODO: Rename this? Should have it's own sub nav stack for:
 * --> Video camera / upload video to get to 15 seconds
 * --> Cuts + overlayed components like Sound, caption
 * --> Post details
 * @returns
 */
export default function UploadTeaserView() {
  const newCameraPermission = Camera.requestCameraPermission();
  const newMicrophonePermission = Camera.requestMicrophonePermission();
  const devices = useCameraDevices();
  const device = devices.back;
  const isFocused = useIsFocused();
  const cameraRef = useRef(null);
  const styles = useUploadTeaserViewStyles();
  // UI state variables
  // isRecording --> Hide sidebar
  // useState
  // isShowingSidebar --> boolean, dependent on isRecording / triggered by click on sidebarItem
  // useState
  // sidebarItems --> [] sidebar buttons
  // Jotai:
  // React useState:
  // video
  // frameProcessors --> Frame processors to apply to the video
  // filter: filter object
  // Ideally this would be a write-back frame

  const recordVideo = () => {
    if (cameraRef.current != null) {
      cameraRef.current.startRecording({
        onRecordingFinished: (video) => console.log(video),
        onRecordingError: (error) => console.error(error),
      });
      // E.G. Set timeout for 15 seconds
      setTimeout(async () => await cameraRef.current.stopRecording(), 15000);
    }
  };

  if (device == null) {
    return <LoadingView />;
  }
  return (
    <View>
      <Camera
        style={styles.camera}
        device={device}
        isActive={isFocused}
        ref={cameraRef}
        video={true}
        audio={true}
      />
    </View>
  );
}

const useUploadTeaserViewStyles = () => {
  const { height, width } = useWindowDimensions();
  const styles = StyleSheet.create({
    camera: {
      height: height,
      width: width,
    },
  });
  return styles;
};
