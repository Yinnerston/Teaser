import { StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { HOME_NAV_ICON_SIZE } from "../../../Constants";

/**
 * Share icon used in Feed.
 * @param {color} props
 * @returns
 */
export default function ShareIcon(props) {
  const { color, size } = props;
  return (
    <FontAwesome
      name="share"
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
