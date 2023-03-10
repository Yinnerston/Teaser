import { StyleSheet, View } from "react-native";

export default function ProfileIconButton(props) {
  const { icon } = props;
  return <View style={styles.container}>{icon}</View>;
}

const styles = StyleSheet.create({
  container: {
    // TODO: Outline container and set dimensions
  },
});
