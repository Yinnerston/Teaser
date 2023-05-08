import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { Image } from "react-native";
import { useState, useRef } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import HeartIcon from "../elements/icon/HeartIcon";
import { numberFormatter } from "../../utils/numberFormatter";
import { Video } from "expo-av";
import { VIDEO_PORTRAIT } from "../../Constants";

export default function SearchResultCard({
  description,
  thumbnailURL,
  videoURL,
  videoMode,
  profilePhotoUrl,
  username,
  viewCount,
  likeCount,
}) {
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const videoRef = useRef(null);
  const styles = useSearchResultCardStyles();
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => setIsPlayingVideo((prev) => !prev)}
        activeOpacity={0.8}
      >
        <View style={styles.image}>
          {isPlayingVideo ? (
            <Video
              source={
                videoURL !== ""
                  ? { uri: videoURL }
                  : { uri: "https://i.imgur.com/Xi20BYv.gif" }
              }
              ref={videoRef}
              isLooping={true}
              shouldPlay={true}
              style={{
                ...styles.image,
                resizeMode: videoMode === VIDEO_PORTRAIT ? "cover" : "contain",
              }}
            />
          ) : (
            <Image
              source={
                thumbnailURL !== ""
                  ? { uri: thumbnailURL }
                  : { uri: "https://i.imgur.com/Xi20BYv.gif" }
              }
              style={styles.image}
            />
          )}
          <Text style={styles.viewCountText}>
            {numberFormatter.format(viewCount)}
          </Text>
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
            <View style={styles.likeCountContainer}>
              <HeartIcon size={14} color={"gray"} outline={true} />
              <Text style={styles.likeCountText}>
                {numberFormatter.format(likeCount)}
              </Text>
            </View>
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
      // justifyContent: "flex-start",
      alignItems: "center",
    },
    usernameText: {
      fontSize: 16,
      color: "gray",
      width: Math.min(width / 3, 120),
    },
    profilePhotoImage: {
      width: 16,
      height: 16,
      borderRadius: 8,
    },
    likeCountContainer: {
      position: "absolute",
      right: 0,
      width: Math.min(width / 6 - 16, 44),
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    likeCountText: {
      fontSize: 14,
      color: "gray",
      textAlign: "right",
    },
  });
  return styles;
};
