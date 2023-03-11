import { View, TouchableOpacity, Text } from "react-native";
import { useState } from "react";
import CommentIcon from "../icon/CommentIcon";

export default function CommentPostButton(props) {
  const { numLikes, style } = props;
  // TODO: Add to liked posts on like
  const [isLiked, setIsLiked] = useState(false);
  return (
    <View>
      <TouchableOpacity onPress={() => setIsLiked((current) => !current)}>
        <CommentIcon color={isLiked ? "blue" : "white"} />
        <Text>{numLikes}</Text>
      </TouchableOpacity>
    </View>
  );
}
