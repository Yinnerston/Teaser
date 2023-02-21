import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function PersonIcon(props) {
  const { color } = props;
  return <Ionicons name="person-outline" size={24} color={color} />;
}

const styles = StyleSheet.create({
  icon: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
