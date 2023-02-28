import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Image,
  SafeAreaView,
} from "react-native";
import { Link } from "@react-navigation/native";
import { authFormStyles } from "./styles";
import { useHeaderHeight } from "@react-navigation/elements";
import AuthButton from "../../components/elements/button/AuthButton";
import { REGISTER_BUTTON_COLOR } from "../../Constants";
const teaserLogo = require("../../assets/teaser_180x60.png");
/**
 * Forgot password page.
 * TODO: Add link to TOS.
 * @returns
 */
export default function ForgotPasswordScreen({ navigation }) {
  const styles = useAuthScreenStyle();
  // TODO: Reset password.
  const onSubmit = (data) => navigation.navigate("Home");

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 2 }}>
        <Image source={teaserLogo} style={styles.logoImageStyle}></Image>
      </View>
      <View style={{ flex: 3 }}>
        <Text style={styles.titleStyle}>Forgot your password?</Text>
        <AuthButton
          color={REGISTER_BUTTON_COLOR}
          routeName="Login"
          buttonText="Click Here."
          navigation={navigation}
        />
      </View>
      <View style={styles.loginView}>
        <Text style={styles.loginViewTextStyle}>
          Already have an account?{"  "}
          <Link to={{ screen: "Login" }} style={styles.loginLinkStyle}>
            Log in
          </Link>
        </Text>
      </View>
    </SafeAreaView>
  );
}

const useAuthScreenStyle = () => {
  const { height, width } = useWindowDimensions();
  const headerHeight = useHeaderHeight();

  const styles = StyleSheet.create({
    container: {
      justifyContent: "flex-start",
      alignItems: "center",
      height: height,
      width: width,
    },
    logoImageStyle: {
      marginVertical: height / 8,
    },
    titleStyle: {
      flex: 1,
      fontWeight: "bold",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      fontSize: 24,
    },
    loginView: {
      flex: 1,
      backgroundColor: "#fcdae2",
      // height: 69,
      width: width,
      // position: 'absolute',
      // top: height - 69 - headerHeight,
      marginTop: 69,
    },
    loginViewTextStyle: {
      margin: "auto",
      textAlign: "center",
      justifyContent: "flex-start",
    },
    loginLinkStyle: {
      color: "#fe2c55",
    },
  });
  return styles;
};
