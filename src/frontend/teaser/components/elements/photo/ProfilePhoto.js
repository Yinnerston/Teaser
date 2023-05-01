import { StyleSheet, Image } from "react-native";

// Placeholder image
const personOutlineImage = require("../../../assets/person-outline.png");

/**
 * Profile photo shown on the teaser feed
 * @param profilePhotoUrl: str
 * @returns
 */
export default function ProfilePhoto({ profilePhotoUrl }) {
  const imageSource =
    profilePhotoUrl !== "" ? { uri: profilePhotoUrl } : personOutlineImage;
  return <Image style={styles.profilePhotoStyle} source={imageSource} />;
}

const styles = StyleSheet.create({
  profilePhotoStyle: {
    width: 36,
    height: 36,
    borderRadius: 18, // width or height / 2 ?
    margin: 3,
    backgroundColor: "white",
    marginBottom: 20,
  },
});
