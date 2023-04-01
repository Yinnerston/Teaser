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
export default function SongCard(props) {
  const { navigation, item } = props;
  const styles = useInboxMessageCardStyle();
  return (
    <TouchableOpacity style={styles.container} onPress={() => {}}>
      <View style={styles.profilePhotoContainer}>
        <Image
          style={styles.profilePhoto}
          source={{
            uri: item.thumbnail,
            // TODO: Use react query to fetch user profile with userAuthAtomValue token
          }}
        ></Image>
      </View>
      <View style={styles.messageBodyContainer}>
        <Text style={styles.songTitleText}>{item.title}</Text>
        <Text style={styles.songAuthorText}>By: {item.author}</Text>
      </View>
    </TouchableOpacity>
  );
}

const useInboxMessageCardStyle = () => {
  // const { height, width } = useWindowDimensions();

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
      width: 48,
      height: 48,
      borderRadius: 24,
    },
    songTitleText: {
      fontSize: 16,
    },
    songAuthorText: {
      fontSize: 12,
    },
  });
  return styles;
};
