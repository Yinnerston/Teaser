import {
  StyleSheet,
  Text,
  View,
  Image,
  useWindowDimensions,
} from "react-native";
import ProfileButtonsTable from "../../elements/table/ProfileButtonsTable";
import ProfileStatsTable from "../../elements/table/ProfileStatsTable";

/**
 * User profile's data.
 * Contains profile picture, description, etc.
 * See GetUserProfileSchema for schema if it changes.
 * @param {display_name, username, description, profile_photo_url, n_following, n_followers, n_likes} profileQueryData
 * @returns
 */
export default function ProfileDataView({ profileQueryData }) {
  const {
    display_name,
    username,
    description,
    profile_photo_url,
    n_following,
    n_followers,
    n_likes,
  } = profileQueryData;
  const styles = useProfileViewStyle();
  return (
    <View>
      <View style={styles.profilePhotoContainer}>
        <Image
          style={styles.profilePhoto}
          source={
            profile_photo_url !== ""
              ? {
                  uri: profile_photo_url,
                }
              : {
                  uri: "https://raw.githubusercontent.com/AboutReact/sampleresource/master/old_logo.png",
                  // TODO: Use react query to fetch user profile with userAuthAtomValue token
                }
          }
        ></Image>
      </View>
      <View style={styles.profileDataContainer}>
        <Text>@{username}</Text>
        <ProfileStatsTable
          nFollowing={n_following}
          nFollowers={n_followers}
          nLikes={n_likes}
        />
        <ProfileButtonsTable></ProfileButtonsTable>
        <Text style={styles.bioText}>{description}</Text>
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
    bioText: {
      marginVertical: 5,
    },
  });
  return styles;
};
