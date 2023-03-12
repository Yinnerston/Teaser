import {
  SafeAreaView,
  StyleSheet,
  useWindowDimensions,
  FlatList,
} from "react-native";
import { useRef } from "react";
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
    photo:
      "https://raw.githubusercontent.com/AboutReact/sampleresource/master/old_logo.png",
    name: "Message Title",
    lastMessage: "Message Body",
  },
  {
    id: "dfasfdsdfe",
    photo:
      "https://raw.githubusercontent.com/AboutReact/sampleresource/master/old_logo.png",
    name: "user232384",
    lastMessage: "Howdy",
  },
  {
    id: "XDFSDFOJSDOFJ",
    photo:
      "https://raw.githubusercontent.com/AboutReact/sampleresource/master/old_logo.png",
    name: "Gangsters",
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

  const renderInboxMessageCard = () => (
    <InboxMessageCard
    // TODO: Props
      navigation={navigation}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={MESSAGE_DATA}
        renderItem={renderInboxMessageCard}
        keyExtractor={(item) => item.id}
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
