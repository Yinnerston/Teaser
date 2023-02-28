import { StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { HOME_NAV_ICON_SIZE } from "../../../Constants";

/**
 * Home icon used in HomeNavigator.
 * @param {color} props
 * @returns
 */
export default function HomeIcon(props) {
  const { color, size } = props;
  return (
    <AntDesign
      name="home"
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
