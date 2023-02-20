import { StyleSheet, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function HomeIcon() {
  return <AntDesign name="home" size={24} color="black" />;
}

const styles = StyleSheet.create({
  icon: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
