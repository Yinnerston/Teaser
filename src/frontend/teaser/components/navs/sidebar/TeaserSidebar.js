import { StyleSheet, View, Text } from "react-native";

/**
 * Container for the sidebar of a teaser.
 * Handles likes, user profiles, comments, etc.
 * @returns
 */
export default function TeaserSidebar() {
  return (
    <View>
      <Text style={styles.sidebarText}>Sidebar</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  sidebarText: {
    fontSize: 10,
  },
});
