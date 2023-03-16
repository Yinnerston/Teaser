import { StyleSheet, View, Text, useWindowDimensions } from "react-native";
import FlipCameraButton from "../../elements/button/upload/FlipCameraButton";
import CameraFlashButton from "../../elements/button/upload/CameraFlashButton";
import RecordingCountdownButton from "../../elements/button/upload/RecordingCountdownButton";

import { readOnlyIsRecordingAtom } from "../../../hooks/upload/useIsRecording";
import { useAtom } from "jotai";
/**
 * Container for the sidebar of a Camera View.
 */
export default function CameraSidebar() {
  const [isRecording, _setIsRecording] = useAtom(readOnlyIsRecordingAtom);
  const styles = useSidebarStyle();

  if (!isRecording) {
    return (
      <View style={styles.container}>
        <FlipCameraButton></FlipCameraButton>
        <RecordingCountdownButton></RecordingCountdownButton>
        <CameraFlashButton></CameraFlashButton>
      </View>
    );
  } else {
    return <View>{}</View>;
  }
}

const useSidebarStyle = () => {
  const { height, width } = useWindowDimensions();
  const styles = StyleSheet.create({
    container: {
      position: "absolute",
      top: 16,
      bottom: "auto",
      left: "auto",
      right: 16,
      height: height / 2,
    },
    isRecordingContainer: {
      position: "absolute",
      top: 16,
      bottom: "auto",
      left: "auto",
      right: 16,
      height: height / 2,
      backgroundColor: "yellow",
    },
    sidebarText: {
      fontSize: 10,
    },
    sidebarItem: {
      justifyContent: "center",
      alignItems: "center",
    },
  });
  return styles;
};
