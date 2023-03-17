import { Feather } from "@expo/vector-icons";
import { TouchableOpacity, Text } from "react-native";
import { shutterViewStyles } from "./styles";
import { VIDEO_EDITOR_SIDEBAR_BUTTON_SIZE } from "../../../../Constants";
import * as ExpoFileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";

/**
 * Back button used to import images
 * @param {onPress, uploadImageButtonStyle} props
 * @returns
 */
export default function UploadImageButton(props) {
  const { onPress, uploadImageButtonStyle } = props;
  const onPressImageButton = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <TouchableOpacity
      onPress={onPressImageButton}
      style={
        uploadImageButtonStyle
          ? uploadImageButtonStyle
          : shutterViewStyles.uploadImageButton
      }
    >
      <Feather
        name="image"
        size={VIDEO_EDITOR_SIDEBAR_BUTTON_SIZE}
        color="white"
      />
      <Text style={{ color: "white", fontSize: 12, textAlign: "center" }}>
        Upload
      </Text>
    </TouchableOpacity>
  );
}
