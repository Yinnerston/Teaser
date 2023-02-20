import { View, Text } from "react-native";

/**
 * Screen for Inbox.
 * @returns Currently logged in user's inbox.
 * @returns otherwise the AuthScreen to register/login.
 */
export default function InboxScreen({ navigator }) {
  // TODO: Change to state variable based on AuthContext?
  const userIsLoggedIn = true;
  // Navigate to AuthScreen if user is nt logged in
  const _userIsLoggedIn = () => {
    if (userIsLoggedIn) navigator.navigate("Auth");
  };

  return (
    <View>
      {_userIsLoggedIn}
      <Text>Inbox</Text>
    </View>
  );
}
