import { Feather } from "@expo/vector-icons";
import { TouchableOpacity, Text } from "react-native";
import { shutterViewStyles } from "./styles";
import { VIDEO_EDITOR_SIDEBAR_BUTTON_SIZE } from "../../../../Constants";
import { enqueueAtomAtom } from "../../../../hooks/upload/useMainVideoQueue";
import { useSetAtom } from "jotai";
import * as ExpoFileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";

/**
 * Back button used to import images
 * @param {onPress, uploadImageButtonStyle, colour, textColor } props
 * @returns
 */
export default function UploadImageButton(props) {
  const { onPress, uploadImageButtonStyle, color, textColor } = props;
  const setEnqueueAtomAtom = useSetAtom(enqueueAtomAtom);

  const onPressImageButton = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos, // TODO: Allow images. This currently only works for videos
      allowsEditing: true,
      aspect: [9, 16],
      quality: 1,
    });

    if (!result.canceled) {
      setEnqueueAtomAtom({
        video: {
          duration: result.assets[0].duration,
          path: result.assets[0].uri,
          size: 0,
        },
      });
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress ? onPress : onPressImageButton}
      style={
        uploadImageButtonStyle
          ? uploadImageButtonStyle
          : shutterViewStyles.uploadImageButton
      }
    >
      <Feather
        name="image"
        size={VIDEO_EDITOR_SIDEBAR_BUTTON_SIZE}
        color={color ? color : "white"}
      />
      <Text
        style={{
          color: textColor ? textColor : "white",
          textShadowColor: "gray",
          textShadowOffset: { width: 0, height: 1 },
          textShadowRadius: 1,
          fontSize: 12,
          textAlign: "center",
        }}
      >
        Upload
      </Text>
    </TouchableOpacity>
  );
}
