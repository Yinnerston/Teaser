import { SafeAreaView, Text } from "react-native";
import { useEffect } from "react";
/**
 * Screen for profile.
 * @returns Currently logged in user's profile
 * @returns otherwise the AuthScreen to register/login.
 */
export default function ProfileScreen({ navigation }) {
  // TODO: Change to state variable based on AuthContext?
  const userIsLoggedIn = true;
  // Navigate to AuthScreen if user is nt logged in
  useEffect(() => {
    if (userIsLoggedIn) {
      navigation.navigate("Register");
      // navigation.navigate("Register2fa", {username: "Jimmy", password: "Hello123!", phone: "+61234567890", email: "jimmy@gmail.com", dob: "Today"}); // TODO: TEMP CHANGE
    }
  });

  return (
    <SafeAreaView>
      <Text>Profile</Text>
    </SafeAreaView>
  );
}
