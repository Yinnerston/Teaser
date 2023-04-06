import { View, Text, StyleSheet, Vibration } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useSharedValue,
  useAnimatedStyle,
  useAnimatedReaction,
} from "react-native-reanimated";
import { NativePressableOpacity } from "react-native-pressable-opacity";
import { VIDEO_IMAGE_FRAME_WIDTH } from "../../Constants";

/**
 * Handles rendering the editorSound
 * @param {*} props
 * @returns
 */
export default function TimelineSoundElement({
  editorSound,
  selectedComponentKey,
  setSelectedComponentKey,
  handleSelectedVideoKeyChange,
}) {
  const gesture = Gesture.Pan()
    .activateAfterLongPress(500)
    .onStart((event) => {
      runOnJS(Vibration.vibrate)(25);
      runOnJS(setSelectedComponentKey)(editorSound.key);
    })
    .onUpdate((event) => {})
    .onEnd(() => {});
  return (
    <GestureDetector gesture={gesture}>
      <View
        style={[
          { ...styles.pressableContainer, width: editorSound.durationWidth },
          selectedComponentKey == editorSound.key
            ? styles.selectedContainer
            : null,
        ]}
      >
        <NativePressableOpacity
          style={{ ...styles.container, width: editorSound.durationWidth - 2 }}
          onPress={() =>
            setSelectedComponentKey((prev) =>
              handleSelectedVideoKeyChange(prev, editorSound.key),
            )
          }
        >
          <Text numberOfLines={1} style={styles.soundText}>
            {editorSound.title ? editorSound.title : "Untitled"}
            {editorSound.author ? ", " + editorSound.author : null}
          </Text>
        </NativePressableOpacity>
      </View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  pressableContainer: {
    marginTop: 10,
    borderRadius: 2,
    height: 30,
    margin: 4,
    justifyContent: "center",
  },
  selectedContainer: {
    borderWidth: 1,
    borderColor: "white",
  },
  container: {
    backgroundColor: "#4b5dc1", //'rgb(75, 93, 193)'
    height: 28,
  },
  soundText: {
    color: "white",
    marginVertical: "auto",
    marginHorizontal: 4,
  },
});
