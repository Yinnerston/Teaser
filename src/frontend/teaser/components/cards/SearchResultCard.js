import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function SearchResultCard({
  description,
  thumbnailURL,
  videoURL,
  profilePhotoUrl,
  username,
  viewCount,
  likeCount,
}) {
  const styles = useSearchResultCardStyles();
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => {}} activeOpacity={0.8}>
        <View style={styles.image}>
          <Image
            source={
              thumbnailURL !== ""
                ? { uri: thumbnailURL }
                : { uri: "https://i.imgur.com/Xi20BYv.gif" }
            }
            style={styles.image}
          />
          <Text style={styles.viewCountText}>{viewCount}</Text>
        </View>
        <View style={styles.captionContainer}>
          <View style={styles.descriptionTextContainer}>
            <Text style={styles.descriptionText} numberOfLines={2}>
              {description}
            </Text>
          </View>
          <View style={styles.horizontalCaptionContainer}>
            <Image
              style={styles.profilePhotoImage}
              source={
                profilePhotoUrl
                  ? { uri: profilePhotoUrl }
                  : { uri: "https://i.imgur.com/Xi20BYv.gif" }
              }
            />
            <TouchableOpacity>
              <Text style={styles.usernameText}>{username}</Text>
            </TouchableOpacity>
            <Text style={styles.likeCountText}>{likeCount}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const useSearchResultCardStyles = () => {
  const { height, width } = useWindowDimensions();
  const styles = StyleSheet.create({
    container: {
      width: Math.min(width / 2, 180),
      height: Math.min(height / 3 + 80, 400), // 320 + caption height
    },
    image: {
      width: Math.min(width / 2 - 10, 170),
      height: Math.min(height / 3 - 10, 310),
      padding: 5,
      borderRadius: 5,
    },
    viewCountText: {
      color: "white",
      position: "absolute",
      bottom: 0,
      left: 5,
    },
    captionContainer: {
      height: 80,
      width: Math.min(width / 2, 180),
    },
    descriptionTextContainer: {
      flex: 2,
    },
    descriptionText: {
      fontSize: 20,
      margin: 2,
    },
    horizontalCaptionContainer: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
    },
    usernameText: {
      fontSize: 16,
      color: "gray",
    },
    profilePhotoImage: {
      width: 16,
      height: 16,
      borderRadius: 8,
    },
    likeCountText: {
      fontSize: 16,
      color: "gray",
      alignContent: "flex-end",
    },
  });
  return styles;
};
