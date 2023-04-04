import { forwardRef, useEffect } from "react";
import useInterval from "../../hooks/useInterval";
import {
  timelinePositionAtom,
  curPlayingVideoAtom,
} from "../../hooks/upload/useVideoPlayer";
import { useAtom } from "jotai";
import { useMemo, useState } from "react";
import { Text, View, Image, Vibration } from "react-native";
import {
  ScrollView,
  Gesture,
  GestureDetector,
} from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { VIDEO_IMAGE_FRAME_WIDTH, TIMELINE_VIDEO_FPS } from "../../Constants";
import { NativePressableOpacity } from "react-native-pressable-opacity";
import { msToWidth, ReversemsToWidth } from "../../utils/videoTimelineWidth";
import TimelineVideoElement from "./TimelineVideoElement";
/**
 *
 * @param {styles} props
 * @param ^styles: {timelineScrollView, timelineRowView, timelineScrollPaddingView}
 */
export const TimelineScrollView = forwardRef(
  function TimelineScrollView(props, scrollRef) {
    const {
      styles, // TODO: Probably just move the styles to this file
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
    let queueDurationWidth = msToWidth(queueDuration);
    const [timelinePosition, setTimelinePosition] =
      useAtom(timelinePositionAtom);
    const intervalLength = 1000 / TIMELINE_VIDEO_FPS;
    const [userIsScrolling, setUserIsScrolling] = useState(false);
    const [curPlayingVideo, setCurPlayingVideo] = useAtom(curPlayingVideoAtom);
    const [userIsReorderingTimeline, setUserIsReorderingTimeline] =
      useState(false);
    // As the video plays, scroll the scrollView by scrollTo {x: timelinePosition}
    useInterval(
      () => {
        // TODO: handlePlaybackStatusUpdate sets editorVideoIsPlaying to false so the scrolling stops
        // BUT the interval still fires
        // I should cancel the intervel early so I don't have the redundant interval calculations
        if (editorVideoIsPlaying && scrollRef.current != null) {
          setTimelinePosition(
            (current) => current + VIDEO_IMAGE_FRAME_WIDTH / TIMELINE_VIDEO_FPS,
          );
        }
      },
      editorVideoIsPlaying ? intervalLength : null,
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

    const handleEndDragTimelineScrollView = (event) => {
      setUserIsScrolling(false);
      let contentOffset = Math.min(
        Math.max(event.nativeEvent.contentOffset.x, 0),
        queueDurationWidth,
      );
      setTimelinePosition(contentOffset);

      // User needs to press the play button to play the video
      // setEditorVideoIsPlaying(true);
    };

    const handleTimelineOnScroll = (event) => {
      if (!userIsScrolling) {
        return;
      }
      // // Clamp within bounds [0, queueDurationWidth]
      let contentOffset = Math.min(
        Math.max(event.nativeEvent.contentOffset.x, 0),
        queueDurationWidth,
      );
      // TODO: Seek to position in relevant video
      if (contentOffset < 0 || contentOffset > queueDurationWidth) {
        // Reject invalid inputs
        return;
      }
      var videoStartTimeWidth = 0;
      var videoEndTimeWidth = 0;
      // If the scroll falls out of the bounds of the curPlayingVideo, switch the video
      if (
        contentOffset <= curPlayingVideo.startTimeWidth ||
        contentOffset > curPlayingVideo.endTimeWidth
      ) {
        for (videoNode of queue) {
          if (
            videoNode.startTimeWidth <= contentOffset &&
            contentOffset < videoNode.endTimeWidth
          ) {
            setCurPlayingVideo(videoNode);
            break;
          }
        }
      }

      // Seek to position in video
      if (videoRef.current != null) {
        // Seek to position
        let newPositionInVideo = contentOffset - curPlayingVideo.startTimeWidth;
        let seekTo = ReversemsToWidth(newPositionInVideo);
        videoRef.current.setPositionAsync(seekTo);
      }
    };

    const handleSelectedVideoKeyChange = (prev, newKey) =>
      newKey != prev ? newKey : null;

    // Left css value derived from initial x value on long press
    const sharedOnLongPressLeftOffset = useSharedValue(0);
    // Current translationX in the pan gesture
    const curTranslationX = useSharedValue(0);
    // Active queue index of selected component (key is selectedComponentKey)
    const activeIndex = useSharedValue(-1);
    // Queue index being hovered over
    const positions = useSharedValue(
      queue
        .map((item, queueIndex) => [item.key, queueIndex])
        .reduce((obj, item) => {
          return {
            ...obj,
            [item[0]]: item[1],
          };
        }, {}),
    );
    const panGestureAnimatedStyle = useAnimatedStyle(() => {
      return {
        left: sharedOnLongPressLeftOffset.value + curTranslationX.value,
        width: VIDEO_IMAGE_FRAME_WIDTH,
        height: VIDEO_IMAGE_FRAME_WIDTH,
        position: "relative",
      };
    }, [sharedOnLongPressLeftOffset.value, curTranslationX.value]);

    /**
     * Render timeline elements in a row
     */
    const videoTimelineElements = queue.map((item, queueIndex) => {
      return (
        <TimelineVideoElement
          queue={queue}
          item={item}
          queueIndex={queueIndex}
          sharedOnLongPressLeftOffset={sharedOnLongPressLeftOffset}
          activeIndex={activeIndex}
          userIsReorderingTimeline={userIsReorderingTimeline}
          setUserIsReorderingTimeline={setUserIsReorderingTimeline}
          selectedComponentKey={selectedComponentKey}
          setSelectedComponentKey={setSelectedComponentKey}
          setCurPlayingVideo={setCurPlayingVideo}
          queueDurationWidth={queueDurationWidth}
          curTranslationX={curTranslationX}
          panGestureAnimatedStyle={panGestureAnimatedStyle}
          handleSelectedVideoKeyChange={handleSelectedVideoKeyChange}
          positions={positions}
        />
      );
    });

    // /**
    //  * When user is reodering timeline onPan
    //  */
    // const reorderTimelineElements = useMemo((item, queueIndex) => {

    // }, [queue, selectedComponentKey]) // TODO: Do i need memoization on selectedComponentKey, userIsReorderingTimeline?

    const videoTimelineSeparators = !userIsReorderingTimeline
      ? queue.map((item, queueIndex) => {
          console.log(item.next ? item.next.key : "NONE NEXT", queueIndex);
          // Style to draw separator between image timeline components
          let videoTimelineSeparateStyle = {
            marginLeft:
              Math.ceil(item.startTimeWidth + item.durationWidth) -
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
        })
      : null;
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
        onScrollEndDrag={handleEndDragTimelineScrollView}
        onScroll={handleTimelineOnScroll}
        scrollEnabled={!userIsReorderingTimeline}
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
          {!userIsReorderingTimeline ? (
            <VideoTimelineTimeMarkings />
          ) : (
            <View style={styles.timelineMarkingsContainer}></View>
          )}
          {/* Video Thumbnails */}
          <View style={styles.timelineRowView}>
            {videoTimelineElements ? (
              videoTimelineElements
            ) : (
              <Text>Alt Text</Text>
            )}
            {videoTimelineSeparators ? videoTimelineSeparators : null}
          </View>
        </View>

        <View style={styles.timelineScrollPaddingView} />
      </ScrollView>
    );
  },
);
