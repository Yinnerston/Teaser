import {
  useWindowDimensions,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import { isRecordingAtom } from "../../../hooks/upload/useIsRecording";
import { queueAtom } from "../../../hooks/upload/useMainVideoQueue";
import { useAtom, useSetAtom } from "jotai";
import CameraBackButton from "../../elements/button/upload/CameraBackButton";
import UploadImageButton from "../../elements/button/upload/UploadImageButton";
import CameraScreenCheckButton from "../../elements/button/upload/CameraScreenCheckButton";

/**
 * Template View for how the shutter is displayed in relation
 * to the Upload / Effects components on the UploadCameraScreen.
 */
export default function UploadCameraShutterView(props) {
  const {
    navigation,
    handleRecordVideo,
    handleStopRecordingVideo,
    handlePopLatestRecordedVideo,
  } = props;
  const [isRecording, setIsRecording] = useAtom(isRecordingAtom);
  // Camera video queue
  const [cameraVideoQueue] = useAtom(queueAtom);
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
        {cameraVideoQueue.length > 0 ? (
          <View>
            <CameraScreenCheckButton
              navigation={navigation}
              cameraScreenCheckButtonStyle={styles.cameraScreenCheckButton}
            />
            <CameraBackButton
              onPress={handlePopLatestRecordedVideo}
              cameraBackButtonStyle={styles.cameraBackButton}
            />
          </View>
        ) : (
          <View>
            <UploadImageButton
              uploadImageButtonStyle={styles.uploadImageButton}
            />
          </View>
        )}
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
      position: "absolute",
      justifyContent: "center",
      alignItems: "center",
      top: height / 8 - 30,
      left: (width * 2) / 3,
      height: 40,
      width: 40,
    },
    uploadImageButton: {
      position: "absolute",
      justifyContent: "center",
      alignItems: "center",
      top: height / 8 - 30,
      left: (width * 5) / 6,
      height: 40,
      width: 40,
    },
    cameraScreenCheckButton: {
      position: "absolute",
      justifyContent: "center",
      alignItems: "center",
      top: height / 8 - 26,
      left: (width * 5) / 6,
      height: 32,
      width: 32,
      borderRadius: 16,
      backgroundColor: "#fe2c55",
    },
  });
  return styles;
};
