import { MaterialCommunityIcons } from "@expo/vector-icons";
import { HOME_NAV_ICON_SIZE } from "../../../../Constants";

export default function SpeedIcon() {
  return (
    <MaterialCommunityIcons
      name="speedometer"
      size={HOME_NAV_ICON_SIZE}
      color="white"
    />
  );
}
