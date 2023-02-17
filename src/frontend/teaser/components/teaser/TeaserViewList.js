import { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  useWindowDimensions,
} from "react-native";
import { HOMEPAGE_FOOTER_HEIGHT } from "../../Constants";
import TeaserView from "./TeaserView";

const PLAYLIST = [
  {
    data: {
      id: "7b01992c65d10978a5cbb0ccc5e83ef0",
      title: "Most awesome Cat Video",
      author: "Myself",
      likes: 21,
      commentCount: 0,
    },
    video: {
      videoURL: "https://i.imgur.com/xaAAjDk.mp4",
      thumbnailURL: "https://i.imgur.com/OYCAEpd.png",
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
    },
  },
];

export default function TeaserViewList() {
  const [curData, setCurData] = useState({});
  const [curVideo, setCurVideo] = useState({});
  const windowDimensions = useWindowDimensions();
  const onViewableItemsChange = ({ changed, viewableItems }) => {
    // Set the data object
    console.log(changed, viewableItems);
    console.log("I am here");
    // Set the video object
    // Seek to the start of the video
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* TODO: Render as flatlist with scrollToItem snapping like TikTok */}
      <FlatList
        data={PLAYLIST}
        renderItem={({ item }) => (
          <TeaserView
            videoURL={item.video.videoURL}
            thumbnailURL={item.video.thumbnailURL}
          ></TeaserView>
        )}
        keyExtractor={(item) => item.data.id}
        onViewableItemsChange={onViewableItemsChange}
        viewabilityConfig={{
          viewAreaCoveragePercentThreshold: 60,
          waitForInteraction: true,
        }}
        snapToInterval={windowDimensions.height}
        decelerationRate="fast"
        snapToAlignment="start"
      ></FlatList>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
