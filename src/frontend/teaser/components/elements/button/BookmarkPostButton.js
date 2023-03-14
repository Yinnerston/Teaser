import { View, TouchableOpacity, Text } from "react-native";
import { useState } from "react";
import BookmarkIcon from "../icon/BookmarkIcon";

/**
 * Bookmark Post button.
 * @param {numBookmarks} props
 * @returns
 */
export default function BookmarkPostButton(props) {
  const { numBookmarks } = props;
  // TODO: Add to liked posts on like
  const [isBookmarked, setIsBookmarked] = useState(false);
  return (
    <View>
      <TouchableOpacity onPress={() => setIsBookmarked((current) => !current)}>
        <BookmarkIcon color={isBookmarked ? "orange" : "white"} />
        <Text>{numBookmarks}</Text>
      </TouchableOpacity>
    </View>
  );
}
