import { View, Text, StyleSheet } from "react-native";

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.splashLogo}>TEASER</Text>
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
    fontFamily: "Georgia",
  },
});
