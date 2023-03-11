import { StyleSheet, View, Text, useWindowDimensions } from "react-native";
import ProfilePhoto from "../../elements/photo/ProfilePhoto";
import LikePostButton from "../../elements/button/LikePostButton";
import CommentPostButton from "../../elements/button/CommentPostButton";
import BookmarkPostButton from "../../elements/button/BookmarkPostButton";
import SharePostButton from "../../elements/button/SharePostButton";
/**
 * Container for the sidebar of a teaser.
 * Handles likes, user profiles, comments, etc.
 * @returns
 */
export default function TeaserSidebar() {
  const styles = useSidebarStyle();
  return (
    <View style={styles.container}>
      <ProfilePhoto></ProfilePhoto>
      <LikePostButton numLikes={"TODO:"} style={styles.sidebarItem} />
      <CommentPostButton numLikes={"TODO:"} style={styles.sidebarItem} />
      <BookmarkPostButton numBookmarks={"TODO:"} style={styles.sidebarItem} />
      <SharePostButton numShares={"TODO:"} style={styles.sidebarItem} />
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
      backgroundColor: "yellow",
    },
    sidebarText: {
      fontSize: 10,
    },
    sidebarItem: {
      justifyContent: "center",
      alignItems: "center",
    },
  });
  return styles;
};
