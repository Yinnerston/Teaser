import { StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function HeartIcon(props) {
  const { color } = props;
  return <AntDesign name="heart" size={24} color={color} />;
}

const styles = StyleSheet.create({
  icon: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
