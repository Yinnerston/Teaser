import { View, Button } from "react-native";
import { userAuthAtom } from "../hooks/auth/useUserAuth";
import { useAtom } from "jotai";
import SignUpScreen from "./auth/SignUpScreen";
import { clearUserAuth } from "../hooks/auth/useUserAuth";

/**
 * Screen for Subscriptions.
 * @returns Currently logged in user's subscriptions.
 * @returns otherwise the AuthScreen to register/login.
 */
export default function SubscriptionsScreen({ navigation }) {
  const [userAuth, setUserAuth] = useAtom(userAuthAtom);

  const signUpScreen = <SignUpScreen navigation={navigation}></SignUpScreen>;
  const subscriptionsScreen = (
    <View>
      <Button
        onPress={() => {
          clearUserAuth();
          setUserAuth(null);
        }}
        title="logout"
        color="red"
      ></Button>
    </View>
  );

  return userAuth ? subscriptionsScreen : signUpScreen;
}
