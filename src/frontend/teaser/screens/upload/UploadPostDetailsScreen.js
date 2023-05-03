import { SafeAreaView } from "react-native-safe-area-context";
import { useAtom } from "jotai";
import { queueAtom } from "../../hooks/upload/useMainVideoQueue";
import { readOnlyEditorSoundAtomAtom } from "../../hooks/upload/useSound";
import {
  View,
  StyleSheet,
  Text,
  Image,
  useWindowDimensions,
} from "react-native";
import { readOnlyUserAuthAtom } from "../../hooks/auth/useUserAuth";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import PersonIcon from "../../components/elements/icon/PersonIcon";
import {
  REGISTER_BUTTON_COLOR,
  VIDEO_IMAGE_FRAME_WIDTH,
} from "../../Constants";
import IoniconsTemplateIcon from "../../components/elements/icon/IoniconsTemplate";
import CommentIcon from "../../components/elements/icon/CommentIcon";
import AuthButton from "../../components/elements/button/AuthButton";
import HashtagIcon from "../../components/elements/icon/upload/HashtagIcon";
import EmailIcon from "../../components/elements/icon/upload/EmailIcon";
import CircledPlayIcon from "../../components/elements/icon/upload/CircledPlayIcon";
import { Switch } from "react-native-paper";
import { useState } from "react";
import HDIcon from "../../components/elements/icon/upload/HDIcon";
import { uploadVideo } from "../../api/upload/uploadApi";
import CategoriesIcon from "../../components/elements/icon/upload/CategoriesIcon";
import HeartIcon from "../../components/elements/icon/HeartIcon";

/**
 * Upload post details screen for setting description and post parameters.
 * @param { navigation } param0
 * @returns
 */
export default function UploadPostDetailsScreen({ navigation }) {
  const [userAuthAtomValue] = useAtom(readOnlyUserAuthAtom);
  const [queue] = useAtom(queueAtom);
  const [editorSound] = useAtom(readOnlyEditorSoundAtomAtom);
  const [description, setDescription] = useState("");
  const { styles, authButtonStyles } = useUploadPostDetailsScreenStyles();
  const [postTags, setPostTags] = useState([]);
  // JSON.stringify'd selected object used by SetInterestsScreen
  const [postCategories, setPostCategories] = useState("");
  const [numCategories, setNumCategories] = useState(0);
  const [postIsPrivate, setPostIsPrivate] = useState(false); // TODO: Add dropdown
  const [hasComments, setHasComments] = useState(true);
  const [postIsNSFW, setPostIsNSFW] = useState(true);
  const [postLinks, setPostLinks] = useState([]);
  const [submissionHasError, setSubmissionHasError] = useState(false);
  return (
    <SafeAreaView>
      <View style={styles.descriptionContainer}>
        <TextInput
          multiline={true}
          style={styles.descriptionInput}
          placeholder={
            "Describe your post, add tags \nor mention creators you've \ncollaborated with!"
          }
          value={description}
          onChangeText={setDescription}
        ></TextInput>
        <TouchableOpacity
          style={styles.descriptionImageContainer}
          onPress={() => {}}
        >
          <Image
            style={styles.descriptionImage}
            source={{ uri: queue[0].frames[0] }}
          />
          <Text style={styles.descriptionImageText}>Select cover</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.flexRow}>
        <TouchableOpacity style={styles.descriptionBorderedContainer}>
          <HashtagIcon size={16} />
          <Text>Hashtags</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.descriptionBorderedContainer}>
          <EmailIcon size={16} />
          <Text>Mention</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.descriptionBorderedContainer}>
          <CircledPlayIcon size={16} />
          <Text>Videos</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.breakLine} />
      <View>
        <TouchableOpacity style={styles.row} onPress={() => {}}>
          <PersonIcon color="#5A5A5A"></PersonIcon>
          <Text style={styles.rowText}>Tag People</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.row} onPress={() => {}}>
          <IoniconsTemplateIcon name="pricetags-outline" color="#5A5A5A" />
          <Text style={styles.rowText}>Add tags</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.row}
          onPress={() =>
            navigation.navigate("SetInterests", {
              onPress: (interests) => {
                setPostCategories(interests);
                setNumCategories(interests.length);
              },
              isPostDetails: true,
            })
          }
        >
          <CategoriesIcon color="#5A5A5A" />
          <Text style={styles.rowText}>Add Categories</Text>
          <Text style={styles.textOnRight}>
            {numCategories > 0 ? "(" + numCategories + ")" : null}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.row}
          onPress={() => {
            setPostIsPrivate((prev) => !prev);
          }}
        >
          <View style={styles.rowFirstFlex}>
            <IoniconsTemplateIcon name="lock-open-outline" color="#5A5A5A" />
            <Text style={styles.rowText}>Post is private</Text>
          </View>
          <View style={styles.rowSecondFlex}>
            <Switch value={postIsPrivate} color="#0bde9b" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.row}
          onPress={() => {
            setHasComments((prev) => !prev);
          }}
        >
          <View style={styles.rowFirstFlex}>
            <CommentIcon color="#5A5A5A" />
            <Text style={styles.rowText}>Allow comments</Text>
          </View>
          <View style={styles.rowSecondFlex}>
            <Switch value={hasComments} color="#0bde9b" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.row}
          onPress={() => {
            setPostIsNSFW((prev) => !prev);
          }}
        >
          <View style={styles.rowFirstFlex}>
            <HeartIcon color="#5A5A5A" />
            <Text style={styles.rowText}>Post is NSFW</Text>
          </View>
          <View style={styles.rowSecondFlex}>
            <Switch value={postIsNSFW} color="#0bde9b" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.row} onPress={() => {}}>
          <IoniconsTemplateIcon name="ios-link-outline" color="#5A5A5A" />
          <Text style={styles.rowText}>Link service</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.submissionErrorText}>
        {submissionHasError ? "*A description is required" : ""}
      </Text>
      <View>
        <AuthButton
          authButtonStyles={authButtonStyles}
          onPress={() => {
            if (description.length == 0) {
              setSubmissionHasError(true);
              return;
            } else {
              setSubmissionHasError(false);
            }
            uploadVideo(
              userAuthAtomValue["token_hash"],
              queue,
              editorSound,
              description,
              postTags,
              postCategories,
              postIsPrivate,
              hasComments,
              postIsNSFW,
              postLinks,
            );
            navigation.navigate("Home");
          }}
          buttonText="Post"
        />
      </View>
    </SafeAreaView>
  );
}

const useUploadPostDetailsScreenStyles = () => {
  const { width, height } = useWindowDimensions();
  const styles = StyleSheet.create({
    container: {},
    descriptionContainer: {
      flexDirection: "row",
      margin: 16,
    },
    descriptionInput: {
      width: (width * 2) / 3 - 16,
    },
    descriptionImageContainer: {
      right: 0,
      height: width / 3,
      width: width / 3 - 16,
      flexDirection: "column",
    },
    descriptionImage: {
      height: width / 3 - 24,
      width: width / 3,
      zIndex: 0,
    },
    descriptionImageText: {
      height: 24,
      color: "white",
      backgroundColor: "black",
    },
    flexRow: {
      flexDirection: "row",
    },
    descriptionBorderedContainer: {
      flexDirection: "row",
      borderColor: "#e1e1e1",
      borderWidth: 2,
      margin: 4,
      height: 30,
      justifyContent: "center",
      alignItems: "center",
    },
    breakLine: {
      backgroundColor: "#e1e1e1",
      height: 1,
      width: width - 32,
      margin: 16,
    },
    row: {
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      width: width,
      height: 40,
      marginHorizontal: 16,
    },
    textOnRight: {
      marginLeft: "auto",
      marginRight: VIDEO_IMAGE_FRAME_WIDTH,
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
    rowText: {
      marginLeft: 16,
    },
    submissionErrorText: {
      textAlign: "center",
      color: "red",
    },
    // rowSwitch:  {
    // alignSelf: "flex-end",
    // alignContent: "flex-end"
    // }
  });
  const authButtonStyles = StyleSheet.create({
    container: {
      alignItems: "center",
    },
    registerButtonStyle: {
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 12,
      paddingHorizontal: 64,
      borderRadius: 4,
      elevation: 3,
      backgroundColor: REGISTER_BUTTON_COLOR,
    },
    registerButtonTextStyle: {
      fontSize: 16,
      fontWeight: "bold",
      color: "white",
      textAlign: "center",
    },
  });
  return { styles, authButtonStyles };
};
