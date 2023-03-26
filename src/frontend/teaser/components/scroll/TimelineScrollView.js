import { forwardRef } from "react";
import useInterval from "../../hooks/useInterval";
import {
  timelinePositionAtom,
  curPlayingVideoAtom,
} from "../../hooks/upload/useVideoPlayer";
import { useAtom } from "jotai";
import { useMemo, useState } from "react";
import { Text, View, ScrollView, Image } from "react-native";
import {
  TouchableOpacity,
  Gesture,
  GestureDetector,
  TapGestureHandler,
} from "react-native-gesture-handler";
// import {
//   useSharedValue,
//   useAnimatedStyle,
//   Animated,
// } from "react-native-reanimated";
import { VIDEO_IMAGE_FRAME_WIDTH, TIMELINE_VIDEO_FPS } from "../../Constants";
import { NativePressableOpacity } from "react-native-pressable-opacity";
import { ReversemsToWidth } from "../../utils/videoTimelineWidth";

/**
 *
 * @param {styles} props
 * @param ^styles: {timelineScrollView, timelineRowView, timelineScrollPaddingView}
 */
export const TimelineScrollView = forwardRef(function TimelineScrollView(
  props,
  scrollRef
) {
  const {
    styles,
    selectedComponentKey,
    setSelectedComponentKey,
    queue,
    editorVideoIsPlaying,
    setEditorVideoIsPlaying,
    videoTimelineWrapperViewWidth,
    setVideoIsFinished,
    queueDuration,
    videoRef,
  } = props;
  const [timelinePosition, setTimelinePosition] = useAtom(timelinePositionAtom);
  const intervalLength = 1000 / TIMELINE_VIDEO_FPS;
  const [userIsScrolling, setUserIsScrolling] = useState(false);
  const [curPlayingVideo, setCurPlayingVideo] = useAtom(curPlayingVideoAtom);

  // As the video plays, scroll the scrollView by scrollTo {x: timelinePosition}
  useInterval(
    () => {
      // TODO: handlePlaybackStatusUpdate sets editorVideoIsPlaying to false so the scrolling stops
      // BUT the interval still fires
      // I should cancel the intervel early so I don't have the redundant interval calculations
      if (editorVideoIsPlaying && scrollRef.current != null) {
        setTimelinePosition(
          (current) => current + VIDEO_IMAGE_FRAME_WIDTH / TIMELINE_VIDEO_FPS
        );
      }
    },
    editorVideoIsPlaying ? intervalLength : null
  );

  // Scroll View onScroll functions:
  /**
   * Handles stopping the video when user starts scrolling the scroll view.
   */
  const handleBeginDragTimelineScrollView = () => {
    // Pause the video
    setUserIsScrolling(true);
    setEditorVideoIsPlaying(false);
    setVideoIsFinished(false); // TODO: Video no longer playing because scroll?
    if (videoRef.current != null) {
      videoRef.current.pauseAsync();
    }
  };

  const handleEndDragTimelineScrollView = () => {
    setUserIsScrolling(false);
    // User needs to press the play button to play the video
    // setEditorVideoIsPlaying(true);
  };

  const handleTimelineOnScroll = (event) => {
    if (!userIsScrolling) {
      return;
    }
    // // Clamp within bounds [0, queueDuration]
    let contentOffset = Math.min(
      Math.max(event.nativeEvent.contentOffset.x, 0),
      queueDuration
    );
    // TODO: Seek to position in relevant video
    if (contentOffset < 0 || contentOffset > queueDuration) {
      // Reject invalid inputs
      return;
    }
    var startTime = 0;
    var endTime = 0;
    // If the scroll falls out of the bounds of the curPlayingVideo, switch the video
    if (
      contentOffset <= curPlayingVideo.msstartTime ||
      contentOffset >
        curPlayingVideo.msstartTime + curPlayingVideo.video.duration
    ) {
      // TODO: Add these to state
      // startTime = msToWidth(curPlayingVideo.msstartTime)
      // endTime = msToWidth(curPlayingVideo.msstartTime + curPlayingVideo.video.duration)
      for (videoNode of queue) {
        let videoEndTime = videoNode.msstartTime + videoNode.video.duration;
        if (
          videoNode.msstartTime >= contentOffset &&
          contentOffset < videoEndTime
        ) {
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
  };

  const handleSelectedVideoKeyChange = (prev, newKey) =>
    newKey != prev ? newKey : null;

  const videoTimelineElements = useMemo(
    () =>
      queue.map((item, queueIndex) => {
        // Dynamically set width based on the duration in seconds
        let videoTimelineThumbnailStyle = {
          width: Math.ceil(
            (item.video.duration * VIDEO_IMAGE_FRAME_WIDTH) / 1000
          ),
          height: VIDEO_IMAGE_FRAME_WIDTH,
          position: "relative",
        };
        // let aStyle = animatedStyles;
        // Define animation for x value translation
        // Define Pan gesture and assign to detector
        let panGesture = Gesture.Pan();
        return (
          <GestureDetector
            gesture={panGesture}
            key={"TimelineGestureDetector" + item.key}
          >
            <NativePressableOpacity
              key={"VideoTimelineThumbnail" + item.key}
              style={videoTimelineThumbnailStyle}
              onPress={() =>
                setSelectedComponentKey((prev) =>
                  handleSelectedVideoKeyChange(prev, item.key)
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
    [queue, selectedComponentKey] // TODO: or just animatedStyles?
  );

  const videoTimelineSeparators = useMemo(() =>
    queue.map(
      (item, queueIndex) => {
        // Style to draw separator between image timeline components
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
      [queue]
    )
  );
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

  return (
    <ScrollView
      style={styles.timelineScrollView}
      horizontal={true}
      ref={scrollRef}
      contentOffset={{ x: timelinePosition, y: 0, animated: false }}
      onScrollBeginDrag={handleBeginDragTimelineScrollView}
      onScroll={handleTimelineOnScroll}
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
  );
});
