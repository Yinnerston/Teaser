import { View, TouchableOpacity, Text } from "react-native";
import { useState } from "react";
import ShareIcon from "../icon/ShareIcon";
import { SIDEBAR_ICON_SIZE } from "../../../Constants";

export default function SharePostButton(props) {
  const { numShares, style, textStyle } = props;
  // TODO: Add to liked posts on like
  const [isShared, setIsShared] = useState(false);
  return (
    <View style={style}>
      <TouchableOpacity onPress={() => setIsShared((current) => !current)}>
        <ShareIcon
          color={isShared ? "black" : "white"}
          size={SIDEBAR_ICON_SIZE}
        />
        <Text style={textStyle}>{numShares}</Text>
      </TouchableOpacity>
    </View>
  );
}
