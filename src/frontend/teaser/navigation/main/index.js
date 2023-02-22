import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "../../screens/SplashScreen";
import AuthScreen from "../../screens/auth/AuthScreen";
import RegisterScreen from "../../screens/auth/RegisterScreen";
import RegisterScreenDOB from "../../screens/auth/RegisterScreenDOB";
import RegisterScreenPassword from "../../screens/auth/RegisterScreenPassword";
import RegisterScreenUsername from "../../screens/auth/RegisterScreenUsername";
import LoginScreen from "../../screens/auth/LoginScreen";
import HomeNavigator from "../home";

const Stack = createStackNavigator();

/**
 * Navigator with all the app routes
 * @returns
 */
export default function MainNavigator() {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{ headerShown: false }}
      ></Stack.Screen>
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
