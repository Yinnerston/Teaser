import { View, Text, StyleSheet } from "react-native";

/**
 * Container for header of a Teaser.
 * Handles seeking between ForYou / Following.
 * @returns
 */
export default function TeaserHeader() {
  return (
    <View style={styles.header}>
      <Text>HEADER</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    top: 32,
    left: "auto",
    right: "auto",
    backgroundColor: "red",
  },
});
