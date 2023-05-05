import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native-gesture-handler";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useState } from "react";
import { useQuery } from "react-query";
import { SEARCH_BUTTON_TEXT_COLOR } from "../../Constants";
import { Ionicons } from "@expo/vector-icons";

export default function SearchSuggestionsScreen({ navigation }) {
  const [searchText, setSearchText] = useState("");
  const [searchQueryOnSubmit, setSearchQueryOnSubmit] = useState("");
  const searchQuerySuggestions = useQuery(
    ["search", "suggestion", searchText],
    () => {},
  ); // TODO: implement fetch autocomplete
  const renderSearchTerms = ({ item }) => (
    <View>
      <Text>{item.text}</Text>
    </View>
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
              setSearchQueryOnSubmit(text);
              console.log(text);
              // TODO: Navigate to search page
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
              setSearchQueryOnSubmit(searchText);
              console.log(searchText);
              // TODO: Navigate to search page
            }}
          >
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
        </View>
      </View>
      {searchQuerySuggestions.isLoading ? (
        searchQuerySuggestions.isError ? (
          <Text>Error</Text>
        ) : (
          <Text>...Loading</Text>
        )
      ) : (
        <FlatList
          data={searchQuerySuggestions.data}
          keyExtractor={(item) => item.text}
          renderItem={renderSearchTerms}
        />
      )}
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
