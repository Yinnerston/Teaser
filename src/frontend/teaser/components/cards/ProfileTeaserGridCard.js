import {
  View,
  StyleSheet,
  Text,
  useWindowDimensions,
  Image,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRef, useState } from "react";
import { Video } from "expo-av";
import { numberFormatter } from "../../utils/numberFormatter";
import { VIDEO_PORTRAIT } from "../../Constants";

/**
 * Grid Item (Card) displayed by ProfileTeaserGridView.
 * If thumbnailURL is invalid, image defaults to Fujiwara gif.
 */
export function ProfileTeaserGridCard(props, ref) {
  const { videoIdx, viewCount, isPinned, videoURL, thumbnailURL, videoMode } =
    props;
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const videoRef = useRef(null);
  const styles = useProfileTeaserGridCardStyle();
  // https://github.com/wonday/react-native-image-cache-wrapper
  // TODO: Cachable image?

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.image}
        onPress={() => setIsPlayingVideo((prev) => !prev)}
      >
        {isPlayingVideo ? (
          <Video
            source={
              videoURL !== ""
                ? { uri: videoURL }
                : { uri: "https://i.imgur.com/Xi20BYv.gif" }
            }
            ref={videoRef}
            isLooping={true}
            shouldPlay={true}
            style={{
              ...styles.image,
              resizeMode: videoMode === VIDEO_PORTRAIT ? "cover" : "contain",
            }}
          />
        ) : (
          <Image
            source={
              thumbnailURL !== ""
                ? { uri: thumbnailURL }
                : { uri: "https://i.imgur.com/Xi20BYv.gif" }
            }
            style={styles.image}
          />
        )}
        <Text style={styles.isPinnedText}>{isPinned ? "Pinned" : null}</Text>
        <Text style={styles.viewCountText}>
          {numberFormatter.format(viewCount)}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

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
      color: "white",
      fontWeight: "bold",
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
