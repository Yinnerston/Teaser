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
  const styles = useUploadEditVideoScreenStyles();
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
      queue.map((item) => {
        // Dynamically set width based on the duration in seconds
        let videoTimelineThumbnailStyle = {
          width: Math.floor(
            (item.video.duration * VIDEO_IMAGE_FRAME_WIDTH) / 1000,
          ),
          height: VIDEO_IMAGE_FRAME_WIDTH,
          borderRightWidth: 3,
          borderRightColor: "white",
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
            <Image
              source={{ uri: "https://art.pixilart.com/36051be2145c3c3.png" }}
              style={videoTimelineThumbnailStyle}
            />
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
          {videoTimelineElements ? videoTimelineElements : <Text>NTHING</Text>}
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
      height: TIMELINE_CONTAINER_HEIGHT,
      width: width / 2,
    },
    timelineScrollLeftPadding: {
      marginLeft: width / 3,
      height: TIMELINE_CONTAINER_HEIGHT,
      backgroundColor: "blue",
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
  return styles;
};
