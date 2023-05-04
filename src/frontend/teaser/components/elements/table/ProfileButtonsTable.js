import { StyleSheet, View, Text } from "react-native";
import AuthButton from "../button/AuthButton";
import ProfileIconButton from "../button/ProfileIconButton";
import SpeechIcon from "../icon/SpeechIcon";
import { REGISTER_BUTTON_COLOR } from "../../../Constants";

/**
 * Horizontal Flexbox Table showing all the button
 * on a user profile.
 * @param {*} props
 * @returns
 */
export default function ProfileButtonsTable(props) {
  return (
    <View style={styles.container}>
      <AuthButton
        color={REGISTER_BUTTON_COLOR}
        buttonText="Follow"
        onPress={() => {
          // TODO: Follow user.
        }}
      />
      <ProfileIconButton
        icon={
          // Some icon
          <SpeechIcon></SpeechIcon>
        }
      ></ProfileIconButton>
      <ProfileIconButton
        icon={
          // Some icon
          <SpeechIcon></SpeechIcon>
        }
      ></ProfileIconButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
});
