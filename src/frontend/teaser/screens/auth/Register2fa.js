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
      <View style={{ flex: 1 }}>
        {/* <OTPInput
                code={otpCode}
                setCode={setOTPCode}
                maximumLength={maximumCodeLength}
                setIsPinReady={setShowLoginButton}
            /> */}
        <Button title="2FA Placeholder" onPress={onButtonPress} />
      </View>

      <View style={styles.loginView}>
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
    },
    todoText: {
      backgroundColor: "gray",
      fontWeight: "bold",
    },
    loginView: {
      flex: 1,
      backgroundColor: "#fcdae2",
      // // height: 69,
      width: width,
      // // position: 'absolute',
      // // top: height - 69 - headerHeight,
      // marginTop: 69,
    },
  });
  return styles;
};
