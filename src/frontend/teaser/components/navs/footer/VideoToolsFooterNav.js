import { View, Text } from "react-native";
import ResponsiveButton from "../../elements/button/ResponsiveButton";
import SoundIcon from "../../elements/icon/upload/SoundIcon";
import TrashIcon from "../../elements/icon/upload/TrashIcon";
import SplitVideoIcon from "../../elements/icon/upload/SplitVideoIcon";
import TextIcon from "../../elements/icon/upload/TextIcon";
import OverlayIcon from "../../elements/icon/upload/OverlayIcon";
import EffectsIcon from "../../elements/icon/upload/EffectsIcon";
import QuestionAndAnswerIcon from "../../elements/icon/upload/QuestionAndAnswerIcon";
import SyncIcon from "../../elements/icon/upload/SyncIcon";
import CopyIcon from "../../elements/icon/upload/CopyIcon";
import VolumeIcon from "../../elements/icon/upload/VolumeIcon";
import SpeedIcon from "../../elements/icon/upload/SpeedIcon";
export default function VideoToolsFooterNav(props) {
  const { styles, selectedComponentKey } = props;
  return selectedComponentKey ? (
    <View
      key="VideoToolsFooterNav-UploadEditVideoScreen"
      style={styles.videoToolsFooterNavContainer}
    >
      <ResponsiveButton
        IconElement={SplitVideoIcon}
        onPress={() => {}}
        title="Split"
      />
      <ResponsiveButton
        IconElement={SpeedIcon}
        onPress={() => {}}
        title="Speed"
      />
      <ResponsiveButton
        IconElement={TrashIcon}
        onPress={() => {}}
        title="Delete"
      />
      <ResponsiveButton
        IconElement={CopyIcon}
        onPress={() => {}}
        title="Copy"
      />
      <ResponsiveButton
        IconElement={EffectsIcon}
        onPress={() => {}}
        title="Effects"
      />
      <ResponsiveButton
        IconElement={VolumeIcon}
        onPress={() => {}}
        title="Volume"
      />
    </View>
  ) : (
    <View style={styles.videoToolsFooterNavContainer}>
      <ResponsiveButton
        IconElement={SoundIcon}
        onPress={() => {}}
        title="Sound"
      />
      <ResponsiveButton
        IconElement={SyncIcon}
        onPress={() => {}}
        title="Sync Sound"
      />
      <ResponsiveButton
        IconElement={TextIcon}
        onPress={() => {}}
        title="Caption"
      />
      <ResponsiveButton
        IconElement={OverlayIcon}
        onPress={() => {}}
        title="Overlay"
      />
      <ResponsiveButton
        IconElement={QuestionAndAnswerIcon}
        onPress={() => {}}
        title="Q&A"
      />
      <ResponsiveButton
        IconElement={EffectsIcon}
        onPress={() => {}}
        title="Effects"
      />
    </View>
  );
}
