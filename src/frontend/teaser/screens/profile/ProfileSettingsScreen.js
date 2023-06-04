import {
  Button,
  Image,
  View,
  Text,
  useWindowDimensions,
  StyleSheet,
} from "react-native";
import { useState } from "react";
import { Switch } from "react-native-paper";
import { SWITCH_COLOUR } from "../../Constants";
import { userAuthAtom } from "../../hooks/auth/useUserAuth";
import { useAtom } from "jotai";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import IoniconsTemplateIcon from "../../components/elements/icon/IoniconsTemplate";
import { SafeAreaView } from "react-native-safe-area-context";
import { clearUserAuth } from "../../hooks/auth/useUserAuth";
import SignUpScreen from "../auth/SignUpScreen";
/**
 * TODO: Not implemented yet.
 * @returns
 */
export default function ProfileSettingsScreen({ navigation }) {
  const [userAuth, setUserAuth] = useAtom(userAuthAtom);

  const styles = useProfileSettingScreenStyles();
  // TODO: React query pull server state
  const [stageNameInTextInput, setStageNameInTextInput] = useState(""); // TODO: Separate state for mutation
  const [profileIsPrivate, setProfileIsPrivate] = useState(false);
  if (userAuth === null) return <SignUpScreen navigation={navigation} />;

  return (
    <SafeAreaView>
      <View style={styles.profileBannerContainer}>
        <View style={styles.profilePhotoContainer}>
          <Image
            style={styles.profilePhoto}
            source={{
              uri: "https://avatars.githubusercontent.com/u/57548788?v=4",
              // TODO: Use react query to fetch user profile with userAuthAtomValue token
            }}
          ></Image>
        </View>
        <View style={styles.messageBodyContainer}>
          <TextInput />
        </View>
      </View>
      <TouchableOpacity
        style={styles.row}
        onPress={() => {
          setProfileIsPrivate((prev) => !prev);
        }}
      >
        <View style={styles.rowFirstFlex}>
          <IoniconsTemplateIcon name="lock-open-outline" color="#5A5A5A" />
          <Text style={styles.rowText}>Profile is private</Text>
        </View>
        <View style={styles.rowSecondFlex}>
          <Switch value={profileIsPrivate} color={SWITCH_COLOUR} />
        </View>
      </TouchableOpacity>

      <Button
        onPress={() => {
          clearUserAuth(userAuth);
          setUserAuth(null);
        }}
        title="logout"
        color="red"
      ></Button>
    </SafeAreaView>
  );
}

const useProfileSettingScreenStyles = () => {
  const { width, height } = useWindowDimensions();
  const styles = StyleSheet.create({
    profileBannerContainer: {
      flexDirection: "row",
      display: "flex",
    },
    profilePhotoContainer: {
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
    },
    messageBodyContainer: {
      flex: 4,
      flexDirection: "column",
    },
    profilePhoto: {
      width: width / 6,
      height: width / 6,
      borderRadius: 69,
    },
    row: {
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      width: width,
      height: 40,
      marginHorizontal: 16,
    },
    rowFirstFlex: {
      flex: 3,
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
    },
    rowSecondFlex: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
  });
  return styles;
};
