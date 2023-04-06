import { Fontisto } from "@expo/vector-icons";
import { HOME_NAV_ICON_SIZE } from "../../../../Constants";

export default function HashtagIcon(props) {
  return (
    <Fontisto
      name="hashtag"
      size={HOME_NAV_ICON_SIZE}
      color="black"
      {...props}
    />
  );
}
