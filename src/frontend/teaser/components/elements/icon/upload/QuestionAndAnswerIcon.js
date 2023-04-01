import { MaterialCommunityIcons } from "@expo/vector-icons";
import { HOME_NAV_ICON_SIZE } from "../../../../Constants";

export default function QuestionAndAnswerIcon() {
  return (
    <MaterialCommunityIcons
      name="chat-question"
      size={HOME_NAV_ICON_SIZE}
      color="white"
    />
  );
}
