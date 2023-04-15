import { FontAwesome5 } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { shutterViewStyles } from "./styles";
import { CAMERA_SHUTTER_VIEW_ICON_SIZE } from "../../../../Constants";

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
        size={CAMERA_SHUTTER_VIEW_ICON_SIZE}
        color="white"
      />
    </TouchableOpacity>
  );
}
