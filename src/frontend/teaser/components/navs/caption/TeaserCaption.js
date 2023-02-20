import { StyleSheet, View, Text } from "react-native";

/**
 * Container for the captions and tags of a teaser.
 * @returns
 */
export default function TeaserCaption() {
  return (
    <View style={styles.container}>
      <Text style={styles.captionText}>CAPTION</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: "auto",
    backgroundColor: "green",
  },
  captionText: {
    fontWeight: "bold",
  },
});
