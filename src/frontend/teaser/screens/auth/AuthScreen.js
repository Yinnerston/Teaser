import {
  View,
  Text,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  Image,
  SafeAreaView,
} from "react-native";
import { Link } from "@react-navigation/native";
import { authFormStyles } from "./styles";
import { useHeaderHeight } from "@react-navigation/elements";
const teaserLogo = require("../../assets/teaser_180x60.png");
/**
 * One button for Register and One for Login.
 * TODO: Add link to TOS.
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
        <Pressable
          onPress={() => navigation.navigate("Register")}
          style={styles.registerButtonStyle}
        >
          <Text style={styles.registerButtonTextStyle}>Register</Text>
        </Pressable>
        <Text style={authFormStyles.formValidationText}>
          By continuing, you agree to Teaser's Terms of Service.
        </Text>
      </View>
      <View style={styles.loginView}>
        <Text style={styles.loginViewTextStyle}>
          Already have an account?{" "}
          <Link to={"Auth"} style={styles.loginLinkStyle}>
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
    registerButtonStyle: {
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 12,
      paddingHorizontal: 64,
      borderRadius: 4,
      elevation: 3,
      backgroundColor: "#db133e",
    },
    registerButtonTextStyle: {
      fontSize: 16,
      fontWeight: "bold",
      color: "white",
      textAlign: "center",
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
