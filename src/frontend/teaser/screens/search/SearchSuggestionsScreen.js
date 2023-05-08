import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native-gesture-handler";
import { View, StyleSheet, Text } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { useState } from "react";
import { SEARCH_BUTTON_TEXT_COLOR } from "../../Constants";
import { Ionicons } from "@expo/vector-icons";
// import { useQuery } from "react-query";
// import {
// getSearchSuggestionsQueryFn,
// getSearchSuggestionsKey,
// } from "../../hooks/search/useSearch";
// import { readOnlyUserAuthAtom } from "../../hooks/auth/useUserAuth";
// import { useAtom } from "jotai";
import SearchSuggestionCard from "../../components/cards/SearchSuggestionsCard";

const searchSuggestions = [
  { suggestion: "Amateur", is_hot: true, is_trending: true },
  { suggestion: "Roleplay", is_hot: false, is_trending: true },
  { suggestion: "Lesbian", is_hot: true, is_trending: false },
  { suggestion: "Group", is_hot: false, is_trending: false },
  { suggestion: "Anal", is_hot: true, is_trending: false },
  { suggestion: "Social Media", is_hot: false, is_trending: false },
  { suggestion: "MILF", is_hot: false, is_trending: false },
  { suggestion: "Romantic", is_hot: true, is_trending: false },
];

export default function SearchSuggestionsScreen({ navigation }) {
  const [searchText, setSearchText] = useState("");
  // const [userAuthAtomValue] = useAtom(readOnlyUserAuthAtom);
  // const [searchQueryOnSubmit, setSearchQueryOnSubmit] = useState("");
  // const searchQuerySuggestions = useQuery({
  //   queryKey: getSearchSuggestionsKey(userAuthAtomValue, searchText),
  //   queryFn: getSearchSuggestionsQueryFn,
  //   keepPreviousData: true,
  // }); // TODO: implement fetch autocomplete

  /**
   * Render search terms highlighting hot or trending search terms.
   * @param { item } param0
   * @returns
   */
  const renderSearchTerms = ({ item }) => (
    <SearchSuggestionCard
      suggestion={item.suggestion}
      isHot={item.is_hot}
      isTrending={item.is_trending}
      handlePressSuggestion={() => {
        setSearchText(item.suggestion);
        if (item.suggestion !== "") {
          navigation.navigate("SearchResults", { searchTerm: item.suggestion });
        }
      }}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchBarContainer}>
        <View style={styles.textInputContainer}>
          <TextInput
            editable
            style={styles.textInput}
            onChangeText={(text) => setSearchText(text)}
            value={searchText}
            onSubmitEditing={({ nativeEvent: { text } }) => {
              if (text !== "") {
                navigation.navigate("SearchResults", { searchTerm: text });
              }
            }}
            placeholder="Search Term"
          />
          <TouchableOpacity
            style={styles.micButtonContainer}
            onPress={() => {
              // TODO: Add mic
            }}
          >
            <Ionicons name="mic" size={24} color="gray" />
          </TouchableOpacity>
        </View>
        <View style={styles.searchTextContainer}>
          <TouchableOpacity
            onPress={() => {
              if (searchText !== "") {
                navigation.navigate("SearchResults", {
                  searchTerm: searchText,
                }); // TODO: state variable means react query will invalidate previous query next time you change searchText ?
              }
            }}
          >
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={searchSuggestions}
        keyExtractor={(item) => "SEARCHSUGGESTIONITEM" + Math.random()}
        renderItem={renderSearchTerms}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  searchBarContainer: {
    height: 32,
    flexDirection: "row",
    marginHorizontal: 32,
    marginVertical: 16,
  },
  textInputContainer: {
    flex: 3,
  },
  textInput: {
    backgroundColor: "#f1f1f1",
    color: "#86858a",
    padding: 6,
  },
  micButtonContainer: {
    position: "absolute",
    right: 4,
    top: 4,
    height: 24,
    width: 24,
  },
  searchTextContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  searchButtonText: {
    color: SEARCH_BUTTON_TEXT_COLOR,
    fontWeight: "bold",
  },
});
