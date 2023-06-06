import { View, Text, StyleSheet, useWindowDimensions } from "react-native";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { useEffect, useRef, useCallback, useMemo } from "react";
// import { useInfiniteQuery, useQuery } from "react-query";
import PostCommentCard from "../../cards/PostCommentCard";
const TEST_DATA = [
  {
    comment_id: 1237,
    username: "Yinnerston",
    profile_photo_url: "https://avatars.githubusercontent.com/u/57548788?v=4",
    comment_text: "This is a top level comment!",
    n_likes: 4,
    created_at: "2023-01-10 15:00:00.000",
    updated_at: "2020-01-10 15:00:00.000",
    has_replies: true,
    depth: 0,
  },
  {
    comment_id: 1236,
    username: "Yinnerston14",
    profile_photo_url: "https://avatars.githubusercontent.com/u/57548788?v=4",
    comment_text: "This is a top level comment!",
    n_likes: 4,
    created_at: "2023-01-10 15:00:00.000",
    updated_at: "2020-01-10 15:00:00.000",
    has_replies: true,
    depth: 0,
  },
  {
    comment_id: 1235,
    username: "Yinnerston12",
    profile_photo_url: "https://avatars.githubusercontent.com/u/57548788?v=4",
    comment_text: "This is a top level comment!",
    n_likes: 4,
    created_at: "2023-01-10 15:00:00.000",
    updated_at: "2020-01-10 15:00:00.000",
    has_replies: true,
    depth: 0,
  },
  {
    comment_id: 1234,
    username: "Yinnerston11",
    profile_photo_url: "https://avatars.githubusercontent.com/u/57548788?v=4",
    comment_text: "This is a top level comment!",
    n_likes: 4,
    created_at: "2023-01-10 15:00:00.000",
    updated_at: "2020-01-10 15:00:00.000",
    has_replies: true,
    depth: 0,
  },
  {
    comment_id: 1233,
    username: "Yinnerston31",
    profile_photo_url: "https://avatars.githubusercontent.com/u/57548788?v=4",
    comment_text: "This is a top level comment!",
    n_likes: 4,
    created_at: "2023-01-10 15:00:00.000",
    updated_at: "2020-01-10 15:00:00.000",
    has_replies: true,
    depth: 0,
  },
  {
    comment_id: 1232,
    username: "Yinnerston65",
    profile_photo_url: "https://avatars.githubusercontent.com/u/57548788?v=4",
    comment_text: "This is a top level comment!",
    n_likes: 4,
    created_at: "2023-01-10 15:00:00.000",
    updated_at: "2020-01-10 15:00:00.000",
    has_replies: true,
    depth: 0,
  },
  {
    comment_id: 1231,
    username: "Yinnerston3",
    profile_photo_url: "https://avatars.githubusercontent.com/u/57548788?v=4",
    comment_text: "This is a top level comment!",
    n_likes: 4,
    created_at: "2023-01-10 15:00:00.000",
    updated_at: "2020-01-10 15:00:00.000",
    has_replies: true,
    depth: 0,
  },
];

export default function CommentModal({
  navigation,
  postID,
  commentCount,
  showCommentModal,
  setShowCommentModal,
  snapPoints,
  handleSheetChanges,
}) {
  // ref
  const bottomSheetRef = useRef(null);
  const { height, styles } = useCommentModalStyles();
  useEffect(() => {
    // Close comment modal when showCommentModal is set to false
    if (!showCommentModal) {
      bottomSheetRef.current?.close?.();
    }
  }, [showCommentModal]);
  // TODO: Add react query to get comment data

  // TODO: Should i move this callback and memo to higher level components so they aren't redefined each time?
  const renderPostCommentCard = useCallback(
    ({ item }) => (
      <PostCommentCard
        navigation={navigation}
        commentID={item.comment_id}
        username={item.username}
        profilePhotoURL={item.profile_photo_url}
        commentText={item.comment_text}
        nLikes={item.n_likes}
        createdAt={item.created_at}
        updatedAt={item.updated_at}
        hasReplies={item.has_replies}
        depth={item.depth}
      />
    ),
    [navigation],
  );
  const renderCommentModalHeader = useMemo(
    () => (
      // TODO: Add a searchable related tag?
      <Text style={{ textAlign: "center", fontWeight: "bold" }}>
        {" "}
        X Number of Comments
      </Text>
    ),
    [],
  );
  return (
    <BottomSheet
      style={styles.container}
      containerHeight={height / 2}
      enablePanDownToClose={true}
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
    >
      <BottomSheetFlatList
        data={TEST_DATA}
        keyExtractor={(item) => "POSTCOMMENTMODAL" + item.comment_id}
        renderItem={renderPostCommentCard}
        contentContainerStyle={styles.contentContainer}
        ListHeaderComponent={renderCommentModalHeader}
      />
    </BottomSheet>
  );
}

const useCommentModalStyles = () => {
  const { width, height } = useWindowDimensions();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      //   width: width,
      //   height: height / 2,
      // //   position: "absolute",
      //   bottom: 16,
      padding: 16,
      backgroundColor: "grey",
    },
    contentContainer: {
      flex: 1,
      alignItems: "center",
    },
  });
  return { height, styles };
};
