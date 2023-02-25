import { StyleSheet } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import { HOME_NAV_ICON_SIZE } from "../../../Constants";

/**
 * Speech icon used in HomeNavigator.
 * @param {color} props
 * @returns
 */
export default function SpeechIcon(props) {
  const { color, size } = props;
  return (
    <SimpleLineIcons
      name="speech"
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
