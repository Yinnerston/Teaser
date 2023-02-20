import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
// import Navigator from "./navigation/Navigator";
import HomeScreen from "./components/screens/HomeScreen";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <HomeScreen></HomeScreen>
      {/* <Navigator></Navigator> */}
    </View>
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
