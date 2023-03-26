import { SafeAreaView } from "react-native-safe-area-context";
import { useAtom, useSetAtom } from "jotai";
import {
  queueAtom,
  queueDurationMsAtom,
} from "../../hooks/upload/useMainVideoQueue";
import { Video } from "expo-av";
import { useRef, useState, useEffect, useMemo } from "react";
import {
  curPlayingVideoAtom,
  editorVideoPlayingStatusAtom,
} from "../../hooks/upload/useVideoPlayer";
import { AntDesign } from "@expo/vector-icons";
import { StyleSheet, Text, View, useWindowDimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  START_FROM_PREV_VIDEO_END,
  VIDEO_CONTROL_TOOLBAR_HEIGHT,
  VIDEO_TOOLS_FOOTER_NAV_HEIGHT,
  VIDEO_IMAGE_FRAME_WIDTH,
} from "../../Constants";
import { TimelineScrollView } from "../../components/scroll/TimelineScrollView";
import { writeOnlyTimelinePositionAtom } from "../../hooks/upload/useVideoPlayer";
import { msToWidth } from "../../utils/videoTimelineWidth";

/**
 * Edit your videos in the app.
 * @returns
 */
export default function UploadEditVideoScreen() {
  const { height, width, styles } = useUploadEditVideoScreenStyles();
  const videoRef = useRef(null);
  const [queue] = useAtom(queueAtom);
  const [queueDuration] = useAtom(queueDurationMsAtom);
  const [curPlayingVideo, setCurPlayingVideo] = useAtom(curPlayingVideoAtom);
  // Edit video is playing and convenience setter atom
  const [editorVideoIsPlaying, setEditorVideoIsPlaying] = useAtom(
    editorVideoPlayingStatusAtom,
  );
  const [videoIsFinished, setVideoIsFinished] = useState(false);
  const [selectedComponentKey, setSelectedComponentKey] = useState(null);
  // Scroll based on video playing
  const scrollRef = useRef(null);
  const setTimelinePosition = useSetAtom(writeOnlyTimelinePositionAtom);
  const videoTimelineWrapperViewWidth = useMemo(() => {
    let queueDurationInSeconds = Math.ceil(queueDuration / 1000);
    return Math.max(queueDurationInSeconds, 16) * VIDEO_IMAGE_FRAME_WIDTH;
  }, [queueDuration]);
  useEffect(() => {
    // On first page render, set curPlaying Video
    setCurPlayingVideo(START_FROM_PREV_VIDEO_END);
  }, []);

  const handlePlaybackStatusUpdate = async (status) => {
    if (status.isLoading) {
      console.log("LOADING");
      return;
    }
    if (status.isLoaded) {
      // Set timeline position
      // let statusPosition = msToWidth(
      //   curPlayingVideo.startTimeMs + status.positionMillis
      // );
      // setTimelinePosition(statusPosition);
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

  console.log("RELOAD");

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
          source={{ uri: curPlayingVideo["video"]["path"] }}
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
        <TimelineScrollView
          styles={styles}
          selectedComponentKey={selectedComponentKey}
          setSelectedComponentKey={setSelectedComponentKey}
          queue={queue}
          editorVideoIsPlaying={editorVideoIsPlaying}
          setEditorVideoIsPlaying={setEditorVideoIsPlaying}
          videoTimelineWrapperViewWidth={videoTimelineWrapperViewWidth}
          setVideoIsFinished={setVideoIsFinished}
          queueDuration={queueDuration}
          videoRef={videoRef}
          ref={scrollRef}
        />
        <View style={styles.timelineTimeBar} />
      </View>
      <View
        key="VideoToolsFooterNav-UploadEditVideoScreen"
        style={styles.videoToolsFooterNavContainer}
      >
        <Text style={{ color: "white" }}>
          {editorVideoIsPlaying ? "PLAYING " : "STOP "}
          {curPlayingVideo ? curPlayingVideo.key : "NONE PLAYING"}
          {"\n"}
          {videoIsFinished ? "FINISHED " : "UNFINISHED "}
          {queue
            ? queue.map(
                (item) => item.startTimeWidth + item.durationWidth + " / ",
              )
            : null}
          /////
          {queue ? queue.map((item) => item.video.duration + " / ") : null}
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
