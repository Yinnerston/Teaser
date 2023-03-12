import {
  FlatList,
  StyleSheet,
  useWindowDimensions,
  View,
  Text,
  SafeAreaView,
} from "react-native";
import { useRef } from "react";
import { VIDEO_PORTRAIT } from "../../../Constants";
import { ProfileTeaserGridCard } from "../../cards/ProfileTeaserGridCard";
import ProfileDataView from "./ProfileDataView";

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
      thumbnailURL: "",
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
      thumbnailURL: "",
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
      thumbnailURL: "",
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
      thumbnailURL: "",
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
 * Grid View of profiles made by a user
 */
export default function ProfileTeaserGridView() {
  const profileVideoRefs = useRef([]);
  const styles = useProfileViewStyle();
  const renderProfileDataView = () => {
    return <ProfileDataView></ProfileDataView>;
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
  return (
    <FlatList
      data={PROFILE_TEASER_DATA}
      renderItem={renderProfileTeaserGridItem}
      keyExtractor={(item) => item.id}
      numColumns={3}
      ListHeaderComponent={renderProfileDataView}
    />
  );
}

const useProfileViewStyle = () => {
  const { height, width } = useWindowDimensions();

  const styles = StyleSheet.create({
    container: {
      marginTop: 200,
    },
  });
  return styles;
};
