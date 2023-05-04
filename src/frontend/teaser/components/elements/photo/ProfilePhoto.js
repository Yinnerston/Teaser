import { StyleSheet, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  PROFILE_PHOTO_DIAMETER,
  SIDEBAR_MARGIN_BOTTOM,
} from "../../../Constants";
// Placeholder image
const personOutlineImage = require("../../../assets/person-outline.png");

/**
 * Profile photo shown on the teaser feed
 * @param navigation Use to navigate to profile page
 * @param profilePhotoUrl: str
 * @returns
 */
export default function ProfilePhoto({
  navigation,
  username,
  profilePhotoUrl,
}) {
  const imageSource =
    profilePhotoUrl !== "" ? { uri: profilePhotoUrl } : personOutlineImage;
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("ProfileViewFromFeed", { username: username })
      }
    >
      <Image style={styles.profilePhotoStyle} source={imageSource} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  profilePhotoStyle: {
    width: PROFILE_PHOTO_DIAMETER,
    height: PROFILE_PHOTO_DIAMETER,
    borderRadius: PROFILE_PHOTO_DIAMETER / 2,
    margin: 3,
    backgroundColor: "white",
    marginBottom: SIDEBAR_MARGIN_BOTTOM,
  },
});
