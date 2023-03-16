import {
  useWindowDimensions,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import { isRecordingAtom } from "../../../hooks/upload/useIsRecording";
import { useAtom } from "jotai";
/**
 * Template View for how the shutter is displayed in relation
 * to the Upload / Effects components on the UploadCameraScreen.
 */
export default function UploadCameraShutterView() {
  const [isRecording, setIsRecording] = useAtom(isRecordingAtom);
  const styles = useCameraShutterViewStyle();
  return (
    <View style={styles.container}>
      <Text>{isRecording ? "YES" : "NO"}</Text>
      {isRecording ? (
        <TouchableOpacity
          style={styles.cameraIsRecordingShutterView}
          onPress={() => setIsRecording(false)}
        >
          <View style={styles.cameraShutter}></View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.cameraShutterView}
          onPress={() => setIsRecording(true)}
        >
          <View style={styles.cameraShutter}></View>
        </TouchableOpacity>
      )}
    </View>
  );
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
  });
  return styles;
};
