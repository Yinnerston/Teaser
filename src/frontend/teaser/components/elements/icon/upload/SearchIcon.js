import { FontAwesome } from "@expo/vector-icons";
import { HOME_NAV_ICON_SIZE } from "../../../../Constants";

export default function SearchIcon({ searchIconStyle }) {
  return <FontAwesome name="search" size={HOME_NAV_ICON_SIZE} color="gray" />;
}
