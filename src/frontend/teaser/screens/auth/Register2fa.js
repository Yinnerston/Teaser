import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  SafeAreaView,
  Button,
} from "react-native";
import { useState } from "react";
import { useHeaderHeight } from "@react-navigation/elements";
import AuthButton from "../../components/elements/button/AuthButton";
import { REGISTER_BUTTON_COLOR } from "../../Constants";
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
  // const [otpCode, setOTPCode] = useState("");
  // const maximumCodeLength = 4;
  const styles = useAuthScreenStyle();

  const onButtonPress = () => {
    setShowLoginButton(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        <Text style={styles.todoText}>TODO: Add validation using 2fa.</Text>
        <Text style={styles.todoText}>
          Route params: {JSON.stringify(route.params, null, 2)}
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
            buttonText="Login"
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
