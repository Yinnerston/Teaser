import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import HomeNavigator from "./navigation/HomeNavigator";
import HomeScreen from "./screens/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    // <View style={styles.container}>
    //   <StatusBar style="auto" />
    //   <HomeScreen></HomeScreen>
    // </View>
    <NavigationContainer>
      <HomeNavigator></HomeNavigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
