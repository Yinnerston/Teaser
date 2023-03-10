import { View } from "react-native";
import { readOnlyUserAuthAtom } from "../hooks/auth/useUserAuth";
import { useAtom } from "jotai";
import SignUpScreen from "./auth/SignUpScreen";

/**
 * Screen for the video editor.
 * @returns Currently logged in user's profile
 * @returns otherwise the AuthScreen to register/login.
 */
export default function UploadTeaserScreen({ navigation }) {
  const [userAuthAtomValue] = useAtom(readOnlyUserAuthAtom);

  const signUpScreen = <SignUpScreen navigation={navigation}></SignUpScreen>;
  const uploadScreen = <View></View>;

  return userAuthAtomValue ? uploadScreen : signUpScreen;
}
