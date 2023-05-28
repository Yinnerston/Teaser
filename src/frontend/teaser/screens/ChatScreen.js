import { useCallback, useState } from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GiftedChat } from "react-native-gifted-chat";

const now = new Date();
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
  {
    _id: 42,
    text: "There's so much cool content on this app!",
    createdAt: new Date().setDate(now.getDate() - 3),
    user: {
      _id: 2,
      name: "React Native",
      avatar:
        "https://raw.githubusercontent.com/AboutReact/sampleresource/master/old_logo.png",
    },
  },
  {
    _id: 23312,
    text: "Wow! I'm super excited to be on the hit app, Teaser!",
    createdAt: new Date().setDate(now.getDate() - 7),
    user: {
      _id: 2,
      name: "React Native",
      avatar:
        "https://raw.githubusercontent.com/AboutReact/sampleresource/master/old_logo.png",
    },
  },
];

export default function ChatScreen({ navigation, route }) {
  const styles = useChatScreenStyle();
  const { username } = route.params;
  const [messages, setMessages] = useState(MESSAGES_DATA);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <GiftedChat
        messages={messages}
        inverted={true}
        style={styles.giftedChat}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    </SafeAreaView>
  );
}

const useChatScreenStyle = () => {
  const { height, width } = useWindowDimensions();

  const styles = StyleSheet.create({
    container: { flex: 1, height: height },
  });
  return styles;
};
