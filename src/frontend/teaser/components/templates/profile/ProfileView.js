import {
  SafeAreaView,
  StyleSheet,
  Text,
  useWindowDimensions,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useRef } from "react";
import { VIDEO_PORTRAIT } from "../../../Constants";
import { ProfileTeaserGridCard } from "../../cards/ProfileTeaserGridCard";
import ProfileDataView from "./ProfileDataView";
import {
  getUserProfileKey,
  getUserProfileData,
  getUserProfilePostsKey,
  getUserProfilePostsData,
} from "../../../hooks/profile/useProfile";
import { useInfiniteQuery, useQuery } from "react-query";
import { useAtom } from "jotai";
import { readOnlyUserAuthAtom } from "../../../hooks/auth/useUserAuth";

/**
 * Example data in format
```typescript
const PROFILE_TEASER_DATA: {
  video: {
    videoURL: string;
    thumbnailURL: string;
    videoMode: number;
  };
  data: {
    id: string;
    isPinned: boolean;
    viewCount: string;
  };
}[]
```
 */
const PROFILE_TEASER_DATA = [
  {
    video: {
      videoURL: "https://i.imgur.com/Wk1KyEU.mp4",
      thumbnailURL: "https://i.imgur.com/Xi20BYv.gif",
      videoMode: VIDEO_PORTRAIT,
    },
    data: {
      id: "FirstGridItemClip",
      isPinned: true,
      viewCount: "9.5K",
    },
  },
  {
    video: {
      videoURL: "https://i.imgur.com/Wk1KyEU.mp4",
      thumbnailURL: "https://i.imgur.com/Xi20BYv.gif",
      videoMode: VIDEO_PORTRAIT,
    },
    data: {
      id: "SecondGridItemClip",
      isPinned: true,
      viewCount: "6.8K",
    },
  },

  {
    video: {
      videoURL: "https://i.imgur.com/Wk1KyEU.mp4",
      thumbnailURL: "https://i.imgur.com/Xi20BYv.gif",
      videoMode: VIDEO_PORTRAIT,
    },
    data: {
      id: "ThirdGridItemClip",
      isPinned: false,
      viewCount: "3.8K",
    },
  },

  {
    video: {
      videoURL: "https://i.imgur.com/Wk1KyEU.mp4",
      thumbnailURL: "https://i.imgur.com/Xi20BYv.gif",
      videoMode: VIDEO_PORTRAIT,
    },
    data: {
      id: "FourthGridItem",
      isPinned: false,
      viewCount: "1.6K",
    },
  },
];

/**
 * Navigation container for ProfileScreen
 * @param {navigation} props
 * @returns
 */
export default function ProfileView({ navigation, route }) {
  const username = route?.params?.username;
  const [userAuthAtomValue] = useAtom(readOnlyUserAuthAtom);

  const profileQuery = useQuery({
    queryKey: getUserProfileKey(userAuthAtomValue?.token_hash, username),
    queryFn: getUserProfileData,
  });

  const userProfilePostsQuery = useInfiniteQuery({
    queryKey: getUserProfilePostsKey(userAuthAtomValue?.token_hash, username),
    queryFn: getUserProfilePostsData,
    getNextPageParam: (lastPage, allPages) => {
      const pageParam = lastPage.next
        ? lastPage.next.split("page=").pop().split("&")[0]
        : undefined;
      return pageParam;
    },
    keepPreviousData: true,
  });
  const styles = useProfileViewStyle();

  /**
   * See GetUserProfileSchema for schema of profileQueryData
   * @returns
   */
  const renderProfileDataView = () => {
    return (
      <ProfileDataView
        profileQueryData={profileQuery.isLoading ? {} : profileQuery.data}
      />
    );
  };

  /**
   * See ProfileFeedResponseSchema for schema of item
   * @param { item } param0
   * @returns
   */
  const renderProfileTeaserGridItem = ({ item }) => (
    <ProfileTeaserGridCard
      videoURL={item.video_url}
      thumbnailURL={item.thumbnail_url}
      videoMode={item.video_mode}
      videoIdx={item.id}
      viewCount={item.n_likes != null ? item.n_likes : 0}
      isPinned={item.is_pinned}
    />
  );

  if (profileQuery.isError) {
    console.error(profileQuery.error);
  }
  if (profileQuery.isLoading || userProfilePostsQuery.isLoading) return;
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={userProfilePostsQuery.data.pages
          .map((page) => page.results)
          .flat()}
        renderItem={renderProfileTeaserGridItem}
        keyExtractor={(item) => "PROFILEVIEWITEM" + item.id.toString()}
        numColumns={3}
        initialNumToRender={12}
        maxToRenderPerBatch={12}
        windowSize={12}
        removeClippedSubviews={true}
        onEndReached={() => {
          console.log("END REACHED, FETCHING NEW PAGE");

          if (userProfilePostsQuery.isFetchingNextPage) return;
          if (userProfilePostsQuery.hasNextPage) {
            userProfilePostsQuery.fetchNextPage();
          }
        }}
        ListHeaderComponent={renderProfileDataView}
      />
      {userProfilePostsQuery.data.pages[0].count === 0 ? (
        <Text style={styles.noPostsText}>No Posts.</Text>
      ) : null}
    </SafeAreaView>
  );
}
const useProfileViewStyle = () => {
  const { height, width } = useWindowDimensions();
  const styles = StyleSheet.create({
    container: { flex: 1, height: height },
    usernameHandleTextStyle: {},
    noPostsText: {
      textAlign: "center",
    },
  });
  return styles;
};
