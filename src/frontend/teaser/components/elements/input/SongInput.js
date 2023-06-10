import { useState } from "react";
import { View, StyleSheet, useWindowDimensions, Alert } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import SearchIcon from "../icon/upload/SearchIcon";

export default function SongInput() {
  const styles = useSongInputStyles();
  const [songText, setSongText] = useState("");
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="What song do you want to play in your video?"
        onChange={(newText) => setSongText(newText)}
        value={songText}
        onSubmitEditing={({ nativeEvent: { text } }) => {
          if (text !== "") {
            Alert.alert("Not implemented yet.");
          }
        }}
      ></TextInput>
      <View style={styles.searchIconView}>
        <SearchIcon searchIconStyle={styles.searchIconStyle} />
      </View>
    </View>
  );
}

export const useSongInputStyles = () => {
  const { width, height } = useWindowDimensions();
  const styles = StyleSheet.create({
    container: {
      width: width,
    },
    textInput: {
      height: 40,
      backgroundColor: "white",
      marginRight: 16,
      marginVertical: 4,
      width: width - 56,
      left: 56,
    },
    searchIconView: {
      position: "absolute",
      height: 40,
      width: 40,
      marginLeft: 16,
      marginVertical: 4,
      backgroundColor: "white",
      justifyContent: "center",
      alignItems: "center",
    },
  });
  return styles;
};
