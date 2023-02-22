import {
  View,
  Text,
  Button,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { Link } from "@react-navigation/native";
import { authFormStyles } from "./styles";

/**
 * One button for Register and One for Login.
 * TODO: Add link to TOS.
 * @returns
 */
export default function AuthScreen({ navigation }) {
  const styles = useAuthScreenStyle();
  return (
    <View>
      <Text>Sign up for a Teaser account:</Text>
      <Button
        title="Register"
        onPress={() => navigation.navigate("Register")}
        style={styles.registerButtonStyle}
      ></Button>
      <Text style={authFormStyles.formValidationText}>
        By continuing, you agree to Teaser's Terms of Service.
      </Text>
      <View style={styles.loginView}>
        <Text style={styles.loginViewTextStyle}>
          Already have an account?{" "}
          <Link to={"Login"} style={styles.loginLinkStyle}>
            Log in
          </Link>
        </Text>
      </View>
    </View>
  );
}

const useAuthScreenStyle = () => {
  const { height, width } = useWindowDimensions();
  const styles = StyleSheet.create({
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    titleStyle: {
      fontWeight: "bold",
    },
    registerButtonStyle: {
      margin: "auto",
      width: (width * 3) / 4,
    },
    loginView: {
      backgroundColor: "gray",
      height: 69,
    },
    loginViewTextStyle: {
      margin: "auto",
    },
    loginLinkStyle: {
      color: "pink",
    },
  });
  return styles;
};
