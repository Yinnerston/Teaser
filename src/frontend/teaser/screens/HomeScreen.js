import { StyleSheet, View, Text } from "react-native";
import ForYouScreen from "./ForYouScreen";

/**
 * Home Screen containing ForYou and Following screens.
 * @returns
 */
export default function HomeScreen() {
  return (
    <View style={styles.homescreenContainer}>
      <ForYouScreen style={{ flex: 1 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  homescreenContainer: {
    flexDirection: "column",
  },
});
