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

export default function ProfileView({ navigation }) {
  const styles = useProfileViewStyle();
  const [userAuthAtomValue] = useAtom(readOnlyUserAuthAtom);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.profilePhotoContainer}>
          <Image
            style={styles.profilePhoto}
            source={{
              uri: "https://raw.githubusercontent.com/AboutReact/sampleresource/master/old_logo.png",
              // TODO: Use react query to fetch user profile with userAuthAtomValue token
            }}
          ></Image>
        </View>
        <View style={styles.profileDataContainer}>
          <Text>@username</Text>
          <ProfileStatsTable></ProfileStatsTable>
          <ProfileButtonsTable></ProfileButtonsTable>
          <Text>Your profile's Description</Text>
        </View>
        <View>
          {
            // FlatList
            // Allow prerenders
            //
          }
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const useProfileViewStyle = () => {
  const { height, width } = useWindowDimensions();

  const styles = StyleSheet.create({
    container: { flex: 1 },
    profilePhotoContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    profileDataContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    profilePhoto: {
      width: width / 3,
      height: width / 3,
      borderRadius: 200 / 2,
    },
    usernameHandleTextStyle: {},
  });
  return styles;
};
