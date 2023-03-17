import { View } from "react-native";
import { readOnlyUserAuthAtom } from "../hooks/auth/useUserAuth";
import { useAtom } from "jotai";
import SignUpScreen from "./auth/SignUpScreen";
import UploadCameraScreen from "./upload/UploadCameraScreen";
/**
 * Screen for the video editor.
 * @returns Currently logged in user's profile
 * @returns otherwise the AuthScreen to register/login.
 */
export default function UploadTeaserScreen({ navigation }) {
  const [userAuthAtomValue] = useAtom(readOnlyUserAuthAtom);

  const signUpScreen = <SignUpScreen navigation={navigation} />;
  const uploadScreen = <UploadCameraScreen navigation={navigation} />;

  return userAuthAtomValue ? uploadScreen : signUpScreen;
}
