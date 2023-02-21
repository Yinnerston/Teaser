import { StyleSheet, View, Text } from "react-native";
import ForYouScreen from "./ForYouScreen";
import FollowingScreen from "./FollowingScreen";
import HomeScreenFooter from "../components/navs/footer/HomeScreenFooter";

/**
 * Home Screen containing ForYou and Following screens.
 * @returns
 */
export default function HomeScreen() {
  return (
    <View style={styles.homescreenContainer}>
      <ForYouScreen style={{ flex: 1 }} />
      {/* <FollowingScreen /> */}
      <HomeScreenFooter style={{ flex: 1 }}></HomeScreenFooter>
    </View>
  );
}

const styles = StyleSheet.create({
  homescreenContainer: {
    flexDirection: "column",
  },
});
