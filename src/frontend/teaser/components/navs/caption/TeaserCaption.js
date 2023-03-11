import { StyleSheet, View, Text } from "react-native";
import SeeMore from "react-native-see-more-inline";
/**
 * Container for the captions and tags of a teaser.
 * @param navigation
 * @param captionText
 * @param tags
 * @param actors
 * @returns
 */
export default function TeaserCaption(props) {
  // TODO: Linkify #tags / actors with navigation?
  const { navigation, captionData } = props;
  // const {captionText, tags, actors} = captionData;
  return (
    <View style={styles.container}>
      <Text style={styles.captionTitle}>@USERNAME OR STAGE_NAME</Text>
      <SeeMore
        numberOfLines={2}
        linkColor="white"
        style={styles.captionDescription}
      >
        {"TODO"}
      </SeeMore>
      <SeeMore
        numberOfLines={1}
        linkColor="white"
        style={styles.captionDescription}
      >
        {"TODO"}
      </SeeMore>
      <SeeMore
        numberOfLines={1}
        linkColor="white"
        style={styles.captionDescription}
      >
        {"TODO"}
      </SeeMore>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: "auto",
    backgroundColor: "green",
  },
  captionTitle: {
    fontWeight: "bold",
    fontSize: 16,
    color: "white",
  },
  captionDescription: {
    // fontWeight: "bold",
    fontSize: 12,
    color: "white",
  },
});
