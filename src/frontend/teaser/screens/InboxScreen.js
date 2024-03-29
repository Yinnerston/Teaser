import { SafeAreaView, Text, View } from "react-native";
import SpeechIcon from "../components/elements/icon/SpeechIcon";
import { SIGN_UP_VIEW_ICON_SIZE } from "../Constants";
import { useSignUpViewStyles } from "./styles";
import AuthButton from "../components/elements/button/AuthButton";
import { REGISTER_BUTTON_COLOR } from "../Constants";
import { readOnlyUserAuthAtom } from "../hooks/auth/useUserAuth";
import { useAtom } from "jotai";
import InboxView from "../components/templates/inbox/InboxView";
/**
 * Screen for Inbox.
 * @returns Currently logged in user's inbox.
 * @returns otherwise the AuthScreen to register/login.
 */
export default function InboxScreen({ navigation }) {
  const signUpViewStyles = useSignUpViewStyles();
  const [userAuthAtomValue] = useAtom(readOnlyUserAuthAtom);
  const signUpScreen = (
    <SafeAreaView style={signUpViewStyles.container}>
      <SpeechIcon size={SIGN_UP_VIEW_ICON_SIZE} color="#B0AFB4"></SpeechIcon>
      <Text style={signUpViewStyles.textBodyStyle}>Sign up for an account</Text>
      <AuthButton
        color={REGISTER_BUTTON_COLOR}
        routeName="Auth"
        buttonText="Sign Up"
        navigation={navigation}
      />
    </SafeAreaView>
  );

  const inboxScreen = <InboxView navigation={navigation}/>;

  return userAuthAtomValue ? inboxScreen : signUpScreen;
}
