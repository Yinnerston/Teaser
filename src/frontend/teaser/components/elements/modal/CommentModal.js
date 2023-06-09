import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Alert,
} from "react-native";
import { Modalize } from "react-native-modalize";
import { useEffect, useRef, useCallback, useMemo, useState } from "react";
import { useInfiniteQuery, useMutation } from "react-query";
import {
  getTopLevelPostComments,
  postPostComment,
} from "../../../api/feed/postCommentsApi";
import {
  getTopLevelPostCommentsQueryKey,
  postPostCommentMutationKey,
} from "../../../hooks/feed/usePostComments";
import PostCommentCard from "../../cards/PostCommentCard";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { STATUS_BAR_HEIGHT } from "../../../Constants";
import UploadImageButton from "../button/upload/UploadImageButton";
import { AntDesign } from "@expo/vector-icons";

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
  userAuthAtomValue,
  postID,
  commentCount,
  showCommentModal,
  setShowCommentModal,
}) {
  // ref
  const bottomSheetRef = useRef(null);
  const [selectedParentComment, setSelectedParentComment] = useState(null);
  const [textInputCommentText, setTextInputCommentText] = useState("");
  const { width, height, styles } = useCommentModalStyles();
  useEffect(() => {
    // Close comment modal when showCommentModal is set to false
    if (!showCommentModal) {
      bottomSheetRef.current?.close?.();
    } else {
      bottomSheetRef.current?.open?.();
    }
  }, [showCommentModal, bottomSheetRef]);
  // Only load data if commentCount > 0
  const topLevelPostCommentsQuery =
    commentCount > 0
      ? useInfiniteQuery({
          queryKey: getTopLevelPostCommentsQueryKey(postID),
          queryFn: getTopLevelPostComments,
          getNextPageParam: (lastPage, allPages) => {
            const pageParam = lastPage.next
              ? lastPage.next.split("page=").pop().split("&")[0]
              : undefined;
            return pageParam;
          },
          keepPreviousData: true,
        })
      : { data: { pages: [] } };
  // TODO: optimistic updates for replies
  // TODO: if the user is logged in a likes a comment, return a bool
  const newCommentMutation = useMutation({
    mutationKey: postPostCommentMutationKey(
      userAuthAtomValue,
      postID,
      selectedParentComment?.commentID,
    ),
    mutationFn: () =>
      postPostComment(
        userAuthAtomValue?.token_hash,
        postID,
        textInputCommentText,
        selectedParentComment,
      ),
    onSettled: () => {
      // Refetch
      topLevelPostCommentsQuery.refetch();
    },
    enabled: topLevelPostCommentsQuery.isSuccess,
  });
  // TODO: Should i move this callback and memo to higher level components so they aren't redefined each time?
  const renderPostCommentCard = useCallback(
    ({ item }) => (
      <PostCommentCard
        navigation={navigation}
        userAuthAtomValue={userAuthAtomValue}
        postID={postID}
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
    [navigation, userAuthAtomValue],
  );
  const renderCommentModalHeader = useMemo(
    () => (
      // TODO: Add a searchable related tag?
      <Text style={{ textAlign: "center", fontWeight: "bold" }}>
        I'M STILL WORKING ON ADDING SCROLLING!
      </Text>
    ),
    [],
  );
  const renderCommentTextInput = useMemo(
    () =>
      userAuthAtomValue !== null ? (
        <View style={styles.commentInputContainer}>
          <View style={styles.uploadImageButtonContainer}>
            <UploadImageButton
              onPress={() => Alert.alert("Not implemented")}
              textColor="black"
              uploadImageButtonStyle={styles.uploadImageButton}
              color="gray"
            />
          </View>
          <TextInput
            editable
            style={styles.textInput}
            onChangeText={(text) => setTextInputCommentText(text)}
            value={textInputCommentText}
            onSubmitEditing={({ nativeEvent: { text } }) => {
              if (text !== "") {
                // TODO: navigation.navigate("SearchResults", { searchTerm: text });
                newCommentMutation.mutate();
              }
            }}
            placeholder="Add comment..."
          />
          {textInputCommentText ? ( // render upload button
            <View style={styles.uploadCommentButtonContainer}>
              <TouchableOpacity
                onPress={() => {
                  if (textInputCommentText !== "") {
                    newCommentMutation.mutate();
                  }
                }}
              >
                <AntDesign name="arrowup" size={20} color="white" />
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      ) : null,
    [userAuthAtomValue, textInputCommentText],
  );
  const renderListEmptyComponent = useMemo(
    () => (
      <View>
        <Text style={{ textAlign: "center" }}>Be the first to post here!</Text>
      </View>
    ),
    [],
  );
  if (topLevelPostCommentsQuery.isLoading || topLevelPostCommentsQuery.isError)
    return null;
  return (
    <Modalize
      ref={bottomSheetRef}
      onClosed={() => setShowCommentModal(false)}
      adjustToContentHeight={true}
      FooterComponent={renderCommentTextInput}
      flatListProps={{
        style: {
          flexGrow: 0,
          height: (height * 3) / 4,
        },
        data: topLevelPostCommentsQuery.data.pages
          .map((page) => page.results)
          .flat(),
        keyExtractor: (item) => "POSTCOMMENTMODAL" + item.comment_id,
        renderItem: renderPostCommentCard,
        ListHeaderComponent: renderCommentModalHeader,
        ListEmptyComponent: renderListEmptyComponent,
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
    commentInputContainer: {
      backgroundColor: "white",
      // height: STATUS_BAR_HEIGHT + 128,
      width: width,
      flexDirection: "row",
    },
    textInput: {
      backgroundColor: "#f1f1f1",
      color: "#86858a",
      height: 40,
      borderRadius: 20,
      marginHorizontal: 16,
      marginBottom: STATUS_BAR_HEIGHT,
      width: width - (40 + 32),
      position: "absolute",
      bottom: 0,
      right: 0,
      paddingLeft: 16,
    },
    uploadImageButtonContainer: {
      position: "absolute",
      height: 40,
      marginBottom: STATUS_BAR_HEIGHT,
      marginHorizontal: 8,
      width: 40,
      bottom: 0,
      left: 0,
    },
    uploadImageButton: {
      height: 40,
      width: 40,
    },
    uploadCommentButtonContainer: {
      backgroundColor: "#f13059",
      position: "absolute",
      width: 24,
      height: 24,
      borderRadius: 12,
      justifyContent: "center",
      alignItems: "center",
      bottom: 8,
      right: 32,
      marginBottom: STATUS_BAR_HEIGHT,
    },
  });
  return { width, height, styles };
};
