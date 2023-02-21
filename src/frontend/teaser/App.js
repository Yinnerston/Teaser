import "react-native-gesture-handler"; // Must be at the top of the entry file
import MainNavigator from "./navigation/MainNavigator";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <NavigationContainer>
      <MainNavigator></MainNavigator>
    </NavigationContainer>
  );
}
