import {
  View,
  Image,
  Text,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";

export default function SongTagCard(props) {
  const { item } = props;
  const { id, name, iconUri, backgroundColour } = item;
  const styles = useSongTagCardStyles();
  return (
    <TouchableHighlight
      style={{ ...styles.container, backgroundColor: backgroundColour }}
      activeOpacity={0.5}
      underlayColor="#191919"
      onPress={() => {}}
      key={"SONGTAGCARD" + id}
    >
      <View>
        <Text style={styles.nameText}>{name}</Text>
        <Image
          source={iconUri ? { uri: iconUri } : null}
          style={styles.iconImage}
        />
      </View>
    </TouchableHighlight>
  );
}

export const useSongTagCardStyles = () => {
  const { width, height } = useWindowDimensions();
  const styles = StyleSheet.create({
    container: {
      borderRadius: 16,
      width: width / 2 - 32,
      height: 100,
      margin: 8,
    },
    nameText: {
      color: "white",
      fontSize: 20,
      fontWeight: "bold",
      top: 16,
      left: 16,
      zIndex: 1,
    },
    iconImage: {
      borderRadius: 8,
      right: 0,
      position: "absolute",
      height: width / 6,
      width: width / 6,
      transform: [{ rotate: "35deg" }, { translateX: 30 }, { translateY: 16 }],
      zIndex: 0,
    },
  });
  return styles;
};
