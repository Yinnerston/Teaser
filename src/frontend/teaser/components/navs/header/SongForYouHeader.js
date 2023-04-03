import { View, Text, StyleSheet } from "react-native";
import { Link } from "@react-navigation/native";

export default function SongForYouHeader() {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>For You</Text>
      <Link to={{ screen: "UploadSeeMoreSongsScreen" }} style={styles.linkText}>
        See More
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 24,
    marginVertical: 4,
  },
  titleText: {
    position: "absolute",
    fontWeight: "bold",
    left: 16,
    fontSize: 16,
    bottom: 0,
  },
  linkText: {
    position: "absolute",
    right: 16,
    bottom: 0,
    color: "gray",
    fontSize: 12,
  },
});
