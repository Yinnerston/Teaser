import { TouchableOpacity } from "react-native-gesture-handler";
import { Text, View, StyleSheet, useWindowDimensions } from "react-native";
import {
  SEARCH_BUTTON_TEXT_COLOR,
  TEXT_BUBBLE_CATEGORY_COLOR,
} from "../../Constants";
import FireIcon from "../elements/icon/FireIcon";

/**
 *
 * @param { suggestion, isHot, isTrending, handlePressSuggestion } param0
 * @returns
 */
export default function SearchSuggestionCard({
  suggestion,
  isHot,
  isTrending,
  handlePressSuggestion,
}) {
  const styles = useSearchSuggestionCardStyles();
  return (
    <TouchableOpacity
      style={{
        ...styles.container,
        backgroundColor: isTrending ? TEXT_BUBBLE_CATEGORY_COLOR : "white",
      }}
      onPress={handlePressSuggestion}
    >
      <View style={styles.dotContainer}>
        <View
          style={{
            ...styles.dot,
            backgroundColor: isTrending ? SEARCH_BUTTON_TEXT_COLOR : "gray",
          }}
        />
      </View>
      <Text>{suggestion}</Text>
      {isHot ? (
        <View style={styles.isHotIconContainer}>
          <FireIcon />
        </View>
      ) : null}
    </TouchableOpacity>
  );
}

const useSearchSuggestionCardStyles = () => {
  const { width } = useWindowDimensions();
  const styles = StyleSheet.create({
    container: {
      height: 36,
      flexDirection: "row",
      alignItems: "center",
      marginVertical: 2,
    },
    dotContainer: {
      height: 36,
      width: 36,
      justifyContent: "center",
      alignItems: "center",
    },
    dot: {
      height: 8,
      width: 8,
      borderRadius: 4,
    },
    isHotIconContainer: {
      height: 36,
      width: 36,
      justifyContent: "center",
      alignItems: "center",
    },
  });
  return styles;
};
