import { Video } from "expo-av";
import { View } from "react-native";

/**
 * Grid Item (Card) displayed by ProfileTeaserGridView
 */
export default function ProfileTeaserGridCard() {
  // https://github.com/wonday/react-native-image-cache-wrapper
  // TODO: Cachable image?
  return (
    <View>
      <Video></Video>
    </View>
  );
}
