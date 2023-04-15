import { TouchableOpacity, Text } from "react-native";
import RecordingCountdownIcon from "../../icon/upload/RecordingCountdownIcon";
import { editorSidebarStyles } from "./styles";
import { VIDEO_EDITOR_SIDEBAR_BUTTON_SIZE } from "../../../../Constants";

/**
 * TODO: Set showRecordingCountdown state variable
 * ^ Hides sidebar, show countdown component over camera shutter
 * @returns
 */
export default function RecordingCountdownButton() {
  return (
    <TouchableOpacity style={editorSidebarStyles.buttonContainerStyle}>
      <RecordingCountdownIcon
        color={"white"}
        size={VIDEO_EDITOR_SIDEBAR_BUTTON_SIZE}
      />
      <Text style={editorSidebarStyles.videoEditorText}>Timer</Text>
    </TouchableOpacity>
  );
}
