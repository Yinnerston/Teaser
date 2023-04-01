import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "../../screens/SplashScreen";
// Auth
import AuthScreen from "../../screens/auth/AuthScreen";
import RegisterScreen from "../../screens/auth/RegisterScreen";
import RegisterScreenDOB from "../../screens/auth/RegisterScreenDOB";
import RegisterScreenPassword from "../../screens/auth/RegisterScreenPassword";
import RegisterScreenUsername from "../../screens/auth/RegisterScreenUsername";
import RegisterScreen2fa from "../../screens/auth/Register2fa";
import RegisterTermsAndConditionsScreen from "../../screens/auth/RegisterTermsAndConditionsScreen";
import LoginScreen from "../../screens/auth/LoginScreen";
import ForgotPasswordScreen from "../../screens/auth/ForgotPasswordScreen";
// Upload
import UploadCameraScreen from "../../screens/upload/UploadCameraScreen";
import UploadEditVideoScreen from "../../screens/upload/UploadEditVideoScreen";
import UploadPostDetailsScreen from "../../screens/upload/UploadPostDetailsScreen";
import HomeNavigator from "../home";
import UploadSoundScreen from "../../screens/upload/UploadSoundScreen";

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
      <Stack.Group>
        <Stack.Screen
          name="Auth"
          component={AuthScreen}
          options={{ title: "Sign Up" }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ title: "Register your details" }}
        />
        <Stack.Screen
          name="RegisterPassword"
          component={RegisterScreenPassword}
          options={{ title: "Setting your password" }}
        />
        <Stack.Screen
          name="RegisterDOB"
          component={RegisterScreenDOB}
          options={{ title: "Setting your date of birth" }}
        />
        <Stack.Screen
          name="RegisterUsername"
          component={RegisterScreenUsername}
          options={{ title: "Setting your username" }}
        />
        <Stack.Screen
          name="Register2fa"
          component={RegisterScreen2fa}
          options={{ title: "Two Factor Authentication", headerShown: false }}
        />
        <Stack.Screen
          name="RegisterTermsAndConditions"
          component={RegisterTermsAndConditionsScreen}
          options={{ title: "Terms And Conditions", headerShown: true }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: "Log In" }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPasswordScreen}
          options={{ title: "Forgot Password" }}
        />
      </Stack.Group>
      <Stack.Group screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="UploadEditVideo"
          component={UploadEditVideoScreen}
          options={{ title: "Edit the video" }}
        />
        <Stack.Screen
          name="UploadSoundScreen"
          component={UploadSoundScreen}
          options={{ title: "Add sound" }}
        />
        <Stack.Screen
          name="UploadPostDetails"
          component={UploadPostDetailsScreen}
          options={{ title: "Edit the post details" }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}
