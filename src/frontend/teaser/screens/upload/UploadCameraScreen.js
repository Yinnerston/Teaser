import { Camera, useCameraDevices } from "react-native-vision-camera";
import { useIsFocused } from "@react-navigation/native";
import { StyleSheet, useWindowDimensions, Platform, Alert } from "react-native";
import { useRef, useState, useEffect } from "react";
import LoadingView from "../../components/templates/LoadingView";
import { SafeAreaView } from "react-native-safe-area-context";
import { START_FROM_PREV_VIDEO_END } from "../../Constants";
import UploadCameraShutterView from "../../components/templates/upload/UploadCameraShutterView";
import EditorSidebar from "../../components/navs/sidebar/EditorSidebar";
import { writeOnlyIsRecordingAtomAtom } from "../../hooks/upload/useIsRecording";
import {
  enqueueAtomAtom,
  stackPopAtomAtom,
} from "../../hooks/upload/useMainVideoQueue";
// import { queueAtom, enqueueAtomAtom, dequeueAtomAtom } from "../../hooks/upload/useMainVideoQueue";
import { useSetAtom } from "jotai";
/**
 * View for uploading videos
 * TODO: Rename this? Should have it's own sub nav stack for:
 * --> Video camera / upload video to get to 15 seconds
 * --> Cuts + overlayed components like Sound, caption
 * --> Post details
 * @returns
 */
export default function UploadCameraScreen(props) {
  const { navigation } = props;
  const setIsRecording = useSetAtom(writeOnlyIsRecordingAtomAtom);
  const [cameraPermission, setCameraPermission] = useState();
  const [microphonePermission, setMicrophonePermission] = useState();
  // Queue video from camera output
  // const setDequeueAtomAtom = useSetAtom(dequeueAtomAtom);
  const setStackPopAtomAtom = useSetAtom(stackPopAtomAtom);
  const setEnqueueAtomAtom = useSetAtom(enqueueAtomAtom);
  // const [cameraVideoQueue] = useAtom(queueAtom);

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
        // TODO: get Start time
        setEnqueueAtomAtom({
          video: { ...video, duration: video.duration * 1000 },
        });
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

  /**
   * Pop latest recorded camera video off the stack
   * TODO: Delete the video from the filesystem to free up storage.
   */
  const handlePopLatestRecordedVideo = () => {
    Alert.alert("Discard Clip", "Discard the last clip?", [
      { text: "Cancel", style: "cancel", onPress: () => {} },
      {
        text: "Discard",
        style: "destructive",
        // Pop the last video frame off the stack
        onPress: () => setStackPopAtomAtom(),
      },
    ]);
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
      <EditorSidebar></EditorSidebar>
      <UploadCameraShutterView
        navigation={navigation}
        handleRecordVideo={handleRecordVideo}
        handleStopRecordingVideo={handleStopRecordingVideo}
        handlePopLatestRecordedVideo={handlePopLatestRecordedVideo}
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
