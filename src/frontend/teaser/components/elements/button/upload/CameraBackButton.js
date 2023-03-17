import { FontAwesome5 } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { shutterViewStyles } from "./styles";
import { VIDEO_EDITOR_SIDEBAR_BUTTON_SIZE } from "../../../../Constants";

/**
 * Back button used to pop the previous recording off the stack
 * @param {onPress} props
 * @returns
 */
export default function CameraBackButton(props) {
  const { onPress } = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={shutterViewStyles.cameraBackButton}
    >
      <FontAwesome5
        name="backspace"
        size={VIDEO_EDITOR_SIDEBAR_BUTTON_SIZE}
        color="white"
      />
    </TouchableOpacity>
  );
}
