import { useRef, useCallback, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  useWindowDimensions,
  ActivityIndicator,
  View,
  Text,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import {
  VIEWABILITY_CONFIG_THRESHOLD,
  STATUS_BAR_HEIGHT,
} from "../../Constants";
import { TeaserView } from "./TeaserView";
import { useScrollToTop } from "@react-navigation/native";
import { useInfiniteQuery } from "react-query";
import { getFeedQueryKey } from "../../hooks/feed/useFeed";
import { getPostsFeed } from "../../api/feed/postsFeedApi";
import { readOnlyUserAuthAtom } from "../../hooks/auth/useUserAuth";
import { useAtom } from "jotai";
import SplashScreen from "../../screens/SplashScreen";

/**
 * Renders a TikTok like feed of TeaserViews.
 * Videos automatically play if they are in the window.
 * Videos outside the window are paused.
 * https://snack.expo.dev/@aldrinc/optimized-video-flatlist
 * @returns FlatList of TeaserViews
 */
export default function TeaserViewList({ navigation }) {
  const windowDimensions = useWindowDimensions();
  const loadingStyles = useLoadingStyles();
  const [userAuthAtomValue] = useAtom(readOnlyUserAuthAtom);
  // Array of Refs to all the videos in the list
  const videoRefs = useRef([]);
  const scrollRef = useRef(null);
  useScrollToTop(scrollRef);
  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: VIEWABILITY_CONFIG_THRESHOLD,
    waitForInteraction: false,
  });
  // List of teaser video metadata rendered into a FlatList
  const feedQuery = useInfiniteQuery({
    queryKey: getFeedQueryKey(userAuthAtomValue),
    queryFn: getPostsFeed,
    getNextPageParam: (lastPage, allPages) => {
      const pageParam = lastPage.next
        ? lastPage.next.split("page=").pop().split("&")[0]
        : undefined;
      return pageParam;
    }, // TODO: implement cursor page number in backend
    keepPreviousData: true,
  });
  // Scroll to top of list on Home tab press
  useEffect(() => {
    const unsubscribe = navigation.addListener("tabPress", (e) => {
      // Prevent default behavior
      e.preventDefault();
      // TODO: Prevent too many consecutive tab presses. E.G. Only do
      // Scroll to top
      if (scrollRef.current) {
        scrollRef.current.scrollToOffset({ offset: 0 });
      }
      // Navigate to homepage
      navigation.navigate("Home");
    });

    // TODO: Pause video when no longer focused
    // https://reactnavigation.org/docs/function-after-focusing-screen/

    return unsubscribe;
  }, [navigation]);

  /**
   * Function to render each TeaserView element in the flatlist.
   */
  const renderTeaserViewItem = useCallback(
    ({ item }) => {
      return (
        <TeaserView
          videoURL={item.video_url}
          thumbnailURL={item.thumbnail_url}
          videoMode={item.video_mode}
          videoIdx={item.post_id}
          ref={videoRefs}
          navigation={navigation}
          // Post data for UI
          captionData={{
            description: item.description,
            username: item.username,
            stageName: item.stage_name,
            songId: "",
            songTitle: "ORIGINAL SOUND",
          }}
          sidebarData={{
            username: item.username,
            profilePhotoUrl: item.profile_photo_url,
            likeCount: item.reddit_score,
            bookmarkCount: item.reddit_score,
            commentCount: item.reddit_score,
            shareCount: item.reddit_score,
          }}
        ></TeaserView>
      );
    },
    [feedQuery, videoRefs],
  );

  /**
   * Play videos that take up >= viewAreaCoveragePercentThreshold % of the window.
   * Pause videos that are not in the window anymore.
   */
  const handleOnViewableItemsChanged = ({ changed }) => {
    changed.forEach((element) => {
      const cell = videoRefs.current[element.item.post_id];
      if (cell) {
        if (element.isViewable) {
          cell.playAsync();
        } else {
          cell.pauseAsync();
        }
      }
    });
  };

  if (feedQuery.isLoading) {
    return (
      <View style={loadingStyles.container}>
        <Text style={loadingStyles.splashLogo}>TEASER</Text>
        <ActivityIndicator size="large" color="gray" />
      </View>
    );
  }
  if (feedQuery.isError) {
    console.Error(feedQuery.error);
    return <Text>Error...</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={feedQuery.data.pages.map((page) => page.results).flat()}
        ref={scrollRef}
        renderItem={renderTeaserViewItem}
        keyExtractor={(item) => item.post_id.toString()}
        onViewableItemsChanged={handleOnViewableItemsChanged}
        // Determines how the video snaps
        viewabilityConfig={viewabilityConfig.current}
        snapToInterval={windowDimensions.height - STATUS_BAR_HEIGHT}
        decelerationRate="fast"
        snapToAlignment="start"
        // TODO: Load next chunk of flatlist from recommendation algorithm
        onEndReached={() => {
          console.log("END REACHED, FETCHING NEW PAGE");

          if (feedQuery.isFetchingNextPage) return;
          if (feedQuery.hasNextPage) {
            feedQuery.fetchNextPage();
          }
        }}
        onEndReachedThreshold={0}
        initialNumToRender={3}
        maxToRenderPerBatch={3}
        windowSize={5}
        removeClippedSubviews={true}
      ></FlatList>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const useLoadingStyles = () => {
  const { height, width } = useWindowDimensions();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: "black",
      alignContent: "center",
      height: height,
      width: width,
    },
    splashLogo: {
      margin: "auto",
      fontSize: 32,
      margin: "auto",
      color: "white",
      fontWeight: "bold",
      // fontFamily: "Georgia",
    },
  });
  return styles;
};
