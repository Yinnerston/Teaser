import { View } from "react-native";
import { readOnlyUserAuthAtom } from "../hooks/auth/useUserAuth";
import { useAtom } from "jotai";
import SignUpScreen from "./auth/SignUpScreen";

/**
 * Screen for Subscriptions.
 * @returns Currently logged in user's subscriptions.
 * @returns otherwise the AuthScreen to register/login.
 */
export default function SubscriptionsScreen({ navigation }) {
  const [userAuthAtomValue] = useAtom(readOnlyUserAuthAtom);

  const signUpScreen = <SignUpScreen></SignUpScreen>;
  const subscriptionsScreen = <View></View>;

  return userAuthAtomValue ? subscriptionsScreen : signUpScreen;
}
