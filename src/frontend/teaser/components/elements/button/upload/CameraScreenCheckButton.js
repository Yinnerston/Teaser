import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity, Text } from "react-native";
import { shutterViewStyles } from "./styles";
import { CAMERA_SHUTTER_VIEW_ICON_SIZE } from "../../../../Constants";

/**
 * Back button used to import images
 * @param {onPress, uploadImageButtonStyle} props
 * @returns
 */
export default function CameraScreenCheckButton(props) {
  const { navigation, cameraScreenCheckButtonStyle } = props;
  // TODO: This breaks the app if the video timeline is still loading.
  // Probably wait until the video timeline is loaded and render a loading wheel until then
  const handleCameraScreenCheckButtonPress = () =>
    navigation.navigate("UploadEditVideo");
  return (
    <TouchableOpacity
      onPress={handleCameraScreenCheckButtonPress}
      style={
        cameraScreenCheckButtonStyle
          ? cameraScreenCheckButtonStyle
          : shutterViewStyles.uploadImageButton
      }
    >
      <AntDesign
        name="check"
        size={CAMERA_SHUTTER_VIEW_ICON_SIZE}
        color="white"
      />
    </TouchableOpacity>
  );
}
