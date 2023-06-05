import { SafeAreaView, StyleSheet, useWindowDimensions } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useState, useCallback } from "react";
import InboxMessageCard from "../../cards/InboxMessageCard";

/**
   * Example data in format
  ```typescript
  const MESSAGE_DATA: {
  }[]
  ```
   */
const MESSAGE_DATA = [
  {
    id: "34jsjdfosdfj",
    profile_photo_url:
      "https://raw.githubusercontent.com/AboutReact/sampleresource/master/old_logo.png",
    username: "Message Title",
    lastMessage: "Message Body",
  },
  {
    id: "dfasfdsdfe",
    profile_photo_url:
      "https://raw.githubusercontent.com/AboutReact/sampleresource/master/old_logo.png",
    username: "user232384",
    lastMessage: "Howdy",
  },
  {
    id: "XDFSDFOJSDOFJ",
    profile_photo_url:
      "https://raw.githubusercontent.com/AboutReact/sampleresource/master/old_logo.png",
    username: "Gangsters",
    lastMessage:
      "Let's put a hit out on Tiktok. They won't see it coming. There's not way Jose FRFR.",
  },
];

/**
 * Navigation container for ProfileScreen
 * @param {navigation} props
 * @returns
 */
export default function InboxView({ navigation }) {
  const styles = useInboxViewStyle();
  // TODO: render MessageCards that navigate to New follower, activities, services, etc.. page
  const renderInboxHeaderCards = () => {};

  const renderInboxMessageCard = useCallback(
    ({ item }) => (
      <InboxMessageCard
        // TODO: Props
        navigation={navigation}
        username={item.username}
        profilePhotoUrl={item.profile_photo_url}
        lastMessage={item.lastMessage}
      />
    ),
    [navigation],
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={MESSAGE_DATA}
        renderItem={renderInboxMessageCard}
        keyExtractor={(item) => "INBOXVIEWITEM" + item.id.toString()}
        ListHeaderComponent={renderInboxHeaderCards}
      />
    </SafeAreaView>
  );
}
const useInboxViewStyle = () => {
  const { height, width } = useWindowDimensions();

  const styles = StyleSheet.create({
    container: { flex: 1, height: height },
  });
  return styles;
};
