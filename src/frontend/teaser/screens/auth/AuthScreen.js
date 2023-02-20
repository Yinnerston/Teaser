import { View, Button } from "react-native";

/**
 * One button for Register and One for Login.
 * @returns
 */
export default function AuthScreen({ navigator }) {
  return (
    <View>
      <Button
        title="Register"
        onPress={() => navigator.navigate("Register")}
      ></Button>
      <Text>Already registered?</Text>
      <Button
        title="Login"
        onPress={() => navigator.navigate("Login")}
      ></Button>
    </View>
  );
}
