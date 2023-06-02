import { View, TouchableOpacity, Text, Alert } from "react-native";
import { useState } from "react";
import HeartIcon from "../icon/HeartIcon";
import { SIDEBAR_ICON_SIZE } from "../../../Constants";
import { useMutation, useQueryClient } from "react-query";
import { getLikePostMutationKey } from "../../../hooks/feed/useFeedSidebar";
import { likePost } from "../../../api/feed/postsFeedApi";
import { numberFormatter } from "../../../utils/numberFormatter";

/**
 * Like Post button.
 * @param {numLikes} props
 * @returns
 */
export default function LikePostButton(props) {
  const { navigation, userAuthAtomValue, postID, numLikes, style, textStyle } =
    props;
  const [updatedNumLikes, setCurrentNumLikes] = useState(numLikes);
  // TODO: Add to liked posts on like
  // const [isLiked, setIsLiked] = useState(false);
  const queryClient = useQueryClient();
  const likePostMutation = useMutation({
    mutationKey: getLikePostMutationKey(userAuthAtomValue, postID),
    mutationFn: () => {
      return likePost(userAuthAtomValue.token_hash, postID);
    },
    onMutate: async (newLikeState) => {
      // Perform optimistic update
      // cancel outgoing refetches
      await queryClient.cancelQueries({
        queryKey: getLikePostMutationKey(userAuthAtomValue, postID),
      });
      // snapshot previous value
      const previousLikeState = queryClient.getQueryData(
        getLikePostMutationKey(userAuthAtomValue, postID),
      );
      // Optimistically update
      queryClient.setQueryData(
        getLikePostMutationKey(userAuthAtomValue, postID),
        newLikeState,
      ); // TODO: this or (old) => newLikeState ?
      // Return a context object with the snapshotted value
      return { previousLikeState };
    },
    onError: (err, newLikeState, context) => {
      // Rollback to previous value
      queryClient.setQueryData(
        getLikePostMutationKey(userAuthAtomValue, postID),
        context.previousLikeState,
      );
    },
    onSettled: () => {
      // Refetch
      queryClient.invalidateQueries(
        getLikePostMutationKey(userAuthAtomValue, postID),
      );
    },
    onSuccess: (data) => {
      if (data !== undefined) {
        if (data["liked_post"]) {
          setCurrentNumLikes(numLikes + 1);
        } else {
          setCurrentNumLikes(numLikes);
        }
      }
    },
  });
  const handleLikePostOnPress =
    userAuthAtomValue !== null
      ? () => {
          // setIsLiked((current) => !current);
          likePostMutation.mutate();
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
          ); // TODO: Need to login to like posts?
  return (
    <View style={style}>
      <TouchableOpacity onPress={handleLikePostOnPress}>
        <HeartIcon
          color={
            likePostMutation.isSuccess
              ? likePostMutation.data["liked_post"]
                ? "red"
                : "white"
              : "white"
          }
          size={SIDEBAR_ICON_SIZE}
        />
        <Text style={textStyle}>{numberFormatter.format(updatedNumLikes)}</Text>
      </TouchableOpacity>
    </View>
  );
}
