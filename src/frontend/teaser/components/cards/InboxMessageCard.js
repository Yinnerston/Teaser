import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";

/**
 * Card body for a inbox message.
 * TODO: Add touchable Opacity and navigator to expand the message.
 * @param {navigation} props
 * @returns
 */
export default function InboxMessageCard({
  navigation,
  username,
  profilePhotoUrl,
  lastMessage,
}) {
  const styles = useInboxMessageCardStyle();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate("ChatScreen", { username: username })}
    >
      <View style={styles.profilePhotoContainer}>
        <Image
          style={styles.profilePhoto}
          source={{
            uri: profilePhotoUrl,
            // TODO: Use react query to fetch user profile with userAuthAtomValue token
          }}
        ></Image>
      </View>
      <View style={styles.messageBodyContainer}>
        <Text>{username}</Text>
        <Text numberOfLines={2}>{lastMessage}</Text>
      </View>
    </TouchableOpacity>
  );
}

const useInboxMessageCardStyle = () => {
  const { height, width } = useWindowDimensions();

  const styles = StyleSheet.create({
    container: { flexDirection: "row", display: "flex" },
    profilePhotoContainer: {
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
    },
    messageBodyContainer: {
      flex: 4,
      flexDirection: "column",
    },
    profilePhoto: {
      width: width / 6,
      height: width / 6,
      borderRadius: 69,
    },
    usernameHandleTextStyle: {},
  });
  return styles;
};
