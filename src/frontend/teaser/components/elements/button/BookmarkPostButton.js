import { View, TouchableOpacity, Text } from "react-native";
import { useState } from "react";
import BookmarkIcon from "../icon/BookmarkIcon";
import { SIDEBAR_ICON_SIZE } from "../../../Constants";

/**
 * Bookmark Post button.
 * @param {numBookmarks} props
 * @returns
 */
export default function BookmarkPostButton(props) {
  const { numBookmarks, style, textStyle } = props;
  // TODO: Add to liked posts on like
  const [isBookmarked, setIsBookmarked] = useState(false);
  return (
    <View style={style}>
      <TouchableOpacity onPress={() => setIsBookmarked((current) => !current)}>
        <BookmarkIcon
          color={isBookmarked ? "orange" : "white"}
          size={SIDEBAR_ICON_SIZE}
        />
        <Text style={textStyle}>{numBookmarks}</Text>
      </TouchableOpacity>
    </View>
  );
}
