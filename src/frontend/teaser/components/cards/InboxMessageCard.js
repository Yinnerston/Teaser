import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
} from "react-native";

export default function InboxMessageCard(props) {
  const {navigation} = props;
  const styles = useInboxMessageCardStyle();
  return (
    <View style={styles.container}>
      <View style={styles.profilePhotoContainer}>
        <Image
          style={styles.profilePhoto}
          source={{
            uri: "https://raw.githubusercontent.com/AboutReact/sampleresource/master/old_logo.png",
            // TODO: Use react query to fetch user profile with userAuthAtomValue token
          }}
        ></Image>
      </View>
      <View style={styles.messageBodyContainer}>
        <Text>Username HERE</Text>
        <Text>Text body HERE</Text>
      </View>
    </View>
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