import { View, StyleSheet } from "react-native";
import AuthButton from "../AuthButton";
import { VIDEO_IMAGE_FRAME_WIDTH } from "../../../../Constants";

export default function AddSoundScrollViewButton({ navigation, editorSound }) {
  if (editorSound == null) {
    return (
      <View style={styles.container}>
        <AuthButton
          color="#2e2e2e"
          routeName="UploadSoundScreen"
          buttonText="🎵 Add Sound"
          navigation={navigation}
          authButtonStyles={authButtonStyles}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    alignSelf: "center",
    backgroundColor: "white",
    top: VIDEO_IMAGE_FRAME_WIDTH * 2,
    right: 69,
  },
});

const authButtonStyles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  registerButtonStyle: {
    alignItems: "center",
    justifyContent: "center",
    // paddingVertical: 12,
    paddingHorizontal: 4,
    // borderRadius: 4,
    elevation: 3,
    backgroundColor: "#2e2e2e",
  },
  registerButtonTextStyle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
});
