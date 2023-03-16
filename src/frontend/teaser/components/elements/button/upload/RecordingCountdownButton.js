import { TouchableOpacity, Text } from "react-native";
import RecordingCountdownIcon from "../../icon/upload/RecordingCountdownIcon";
import { editorSidebarStyles } from "./styles";

/**
 * TODO: Set showRecordingCountdown state variable
 * ^ Hides sidebar, show countdown component over camera shutter
 * @returns
 */
export default function RecordingCountdownButton() {
  return (
    <TouchableOpacity style={editorSidebarStyles.buttonContainerStyle}>
      <RecordingCountdownIcon color={"white"} size={32} />
      <Text style={editorSidebarStyles.videoEditorText}>Timer</Text>
    </TouchableOpacity>
  );
}
