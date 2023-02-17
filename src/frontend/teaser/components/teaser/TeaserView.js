import { useState } from "react";
import { View, Text, StyleSheet, useWindowDimensions } from "react-native";
import TeaserCaption from "../navs/caption/TeaserCaption";
import TeaserHeader from "../navs/header/TeaserHeader";
import TeaserSidebar from "../navs/sidebar/TeaserSidebar";
import TeaserVideo from "../navs/video/TeaserVideo";
import { HOMEPAGE_FOOTER_HEIGHT } from "../../Constants";

/**
 *  Container for all the components that make up a teaser.
 * Defines sequence of videos to load.
 * @returns
 */
export default function TeaserView(props) {
  // const [post, setPost] = useState(props.post);
  const [isReloaded, setIsReloaded] = useState(false);
  const styles = useTeaserViewStyle();
  return (
    <View style={styles.container}>
      <TeaserVideo
        videoURL={{ uri: props.videoURL }}
        thumbnailURL={{ uri: props.thumbnailURL }}
      ></TeaserVideo>
      <TeaserHeader></TeaserHeader>
      <TeaserSidebar></TeaserSidebar>
      <TeaserCaption></TeaserCaption>
    </View>
  );
}

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
