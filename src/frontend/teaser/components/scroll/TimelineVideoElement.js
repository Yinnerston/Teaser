import { Text, View, Image, Vibration } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  useAnimatedReaction,
} from "react-native-reanimated";
import { VIDEO_IMAGE_FRAME_WIDTH } from "../../Constants";
import { NativePressableOpacity } from "react-native-pressable-opacity";

export default function TimelineVideoElement(props) {
  const {
    queue,
    item,
    queueIndex,
    sharedOnLongPressLeftOffset,
    activeIndex,
    userIsReorderingTimeline,
    setUserIsReorderingTimeline,
    selectedComponentKey,
    setSelectedComponentKey,
    setCurPlayingVideo,
    queueDurationWidth,
    curTranslationX,
    panGestureAnimatedStyle,
    handleSelectedVideoKeyChange,
    positions,
  } = props;
  const initialQueuePosition = queueIndex;
  const shiftOnHover = useSharedValue(0);
  useAnimatedReaction(
    () => activeIndex.value,
    (currentValue, previousValue) => {
      if (selectedComponentKey != item.key) {
        return;
      }
      if (
        currentValue !== null &&
        previousValue !== null &&
        currentValue !== previousValue
      ) {
        if (currentValue === -1 || previousValue === -1) {
          return;
        }

        // console.log(`activeIndex changed. ${previousValue ?? ''} ${currentValue} key: ${item.key}`);
        // Reorder playlist
        // Switch activeIndex and activeIndex + indexOffset positions
        const newObject = Object.assign({}, positions.value);
        for (const key in positions.value) {
          if (positions.value[key] === previousValue) {
            newObject[key] = currentValue;
          }
          if (positions.value[key] === currentValue) {
            newObject[key] = previousValue;
          }
        }
        positions.value = newObject;
      }
    },
  );

  useAnimatedReaction(
    () => positions.value[item.key],
    (currentPosition, previousPosition) => {
      if (
        currentPosition !== null &&
        previousPosition !== null &&
        currentPosition !== previousPosition
      ) {
        if (selectedComponentKey != item.key) {
          // console.log(`key: ${item.key} ${previousPosition ?? ''} -> ${currentPosition} `);
          shiftOnHover.value = withSpring(
            (currentPosition - initialQueuePosition) * VIDEO_IMAGE_FRAME_WIDTH,
          );
        }
      }
    },
    [selectedComponentKey],
  );

  // Dynamically set width based on the duration in seconds
  let videoTimelineThumbnailStyle = {
    width: userIsReorderingTimeline
      ? VIDEO_IMAGE_FRAME_WIDTH
      : Math.ceil(item.durationWidth),
    height: VIDEO_IMAGE_FRAME_WIDTH,
    position: "relative",
    zIndex: queueIndex / 100,
  };
  // let aStyle = animatedStyles;
  // Define animation for x value translation
  // Define Pan gesture and assign to detector

  let panGesture = Gesture.Pan() // TODO: Wrap in useMemo: https://docs.swmansion.com/react-native-gesture-handler/docs/api/gestures/gesture/
    .activateAfterLongPress(500) // TODO: Change this?
    .onStart((event) => {
      // Set left offset so the selected is centers on the x value of the longpress
      let startingLeftOffset =
        event.x +
        item.startTimeWidth -
        (queueIndex + 0.5) * VIDEO_IMAGE_FRAME_WIDTH;
      // TODO: Do all clamps on worklet?
      // Clamp and set
      sharedOnLongPressLeftOffset.value = Math.min(
        Math.max(startingLeftOffset, 0),
        queueDurationWidth,
      );
      // Shorten all images to first frame
      runOnJS(setUserIsReorderingTimeline)(true); // TODO: Make animation of minimizing to
      // Set the selectedComponentKey if not already selected
      // TODO: On select, seek to start of video? ScrollTo event.x if far from previous positon?
      runOnJS(setSelectedComponentKey)(item.key);
      // runOnJS(setCurPlayingVideo)(item);
      activeIndex.value = queueIndex; // TODO: set queueIndex or item.key
      // Create a vibration to signify longpress
      runOnJS(Vibration.vibrate)(25);
      // Make nothing else in the screen responsive? --> just focus on panGesture
    })
    .onUpdate((event) => {
      // event.translationX --> To threshold
      curTranslationX.value = event.translationX;
      let indexOffset = Math.min(
        Math.max(
          Math.round(event.translationX / VIDEO_IMAGE_FRAME_WIDTH),
          -initialQueuePosition,
        ),
        queue.length - 1 - initialQueuePosition,
      );
      let newActiveIndex = initialQueuePosition + indexOffset;
      if (activeIndex.value !== newActiveIndex) {
        activeIndex.value = newActiveIndex;
      }
      // If hovering over 50% (x: VIDEO_IMAGE_FRAME_WIDTH / 2) --> Set hoveredIndex
      // first we have a left offset sharedOnLongPressLeftOffset.value
      // Should we have left / right displacement based on activeIndex < / > hoveredIndex logic here or in css?
    })
    .onEnd(() => {
      // Deselect selectedComponentKey
      // Reorder queue
      // runOnJS()(item.key, activeIndex.value)
      console.log("END");
      // Everything is responsive again
      // Reset sharedValues
      activeIndex.value = -1;
      // Revert timeline back to components based on video duration
      runOnJS(setUserIsReorderingTimeline)(false);
    });

  const hoverGestureAnimatedStyle = useAnimatedStyle(() => {
    return {
      // opacity: 0.5,
      // TODO: Move hovered left / right dependent on activeIndex / hoveredIndex ?
      left: sharedOnLongPressLeftOffset.value + shiftOnHover.value,
      width: VIDEO_IMAGE_FRAME_WIDTH,
      height: VIDEO_IMAGE_FRAME_WIDTH,
      position: "absolute",
    };
  }, []);
  return (
    <GestureDetector
      gesture={panGesture}
      key={"TimelineGestureDetector" + item.key}
    >
      <View
        style={videoTimelineThumbnailStyle}
        key={"VideoTimelineWrapperView" + item.key}
      >
        {!userIsReorderingTimeline ? (
          // Normal view of a timeline element
          <NativePressableOpacity
            key={"VideoTimelineThumbnail" + item.key}
            style={videoTimelineThumbnailStyle}
            onPress={() =>
              setSelectedComponentKey((prev) =>
                handleSelectedVideoKeyChange(prev, item.key),
              )
            }
          >
            {item.frames.map((framePath, index) => {
              let frameThumbnailStyle = {
                ...videoTimelineThumbnailStyle,
                width: VIDEO_IMAGE_FRAME_WIDTH,
                position: "absolute",
                left: VIDEO_IMAGE_FRAME_WIDTH * index,
              };
              if (index == item.numberOfFrames - 1) {
                // Cut off the frame by the second
                frameThumbnailStyle.width =
                  (frameThumbnailStyle.width * (item.video.duration % 1000)) /
                  1000;
              }
              return (
                <Image
                  key={"TIMELINEFRAME" + Math.random() * 6969 + item.key}
                  source={{ uri: framePath }}
                  style={frameThumbnailStyle}
                />
              );
            })}
            {item.key == selectedComponentKey ? (
              <View
                key={"SELECTEDCOMPONENTFRAME" + item.key}
                style={{
                  ...videoTimelineThumbnailStyle,
                  borderColor: "white",
                  borderWidth: 3,
                  position: "absolute",
                }}
              />
            ) : null}
          </NativePressableOpacity>
        ) : (
          <Animated.View
            style={
              selectedComponentKey == item.key
                ? panGestureAnimatedStyle
                : hoverGestureAnimatedStyle
            }
          >
            <Animated.Image
              key={"TIMELINEFRAME" + Math.random() * 6969 + item.key}
              source={{ uri: item.frames[0] }}
              style={{
                height: VIDEO_IMAGE_FRAME_WIDTH,
                width: VIDEO_IMAGE_FRAME_WIDTH,
              }}
            />
            {item.key == selectedComponentKey ? (
              <Animated.View
                key={"SELECTEDCOMPONENTFRAME" + item.key}
                style={{
                  borderColor: "white",
                  borderWidth: 3,
                  position: "absolute",
                  height: VIDEO_IMAGE_FRAME_WIDTH,
                  width: VIDEO_IMAGE_FRAME_WIDTH,
                }}
              />
            ) : null}
          </Animated.View>
        )}
      </View>
    </GestureDetector>
  );
}
