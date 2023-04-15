import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { HOME_NAV_ICON_SIZE } from "../../../Constants";
/**
 * Template for ionicon. Used by PersonIcon.
 * @param {color} props
 * @returns
 */
export default function IoniconsTemplateIcon(props) {
  const { name, color, size } = props;
  return (
    <Ionicons
      name={name}
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
