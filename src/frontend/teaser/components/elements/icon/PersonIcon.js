import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { HOME_NAV_ICON_SIZE } from "../../../Constants";
/**
 * Person icon used in HomeNavigator.
 * @param {color} props
 * @returns
 */
export default function PersonIcon(props) {
  const { color, size } = props;
  return (
    <Ionicons
      name="person-outline"
      size={size ? size : HOME_NAV_ICON_SIZE}
      color={color}
    />
  );
}

const styles = StyleSheet.create({
  icon: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
