import { Pressable, Text, StyleSheet } from "react-native";

/**
 * Button used in Auth Forms.
 * @param navigation Navigation object
 * @param color Background color of the butotn
 * @param routeName Route name to navigate to using navigation.navigate(routeName)
 * @param buttonText Text inside the button.
 * @returns
 */
export default function AuthButton({
  navigation,
  color,
  routeName,
  buttonText,
  onPress,
}) {
  const styles = StyleSheet.create({
    registerButtonStyle: {
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 12,
      paddingHorizontal: 64,
      borderRadius: 4,
      elevation: 3,
      backgroundColor: color,
    },
    registerButtonTextStyle: {
      fontSize: 16,
      fontWeight: "bold",
      color: "white",
      textAlign: "center",
    },
  });

  if (onPress) {
    return (
      <Pressable onPress={onPress} style={styles.registerButtonStyle}>
        <Text style={styles.registerButtonTextStyle}>{buttonText}</Text>
      </Pressable>
    );
  } else {
    return (
      <Pressable
        onPress={() => navigation.navigate(routeName)}
        style={styles.registerButtonStyle}
      >
        <Text style={styles.registerButtonTextStyle}>{buttonText}</Text>
      </Pressable>
    );
  }
}
