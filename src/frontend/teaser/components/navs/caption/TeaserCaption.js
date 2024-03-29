import { StyleSheet, View, Text } from "react-native";
import SeeMoreTextExpandable from "../../elements/text/SeeMoreTextExpandable";
import { TouchableOpacity } from "react-native-gesture-handler";
/**
 * Container for the captions and tags of a teaser.
 * @param {navigation, captionData} props
 * @param {description, username, stageName, songId, songTitle} ^^captionData
 */
export default function TeaserCaption(props) {
  // TODO: Linkify #tags / actors with navigation?
  const { navigation, captionData } = props;
  const { description, username, stageName, songId, songTitle } = captionData;

  // const {captionText, tags, actors} = captionData;
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("ProfileViewFromFeed", { username: username })
        }
      >
        <Text style={styles.captionTitle}>
          {stageName ? stageName : username}
        </Text>
      </TouchableOpacity>
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
    maxWidth: 200,
  },
  captionTitle: {
    fontWeight: "bold",
    fontSize: 16,
    color: "white",
    textShadowColor: "gray",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  captionDescription: {
    // fontWeight: "bold",
    fontSize: 12,
    color: "white",
    textShadowColor: "gray",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
});
