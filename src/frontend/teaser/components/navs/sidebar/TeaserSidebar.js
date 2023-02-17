import { StyleSheet, View, Text, useWindowDimensions } from "react-native";

/**
 * Container for the sidebar of a teaser.
 * Handles likes, user profiles, comments, etc.
 * @returns
 */
export default function TeaserSidebar() {
  const styles = useSidebarStyle();
  return (
    <View style={styles.container}>
      <Text style={styles.sidebarText}>SIDEBAR</Text>
    </View>
  );
}

const useSidebarStyle = () => {
  const { height, width } = useWindowDimensions();
  const styles = StyleSheet.create({
    container: {
      position: "absolute",
      top: "auto",
      bottom: 16,
      left: "auto",
      right: 16,
      height: height / 2,
      backgroundColor: "yellow",
    },
    sidebarText: {
      fontSize: 10,
    },
  });
  return styles;
};
