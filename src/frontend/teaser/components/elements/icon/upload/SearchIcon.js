import { FontAwesome } from "@expo/vector-icons";
import { HOME_NAV_ICON_SIZE } from "../../../../Constants";

export default function SearchIcon({ searchIconStyle, color, size }) {
  const iconColor = color ? color : "gray";
  const iconSize = size ? size : HOME_NAV_ICON_SIZE;
  return (
    <FontAwesome
      name="search"
      style={searchIconStyle}
      size={iconSize}
      color={iconColor}
    />
  );
}
