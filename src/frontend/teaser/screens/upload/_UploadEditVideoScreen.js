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
import useInterval from "../../hooks/useInterval";

function msToWidth(ms)  {
  return ms * VIDEO_IMAGE_FRAME_WIDTH / 1000;
}

function ReversemsToWidth(width)  {
  return width * 1000 / VIDEO_IMAGE_FRAME_WIDTH;
}

/**
 * Edit your videos in the app.
 * @returns
 */
export default function UploadTimelineScreen() {
  const { height, width, styles } = useUploadTimelineScreenStyles();
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
  const [userIsScrolling, setUserIsScrolling] = useState(false);

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
    // TODO: handlePlaybackStatusUpdate sets editorVideoIsPlaying to false so the scrolling stops
    // BUT the interval still fires
    // I should cancel the intervel early so I don't have the redundant interval calculations
    if (editorVideoIsPlaying && scrollRef.current != null) {
      setTimelinePosition(
        (current) => current + VIDEO_IMAGE_FRAME_WIDTH / TIMELINE_VIDEO_FPS,
      );
    }
  }, editorVideoIsPlaying ? intervalLength : null);

  console.log("AAA")
  // Scroll View onScroll functions:
  /**
   * Handles stopping the video when user starts scrolling the scroll view.
   */
  const handleBeginDragTimelineScrollView = () => {
    // Pause the video
    setUserIsScrolling(true);
    setEditorVideoIsPlaying(false);
    setVideoIsFinished(false);  // TODO: Video no longer playing because scroll?
    if (videoRef.current != null) {
      videoRef.current.pauseAsync();
    }
  }

  const handleEndDragTimelineScrollView = () => {
    setUserIsScrolling(false);
    // User needs to press the play button to play the video
    // setEditorVideoIsPlaying(true);
  }

  const handleTimelineOnScroll = (event) => {
    if (!userIsScrolling) {
      return;
    }
    // // Clamp within bounds [0, queueDuration]
    let contentOffset = Math.min(Math.max(event.nativeEvent.contentOffset.x, 0), queueDuration)
    // TODO: Seek to position in relevant video
    if (contentOffset < 0 || contentOffset > queueDuration) {
      // Reject invalid inputs
      return;
    }
    var startTime = 0;
    var endTime = 0;
    // If the scroll falls out of the bounds of the curPlayingVideo, switch the video
    if (contentOffset <= curPlayingVideo.msstartTime || contentOffset > curPlayingVideo.msstartTime + curPlayingVideo.video.duration)  {
      // TODO: Add these to state
      // startTime = msToWidth(curPlayingVideo.msstartTime)
      // endTime = msToWidth(curPlayingVideo.msstartTime + curPlayingVideo.video.duration)
      for (videoNode of queue)  {
        let videoEndTime = videoNode.msstartTime + videoNode.video.duration;
        if (videoNode.msstartTime >= contentOffset && contentOffset < videoEndTime) {
          setCurPlayingVideo(videoNode);
          break;
        }
      }
    }

    // Seek to position in video
    if (videoRef.current != null) {
      // Seek to position
      let newTimelinePosition = contentOffset - startTime;
      let seekTo = ReversemsToWidth(newTimelinePosition);
      // if (Math.abs(seekTo) < 1) { // TODO: Don't seeking to end if within 1-2 frames?
      //   // Probably remove this
      //   // setVideoIsFinished(true);
      //   return;
      // }
      videoRef.current.setPositionAsync(seekTo);
      // setTimelinePosition(contentOffset);
      // DEBUG
      // console.log("SEEK", seekTo, endTime, startTime)
    }
    // console.log("CONTENT OFFSET ON SCROLL", contentOffset)
  }

  const handlePlaybackStatusUpdate = async (status) => {
    if (status.isLoaded) {
      // setEditorVideoIsPlaying(status.isPlaying);
      
      // Set timeline position
      let statusPosition = msToWidth(curPlayingVideo.msstartTime + status.positionMillis)
      let syncDiff = Math.abs(timelinePosition - statusPosition)
      if (syncDiff > VIDEO_IMAGE_FRAME_WIDTH)  {
        // out of sync by more than 1 second
        setTimelinePosition(statusPosition);
        console.log("INTERVAL OUT OF SYNC", syncDiff)
      }
      // await scrollRef.current?.scrollTo({
      //   x: msToWidth(curPlayingVideo.msstartTime + status.positionMillis),
      //   y: 0,
      //   animated: false,
      // });
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
                    key={"TIMELINEFRAME" + Math.random() * 6969 + index + item.key}
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
            <View id="top" style={videoTimelineSeparateStyle} key={"TIMELINESEPARATOR" + item.key}>
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
        key="CameraView-UploadTimelineScreen"
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
          shouldPlay={editorVideoIsPlaying}
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
        key="VideoControlToolbar-UploadTimelineScreen"
        style={styles.videoControlToolbarContainer}
      >
        <TouchableOpacity onPress={() => handlePressTogglePlayPause()}>
          <AntDesign name="caretright" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View
        key="TimelineView-UploadTimelineScreen"
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
          contentOffset={{x: timelinePosition, y:0, animated: false}}
          onScrollBeginDrag={handleBeginDragTimelineScrollView}
          onScrollEndDrag={handleEndDragTimelineScrollView}
          onScroll={handleTimelineOnScroll}
          // scrollEventThrottle={16}
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
        key="VideoToolsFooterNav-UploadTimelineScreen"
        style={styles.videoToolsFooterNavContainer}
      >
        <Text style={{ color: "white" }}>
          {editorVideoIsPlaying ? "PLAYING " : "STOP "}
          {timelinePosition}
          {userIsScrolling ? "SCROLLING " : "NOT SCROLLING "}
          {"\n"}
          {videoIsFinished ? "FINISHED " : "UNFINISHED "}
          {queue.map((item) => {
            let startTime = msToWidth(item["msstartTime"])
            let endTime = msToWidth(item["msstartTime"] + item["video"]["duration"])
            return startTime + " E: " + endTime + "   "})}

        </Text>
      </View>
    </SafeAreaView>
  );
}

const useUploadTimelineScreenStyles = () => {
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
