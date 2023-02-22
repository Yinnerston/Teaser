import { View, Text, StyleSheet } from "react-native";

export default function SplashScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.splashLogo}>TEASER</Text>
      {/* {setTimeout(() => {
        navigation.navigate("HomeNavigator", {screen: "Home"}, 1000)
      })} */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
  },
  splashLogo: {
    fontSize: 32,
    margin: "auto",
    color: "white",
    fontWeight: "bold",
    // fontFamily: "Georgia",
  },
});
