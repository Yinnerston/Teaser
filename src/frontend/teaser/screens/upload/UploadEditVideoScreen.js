import { SafeAreaView } from "react-native-safe-area-context";
import { useAtom, useSetAtom } from "jotai";
import { queueAtom } from "../../hooks/upload/useMainVideoQueue";
import { Video } from "expo-av";
import { useRef, useState, useEffect } from "react";
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
} from "react-native";
import { START_FROM_PREV_VIDEO_END } from "../../Constants";

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
    if (videoIsFinished) {
      setCurPlayingVideo(START_FROM_PREV_VIDEO_END);
      setEditorVideoIsPlaying(true);
      setVideoIsFinished(false);
      return;
    }
    if (videoRef.current != null) {
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

  return (
    <SafeAreaView style={styles.container}>
      <View key="CameraView-UploadEditVideoScreen" style={styles.videoContainer}>
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
      </View>
      <View key="VideoControlToolbar-UploadEditVideoScreen">
        <TouchableOpacity onPress={() => handlePressTogglePlayPause()}>
          <AntDesign name="caretright" size={24} color="white" />
          {editorVideoIsPlaying ? (
            <Text>IS PLAYING</Text>
          ) : (
            <Text>NOT PLAYING</Text>
          )}
          {videoIsFinished ? (
            <Text>IS FINSIHED</Text>
          ) : (
            <Text>NOT FINSIHED</Text>
          )}
        </TouchableOpacity>
      </View>
      <View key="TimelineView-UploadEditVideoScreen">
        <Text>{JSON.stringify(curPlayingVideo)}</Text>
        {/* <Text>{curPlayingVideo.video.toString()}</Text> */}

        {curPlayingVideo ? (
          <Text key={curPlayingVideo.video.path}>{curPlayingVideo.video.path}</Text>
        ) : (
          <Text>Undefined</Text>
        )}
      </View>
      <View key="VideoToolsFooterNav-UploadEditVideoScreen">
        <Text>Some Icons Here</Text>
      </View>
    </SafeAreaView>
  );
}

const useUploadEditVideoScreenStyles = () => {
  const { height, width } = useWindowDimensions();
  const styles = StyleSheet.create({
    container: {
      backgroundColor: "gray",
    },
    videoContainer: {
      height: width * 32 / 27,
      width: width,
      justifyContent: "center",
      alignItems: "center",
    },
    video: {
      height: width * 32 / 27,
      width: width * 2 / 3,
      alignContent: "center",
    },
  });
  return styles;
};
