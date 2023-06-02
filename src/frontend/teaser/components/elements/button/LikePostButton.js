import { View, TouchableOpacity, Text } from "react-native";
import { useState } from "react";
import HeartIcon from "../icon/HeartIcon";
import { SIDEBAR_ICON_SIZE } from "../../../Constants";
import { useMutation, useQueryClient } from "react-query";
import { getLikePostMutationKey } from "../../../hooks/feed/useFeedSidebar";
import { likePost } from "../../../api/feed/postsFeedApi";
/**
 * Like Post button.
 * @param {numLikes} props
 * @returns
 */
export default function LikePostButton(props) {
  const { userAuthAtomValue, postID, numLikes, style, textStyle } = props;
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
  });
  const handleLikePostOnPress =
    userAuthAtomValue !== null
      ? () => {
          // setIsLiked((current) => !current);
          likePostMutation.mutate();
        }
      : null; // TODO: Need to login to like posts?
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
        <Text style={textStyle}>{numLikes}</Text>
      </TouchableOpacity>
    </View>
  );
}
