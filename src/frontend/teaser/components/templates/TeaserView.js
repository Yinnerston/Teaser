import { View, StyleSheet, useWindowDimensions } from "react-native";
import TeaserCaption from "../navs/caption/TeaserCaption";
import TeaserHeader from "../navs/header/TeaserHeader";
import TeaserSidebar from "../navs/sidebar/TeaserSidebar";
import { TeaserVideo } from "../navs/video/TeaserVideo";
import { forwardRef } from "react";

/**
 *  Container for all the components that make up a teaser.
 * Defines sequence of videos to load.
 * @argument thumbnailURL Url to the thumbnail
 * @argument videoURL Url to the video .mp4 file
 * @argument videoMode enum {VIDEO_PORTRAIT, VIDEO_LANDSCAPE}
 * @argument videoIdx id of the video
 * @returns
 */
export const TeaserView = forwardRef(function TeaserView(props, ref) {
  const {
    videoURL,
    thumbnailURL,
    videoMode,
    videoIdx,
    navigation,
    captionData,
    sidebarData,
  } = props;
  const styles = useTeaserViewStyle();
  return (
    <View style={styles.container}>
      <TeaserVideo
        videoURL={{ uri: videoURL }}
        thumbnailURL={{ uri: thumbnailURL }}
        videoMode={videoMode}
        videoIdx={videoIdx}
        ref={ref}
      ></TeaserVideo>
      <TeaserHeader></TeaserHeader>
      <TeaserSidebar navigation={navigation} sidebarData={sidebarData} />
      <TeaserCaption navigation={navigation} captionData={captionData} />
    </View>
  );
});

const useTeaserViewStyle = () => {
  const { height, width } = useWindowDimensions();
  const styles = StyleSheet.create({
    container: {
      backgroundColor: "#25292e",
      alignItems: "center",
      justifyContent: "center",
      height: height,
    },
  });
  return styles;
};
