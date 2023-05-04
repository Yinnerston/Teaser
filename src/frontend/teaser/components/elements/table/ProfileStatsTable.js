import { StyleSheet, View, Text } from "react-native";

/**
 * Horizontal Flexbox Table showing all the button
 * on a user profile.
 * @param {nFollowing, nFollowers, nLikes} props
 * @returns
 */
export default function ProfileStatsTable({ nFollowing, nFollowers, nLikes }) {
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.statsText}>{nFollowing}</Text>
        <Text style={styles.emphasisText}>FOLLOWING</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.statsText}>{nFollowers}</Text>
        <Text style={styles.emphasisText}>FOLLOWERS</Text>
      </View>
      <View style={{ ...styles.section, borderRightWidth: 0 }}>
        <Text style={styles.statsText}>{nLikes}</Text>
        <Text style={styles.emphasisText}>LIKES</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 240,
    marginVertical: 5,
  },
  section: {
    flex: 1,
    borderRightColor: "#D3D3D3",
    borderRightWidth: 1,
  },
  statsText: {
    fontWeight: "bold",
    textAlign: "center",
  },
  emphasisText: {
    textAlign: "center",
    color: "gray",
    fontSize: 10,
  },
});
