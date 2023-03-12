import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  useWindowDimensions,
} from "react-native";
import { readOnlyUserAuthAtom } from "../../../hooks/auth/useUserAuth";
import { useAtom } from "jotai";
import ProfileButtonsTable from "../../elements/table/ProfileButtonsTable";
import ProfileStatsTable from "../../elements/table/ProfileStatsTable";
import ProfileTeaserGridView from "./ProfileTeaserGridView";
import ProfileDataView from "./ProfileDataView";

export default function ProfileView({ navigation }) {
  const styles = useProfileViewStyle();
  const [userAuthAtomValue] = useAtom(readOnlyUserAuthAtom);

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
