import {
  SafeAreaView,
  StyleSheet,
  useWindowDimensions,
  Text,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useRef } from "react";
import { VIDEO_PORTRAIT } from "../../../Constants";
import { ProfileTeaserGridCard } from "../../cards/ProfileTeaserGridCard";
import ProfileDataView from "./ProfileDataView";
import {
  getUserProfileKey,
  getUserProfileData,
} from "../../../hooks/profile/useProfile";
import { useQuery } from "react-query";
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
  const profileVideoRefs = useRef([]);
  const styles = useProfileViewStyle();

  const renderProfileDataView = () => {
    return (
      <ProfileDataView
        profileQueryData={profileQuery.isLoading ? {} : profileQuery.data}
      />
    );
  };
  const renderProfileTeaserGridItem = ({ item }) => (
    <ProfileTeaserGridCard
      videoURL={item.video.videoURL}
      thumbnailURL={item.video.thumbnailURL}
      videoMode={item.video.videoMode}
      videoIdx={item.data.id}
      viewCount={item.data.viewCount}
      isPinned={item.data.isPinned}
      ref={profileVideoRefs}
    />
  );

  if (profileQuery.isError) {
    console.error(profileQuery.error);
  }
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={profileQuery.isLoading ? {} : PROFILE_TEASER_DATA}
        renderItem={renderProfileTeaserGridItem}
        keyExtractor={(item) => item.id}
        numColumns={3}
        ListHeaderComponent={renderProfileDataView}
      />
    </SafeAreaView>
  );
}
const useProfileViewStyle = () => {
  const { height, width } = useWindowDimensions();

  const styles = StyleSheet.create({
    container: { flex: 1, height: height },
    usernameHandleTextStyle: {},
  });
  return styles;
};
