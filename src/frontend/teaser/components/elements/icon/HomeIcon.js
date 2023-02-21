import { StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

/**
 * Home icon used in HomeNavigator.
 * @param {color} props
 * @returns
 */
export default function HomeIcon(props) {
  const { color } = props;
  return <AntDesign name="home" size={24} color={color} />;
}

const styles = StyleSheet.create({
  icon: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
