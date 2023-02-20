import { StyleSheet, View } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";

export default function SpeechIcon() {
  return <SimpleLineIcons name="speech" size={24} color="black" />;
}

const styles = StyleSheet.create({
  icon: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
