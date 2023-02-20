import { View, Text } from "react-native";

/**
 * Screen for the video editor.
 * @returns Currently logged in user's profile
 * @returns otherwise the AuthScreen to register/login.
 */
export default function UploadTeaserScreen({ navigator }) {
  // TODO: Change to state variable based on AuthContext?
  const userIsLoggedIn = true;
  // Navigate to AuthScreen if user is nt logged in
  const _userIsLoggedIn = () => {
    if (userIsLoggedIn) navigator.navigate("Auth");
  };

  return (
    <View>
      {_userIsLoggedIn}
      <Text>Upload Teaser</Text>
    </View>
  );
}
