import { SafeAreaView } from "react-native-safe-area-context";
import { useAtom, useSetAtom } from "jotai";
import {
  queueAtom,
  queueDurationAtom,
} from "../../hooks/upload/useMainVideoQueue";
import { Video } from "expo-av";
import { useRef, useState, useEffect, useMemo } from "react";
import {
  curPlayingVideoAtom,
  editorVideoPlayingStatusAtom,
} from "../../hooks/upload/useVideoPlayer";
import { AntDesign } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  ScrollView,
  Image,
} from "react-native";
import {
  TouchableOpacity,
  Gesture,
  GestureDetector,
  TapGestureHandler,
} from "react-native-gesture-handler";
import {
  useSharedValue,
  useAnimatedStyle,
  Animated,
} from "react-native-reanimated";
import {
  START_FROM_PREV_VIDEO_END,
  VIDEO_CONTROL_TOOLBAR_HEIGHT,
  VIDEO_TOOLS_FOOTER_NAV_HEIGHT,
  VIDEO_IMAGE_FRAME_WIDTH,
  TIMELINE_VIDEO_FPS,
} from "../../Constants";
import { NativePressableOpacity } from "react-native-pressable-opacity";

/**
 * TODO: export this to another file?
 * https://overreacted.io/making-setinterval-declarative-with-react-hooks/#just-show-me-the-code
 * @param {*} callback
 * @param {*} delay
 */
function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

/**
 * Edit your videos in the app.
 * @returns
 */
export default function UploadEditVideoScreen() {
  const { height, width, styles } = useUploadEditVideoScreenStyles();
  const videoRef = useRef(null);
  const [queue] = useAtom(queueAtom);
  const [queueDuration] = useAtom(queueDurationAtom);
  const [curPlayingVideo, setCurPlayingVideo] = useAtom(curPlayingVideoAtom);
  // Edit video is playing and convenience setter atom
  const [editorVideoIsPlaying, setEditorVideoIsPlaying] = useAtom(
    editorVideoPlayingStatusAtom,
  );
  const [videoIsFinished, setVideoIsFinished] = useState(false);
  const [selectedComponentKey, setSelectedComponentKey] = useState(null);
  // Scroll based on video playing
  const [timelinePosition, setTimelinePosition] = useState(0);
  const scrollRef = useRef(null);

  const videoTimelineWrapperViewWidth = useMemo(() => {
    let queueDurationInSeconds = Math.ceil(queueDuration / 1000);
    return Math.max(queueDurationInSeconds, 16) * VIDEO_IMAGE_FRAME_WIDTH;
  }, [queueDuration]);
  const intervalLength = 1000 / TIMELINE_VIDEO_FPS;
  useEffect(() => {
    // On first page render, set curPlaying Video
    setCurPlayingVideo(START_FROM_PREV_VIDEO_END);
  }, []);

  // As the video plays, scroll the scrollView by scrollTo {x: timelinePosition}
  useInterval(() => {
    if (editorVideoIsPlaying && scrollRef.current != null) {
      setTimelinePosition(
        (current) => current + VIDEO_IMAGE_FRAME_WIDTH / TIMELINE_VIDEO_FPS,
      );
      scrollRef.current.scrollTo({
        x: timelinePosition,
        y: 0,
        animated: false,
      });
    }
  }, intervalLength);

  // // Scroll View onScroll functions:
  // /**
  //  * Handles stopping the video when user starts scrolling the scroll view.
  //  */
  // const handleBeginDragTimelineScrollView = (_event) => {
  //   // Pause the video
  //   setEditorVideoIsPlaying(false);
  //   if (videoRef.current != null) {
  //     videoRef.current.pauseAsync();
  //   }
  //   // Get the video in question based on startTime
  //   if (curPlayingVideo)  {
  //     let curTimelinePosition = [msToWidth(curPlayingVideo["msstartTime"]), msToWidth(curPlayingVideo["msstartTime"] + curPlayingVideo["video"]["duration"])]
  //     console.error(curTimelinePosition)
  //     setCurPlayingVideoTimelinePosition(curTimelinePosition)  // curPlayingVideo.msstartTime
  //   }
  // }

  // const handleTimelineOnScroll = (event) => {
  //   // Clamp within bounds [0, queueDuration]
  //   let contentOffset = Math.min(Math.max(event.nativeEvent.contentOffset, 0), queueDuration)
  //   // TODO: Seek to position in relevant video
  //   if (contentOffset < 0 || contentOffset > queueDuration) {
  //     // Reject invalid inputs
  //     return;
  //   }
  //   let endOfCurVideoTimelinePosition = curTimelinePosition[1];
  //   if (curPlayingVideo)  {
  //     if (contentOffset > endOfCurVideoTimelinePosition)  {
  //       // Go to next video
  //       setCurPlayingVideo(curPlayingVideo.next);
  //     }
  //     // else if (contentOffset < curPlayingVideoTimelinePosition[0]) {
  //     //   // Go to prev video
  //     //   setCurPlayingVideo(curPlayingVideo.prev);
  //     // }
  //   }

  //   // If scrollOffset not within the bounds of the [startTime, endTime] of the video, switch video
  //   // Seek that that position
  //   if (videoRef.current != null) {
  //     // Seek to position
  //     let seekTo = ReversemsToWidth(endOfCurVideoTimelinePosition - contentOffset);
  //     videoRef.current.seekTo(seekTo);
  //     console.log(seekTo)
  //   }
  //   console.log(contentOffset)
  // }

  const handlePlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
      // setEditorVideoIsPlaying(status.isPlaying)
      if (status.didJustFinish) {
        // loaded and video finished
        // Play next video if there's another in queue otherwise pause at end
        if (curPlayingVideo.next != null) {
          setCurPlayingVideo(curPlayingVideo.next);
        } else {
          // Stop playing video
          setVideoIsFinished(true);
          setEditorVideoIsPlaying(false);
        }
      }
    } else if (status.error) {
      console.error(status.error);
    }
  };

  const handlePressTogglePlayPause = async () => {
    if (videoRef.current != null) {
      if (videoIsFinished) {
        if (queue.length == 1) {
          // If only one video, seek to beginning
          videoRef.current.playFromPositionAsync(0);
        } else {
          // Replace curPlayingVideo with first video in queue
          setCurPlayingVideo(START_FROM_PREV_VIDEO_END);
        }
        setTimelinePosition(0);
        if (scrollRef.current != null) {
          scrollRef.current.scrollTo({ x: 0, y: 0, animated: false });
        }
        setEditorVideoIsPlaying(true);
        setVideoIsFinished(false);
        return;
      }
      // Play / Pause video if we haven't reached the end
      if (editorVideoIsPlaying) {
        setEditorVideoIsPlaying(false);
        videoRef.current.pauseAsync();
      } else {
        setEditorVideoIsPlaying(true);
        videoRef.current.playAsync();
      }
    }
  };

  const handleSelectedVideoKeyChange = (prev, newKey) =>
    newKey != prev ? newKey : null;

  // const activeKey = useSharedValue();
  // const timelineOffset = useSharedValue({});
  // const start = useSharedValue({});
  // const animatedStyles = useAnimatedStyle(() => {
  //   return {
  //     transform: [
  //       {
  //         translateX: timelineOffset.value[activeKey.value]
  //           ? timelineOffset.value[activeKey.value].x
  //           : 0,
  //       },
  //       { translateY: 0 },
  //     ],
  //   };
  // });

  /**
   * TODO: useMemo dependent on queue, scrub position in video queue
   * @returns
   */
  const VideoTimelineTimeMarkings = () => (
    <View style={styles.timelineMarkingsContainer}>
      <Text style={{ ...styles.timelineTimeMarkingsText, marginLeft: 0 }}>
        00:00
      </Text>
      <Text style={styles.timelineTimeMarkingsText}>00:02</Text>
      <Text style={styles.timelineTimeMarkingsText}>00:04</Text>
      <Text style={styles.timelineTimeMarkingsText}>00:06</Text>
      <Text style={styles.timelineTimeMarkingsText}>00:08</Text>
      <Text style={styles.timelineTimeMarkingsText}>00:10</Text>
      <Text style={styles.timelineTimeMarkingsText}>00:12</Text>
      <Text style={styles.timelineTimeMarkingsText}>00:14</Text>
      <Text
        style={{
          ...styles.timelineTimeMarkingsText,
          marginLeft: VIDEO_IMAGE_FRAME_WIDTH - 35.3,
        }}
      >
        00:15
      </Text>
    </View>
  );

  const videoTimelineElements = useMemo(
    () =>
      queue.map((item, queueIndex) => {
        // Dynamically set width based on the duration in seconds
        let videoTimelineThumbnailStyle = {
          width: Math.ceil(
            (item.video.duration * VIDEO_IMAGE_FRAME_WIDTH) / 1000,
          ),
          height: VIDEO_IMAGE_FRAME_WIDTH,
          position: "relative",
        };
        // let aStyle = animatedStyles;
        // Define animation for x value translation
        // Define Pan gesture and assign to detector
        let panGesture = Gesture.Pan();
        //   .onStart(() => {
        //     activeKey.value = item.key;
        //     let temp = { ...start };
        //     temp[activeKey.value] = { x: queueIndex * 40, y: 0 };
        //     start.value = { ...temp };
        //     // DEBUG
        //     console.log(
        //       JSON.stringify(activeKey),
        //       JSON.stringify(start.value[activeKey.value]),
        //     );
        //   })
        //   .onUpdate((event) => {
        //     if (start.value[activeKey.value]) {
        //       let temp = { ...timelineOffset };
        //       temp[activeKey.value] = {
        //         x: event.translationX + start.value[activeKey.value].x,
        //         y: 0,
        //       };
        //       timelineOffset.value = { ...temp };
        //     } else {
        //       let temp = { ...start };
        //       temp[activeKey.value] = { x: event.translationX, y: 0 };
        //       start.value = { ...temp };
        //     }
        //     // DEBUG
        //     console.log(
        //       "UPDATE PAN",
        //       JSON.stringify(start.value[activeKey.value]),
        //       JSON.stringify(timelineOffset.value[activeKey.value]),
        //     );
        //   })
        //   .onEnd(() => {
        //     if (timelineOffset.value[activeKey.value]) {
        //       start.value[activeKey.value] = {
        //         x: timelineOffset.value[activeKey.value].x,
        //         y: 0,
        //       };
        //     } else {
        //       timelineOffset.value[activeKey.value] = { x: 0, y: 0 };
        //     }
        //     // DEBUG
        //     console.log(
        //       "END PAN\n",
        //       JSON.stringify(start.value[activeKey.value]),
        //       JSON.stringify(timelineOffset.value[activeKey.value]),
        //       JSON.stringify(animatedStyles.value),
        //     );
        //   });
        // // DEBUG
        // let tempStyles = {
        //   ...videoTimelineThumbnailStyle,
        //   ...animatedStyles.value,
        // };
        // console.log(tempStyles);
        // console.log(animatedStyles.value);
        return (
          <GestureDetector
            gesture={panGesture}
            key={"TimelineGestureDetector" + item.key}
          >
            <NativePressableOpacity
              key={"VideoTimelineThumbnail" + item.key}
              // style={{...videoTimelineThumbnailStyle, ...animatedStyles}}
              style={videoTimelineThumbnailStyle}
              // style={[videoTimelineThumbnailStyle, tempStyles]}
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
          </GestureDetector>
        );
      }),
    [queue, selectedComponentKey], // TODO: or just animatedStyles?
  );

  const videoTimelineSeparators = useMemo(() =>
    queue.map(
      (item, queueIndex) => {
        // Style to draw separator between image timeline components

        let PADDING_VIEW_WIDTH = width / 2;
        let videoTimelineSeparateStyle = {
          marginLeft:
            Math.ceil((item.video.duration * VIDEO_IMAGE_FRAME_WIDTH) / 1000) -
            VIDEO_IMAGE_FRAME_WIDTH / 4,
          height: VIDEO_IMAGE_FRAME_WIDTH / 2,
          width: VIDEO_IMAGE_FRAME_WIDTH / 2,
          top: VIDEO_IMAGE_FRAME_WIDTH / 4,
          borderRadius: 5,
          backgroundColor: "white",
          position: "absolute",
        };
        if (queueIndex != queue.length - 1) {
          return (
            <View id="top" style={videoTimelineSeparateStyle}>
              <Text
                style={{ color: "gray", fontSize: 16, textAlign: "center" }}
              >
                T
              </Text>
            </View>
          );
        }
      },
      [queue],
    ),
  );

  return (
    <SafeAreaView style={styles.container}>
      <View
        key="CameraView-UploadEditVideoScreen"
        style={styles.videoContainer}
      >
        <Video
          ref={(_videoRef) => {
            videoRef.current = _videoRef;
          }}
          source={
            curPlayingVideo ? { uri: curPlayingVideo["video"]["path"] } : ""
          }
          onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
          style={styles.video}
          shouldPlay={false}
        />
        {curPlayingVideo.key == selectedComponentKey ? (
          <View
            style={{
              ...styles.video,
              borderWidth: 3,
              borderColor: "white",
              position: "absolute",
            }}
          />
        ) : null}
      </View>
      <View
        key="VideoControlToolbar-UploadEditVideoScreen"
        style={styles.videoControlToolbarContainer}
      >
        <TouchableOpacity onPress={() => handlePressTogglePlayPause()}>
          <AntDesign name="caretright" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View
        key="TimelineView-UploadEditVideoScreen"
        style={styles.timelineContainer}
      >
        {/*
      Timeline View:
      - Main video timeline
      - Add sound bar underneath it
       */}
        <ScrollView
          style={styles.timelineScrollView}
          horizontal={true}
          ref={scrollRef}
        >
          <View style={styles.timelineScrollPaddingView} />
          {/* TODO: Timestamps */}
          <View
            style={{
              width: videoTimelineWrapperViewWidth,
              flexDirection: "column",
              flexWrap: "wrap",
            }}
          >
            <VideoTimelineTimeMarkings />
            {/* Video Thumbnails */}
            <View style={styles.timelineRowView}>
              {videoTimelineElements ? (
                videoTimelineElements
              ) : (
                <Text>Alt Text</Text>
              )}
              {videoTimelineSeparators ? (
                videoTimelineSeparators
              ) : (
                <Text>Alt Text</Text>
              )}
            </View>
          </View>

          <View style={styles.timelineScrollPaddingView} />
        </ScrollView>
        <View style={styles.timelineTimeBar} />
      </View>
      <View
        key="VideoToolsFooterNav-UploadEditVideoScreen"
        style={styles.videoToolsFooterNavContainer}
      >
        <Text style={{ color: "white" }}>
          {editorVideoIsPlaying ? "PLAYING " : "STOP "}
          {timelinePosition}
          {"\n"}
          {videoIsFinished ? "FINISHED " : "UNFINISHED "}
          {(queueDuration / 1000) * VIDEO_IMAGE_FRAME_WIDTH}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const useUploadEditVideoScreenStyles = () => {
  const { height, width } = useWindowDimensions();
  const VIDEO_CONTAINER_HEIGHT = (width * 32) / 27;
  const TIMELINE_CONTAINER_HEIGHT =
    height -
    VIDEO_CONTAINER_HEIGHT -
    VIDEO_TOOLS_FOOTER_NAV_HEIGHT -
    VIDEO_CONTROL_TOOLBAR_HEIGHT;
  const styles = StyleSheet.create({
    container: {
      backgroundColor: "#121212",
    },
    videoContainer: {
      height: VIDEO_CONTAINER_HEIGHT,
      width: width,
      justifyContent: "center",
      alignItems: "center",
    },
    video: {
      height: VIDEO_CONTAINER_HEIGHT,
      width: (width * 2) / 3,
      alignContent: "center",
    },
    videoControlToolbarContainer: {
      height: VIDEO_CONTROL_TOOLBAR_HEIGHT,
      width: width,
      backgroundColor: "black",
      justifyContent: "center",
      alignItems: "center",
    },
    timelineContainer: {
      height: TIMELINE_CONTAINER_HEIGHT,
      backgroundColor: "#121212",
    },
    timelineScrollView: {
      height: TIMELINE_CONTAINER_HEIGHT,
    },
    timelineRowView: {
      flexDirection: "row",
      flexWrap: "wrap",
    },
    timelineScrollPaddingView: {
      // videoTimelineSeparators are dependent on this
      height: TIMELINE_CONTAINER_HEIGHT,
      width: width / 2,
    },
    timelineTimeBar: {
      width: 2,
      height: TIMELINE_CONTAINER_HEIGHT,
      position: "absolute",
      alignSelf: "center",
      backgroundColor: "white",
    },
    timelineMarkingsContainer: {
      width: VIDEO_IMAGE_FRAME_WIDTH * 16,
      flexDirection: "row",
      marginLeft: -VIDEO_IMAGE_FRAME_WIDTH / 2,
    },
    timelineTimeMarkingsText: {
      marginLeft: VIDEO_IMAGE_FRAME_WIDTH * 2 - 35.3, // TODO: Dependent on text choice / size.
      color: "gray",
      position: "relative",
    },
    videoToolsFooterNavContainer: {
      height: VIDEO_TOOLS_FOOTER_NAV_HEIGHT,
    },
  });
  return { height, width, styles };
};
