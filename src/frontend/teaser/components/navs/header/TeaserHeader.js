import { View, Text, StyleSheet, useWindowDimensions } from "react-native";
import SearchIcon from "../../elements/icon/upload/SearchIcon";
import { TouchableOpacity } from "react-native-gesture-handler";

/**
 * Container for header of a Teaser.
 * Handles seeking between ForYou / Following.
 * @returns
 */
export default function TeaserHeader({ navigation }) {
  const styles = useTeaserHeaderStyle();
  return (
    <View style={styles.header}>
      <View style={styles.headerTextContainer}></View>
      <View style={styles.searchIconContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("SearchSuggestions")}
        >
          <SearchIcon size={32} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const useTeaserHeaderStyle = () => {
  const { width } = useWindowDimensions();
  const styles = StyleSheet.create({
    header: {
      position: "absolute",
      top: 16,
      marginHorizontal: 16,
      left: "auto",
      right: "auto",
      width: width - 32,
      flexDirection: "row",
    },
    headerTextContainer: {
      flex: 3,
    },
    searchIconContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "flex-end",
    },
  });
  return styles;
};
