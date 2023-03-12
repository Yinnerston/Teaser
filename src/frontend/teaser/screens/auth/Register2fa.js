import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  SafeAreaView,
  Button,
  Alert,
} from "react-native";
import { useState, useEffect } from "react";
import { StackActions } from "@react-navigation/native";
import { useHeaderHeight } from "@react-navigation/elements";
import AuthButton from "../../components/elements/button/AuthButton";
import { REGISTER_BUTTON_COLOR } from "../../Constants";
import { registerUserFunction } from "../../api/auth/authApi";
// import OTPInput from "../../components/elements/input/OTPInput";

const teaserLogo = require("../../assets/teaser_180x60.png");
/**
 * One button for Register and One for Login.
 * TODO: Add link to TOS.
 * TODO: Disble going back form this page.
 * @returns
 */
export default function Register2fa({ navigation, route }) {
  // TODO: Add validation / link to backend.
  const [showLoginButton, setShowLoginButton] = useState(false);
  const [is2faAuthorized, setIs2faAuthorized] = useState(false);
  const [registerResponse, setRegisterResponse] = useState(false);
  // const [otpCode, setOTPCode] = useState("");
  // const maximumCodeLength = 4;
  const styles = useAuthScreenStyle();

  useEffect(
    () =>
      navigation.addListener("beforeRemove", (e) => {
        if (is2faAuthorized) {
          // If authorized, do nothing
          return;
        }

        // Prevent default behavior of leaving the screen
        e.preventDefault();

        // Prompt the user before leaving the screen
        Alert.alert(
          "Cancel your registration?",
          "You cannot make an account unless you complete two factor authentication.",
          [
            { text: "Don't leave", style: "cancel", onPress: () => {} },
            {
              text: "Cancel Registration",
              style: "destructive",
              // Go back to the homepage
              onPress: () => navigation.navigate("Home"),
            },
          ],
        );
      }),
    [navigation, is2faAuthorized],
  );

  const onButtonPress = () => {
    setShowLoginButton(true);
  };

  const onRegisterButtonPress = async () => {
    const registerOutput = await registerUserFunction({
      ...route.params,
      terms_of_service_accepted: true,
    }); // TODO: Add TOS form
    if (registerOutput.status == 200) {
      navigation.navigate("Login");
    } else {
      // Go back to Auth Page with Error
      setRegisterResponse(registerOutput);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        <Text style={styles.todoText}>TODO: Add validation using 2fa.</Text>
        <Text style={styles.todoText}>
          {"\n"}
          {registerResponse
            ? registerResponse.status + " " + registerResponse.data
            : null}
        </Text>
      </View>

      <View style={styles.authContainer}>
        {/* <OTPInput
          code={otpCode}
          setCode={setOTPCode}
          maximumLength={maximumCodeLength}
          setIsPinReady={setShowLoginButton}
        /> */}
        <Button
          title="2FA Placeholder"
          style={{ marginBotton: 20 }}
          onPress={onButtonPress}
        />

        {showLoginButton ? (
          <AuthButton
            color={REGISTER_BUTTON_COLOR}
            routeName="Login"
            buttonText="Register"
            onPress={onRegisterButtonPress}
          />
        ) : null}
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
      backgroundColor: "#ed345c",
    },
    todoText: {
      backgroundColor: "#ed345c",
      fontWeight: "bold",
    },
    authContainer: {
      flex: 3,
      backgroundColor: "white",
      // // height: 69,
      width: width - 20,
      margin: 20,
      // // position: 'absolute',
      // // top: height - 69 - headerHeight,
      // marginTop: 69,
    },
  });
  return styles;
};
