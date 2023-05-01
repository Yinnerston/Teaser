import { View, TouchableOpacity, Text } from "react-native";
import { useState } from "react";
import CommentIcon from "../icon/CommentIcon";
import { SIDEBAR_ICON_SIZE } from "../../../Constants";

/**
 * Comment Post button.
 * @param {numLikes} props
 * @returns
 */
export default function CommentPostButton(props) {
  const { numLikes, style, textStyle } = props;
  // TODO: Add to liked posts on like
  const [isLiked, setIsLiked] = useState(false);
  return (
    <View style={style}>
      <TouchableOpacity onPress={() => setIsLiked((current) => !current)}>
        <CommentIcon
          color={isLiked ? "blue" : "white"}
          size={SIDEBAR_ICON_SIZE}
        />
        <Text style={textStyle}>{numLikes}</Text>
      </TouchableOpacity>
    </View>
  );
}
