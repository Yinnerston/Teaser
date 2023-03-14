import { StyleSheet, View, Text } from "react-native";

/**
 * Horizontal Flexbox Table showing all the button
 * on a user profile.
 * @param {*} props
 * @returns
 */
export default function ProfileStatsTable(props) {
  return (
    <View style={styles.container}>
      <Text>FOLLOWING | FOLLOWERS | LIKES</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
});
