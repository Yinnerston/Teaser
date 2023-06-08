import { useMemo, useRef, useEffect } from "react";
import { Modalize } from "react-native-modalize";
import { StyleSheet, Text, View } from "react-native";
import { STATUS_BAR_HEIGHT } from "../../../Constants";

export default function ShareModal({
  postID,
  shareURL,
  showShareModal,
  setShowShareModal,
}) {
  const shareModalRef = useRef(null);

  const renderHeaderComponent = useMemo(
    () => (
      <View style={styles.headerContainer}>
        <Text selectable={true}>{shareURL}</Text>
      </View>
    ),
    [shareURL],
  );

  useEffect(() => {
    // Close comment modal when showCommentModal is set to false
    if (!showShareModal) {
      shareModalRef.current?.close?.();
    } else {
      shareModalRef.current?.open?.();
    }
  }, [showShareModal, shareModalRef]);
  return (
    <Modalize
      ref={shareModalRef}
      snapPoint={200}
      adjustToContentHeight={true}
      onClosed={() => setShowShareModal(false)}
      HeaderComponent={renderHeaderComponent}
    />
  );
}
const styles = StyleSheet.create({
  headerContainer: {
    marginBottom: STATUS_BAR_HEIGHT,
  },
});
