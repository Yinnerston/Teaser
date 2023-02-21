import { StyleSheet } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";

export default function SpeechIcon(props) {
  const { color } = props;
  return <SimpleLineIcons name="speech" size={24} color={color} />;
}

const styles = StyleSheet.create({
  icon: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
