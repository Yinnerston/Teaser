import { StyleSheet, View, useWindowDimensions } from "react-native";
import ProfilePhoto from "../../elements/photo/ProfilePhoto";
import LikePostButton from "../../elements/button/LikePostButton";
import CommentPostButton from "../../elements/button/CommentPostButton";
import BookmarkPostButton from "../../elements/button/BookmarkPostButton";
import SharePostButton from "../../elements/button/SharePostButton";
import { SIDEBAR_MARGIN_BOTTOM, SIDEBAR_WIDTH } from "../../../Constants";
import { numberFormatter } from "../../../utils/numberFormatter";

/**
 * Container for the sidebar of a teaser.
 * Handles likes, user profiles, comments, etc.
 * @param {navigation, sidebarData} props
 * @param {likeCount, bookmarkCount, commentCount, shareCount} ^^sidebarData
 */
export default function TeaserSidebar(props) {
  const { navigation, sidebarData, userAuthAtomValue } = props;
  const {
    username,
    postID,
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
        navigation={navigation}
        userAuthAtomValue={userAuthAtomValue}
        postID={postID}
        numLikes={likeCount}
        textStyle={styles.sidebarText}
        style={styles.sidebarItem}
      />
      <CommentPostButton
        userAuthAtomValue={userAuthAtomValue}
        postID={postID}
        commentCount={numberFormatter.format(commentCount)}
        textStyle={styles.sidebarText}
        style={styles.sidebarItem}
      />
      <BookmarkPostButton
        navigation={navigation}
        userAuthAtomValue={userAuthAtomValue}
        postID={postID}
        numBookmarks={numberFormatter.format(bookmarkCount)}
        textStyle={styles.sidebarText}
        style={styles.sidebarItem}
      />
      <SharePostButton
        numShares={numberFormatter.format(shareCount)}
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
      marginBottom: SIDEBAR_MARGIN_BOTTOM,
    },
  });
  return styles;
};
