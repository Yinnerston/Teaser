import { TouchableOpacity, Text } from "react-native";
import FlipCameraIcon from "../../icon/upload/FlipCameraIcon";
import { editorSidebarStyles } from "./styles";
/**
 * TODO: Flip camera input on press
 * @returns
 */
export default function FlipCameraButton() {
  return (
    <TouchableOpacity style={editorSidebarStyles.buttonContainerStyle}>
      <FlipCameraIcon color="white" size={32} />
      <Text style={editorSidebarStyles.videoEditorText}>Flip</Text>
    </TouchableOpacity>
  );
}
