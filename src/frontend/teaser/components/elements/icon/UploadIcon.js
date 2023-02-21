import { StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

/**
 * Upload icon used in HomeNavigator.
 * @param {color} props
 * @returns
 */
export default function UploadIcon(props) {
  const { color } = props;
  return (
    <AntDesign style={styles.icon} name="pluscircle" size={24} color={color} />
  );
}

const styles = StyleSheet.create({
  icon: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
