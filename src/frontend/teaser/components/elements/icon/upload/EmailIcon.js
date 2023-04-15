import { Entypo } from "@expo/vector-icons";
import { HOME_NAV_ICON_SIZE } from "../../../../Constants";

export default function EmailIcon(props) {
  return (
    <Entypo name="email" size={HOME_NAV_ICON_SIZE} color="black" {...props} />
  );
}
