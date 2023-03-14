import { View, TouchableOpacity, Text } from "react-native";
import { useState } from "react";
import HeartIcon from "../icon/HeartIcon";

/**
 * Like Post button.
 * @param {numLikes} props
 * @returns
 */
export default function LikePostButton(props) {
  const { numLikes } = props;
  // TODO: Add to liked posts on like
  const [isLiked, setIsLiked] = useState(false);
  return (
    <View>
      <TouchableOpacity onPress={() => setIsLiked((current) => !current)}>
        <HeartIcon color={isLiked ? "red" : "white"} />
        <Text>{numLikes}</Text>
      </TouchableOpacity>
    </View>
  );
}
