import { View, Text } from "react-native";

/**
 * Screen for Subscriptions.
 * @returns Currently logged in user's subscriptions.
 * @returns otherwise the AuthScreen to register/login.
 */
export default function SubscriptionsScreen({ navigator }) {
  // TODO: Change to state variable based on AuthContext?
  const userIsLoggedIn = true;
  // Navigate to AuthScreen if user is nt logged in
  const _userIsLoggedIn = () => {
    if (userIsLoggedIn) navigator.navigate("Auth");
  };

  return (
    <View>
      {_userIsLoggedIn}
      <Text>Subscriptions</Text>
    </View>
  );
}
