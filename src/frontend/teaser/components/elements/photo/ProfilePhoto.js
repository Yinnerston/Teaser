import { StyleSheet, Image } from "react-native";

// Placeholder image
const personOutlineImage = require("../../../assets/person-outline.png");

/**
 * Profile photo shown on the teaser feed
 * @returns
 */
export default function ProfilePhoto() {
  return <Image style={styles.profilePhotoStyle} source={personOutlineImage} />;
}

const styles = StyleSheet.create({
  profilePhotoStyle: {
    width: 32,
    height: 32,
    borderRadius: 16, // width or height / 2 ?
    margin: 3,
    backgroundColor: "white",
  },
});
