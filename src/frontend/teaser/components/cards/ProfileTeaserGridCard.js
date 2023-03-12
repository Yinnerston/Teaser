import { TeaserVideo } from "../navs/video/TeaserVideo";
import { View, StyleSheet, Text, useWindowDimensions } from "react-native";
import { forwardRef } from "react";

/**
 * Grid Item (Card) displayed by ProfileTeaserGridView
 */
export const ProfileTeaserGridCard = forwardRef(
  function ProfileTeaserGridCard(props, ref) {
    const { videoIdx, viewCount, isPinned, videoURL, thumbnailURL, videoMode } =
      props;
    const { styles, profileTeaserVideoStyles } =
      useProfileTeaserGridCardStyle();
    // https://github.com/wonday/react-native-image-cache-wrapper
    // TODO: Cachable image?
    return (
      <View style={styles.container}>
        <TeaserVideo
          videoURL={{ uri: videoURL }}
          thumbnailURL={{ uri: thumbnailURL }}
          videoMode={videoMode}
          videoIdx={videoIdx}
          ref={ref}
          style={profileTeaserVideoStyles}
        ></TeaserVideo>
        <Text style={styles.isPinnedText}>{isPinned ? "Pinned" : null}</Text>
        <Text style={styles.viewCountText}>{viewCount}</Text>
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
      position: "absolute",
      top: 0,
    },
    viewCountText: {
      backgroundColor: "green",
      color: "white",
      position: "absolute",
      bottom: 0,
    },
  });
  const profileTeaserVideoStyles = StyleSheet.create({
    video: {
      height: height / 3,
      width: width / 3,
      alignContent: "center",
      margin: "auto",
    },
    playIcon: {
      position: "absolute",
      top: height / 6 - 24,
      left: width / 6 - 24,
      justifyContent: "center",
      alignItems: "center",
      opacity: 0.7,
    },
  });
  return { styles, profileTeaserVideoStyles };
};
