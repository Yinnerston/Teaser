import { View, TouchableOpacity, Text } from "react-native";
import { useState } from "react";
import HeartIcon from "../icon/HeartIcon";
import { SIDEBAR_ICON_SIZE } from "../../../Constants";

/**
 * Like Post button.
 * @param {numLikes} props
 * @returns
 */
export default function LikePostButton(props) {
  const { numLikes, style, textStyle } = props;
  // TODO: Add to liked posts on like
  const [isLiked, setIsLiked] = useState(false);
  return (
    <View style={style}>
      <TouchableOpacity onPress={() => setIsLiked((current) => !current)}>
        <HeartIcon color={isLiked ? "red" : "white"} size={SIDEBAR_ICON_SIZE} />
        <Text style={textStyle}>{numLikes}</Text>
      </TouchableOpacity>
    </View>
  );
}
