import { View, Text, StyleSheet, useWindowDimensions } from "react-native";
import { useEffect } from "react";
import {
  setUserAuthFromStore,
  readOnlyUserAuthAtom,
} from "../hooks/auth/useUserAuth";
import { useAtom } from "jotai";
import { prefetchFeed } from "../hooks/feed/useFeed";
import { useQueryClient } from "react-query";

/**
 * Splash screen.
 * Load auth context here
 * @param {*} navigation
 * @returns
 */
export default function SplashScreen({ navigation }) {
  const styles = useAuthStyles();
  // TODO: Check login token_hash
  setUserAuthFromStore();
  const [userAuthAtomValue] = useAtom(readOnlyUserAuthAtom);
  const queryClient = useQueryClient();
  // Prefetch the first page on first load
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("HomeNavigator", { screen: "Home" }, 1000);
    });
    prefetchFeed(queryClient, userAuthAtomValue);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.splashLogo}>TEASER</Text>
    </View>
  );
}

const useAuthStyles = () => {
  const { height, width } = useWindowDimensions();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: "black",
      alignContent: "center",
      height: height,
      width: width,
    },
    splashLogo: {
      margin: "auto",
      fontSize: 32,
      margin: "auto",
      color: "white",
      fontWeight: "bold",
      // fontFamily: "Georgia",
    },
  });
  return styles;
};
