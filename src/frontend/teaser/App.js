import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler"; // Must be at the top of the entry file
import MainNavigator from "./navigation/main"; // Raises invariant error ??
import { QueryClientProvider, QueryClient } from "react-query";

// TODO: Update the refetch conditions for performance?
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </QueryClientProvider>
  );
}
