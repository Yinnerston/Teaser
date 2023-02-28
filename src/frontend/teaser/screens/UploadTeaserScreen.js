import { SafeAreaView, Text, View } from "react-native";
import UploadIcon from "../components/elements/icon/UploadIcon";
import { SIGN_UP_VIEW_ICON_SIZE } from "../Constants";
import { useSignUpViewStyles } from "./styles";
import AuthButton from "../components/elements/button/AuthButton";
import { REGISTER_BUTTON_COLOR } from "../Constants";
/**
 * Screen for the video editor.
 * @returns Currently logged in user's profile
 * @returns otherwise the AuthScreen to register/login.
 */
export default function UploadTeaserScreen({ navigation }) {
  const signUpViewStyles = useSignUpViewStyles();
  return (
    <SafeAreaView style={signUpViewStyles.container}>
      <UploadIcon size={SIGN_UP_VIEW_ICON_SIZE} color="#B0AFB4"></UploadIcon>
      <Text style={signUpViewStyles.textBodyStyle}>Sign up for an account</Text>
      <AuthButton
        color={REGISTER_BUTTON_COLOR}
        routeName="Auth"
        buttonText="Sign Up"
        navigation={navigation}
      />
    </SafeAreaView>
  );
}
