import { FlatList, View, Text } from "react-native";

const PROFILE_TEASER_DATA = [
  // {
  //     id: "FirstGridItem",
  //     isPinned: true,
  //     nViews: "5.5K",
  //     url: "https://i.imgur.com/5IpDBCk.mp4"
  // },
  {
    id: "FirstGridItemClip",
    isPinned: true,
    nViews: "9.5K",
    url: "https://i.imgur.com/Wk1KyEU.mp4",
  },
  {
    id: "SecondGridItemClip",
    isPinned: true,
    nViews: "6.8K",
    url: "https://i.imgur.com/Wk1KyEU.mp4",
  },

  {
    id: "ThirdGridItemClip",
    isPinned: true,
    nViews: "3.8K",
    url: "https://i.imgur.com/Wk1KyEU.mp4",
  },

  {
    id: "FourthGridItem",
    isPinned: true,
    nViews: "1.6K",
    url: "https://i.imgur.com/Wk1KyEU.mp4",
  },
];

/**
 * Grid View of profiles made by a user
 */
export default function ProfileTeaserGridView() {
  return <FlatList></FlatList>;
}
