import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import TeaserCaption from "../navs/caption/TeaserCaption";
import TeaserHeader from "../navs/header/TeaserHeader";
import TeaserSidebar from "../navs/sidebar/TeaserSidebar";
import TeaserVideo from "../navs/video/TeaserVideo";

const PLAYLIST = [
  {
    data: {
      title: "Most awesome Cat Video",
      author: "Myself",
      likes: 21,
      commentCount: 0,
    },
    video: {
      videoURL: "https://i.imgur.com/xaAAjDk.mp4",
      thumbnailURL: "https://i.imgur.com/OYCAEpd.png"

    }
  },

  {
    data: {
      title: "I heckin' love beans on toast",
      author: "BeansOnToast",
      likes: 12,
      commentCount: 0,
    },
    video: {
      videoURL: "https://i.imgur.com/9RwUfgJ.mp4",
      thumbnailURL: "https://i.imgur.com/MlCqb3r.png"
    }
  },
]

/**
 *  Container for all the components that make up a teaser.
 * Defines sequence of videos to load.
 * @returns 
 */
export default function TeaserView()    {
    // const [post, setPost] = useState(props.post);
    return (
        <View style={styles.container}>
          <TeaserHeader></TeaserHeader>
          <TeaserVideo videoURL={{uri: PLAYLIST[0].video.videoURL}} thumbnailURL={{uri: PLAYLIST[0].video.thumbnailURL}}></TeaserVideo>
          <TeaserSidebar></TeaserSidebar>
          <TeaserCaption></TeaserCaption>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#25292e',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  