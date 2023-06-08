import { View, StyleSheet, useWindowDimensions } from "react-native";
import TeaserCaption from "../navs/caption/TeaserCaption";
import TeaserHeader from "../navs/header/TeaserHeader";
import TeaserSidebar from "../navs/sidebar/TeaserSidebar";
import { TeaserVideo } from "../navs/video/TeaserVideo";
import { forwardRef, memo, useMemo, useCallback, useState } from "react";
import { STATUS_BAR_HEIGHT } from "../../Constants";
import CommentModal from "../elements/modal/CommentModal";

/**
 *  Container for all the components that make up a teaser.
 * Defines sequence of videos to load.
 * @argument thumbnailURL Url to the thumbnail
 * @argument videoURL Url to the video .mp4 file
 * @argument videoMode enum {VIDEO_PORTRAIT, VIDEO_LANDSCAPE}
 * @argument videoIdx id of the video
 * @returns
 */
export const TeaserView = memo(
  forwardRef(function TeaserView(props, ref) {
    const {
      userAuthAtomValue,
      videoURL,
      thumbnailURL,
      videoMode,
      videoIdx,
      navigation,
      captionData,
      sidebarData,
    } = props;
    const styles = useTeaserViewStyle();

    // Comment modal
    // variables
    const snapPoints = useMemo(() => ["75%"], []);
    const [showCommentModal, setShowCommentModal] = useState(false);

    // callbacks
    const handleSheetChanges = useCallback(
      (index) => {
        console.log("handleSheetChanges", index);
        if (index === -1) {
          setShowCommentModal(false);
        }
      },
      [showCommentModal, setShowCommentModal],
    );

    return (
      <View style={styles.container}>
        <TeaserVideo
          videoURL={{ uri: videoURL }}
          thumbnailURL={{ uri: thumbnailURL }}
          videoMode={videoMode}
          videoIdx={videoIdx}
          ref={ref}
        ></TeaserVideo>
        <TeaserHeader navigation={navigation} />
        <TeaserSidebar
          navigation={navigation}
          sidebarData={sidebarData}
          userAuthAtomValue={userAuthAtomValue}
          setShowCommentModal={setShowCommentModal}
        />
        <TeaserCaption navigation={navigation} captionData={captionData} />
        <CommentModal
          navigation={navigation}
          postID={videoIdx}
          commentCount={sidebarData.commentCount}
          showCommentModal={showCommentModal}
          setShowCommentModal={setShowCommentModal}
          handleSheetChanges={handleSheetChanges}
          snapPoints={snapPoints}
        />
      </View>
    );
  }),
);

const useTeaserViewStyle = () => {
  const { height, width } = useWindowDimensions();
  const styles = StyleSheet.create({
    container: {
      backgroundColor: "#25292e",
      alignItems: "center",
      justifyContent: "center",
      height: height - STATUS_BAR_HEIGHT,
    },
  });
  return styles;
};
