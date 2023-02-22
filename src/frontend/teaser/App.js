import "react-native-gesture-handler"; // Must be at the top of the entry file
import MainNavigator from "./navigation/main"; // Raises invariant error ??
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  );
}
