import {
  StyleSheet,
  View,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { Video } from "expo-av";
// import { Image } from 'expo-image';
import { forwardRef, useState } from "react";
import {
  VIDEO_LANDSCAPE,
  VIDEO_PORTRAIT,
  STATUS_BAR_HEIGHT,
} from "../../../Constants";
import { AntDesign } from "@expo/vector-icons";
/**
 * Container for video of a teaser.
 * Handles play / pause / volume / seeking through a video.
 * @argument videoURL Url to the video .mp4 file
 * @argument videoMode enum {VIDEO_PORTRAIT, VIDEO_LANDSCAPE}
 * @argument videoIdx id of the video
 * @returns
 */
export const TeaserVideo = forwardRef(function TeaserVideo(props, ref) {
  const { videoURL, thumbnailURL, videoMode, videoIdx, style } = props;
  // Styles prop is optional
  const styles = style ? style : useTeaserVideoStyle();
  // State variable for rendering play icon on pause
  const [videoPlayingStatus, setVideoPlayingStatus] = useState({
    isPlaying: true,
  });

  /**
   * Function called on pressing the video TouchableOpacity.
   * Toggles between playing and pausing the video if the video has been loaded.
   */
  const _onPressTogglePlayPause = async () => {
    requestAnimationFrame(() => {
      if (ref.current[videoIdx] != null) {
        if (videoPlayingStatus.isPlaying) {
          ref.current[videoIdx].pauseAsync();
        } else {
          ref.current[videoIdx].playAsync();
        }
      }
    });
  };

  /**
   * Render the play button if the video is not playing.
   * @returns
   */
  const _renderPlayButton = () => {
    if (!videoPlayingStatus.isPlaying) {
      return (
        <AntDesign
          style={styles.playIcon}
          name="caretright"
          size={48}
          color="white"
        />
      );
    }
  };

  return (
    <View>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => _onPressTogglePlayPause()}
      >
        <Video
          ref={(_videoRef) => {
            ref.current[videoIdx] = _videoRef;
          }}
          style={styles.video}
          useNativeControls={false}
          onPlaybackStatusUpdate={(status) =>
            setVideoPlayingStatus(() => status)
          }
          source={videoURL}
          isLooping={true}
          paused={false}
          resizeMode={videoMode == VIDEO_PORTRAIT ? "cover" : "contain"}
        ></Video>
        {_renderPlayButton()}
      </TouchableOpacity>
    </View>
  );
});

const useTeaserVideoStyle = () => {
  const { height, width } = useWindowDimensions();
  const styles = StyleSheet.create({
    video: {
      alignContent: "center",
      height: height - STATUS_BAR_HEIGHT,
      width: width,
      margin: "auto",
    },
    playIcon: {
      position: "absolute",
      top: height / 2 - 24,
      left: width / 2 - 24,
      justifyContent: "center",
      alignItems: "center",
      opacity: 0.7,
    },
  });
  return styles;
};
