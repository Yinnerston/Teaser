import { SafeAreaView, StyleSheet, useWindowDimensions } from "react-native";
import ProfileTeaserGridView from "./ProfileTeaserGridView";

/**
 * Navigation container for ProfileScreen
 * @param {navigation} props
 * @returns
 */
export default function ProfileView({ navigation }) {
  const styles = useProfileViewStyle();

  return (
    <SafeAreaView style={styles.container}>
      <ProfileTeaserGridView></ProfileTeaserGridView>
    </SafeAreaView>
  );
}
const useProfileViewStyle = () => {
  const { height, width } = useWindowDimensions();

  const styles = StyleSheet.create({
    container: { flex: 1, height: height },
    usernameHandleTextStyle: {},
  });
  return styles;
};
