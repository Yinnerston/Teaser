import { StyleSheet, View, Text, useWindowDimensions } from "react-native";
import ProfilePhoto from "../../elements/photo/ProfilePhoto";
import LikePostButton from "../../elements/button/LikePostButton";
import CommentPostButton from "../../elements/button/CommentPostButton";
import BookmarkPostButton from "../../elements/button/BookmarkPostButton";
import SharePostButton from "../../elements/button/SharePostButton";
import { SIDEBAR_WIDTH } from "../../../Constants";

/**
 * Container for the sidebar of a teaser.
 * Handles likes, user profiles, comments, etc.
 * @param {navigation, sidebarData} props
 * @param {likeCount, bookmarkCount, commentCount, shareCount} ^^sidebarData
 */
export default function TeaserSidebar(props) {
  const { navigation, sidebarData } = props;
  const {
    username,
    profilePhotoUrl,
    likeCount,
    bookmarkCount,
    commentCount,
    shareCount,
  } = sidebarData;
  const styles = useSidebarStyle();
  return (
    <View style={styles.container}>
      <ProfilePhoto
        username={username}
        profilePhotoUrl={profilePhotoUrl}
        navigation={navigation}
        style={styles.sidebarItem}
      />
      <LikePostButton
        numLikes={likeCount}
        textStyle={styles.sidebarText}
        style={styles.sidebarItem}
      />
      <CommentPostButton
        numLikes={commentCount}
        textStyle={styles.sidebarText}
        style={styles.sidebarItem}
      />
      <BookmarkPostButton
        numBookmarks={bookmarkCount}
        textStyle={styles.sidebarText}
        style={styles.sidebarItem}
      />
      <SharePostButton
        numShares={shareCount}
        textStyle={styles.sidebarText}
        style={styles.sidebarItem}
      />
    </View>
  );
}

const useSidebarStyle = () => {
  const { height, width } = useWindowDimensions();
  const styles = StyleSheet.create({
    container: {
      position: "absolute",
      top: "auto",
      bottom: 16,
      left: "auto",
      right: 16,
      height: height / 2,
      width: SIDEBAR_WIDTH,
      justifyContent: "flex-end",
      alignItems: "center",
    },
    sidebarText: {
      color: "white",
      fontWeight: "bold",
      fontSize: 12,
      textAlign: "center",
      textShadowColor: "gray",
      textShadowOffset: { width: 0, height: 1 },
      textShadowRadius: 1,
    },
    sidebarItem: {
      marginBottom: 20,
    },
  });
  return styles;
};
