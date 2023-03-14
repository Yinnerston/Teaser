import { StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { HOME_NAV_ICON_SIZE } from "../../../Constants";

/**
 * Comment icon used in Teaser Video Feed.
 * @param {color} props
 * @returns
 */
export default function CommentIcon(props) {
  const { color, size } = props;
  return (
    <AntDesign
      name="message1"
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
