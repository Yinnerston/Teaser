import {
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

/**
 * User profile's data.
 * Contains profile picture, description, etc.
 * @returns
 */
export default function ProfileDataView() {
  const [userAuthAtomValue] = useAtom(readOnlyUserAuthAtom);
  const styles = useProfileViewStyle();
  return (
    <View>
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
        <Text>
          {userAuthAtomValue["token_hash"]}
          {"\n"}
          {userAuthAtomValue["token_expiry_date"]}
        </Text>
      </View>
    </View>
  );
}

const useProfileViewStyle = () => {
  const { height, width } = useWindowDimensions();

  const styles = StyleSheet.create({
    profilePhotoContainer: {
      justifyContent: "center",
      alignItems: "center",
    },
    profileDataContainer: {
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
