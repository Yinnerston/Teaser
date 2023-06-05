import SettingsIcon from "../icon/SettingsIcon";
import { TouchableOpacity } from "react-native-gesture-handler";

/**
 * Settings button
 * @param { navigation } navigation
 * @returns
 */
export default function SettingsButton({ navigation }) {
  return (
    <TouchableOpacity onPress={() => navigation.navigate("ProfileSettings")}>
      <SettingsIcon />
    </TouchableOpacity>
  );
}
