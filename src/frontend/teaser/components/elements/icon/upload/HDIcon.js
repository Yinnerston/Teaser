import { MaterialIcons } from "@expo/vector-icons";
import { HOME_NAV_ICON_SIZE } from "../../../../Constants";

export default function HDIcon(props) {
  return (
    <MaterialIcons
      name="hd"
      size={HOME_NAV_ICON_SIZE}
      color="black"
      {...props}
    />
  );
}
