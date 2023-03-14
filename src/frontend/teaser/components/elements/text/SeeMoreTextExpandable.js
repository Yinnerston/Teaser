import { Text, TouchableOpacity } from "react-native";
import { useState } from "react";

/**
 * Expandable text component.
 * TODO: Linkify hashtags?
 * @param {navigation, textBody, numberOfLines, textStyle} props
 * @returns
 */
export default function SeeMoreTextExpandable(props) {
  const { navigation, textBody, numberOfLines, textStyle } = props;
  const [isShowingMore, setIsShowingMore] = useState(false);

  return (
    <TouchableOpacity onPress={() => setIsShowingMore((current) => !current)}>
      <Text numberOfLines={isShowingMore ? 0 : numberOfLines} style={textStyle}>
        {textBody}
      </Text>
    </TouchableOpacity>
  );
}
