import { StyleSheet, View, Text } from "react-native";
import TeaserViewList from "../components/teaser/TeaserViewList";

export default function ForYouScreen({ route }) {
  return (
    <View style={styles.container}>
      <Text>TMP2</Text>
      <TeaserViewList route={route}></TeaserViewList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});