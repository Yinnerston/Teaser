import {
  useWindowDimensions,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import { isRecordingAtom } from "../../../hooks/upload/useIsRecording";
// import {
//   stackPopAtomAtom,
//   queueAtom,
// } from "../../../hooks/upload/useMainVideoQueue";
import { useAtom, useSetAtom } from "jotai";
import CameraBackButton from "../../elements/button/upload/CameraBackButton";

/**
 * Template View for how the shutter is displayed in relation
 * to the Upload / Effects components on the UploadCameraScreen.
 */
export default function UploadCameraShutterView(props) {
  const {
    handleRecordVideo,
    handleStopRecordingVideo,
    handlePopLatestRecordedVideo,
  } = props;
  const [isRecording, setIsRecording] = useAtom(isRecordingAtom);
  // Camera video queue
  // const [cameraVideoQueue] = useAtom(queueAtom);
  // const setStackPopAtomAtom = useSetAtom(stackPopAtomAtom);
  const styles = useCameraShutterViewStyle();

  if (isRecording) {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.cameraIsRecordingShutterView}
          onPress={handleStopRecordingVideo}
        >
          <View style={styles.cameraShutter}></View>
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.cameraShutterView}
          onPress={handleRecordVideo}
        >
          <View style={styles.cameraShutter}></View>
        </TouchableOpacity>
        <CameraBackButton
          onPress={handlePopLatestRecordedVideo}
          cameraBackButtonStyle={styles.cameraBackButton}
        />
      </View>
    );
  }
}

const useCameraShutterViewStyle = () => {
  const { height, width } = useWindowDimensions();
  const styles = StyleSheet.create({
    container: {
      position: "absolute",
      top: "auto",
      bottom: 16,
      height: height / 4,
      width: width,
      backgroundColor: "green",
    },
    cameraShutterView: {
      position: "absolute",
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: "white",
      alignSelf: "center",
      bottom: 60,
      alignItems: "center",
      justifyContent: "center",
    },
    cameraShutter: {
      justifyContent: "center",
      alignItems: "center",
      width: 70,
      height: 70,
      borderRadius: 35,
      backgroundColor: "red",
      opacity: 1,
    },
    cameraIsRecordingShutterView: {
      position: "absolute",
      width: 90,
      height: 90,
      borderRadius: 45,
      backgroundColor: "white",
      alignSelf: "center",
      bottom: 55,
      alignItems: "center",
      justifyContent: "center",
      opacity: 0.5,
    },
    cameraBackButton: {
      position: "relative",
      // justifyContent: "center",
      // alignItems: "center",
      top: height / 8 - 30,
      left: (width * 2) / 3,
      height: 40,
      width: 40,
    },
  });
  return styles;
};
