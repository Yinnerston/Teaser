import { StyleSheet, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { HOMESCREEN_FOOTER_HEIGHT } from "../../../Constants";
/**
 * Container for footer of the home screen.
 * Handles seeking between Home, Subscriptions, Inbox and Profile.
 * @returns
 */
export default function HomeScreenFooter() {
  return (
    <View style={styles.container}>
      <AntDesign style={styles.icon} name="home" size={24} color="black" />
      <AntDesign style={styles.icon} name="heart" size={24} color="black" />
      <AntDesign
        style={styles.icon}
        name="pluscircle"
        size={24}
        color="black"
      />
      <SimpleLineIcons
        style={styles.icon}
        name="speech"
        size={24}
        color="black"
      />
      <Ionicons
        style={styles.icon}
        name="person-outline"
        size={24}
        color="black"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    flexDirection: "row",
    height: HOMESCREEN_FOOTER_HEIGHT,
  },
  icon: {
    flex: 1,
    marginLeft: "auto",
    marginRight: "auto",
  },
});
