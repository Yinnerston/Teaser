import { SafeAreaView, StyleSheet, FlatList } from "react-native";
import TeaserView from "../teaser/TeaserView";

const PLAYLIST = [
  {
    data: {
      id: 1,
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
      id: 2,
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

export default function ForYouPage()    {
    return (
        <SafeAreaView style={styles.container}>
          {/* TODO: Render as flatlist with scrollToItem snapping like TikTok */}
          <FlatList data={PLAYLIST} renderItem={({item}) => {<TeaserView videoURL={item.video.videoURL} thumbnailURL={item.video.thumbnailURL}></TeaserView>}} keyExtractor={item => item.data.id}></FlatList>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {

    }
})
