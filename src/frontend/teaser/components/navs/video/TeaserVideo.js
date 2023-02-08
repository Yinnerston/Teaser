import { View } from 'react-native';
import { Video } from 'expo-av'

const susExampleImage = require('../../../assets/susExample.mp4');

/**
 * Container for video of a teaser.
 * Handles play / pause / volume / seeking through a video.
 * @returns 
 */
export default function TeaserVideo()   {
    return (
        <View>
            <Video source={susExampleImage} isLooping={true}>
            </Video>
        </View>
    );
}