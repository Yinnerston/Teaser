import { TouchableOpacity, Text } from "react-native";
import CameraFlashIcon from "../../icon/upload/CameraFlashIcon";
import { editorSidebarStyles } from "./styles";
import { VIDEO_EDITOR_SIDEBAR_BUTTON_SIZE } from "../../../../Constants";
/**
 * TODO: Turn on camera flash on press, change icon to crossed out version
 * Turn off on next press.
 */
export default function CameraFlashButton() {
  return (
    <TouchableOpacity style={editorSidebarStyles.buttonContainerStyle}>
      <CameraFlashIcon color="white" size={VIDEO_EDITOR_SIDEBAR_BUTTON_SIZE} />
      <Text style={editorSidebarStyles.videoEditorText}>Flash</Text>
    </TouchableOpacity>
  );
}
