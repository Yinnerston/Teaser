import { MaterialIcons } from "@expo/vector-icons";
import { HOME_NAV_ICON_SIZE } from "../../../../Constants";

export default function CategoriesIcon(props) {
  return (
    <MaterialIcons
      name="category"
      size={HOME_NAV_ICON_SIZE}
      color="black"
      {...props}
    />
  );
}
