import {
  View,
  StyleSheet,
  Text,
  useWindowDimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import { forwardRef } from "react";

/**
 * Grid Item (Card) displayed by ProfileTeaserGridView
 */
export const ProfileTeaserGridCard = forwardRef(
  function ProfileTeaserGridCard(props, ref) {
    const { videoIdx, viewCount, isPinned, videoURL, thumbnailURL, videoMode } =
      props;
    const styles = useProfileTeaserGridCardStyle();
    // https://github.com/wonday/react-native-image-cache-wrapper
    // TODO: Cachable image?

    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.image} onPress={() => {}}>
          <Image source={{ uri: thumbnailURL }} style={styles.image} />
          <Text style={styles.isPinnedText}>{isPinned ? "Pinned" : null}</Text>
          <Text style={styles.viewCountText}>{viewCount}</Text>
        </TouchableOpacity>
      </View>
    );
  },
);

const useProfileTeaserGridCardStyle = () => {
  const { height, width } = useWindowDimensions();
  const styles = StyleSheet.create({
    container: {
      height: height / 3,
      width: width / 3,
    },
    isPinnedText: {
      backgroundColor: "red",
      color: "white",
      position: "absolute",
      top: 0,
    },
    viewCountText: {
      backgroundColor: "green",
      color: "white",
      position: "absolute",
      bottom: 0,
    },
    image: {
      height: height / 3,
      width: width / 3,
      alignContent: "center",
      margin: "auto",
    },
  });
  return styles;
};
