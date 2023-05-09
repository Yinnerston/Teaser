import { SafeAreaView, StyleSheet, useWindowDimensions } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useState, useCallback } from "react";
import InboxMessageCard from "../../cards/InboxMessageCard";
import { GiftedChat } from "react-native-gifted-chat";

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

const MESSAGES_DATA = [
  {
    _id: 1,
    text: "Hello developer",
    createdAt: new Date(),
    user: {
      _id: 2,
      name: "React Native",
      avatar:
        "https://raw.githubusercontent.com/AboutReact/sampleresource/master/old_logo.png",
    },
  },
  {
    _id: 2,
    text: "Hello world",
    createdAt: new Date(),
    user: {
      _id: 2,
      name: "React Native",
      avatar:
        "https://raw.githubusercontent.com/AboutReact/sampleresource/master/old_logo.png",
    },
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

  const [messages, setMessages] = useState(MESSAGES_DATA);

  const renderInboxMessageCard = () => (
    <InboxMessageCard
      // TODO: Props
      navigation={navigation}
    />
  );
  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={MESSAGE_DATA}
        renderItem={renderInboxMessageCard}
        keyExtractor={(item) => "INBOXVIEWITEM" + item.id.toString()}
        ListHeaderComponent={renderInboxHeaderCards}
      />
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
        }}
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
