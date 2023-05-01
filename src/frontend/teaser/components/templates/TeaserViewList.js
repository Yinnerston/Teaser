import { useRef, useCallback, useMemo } from "react";
import {
  SafeAreaView,
  StyleSheet,
  useWindowDimensions,
  Text,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import {
  VIDEO_LANDSCAPE,
  VIDEO_PORTRAIT,
  VIEWABILITY_CONFIG_THRESHOLD,
  STATUS_BAR_HEIGHT,
  PAGINATION_LIMIT,
} from "../../Constants";
import { TeaserView } from "./TeaserView";
import { useScrollToTop } from "@react-navigation/native";
import { useQueryClient, useInfiniteQuery } from "react-query";
import { getFeedQueryKey } from "../../hooks/feed/useFeed";
import { getPostsFeed } from "../../api/feed/postsFeedApi";
import { readOnlyUserAuthAtom } from "../../hooks/auth/useUserAuth";
import { useAtom } from "jotai";

const PLAYLIST = [
  {
    data: {
      id: "7b01992c65d10978a5cbb0ccc5e83ef0",
      captionData: {
        description:
          "Most awesome Cat Video! Most awesome Cat Video! Most awesome Cat Video! Most awesome Cat Video!Most awesome Cat Video!Most awesome Cat Video!Most awesome Cat Video!Most awesome Cat Video! #cat #catVideo",
        username: "@myself",
        stageName: "Cat Person",
        songId: "",
        songTitle: "ORIGINAL SOUND",
        // actors: []
      },
      sidebarData: {
        likeCount: 21,
        bookmarkCount: 0,
        commentCount: 0,
        shareCount: 0,
      },
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
      captionData: {
        description: "I heckin' love beans on toast",
        username: "@BeansOnToast",
        stageName: "",
        songId: "",
        songTitle: "ORIGINAL SOUND",
        // actors: []
      },
      sidebarData: {
        likeCount: 21,
        bookmarkCount: 33,
        commentCount: 0,
        shareCount: 0,
      },
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
      captionData: {
        description: "It's so sad..",
        username: "@drmanhattan",
        stageName: "Doctor Manhattan",
        songId: "",
        songTitle: "ORIGINAL SOUND",
        // actors: []
      },
      sidebarData: {
        likeCount: 21,
        bookmarkCount: 49,
        commentCount: 0,
        shareCount: 0,
      },
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
      captionData: {
        description: "Sigma Female",
        username: "@audreyT",
        stageName: "Audrey Tate",
        songId: "",
        songTitle: "ORIGINAL SOUND",
        // actors: []
      },
      sidebarData: {
        likeCount: 24,
        bookmarkCount: 23,
        commentCount: 22,
        shareCount: 21,
      },
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
      captionData: {
        description: "Sharkskin warning",
        username: "@theExpert",
        stageName: "",
        songId: "",
        songTitle: "ORIGINAL SOUND",
        // actors: []
      },
      sidebarData: {
        likeCount: 6,
        bookmarkCount: 6,
        commentCount: 6,
        shareCount: 6,
      },
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
      captionData: {
        description: "CAM ON INGERLAND",
        username: "@marissa",
        stageName: "Marissa Touhou",
        songId: "",
        songTitle: "ORIGINAL SOUND",
        // actors: []
      },
      sidebarData: {
        likeCount: 44,
        bookmarkCount: 46,
        commentCount: 6,
        shareCount: 6,
      },
    },
    video: {
      videoURL: "https://i.imgur.com/QlHUHfc.mp4",
      thumbnailURL: "https://i.imgur.com/0mmvi7g.png",
      videoMode: VIDEO_LANDSCAPE,
    },
  },
];

function basicHash(inputString) {
  let hash = 0;
  for (let i = 0; i < inputString.length; i++) {
    const char = inputString.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash &= hash; // Convert to 32bit integer
  }
  return new Uint32Array([hash])[0].toString(36);
}

/**
 * Renders a TikTok like feed of TeaserViews.
 * Videos automatically play if they are in the window.
 * Videos outside the window are paused.
 * @returns FlatList of TeaserViews
 */
export default function TeaserViewList({ navigation }) {
  const windowDimensions = useWindowDimensions();
  const [userAuthAtomValue] = useAtom(readOnlyUserAuthAtom);
  // Array of Refs to all the videos in the list
  const videoRefs = useRef([]);
  const scrollRef = useRef(null);
  useScrollToTop(scrollRef);

  // List of teaser video metadata rendered into a FlatList
  const feedQuery = useInfiniteQuery({
    queryKey: getFeedQueryKey(userAuthAtomValue),
    queryFn: getPostsFeed,
    getNextPageParam: (lastPage, allPages) => {
      const pageParam = lastPage.next
        ? lastPage.next.split("page=").pop().split("&")[0]
        : undefined;
      console.log(
        "LastPage has n entries:",
        lastPage.results.length,
        pageParam,
      );
      return pageParam;
    }, // TODO: implement cursor page number in backend
    keepPreviousData: true,
  });
  // Scroll to top of list on Home tab press
  // useEffect(() => {
  //   const unsubscribe = navigation.addListener("tabPress", (e) => {
  //     // Prevent default behavior
  //     e.preventDefault();
  //     // TODO: Prevent too many consecutive tab presses. E.G. Only do
  //     // const now = new Date();
  //     // if ((now.getTime() - homeButtonTaps.slice(-1).getTime()) / 1000 < 1)
  //     // TODO: Get new posts --> Implement in backend
  //     // TODO: Handle async data get in useEffect
  //     // This implementation shuffles a copy of PLAYLIST
  //     var newFeed = PLAYLIST.slice(0);
  //     for (var i = newFeed.length - 1; i > 0; i--) {
  //       var j = Math.floor(Math.random() * (i + 1));
  //       var temp = newFeed[i];
  //       newFeed[i] = newFeed[j];
  //       newFeed[j] = temp;
  //       // Get "new" teasers with different ids
  //       newFeed[i].data.id = basicHash(newFeed[i].data.id);
  //       newFeed[j].data.id = basicHash(newFeed[j].data.id);
  //     }
  //     setFeed(newFeed);
  //     // Scroll to top
  //     if (scrollRef.current) {
  //       scrollRef.current.scrollToOffset({ offset: 0 });
  //     }
  //     // Navigate to homepage
  //     navigation.navigate("Home");
  //   });

  //   // TODO: Pause video when no longer focused
  //   // https://reactnavigation.org/docs/function-after-focusing-screen/

  //   return unsubscribe;
  // }, [navigation]);

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
          videoIdx={item.id}
          ref={videoRefs}
          navigation={navigation}
          // Post data for UI
          captionData={{
            description: item.description,
            username: item.user_id__nfc_username,
            stageName: item.user_id__stage_name,
            songId: "",
            songTitle: "ORIGINAL SOUND",
          }}
          sidebarData={{
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
  const handleOnViewableItemsChanged = useRef(({ changed }) => {
    changed.forEach((element) => {
      const cell = videoRefs.current[element.item.id];
      if (cell) {
        if (element.isViewable) {
          cell.playAsync();
        } else {
          cell.pauseAsync();
        }
      }
    });
  });

  if (feedQuery.isLoading) {
    return <Text>Loading...</Text>;
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
        keyExtractor={(item) => item.id.toString()}
        onViewableItemsChanged={handleOnViewableItemsChanged.current}
        // Determines how the video snaps
        viewabilityConfig={{
          viewAreaCoveragePercentThreshold: VIEWABILITY_CONFIG_THRESHOLD,
          waitForInteraction: true,
        }}
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
        onEndReachedThreshold={0.2}
        maxToRenderPerBatch={5}
      ></FlatList>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
