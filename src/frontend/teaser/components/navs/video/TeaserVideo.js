import { StyleSheet, View, Text, Dimensions, TouchableOpacity } from 'react-native';
import { Video } from 'expo-av'
import { useRef, useState } from 'react';
import { HOMEPAGE_FOOTER_HEIGHT } from '../../../Constants';
import { AntDesign } from '@expo/vector-icons';

/**
 * Container for video of a teaser.
 * Handles play / pause / volume / seeking through a video.
 * @returns 
 */
export default function TeaserVideo(props)   {
    const videoRef = useRef(null);
    const [status, setStatus] = useState([]);
    // const [playbackInstance, setPlaybackInstance] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const _onPlaybackStatusUpdate = status => {
        setStatus(() => status);
        setIsPlaying(status.isPlaying);
    }

    /**
     * Function called on pressing the video TouchableOpacity.
     * Toggles between playing and pausing the video if the video has been loaded.
     */
    const _onPressTogglePlayPause = () => {
        requestAnimationFrame(() => {
            if (videoRef != null)   {   // TODO: Do I need to check if .current is null? Maybe when video changes?
                if (isPlaying)  {
                    videoRef.current.pauseAsync();
                    setIsPlaying(false);
                } else  {
                    videoRef.current.playAsync();
                    setIsPlaying(true);
                }
            }
        })
        
    }

    /**
     * Render the play button if the video is not playing.
     * @returns 
     */
    const _renderPlayButton = () => {
        if (!isPlaying)  {
            return <AntDesign style={styles.playIcon} name="caretright" size={48} color="white"/>
        }
    }

    return (
         <View>
            <TouchableOpacity activeOpacity={1} onPress={() => _onPressTogglePlayPause()}>
                <Video ref={videoRef}
                style={styles.video} 
                useNativeControls={false}
                onPlaybackStatusUpdate={_onPlaybackStatusUpdate} 
                source={props.videoURL} 
                isLooping={true}
                shouldPlay={true}
                >
                </Video>
                {
                    _renderPlayButton()
                }
            </TouchableOpacity>
            
        </View>
    );
}

const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
    video: {
        alignContent: 'center',
        height: height - HOMEPAGE_FOOTER_HEIGHT,
        width: width
    },
    playIcon: {
        position: 'absolute',
        top: height / 2 - 24,
        left: width / 2 - 24,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.7
    }
})