import { SafeAreaView } from "react-native-safe-area-context";
import { useAtom, useSetAtom } from "jotai";
import { queueAtom } from "../../hooks/upload/useMainVideoQueue";
import { Video } from "expo-av";
import { useRef, useState, useEffect, useMemo } from "react";
import {
  curPlayingVideoAtom,
  editorVideoPlayingStatusAtom,
} from "../../hooks/upload/useVideoPlayer";
import { AntDesign } from "@expo/vector-icons";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  useWindowDimensions,
  ScrollView,
  Image,
} from "react-native";
import temp from "../../assets/favicon.png";
import {
  START_FROM_PREV_VIDEO_END,
  VIDEO_CONTROL_TOOLBAR_HEIGHT,
  VIDEO_TOOLS_FOOTER_NAV_HEIGHT,
  VIDEO_IMAGE_FRAME_WIDTH,
} from "../../Constants";

/**
 * Edit your videos in the app.
 * @returns
 */
export default function UploadEditVideoScreen() {
  const { height, width, styles } = useUploadEditVideoScreenStyles();
  const videoRef = useRef(null);
  const [queue] = useAtom(queueAtom);
  const [curPlayingVideo, setCurPlayingVideo] = useAtom(curPlayingVideoAtom);
  // Edit video is playing and convenience setter atom
  const [editorVideoIsPlaying, setEditorVideoIsPlaying] = useAtom(
    editorVideoPlayingStatusAtom,
  );
  const [videoIsFinished, setVideoIsFinished] = useState(false);
  const [selectedComponentKey, setSelectedComponentKey] = useState(null);

  useEffect(() => {
    // On first page render, set curPlaying Video
    setCurPlayingVideo(START_FROM_PREV_VIDEO_END);
  }, []);

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
        return (
          <TouchableOpacity
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
                style={{
                  ...videoTimelineThumbnailStyle,
                  borderColor: "white",
                  borderWidth: 3,
                  position: "absolute",
                }}
              />
            ) : null}
          </TouchableOpacity>
        );
      }),
    [queue, selectedComponentKey],
  );

  const videoTimelineSeparators = useMemo(() =>
    queue.map(
      (item, queueIndex) => {
        // Style to draw separator between image timeline components

        let PADDING_VIEW_WIDTH = width / 2;
        let videoTimelineSeparateStyle = {
          marginLeft:
            Math.ceil((item.video.duration * VIDEO_IMAGE_FRAME_WIDTH) / 1000) -
            10 +
            PADDING_VIEW_WIDTH,
          height: 20,
          width: 20,
          top: 10,
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
          shouldPlay={true}
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
        <ScrollView style={styles.timelineScrollView} horizontal={true}>
          <View style={styles.timelineScrollPaddingView} />
          {/* Timestamps */}
          {/* Video Thumbnails */}
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
          <View style={styles.timelineScrollPaddingView} />
        </ScrollView>
        <View style={styles.timelineTimeBar} />
      </View>
      <View
        key="VideoToolsFooterNav-UploadEditVideoScreen"
        style={styles.videoToolsFooterNavContainer}
      >
        <Text style={{ color: "white" }}>
          {editorVideoIsPlaying ? "PLAY " : "STOP "}
          {selectedComponentKey}
          {"\n"}
          {videoIsFinished ? "FIN " : "NUP "}
          {queue.map((item) => item.key + " ")}
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
    videoToolsFooterNavContainer: {
      height: VIDEO_TOOLS_FOOTER_NAV_HEIGHT,
    },
  });
  return { height, width, styles };
};
