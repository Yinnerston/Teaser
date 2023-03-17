import { Camera, useCameraDevices } from "react-native-vision-camera";
import { useIsFocused } from "@react-navigation/native";
import { StyleSheet, useWindowDimensions, Platform } from "react-native";
import { useRef, useState, useEffect } from "react";
import LoadingView from "../../components/templates/LoadingView";
import { SafeAreaView } from "react-native-safe-area-context";
import UploadCameraShutterView from "../../components/templates/upload/UploadCameraShutterView";
import CameraSidebar from "../../components/navs/sidebar/CameraSidebar";
import { writeOnlyIsRecordingAtomAtom } from "../../hooks/upload/useIsRecording";
import { useSetAtom } from "jotai";
/**
 * View for uploading videos
 * TODO: Rename this? Should have it's own sub nav stack for:
 * --> Video camera / upload video to get to 15 seconds
 * --> Cuts + overlayed components like Sound, caption
 * --> Post details
 * @returns
 */
export default function UploadCameraScreen() {
  const setIsRecording = useSetAtom(writeOnlyIsRecordingAtomAtom);
  const [cameraPermission, setCameraPermission] = useState();
  const [microphonePermission, setMicrophonePermission] = useState();

  useEffect(() => {
    // Get camera and microphone positions on initial mount
    (async () => {
      const newCameraPermission = await Camera.requestCameraPermission();
      setCameraPermission(newCameraPermission);
      const newMicrophonePermission =
        await Camera.requestMicrophonePermission();
      setMicrophonePermission(newMicrophonePermission);
    })();
  }, []);
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

  const handleRecordVideo = () => {
    if (cameraRef.current == null) {
      console.error("Camera Ref is Null");
      return;
    }
    // Flip isRecording
    setIsRecording();
    const start = cameraRef.current.startRecording({
      onRecordingFinished: (video) => {
        console.log("ON RECORDING FINISHED");
        console.log(video);
      },
      onRecordingError: (error) => console.error(error),
    });
  };

  const handleStopRecordingVideo = () => {
    if (cameraRef.current == null) {
      console.error("Camera Ref is Null");
      return;
    }
    // Flip isRecording
    setIsRecording();
    const stop = cameraRef.current.stopRecording();
  };

  if (device == null) {
    return <LoadingView />;
  }
  return (
    <SafeAreaView>
      <Camera
        style={styles.camera}
        device={device}
        isActive={isFocused}
        ref={cameraRef}
        video={true}
        audio={true}
      />
      <CameraSidebar></CameraSidebar>
      <UploadCameraShutterView
        handleRecordVideo={handleRecordVideo}
        handleStopRecordingVideo={handleStopRecordingVideo}
      ></UploadCameraShutterView>
    </SafeAreaView>
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
