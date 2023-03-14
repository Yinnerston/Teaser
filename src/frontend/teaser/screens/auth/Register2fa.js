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
import { useHeaderHeight } from "@react-navigation/elements";
import AuthButton from "../../components/elements/button/AuthButton";
import { REGISTER_BUTTON_COLOR } from "../../Constants";
import { authFormStyles } from "./styles";
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

  const onRegisterButtonPress = async (data) => {
    const registerOutput = navigation.navigate("RegisterPassword", {
      ...route.params,
      ...data,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        <Text style={styles.todoText}>TODO: Add validation using 2fa.</Text>
      </View>

      <View style={styles.authContainer}>
        <Text style={authFormStyles.textInputLabel}>
          A one-time password was sent to your ???:
        </Text>
        <Button
          title="2FA Placeholder"
          style={{ marginBotton: 20 }}
          onPress={onButtonPress}
        />

        {showLoginButton ? (
          <AuthButton
            onPress={() =>
              navigation.navigate("RegisterPassword", route.params)
            }
            color={REGISTER_BUTTON_COLOR}
            routeName="RegisterPassword"
            buttonText="Next"
            navigation={navigation}
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
