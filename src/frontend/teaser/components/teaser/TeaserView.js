import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import TeaserCaption from "../navs/caption/TeaserCaption";
import TeaserHeader from "../navs/header/TeaserHeader";
import TeaserSidebar from "../navs/sidebar/TeaserSidebar";
import TeaserVideo from "../navs/video/TeaserVideo";

/**
 *  Container for all the components that make up a teaser.
 * Defines sequence of videos to load.
 * @returns
 */
export default function TeaserView(props) {
  // const [post, setPost] = useState(props.post);
  const [isReloaded, setIsReloaded] = useState(false);

  return (
    <View style={styles.container}>
      <TeaserHeader></TeaserHeader>
      <TeaserVideo
        videoURL={{ uri: props.videoURL }}
        thumbnailURL={{ uri: props.thumbnailURL }}
      ></TeaserVideo>
      <TeaserSidebar></TeaserSidebar>
      <TeaserCaption></TeaserCaption>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#25292e",
    alignItems: "center",
    justifyContent: "center",
  },
});
