import { View, TouchableOpacity, Text } from "react-native";
import { useState } from "react";
import ShareIcon from "../icon/ShareIcon";

export default function SharePostButton(props) {
  const { numShares, style } = props;
  // TODO: Add to liked posts on like
  const [isShared, setIsShared] = useState(false);
  return (
    <View>
      <TouchableOpacity onPress={() => setIsShared((current) => !current)}>
        <ShareIcon color={isShared ? "black" : "white"} />
        <Text>{numShares}</Text>
      </TouchableOpacity>
    </View>
  );
}
