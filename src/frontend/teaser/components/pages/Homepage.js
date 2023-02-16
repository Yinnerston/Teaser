import { StyleSheet, View } from "react-native";
import ForYouPage from "./ForYouPage";
import FollowingPage from "./FollowingPage";
import HomepageFooter from "../navs/footer/HomepageFooter";

/**
 * Homepage containing ForYou and Following pages.
 * @returns
 */
export default function HomePage() {
  return (
    <View style={styles.homepageContainer}>
      <ForYouPage style={{ flex: 1 }} />
      {/* <FollowingPage /> */}
      <HomepageFooter style={{ flex: 2 }}></HomepageFooter>
    </View>
  );
}

const styles = StyleSheet.create({
  homepageContainer: {
    flexDirection: "column",
  },
});
