import { StyleSheet, useWindowDimensions, Text, View } from "react-native";
// import Animated from 'react-native-reanimated';
import { TouchableHighlight } from "react-native-gesture-handler";

/**
 *
 * @param {onPress, IconElement, title} props
 */
export default function ResponsiveButton({ onPress, IconElement, title }) {
  const styles = useResponsiveButtonStyle();
  const handleOnPress = () => {
    onPress();
    // Animate with timing
  };
  return (
    <TouchableHighlight
      onPress={handleOnPress}
      activeOpacity={0.5}
      underlayColor="#191919"
      style={styles.highlight}
    >
      <View style={styles.highlight}>
        <IconElement></IconElement>
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableHighlight>
  );
}
const useResponsiveButtonStyle = () => {
  const { height, width } = useWindowDimensions();

  const styles = StyleSheet.create({
    highlight: {
      width: width / 6,
      height: Math.min(width / 6, 60),
      borderRadius: 5,
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
    },
    title: {
      textAlign: "right",
      color: "#c4c4c4",
      fontSize: 10,
    },
  });
  return styles;
};
