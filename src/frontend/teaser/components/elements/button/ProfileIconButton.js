import { StyleSheet, View } from "react-native";

/**
 * Just a view containing a icon.
 * TODO: Define dimensions for profile page, Add border around box.
 * @param {icon} props
 * @returns
 */
export default function ProfileIconButton(props) {
  const { icon } = props;
  return <View style={styles.container}>{icon}</View>;
}

const styles = StyleSheet.create({
  container: {
    // TODO: Outline container and set dimensions
  },
});
