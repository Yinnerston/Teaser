import IoniconsTemplateIcon from "./IoniconsTemplate";
import { View } from "react-native";
/**
 * Settings icon, note that this is not a button and has 16 right padding.
 * @returns View containing Settings icon
 */
export default function SettingsIcon() {
  return (
    <View style={{ paddingRight: 16 }}>
      <IoniconsTemplateIcon name="ios-settings-outline" color="black" />
    </View>
  );
}
