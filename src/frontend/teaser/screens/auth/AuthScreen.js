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
 * One button for Register and One for Login.
 * TODO: Add link to TOS.
 * TODO: Can extend in the future by adding sign in using google, facebook, etc.
 * @returns
 */
export default function AuthScreen({ navigation }) {
  const styles = useAuthScreenStyle();
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 2 }}>
        <Image source={teaserLogo} style={styles.logoImageStyle}></Image>
      </View>
      <View style={{ flex: 3 }}>
        <Text style={styles.titleStyle}>Sign up for a Teaser account:</Text>
        <AuthButton
          color={REGISTER_BUTTON_COLOR}
          routeName="Register"
          buttonText="Register"
          navigation={navigation}
        />
        <Text style={authFormStyles.formValidationText}>
          By continuing, you agree to Teaser's Terms of Service.
        </Text>
      </View>
      <View style={styles.loginView}>
        <Text style={styles.loginViewTextStyle}>
          Already have an account?{"  "}
          <Link to={{ screen: "Login" }} style={authFormStyles.loginLinkStyle}>
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
  });
  return styles;
};
