import { View, TouchableOpacity, Text, Alert } from "react-native";
import { useState } from "react";
import BookmarkIcon from "../icon/BookmarkIcon";
import { SIDEBAR_ICON_SIZE } from "../../../Constants";
import { useMutation, useQueryClient } from "react-query";
import { getBookmarkPostMutationKey } from "../../../hooks/feed/useFeedSidebar";
import { bookmarkPost } from "../../../api/feed/postsFeedApi";
import { numberFormatter } from "../../../utils/numberFormatter";

/**
 * Bookmark Post button.
 * @param {numBookmarks} props
 * @returns
 */
export default function BookmarkPostButton(props) {
  const {
    navigation,
    userAuthAtomValue,
    postID,
    numBookmarks,
    style,
    textStyle,
  } = props;
  const [updatedNumBookmarks, setCurrentNumBookmarks] = useState(numBookmarks);
  // TODO: Add to bookmarked posts on bookmark
  // const [isBookmarkd, setIsBookmarkd] = useState(false);
  const queryClient = useQueryClient();
  const bookmarkPostMutation = useMutation({
    mutationKey: getBookmarkPostMutationKey(userAuthAtomValue, postID),
    mutationFn: () => {
      return bookmarkPost(userAuthAtomValue.token_hash, postID);
    },
    onMutate: async (newBookmarkState) => {
      // Perform optimistic update
      // cancel outgoing refetches
      await queryClient.cancelQueries({
        queryKey: getBookmarkPostMutationKey(userAuthAtomValue, postID),
      });
      // snapshot previous value
      const previousBookmarkState = queryClient.getQueryData(
        getBookmarkPostMutationKey(userAuthAtomValue, postID),
      );
      // Optimistically update
      queryClient.setQueryData(
        getBookmarkPostMutationKey(userAuthAtomValue, postID),
        newBookmarkState,
      ); // TODO: this or (old) => newBookmarkState ?
      // Return a context object with the snapshotted value
      return { previousBookmarkState };
    },
    onError: (err, newBookmarkState, context) => {
      // Rollback to previous value
      queryClient.setQueryData(
        getBookmarkPostMutationKey(userAuthAtomValue, postID),
        context.previousBookmarkState,
      );
    },
    onSettled: () => {
      // Refetch
      queryClient.invalidateQueries(
        getBookmarkPostMutationKey(userAuthAtomValue, postID),
      );
    },
    onSuccess: (data) => {
      if (data !== undefined) {
        if (data["bookmarked_post"]) {
          setCurrentNumBookmarks(numBookmarks + 1);
        } else {
          setCurrentNumBookmarks(numBookmarks);
        }
      }
    },
  });
  // Mutate server state for bookmarked post if logged in otherwise prompt to sign up
  const handleBookmarkPostOnPress =
    userAuthAtomValue !== null
      ? () => {
          // setIsBookmarkd((current) => !current);
          bookmarkPostMutation.mutate();
        }
      : () =>
          Alert.alert(
            "Sign up for Teaser!",
            "Create a profile to get personalised recommendations, follow other accounts, and make your own videos!",
            [
              { text: "Cancel", style: "cancel", onPress: () => {} },
              {
                text: "Sign Up",
                style: "cancel",
                onPress: () => navigation.navigate("Auth"),
              },
            ],
          );
  return (
    <View style={style}>
      <TouchableOpacity onPress={handleBookmarkPostOnPress}>
        <BookmarkIcon
          color={
            bookmarkPostMutation.isSuccess
              ? bookmarkPostMutation.data?.bookmarked_post
                ? "orange"
                : "white"
              : "white"
          }
          size={SIDEBAR_ICON_SIZE}
        />
        <Text style={textStyle}>
          {numberFormatter.format(updatedNumBookmarks)}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
