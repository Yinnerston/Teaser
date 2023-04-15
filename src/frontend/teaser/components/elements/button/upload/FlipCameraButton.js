import { TouchableOpacity, Text } from "react-native";
import FlipCameraIcon from "../../icon/upload/FlipCameraIcon";
import { editorSidebarStyles } from "./styles";
import { VIDEO_EDITOR_SIDEBAR_BUTTON_SIZE } from "../../../../Constants";

/**
 * TODO: Flip camera input on press
 * @returns
 */
export default function FlipCameraButton() {
  return (
    <TouchableOpacity style={editorSidebarStyles.buttonContainerStyle}>
      <FlipCameraIcon color="white" size={VIDEO_EDITOR_SIDEBAR_BUTTON_SIZE} />
      <Text style={editorSidebarStyles.videoEditorText}>Flip</Text>
    </TouchableOpacity>
  );
}
