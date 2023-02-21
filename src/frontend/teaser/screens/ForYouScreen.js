import { StyleSheet, View, Text } from "react-native";
import TeaserViewList from "../components/teaser/TeaserViewList";

export default function ForYouScreen() {
  return (
    <View style={styles.container}>
      <TeaserViewList></TeaserViewList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
