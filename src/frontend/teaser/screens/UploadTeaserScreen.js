import { View, Text } from "react-native";
import { useEffect } from "react";
/**
 * Screen for the video editor.
 * @returns Currently logged in user's profile
 * @returns otherwise the AuthScreen to register/login.
 */
export default function UploadTeaserScreen({ navigation }) {
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
      <Text>Upload Teaser</Text>
    </View>
  );
}
