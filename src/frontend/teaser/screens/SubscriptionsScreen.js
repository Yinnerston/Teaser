import { View, Text } from "react-native";
import { useEffect } from "react";
/**
 * Screen for Subscriptions.
 * @returns Currently logged in user's subscriptions.
 * @returns otherwise the AuthScreen to register/login.
 */
export default function SubscriptionsScreen({ navigation }) {
  // TODO: Change to state variable based on AuthContext?
  const userIsLoggedIn = true;
  // Navigate to AuthScreen if user is nt logged in
  useEffect(() => {
    if (userIsLoggedIn) {
      navigation.navigate("Auth");
    }
  });

  return (
    <View>
      <Text>Subscriptions</Text>
    </View>
  );
}
