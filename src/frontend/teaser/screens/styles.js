import { StyleSheet, useWindowDimensions } from "react-native";

export const signUpViewStyles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    alignItems: "center",
    height: 720,
  },
  textBodyStyle: {
    fontSize: 12,
    color: "gray",
  },
});

export const useSignUpViewStyles = () => {
  const { height, width } = useWindowDimensions();
  const styles = StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      width: "100%",
    },
    textBodyStyle: {
      fontSize: 12,
      marginBottom: height / 8,
      color: "gray",
    },
  });
  return styles;
};
