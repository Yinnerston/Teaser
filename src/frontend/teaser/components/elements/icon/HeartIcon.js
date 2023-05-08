import { StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { HOME_NAV_ICON_SIZE } from "../../../Constants";

/**
 * Heart icon used in HomeNavigator.
 * @param {color} props
 * @returns
 */
export default function HeartIcon(props) {
  const { color, size, outline } = props;
  return (
    <AntDesign
      name={outline ? "hearto" : "heart"}
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
