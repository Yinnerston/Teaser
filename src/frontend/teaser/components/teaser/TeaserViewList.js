import { SafeAreaView, StyleSheet, FlatList, Dimensions } from "react-native";
import TeaserView from "./TeaserView";

const {width, height} = Dimensions.get('window');

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
      thumbnailURL: "https://i.imgur.com/OYCAEpd.png"

    }
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
      thumbnailURL: "https://i.imgur.com/MlCqb3r.png"
    }
  },
]

export default function TeaserViewList()    {
    // const onViewableItemsChange = () => {
    // }

    return (
        <SafeAreaView style={styles.container}>
          {/* TODO: Render as flatlist with scrollToItem snapping like TikTok */}
          <FlatList data={PLAYLIST} renderItem={({item}) => (<TeaserView videoURL={item.video.videoURL} thumbnailURL={item.video.thumbnailURL} snapToInterval={height} snapToAlignment="start"></TeaserView>)} ></FlatList>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
