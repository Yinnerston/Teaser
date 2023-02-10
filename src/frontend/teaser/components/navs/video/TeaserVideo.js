import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { Video } from 'expo-av'
import { useRef, useState } from 'react';
import { HOMEPAGE_FOOTER_HEIGHT } from '../../../Constants';

const susExampleImage = require('../../../assets/susExample.mp4');

/**
 * Container for video of a teaser.
 * Handles play / pause / volume / seeking through a video.
 * @returns 
 */
export default function TeaserVideo()   {
    const videoRef = useRef(null);
    const [status, setStatus] = useState([]);
    return (
        <View>
            <Video ref={videoRef}
            style={styles.video} 
            useNativeControls 
            onPlaybackStatusUpdate={status => setStatus(() => status)} 
            source={susExampleImage} 
            isLooping={true}
            >
            </Video>
        </View>
    );
}

const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
    video: {
        alignContent: 'center',
        height: height - HOMEPAGE_FOOTER_HEIGHT,
        width: width
    }
})