import { useRef, useState, useCallback } from "react";
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  useWindowDimensions,
} from "react-native";
import {
  VIDEO_LANDSCAPE,
  VIDEO_PORTRAIT,
  VIEWABILITY_CONFIG_THRESHOLD,
} from "../../Constants";
import TeaserView from "./TeaserView";

const PLAYLIST = [
  {
    data: {
      id: "7b01992c65d10978a5cbb0ccc5e83ef0",
      title: "Most awesome Cat Video",
      author: "Myself",
      likes: 21,
      commentCount: 0,
      playingIdx: 0,
    },
    video: {
      videoURL: "https://i.imgur.com/xaAAjDk.mp4",
      thumbnailURL: "https://i.imgur.com/OYCAEpd.png",
      videoMode: VIDEO_PORTRAIT,
    },
  },

  {
    data: {
      id: "254aed11d93529b5c0413cb44b86d16c",
      title: "I heckin' love beans on toast",
      author: "BeansOnToast",
      likes: 12,
      commentCount: 0,
    },
    video: {
      videoURL: "https://i.imgur.com/9RwUfgJ.mp4",
      thumbnailURL: "https://i.imgur.com/MlCqb3r.png",
      videoMode: VIDEO_PORTRAIT,
    },
  },
  {
    data: {
      id: "62927b9918c2868d1dc29cd355cb74f1",
      title: "It's so sad..",
      author: "Dr Manhatten",
      likes: 23,
      commentCount: 0,
    },
    video: {
      videoURL: "https://i.imgur.com/6UGTKlH.mp4",
      thumbnailURL: "https://i.imgur.com/2pt4fKv.jpeg",
      videoMode: VIDEO_LANDSCAPE,
    },
  },
  {
    data: {
      id: "31fc4e5909e09bf3163be8cbacce6250",
      title: "Sigma Female",
      author: "Audrey Tate",
      likes: 24,
      commentCount: 0,
    },
    video: {
      videoURL: "https://i.imgur.com/7JTRTzw.mp4",
      thumbnailURL: "https://i.imgur.com/4ZAjB8X.png",
      videoMode: VIDEO_PORTRAIT,
    },
  },
  {
    data: {
      id: "8c4183952b01b88ac9707e34bb21ae26",
      title: "Sharkskin Warning",
      author: "The Expert",
      likes: 6,
      commentCount: 0,
    },
    video: {
      videoURL: "https://i.imgur.com/OO6Yk2f.mp4",
      thumbnailURL: "https://i.imgur.com/lhaXT6Y.png",
      videoMode: VIDEO_PORTRAIT,
    },
  },
  {
    data: {
      id: "5ef0c224edb9d7adaa6bae1c43152fb4",
      title: "CAM ON INGERLAND",
      author: "Marissa Touhou",
      likes: 44,
      commentCount: 0,
    },
    video: {
      videoURL: "https://i.imgur.com/QlHUHfc.mp4",
      thumbnailURL: "https://i.imgur.com/0mmvi7g.png",
      videoMode: VIDEO_LANDSCAPE,
    },
  },
];

export default function TeaserViewList() {
  const windowDimensions = useWindowDimensions();

  const renderTeaserViewItem = useCallback(({ item }) => {
    return (
      <TeaserView
        videoURL={item.video.videoURL}
        thumbnailURL={item.video.thumbnailURL}
        videoMode={item.video.videoMode}
      ></TeaserView>
    );
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* TODO: Render as flatlist with scrollToItem snapping like TikTok */}
      <FlatList
        data={PLAYLIST}
        renderItem={renderTeaserViewItem}
        keyExtractor={(item) => item.data.id.toString()}
        // Determines how the video snaps
        viewabilityConfig={{
          viewAreaCoveragePercentThreshold: VIEWABILITY_CONFIG_THRESHOLD,
          waitForInteraction: true,
          itemVisiblePercentThreshold: VIEWABILITY_CONFIG_THRESHOLD,
        }}
        snapToInterval={windowDimensions.height}
        decelerationRate="fast"
        snapToAlignment="start"
        // TODO: Load next chunk of flatlist from recommendation algorithm
        // onEndReached={}
        // onEndReachedThreshold={1}
      ></FlatList>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
