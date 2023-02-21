import { createStackNavigator } from "@react-navigation/stack";
import AuthScreen from "../screens/auth/AuthScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import RegisterScreenDOB from "../screens/auth/RegisterScreenDOB";
import RegisterScreenPassword from "../screens/auth/RegisterScreenPassword";
import RegisterScreenUsername from "../screens/auth/RegisterScreenUsername";
import LoginScreen from "../screens/auth/LoginScreen";
import HomeNavigator from "./HomeNavigator";
const Stack = createStackNavigator();

/**
 * Navigator with all the app routes
 * @returns
 */
export default function MainNavigator() {
  return (
    <Stack.Navigator initialRouteName="HomeNavigator">
      <Stack.Screen
        name="HomeNavigator"
        component={HomeNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Group screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Auth" component={AuthScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen
          name="RegisterPassword"
          component={RegisterScreenPassword}
        />
        <Stack.Screen name="RegisterDOB" component={RegisterScreenDOB} />
        <Stack.Screen
          name="RegisterUsername"
          component={RegisterScreenUsername}
        />
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}
