import { FontAwesome5 } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { shutterViewStyles } from "./styles";
import { VIDEO_EDITOR_SIDEBAR_BUTTON_SIZE } from "../../../../Constants";

/**
 * Back button used to pop the previous recording off the stack
 * @param {onPress, cameraBackButtonStyle} props
 * @returns
 */
export default function CameraBackButton(props) {
  const { onPress, cameraBackButtonStyle } = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={
        cameraBackButtonStyle
          ? cameraBackButtonStyle
          : shutterViewStyles.cameraBackButton
      }
    >
      <FontAwesome5
        name="backspace"
        size={VIDEO_EDITOR_SIDEBAR_BUTTON_SIZE}
        color="white"
      />
    </TouchableOpacity>
  );
}
