import { View, Text, StyleSheet, useWindowDimensions } from "react-native";
import { Modalize } from "react-native-modalize";
import { useEffect, useRef, useCallback, useMemo } from "react";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
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
  {
    comment_id: 123121,
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
    comment_id: 123132,
    username: "Yinnerston",
    profile_photo_url: "https://avatars.githubusercontent.com/u/57548788?v=4",
    comment_text: "This is a top level comment!",
    n_likes: 4,
    created_at: "2023-01-10 15:00:00.000",
    updated_at: "2020-01-10 15:00:00.000",
    has_replies: true,
    depth: 0,
  },
];

/**
 * TODO: when commentCount === 0 ==> Add a comment button
 * Don't bother querying for comments when the comment count is zero (save bandwidth)
 * TODO: Fix scroll https://stackoverflow.com/questions/69253810/react-native-flatlist-does-not-scroll-inside-the-custom-animated-bottom-sheet
 *  - possible ways to fix: rewrite bottom sheet to have my own modal
 *  - tried: replace FlatList with RNGH --> doesn't do anything
 *  - I think every gesture is being caught by the comment
 *  - Solution i'm looking at: https://github.com/gorhom/react-native-bottom-sheet/issues/918 --> going to transition to RN modalize
 * @param {*} param0
 * @returns
 */
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
  const { width, height, styles } = useCommentModalStyles();
  useEffect(() => {
    // Close comment modal when showCommentModal is set to false
    if (!showCommentModal) {
      bottomSheetRef.current?.close?.();
    } else {
      bottomSheetRef.current?.open?.();
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
        I'M STILL WORKING ON ADDING SCROLLING!
      </Text>
    ),
    [],
  );
  return (
    <Modalize
      ref={bottomSheetRef}
      onClosed={() => setShowCommentModal(false)}
      adjustToContentHeight={true}
      flatListProps={{
        style: {
          flexGrow: 0,
          height: (height * 3) / 4,
        },
        data: TEST_DATA,
        keyExtractor: (item) => "POSTCOMMENTMODAL" + item.comment_id,
        renderItem: renderPostCommentCard,
        ListHeaderComponent: renderCommentModalHeader,
        onEndReachedThreshold: 0,
        initialNumToRender: 5,
        maxToRenderPerBatch: 5,
        windowSize: 5,
        removeClippedSubviews: true,
      }}
    />
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
  return { width, height, styles };
};
