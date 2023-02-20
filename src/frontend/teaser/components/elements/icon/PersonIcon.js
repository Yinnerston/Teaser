import { StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function PersonIcon() {
  return <Ionicons name="person-outline" size={24} color="black" />;
}

const styles = StyleSheet.create({
  icon: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
