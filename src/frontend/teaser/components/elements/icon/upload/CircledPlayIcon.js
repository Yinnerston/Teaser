import { AntDesign } from "@expo/vector-icons";
import { HOME_NAV_ICON_SIZE } from "../../../../Constants";

export default function CircledPlayIcon(props) {
  return (
    <AntDesign
      name="playcircleo"
      size={HOME_NAV_ICON_SIZE}
      color="black"
      {...props}
    />
  );
}
