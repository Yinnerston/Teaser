import { StyleSheet, View } from "react-native";
import TeaserViewList from "../teaser/TeaserViewList";

export default function ForYouPage() {
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
