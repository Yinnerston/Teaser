import { View, TouchableOpacity, Text } from "react-native";
import { useState } from "react";
import CommentIcon from "../icon/CommentIcon";
import { SIDEBAR_ICON_SIZE } from "../../../Constants";

/**
 * Comment Post button.
 * @param {commentCount} props
 * @returns
 */
export default function CommentPostButton(props) {
  const { commentCount, style, textStyle, setShowCommentModal } = props;
  // TODO: Add to liked posts on like
  return (
    <View style={style}>
      <TouchableOpacity
        onPress={() => {
          setShowCommentModal((current) => !current);
        }}
      >
        <CommentIcon color={"white"} size={SIDEBAR_ICON_SIZE} />
        <Text style={textStyle}>{commentCount}</Text>
      </TouchableOpacity>
    </View>
  );
}
