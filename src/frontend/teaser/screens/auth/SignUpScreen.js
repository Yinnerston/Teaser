import { SafeAreaView, Text } from "react-native";
import PersonIcon from "../../components/elements/icon/PersonIcon";
import { SIGN_UP_VIEW_ICON_SIZE } from "../../Constants";
import { useSignUpViewStyles } from "../styles";
import AuthButton from "../../components/elements/button/AuthButton";
import { REGISTER_BUTTON_COLOR } from "../../Constants";

export default function SignUpScreen({ navigation }) {
  const signUpViewStyles = useSignUpViewStyles();

  return (
    <SafeAreaView style={signUpViewStyles.container}>
      <PersonIcon size={SIGN_UP_VIEW_ICON_SIZE} color="#B0AFB4"></PersonIcon>
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
