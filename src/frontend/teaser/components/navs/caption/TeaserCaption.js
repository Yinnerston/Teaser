import { StyleSheet, View, Text } from "react-native";
import SeeMoreTextExpandable from "../../elements/text/SeeMoreTextExpandable";

/**
 * Container for the captions and tags of a teaser.
 * @param navigation
 * @param captionData
 *  @param captionData.description
 *  @param captionData.username
 *  @param captionData.stageName
 *  @param captionData.songId
 *  @param captionData.songTitle
 * @returns
 */
export default function TeaserCaption(props) {
  // TODO: Linkify #tags / actors with navigation?
  const { navigation, captionData } = props;
  const { description, username, stageName, songId, songTitle } = captionData;

  // const {captionText, tags, actors} = captionData;
  return (
    <View style={styles.container}>
      <Text style={styles.captionTitle}>
        {stageName ? stageName : username}
      </Text>
      <SeeMoreTextExpandable
        numberOfLines={2}
        textBody={description}
        textStyle={styles.captionDescription}
      ></SeeMoreTextExpandable>
      <SeeMoreTextExpandable
        numberOfLines={1}
        textBody={songTitle}
        textStyle={styles.captionDescription}
      ></SeeMoreTextExpandable>
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
    maxWidth: 200,
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
