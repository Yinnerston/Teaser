import { SafeAreaView, Text } from "react-native";
import { useEffect } from "react";
/**
 * Screen for Inbox.
 * @returns Currently logged in user's inbox.
 * @returns otherwise the AuthScreen to register/login.
 */
export default function InboxScreen({ navigation }) {
  // TODO: Change to state variable based on AuthContext?
  const userIsLoggedIn = true;
  // Navigate to AuthScreen if user is nt logged in
  useEffect(() => {
    if (userIsLoggedIn) {
      navigation.navigate("Auth");
    }
  });

  return (
    <SafeAreaView>
      <Text>Inbox</Text>
    </SafeAreaView>
  );
}
