import { readOnlyUserAuthAtom } from "../../hooks/auth/useUserAuth";
import { useAtom } from "jotai";
import ProfileView from "../../components/templates/profile/ProfileView";

import SignUpScreen from "../auth/SignUpScreen";
/**
 * Screen for profile.
 * @returns Currently logged in user's profile
 * @returns otherwise the AuthScreen to register/login.
 */
export default function ProfileScreen({ navigation }) {
  const [userAuthAtomValue] = useAtom(readOnlyUserAuthAtom);
  const signUpScreen = <SignUpScreen navigation={navigation} />;

  const profileView = <ProfileView navigation={navigation} />;

  return userAuthAtomValue ? profileView : signUpScreen;
}
