import { useState } from "react";
import { View, Text } from "react-native";
import Video from 'react-native-video';

export default function TeaserView()    {
    const [post, setPost] = useState(props.post);
    

    return (
        <View style={styles.container}>
            <Video
            source={"assets/susExample.mp4"} repeat={true}>
            </Video>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#25292e',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  