import renderer from 'react-test-renderer';
import UploadTimelineScreen from "../UploadTimelineScreen";

/**
 * What test cases do I want to cover?
 * 
 * (Timeline interval) --> ScrollView slider syncing up to the video playback
 *  - playlist example syncs it up by having the seekPosition = slider value * duration of video
 *  - my current implementation syncs by having:
 *         seekPosion = content offset == (not normalized slided value) - startTime
 * ^ Playlist example syncs the slider to the actual video playback directly
 *  - playlist: state.playbackInstancePosition / state.playbackInstanceDuration
 *      - state.playbackInstancePosition = onPlaybackStatusUpdate: (status) => status.positionMillis
 *      - state.playbackInstanceDuration = onPlaybackStatusUpdate: (status) => status.durationMillis
 *      - The playlist implementation updates every second:
 *          - This is because state.playbackInstancePosition / state.playbackInstanceDuration changes once a second
 *  - my implementation:
 *      - Expand timelinePosition to include duration?
 * 
 * ^ Expo onPlaybackStatusUpdate only calls around once every ~0.5 seconds:
 *  - What is onLoad triggers the interval call?
 *  - Probably closer to syncing with video
 *  - Interval is cleared when timelinePosition >= (msstartTime + video.duration)
 *  - IDEA: Use it just to check sync with timelinePosition
 * 
 * Seeking to different videos:
 *  - IDEA 1:
 *      - curPlayingVideo -> next / prev
 *      - Can you trigger scroll across multiple videos?
 *      - Probably scroll from curPlayingVideo? --> Need to update curPlayingVideo on queue change
 *  - IDEA 2: (chosen because of consistency)
 *      - iterate through queue until currentOffset in [msstartTime, msstartTime + duration]
 *          - Can the saved video duration in queue ever be different to the expo-av video duration?
 *      - TODO: How do I improve the performance
 *          - Limit number of entries in queue
 *          - queueIndex?
 * 
 * Issue: Too many rerenders --> Performance is so bad!
 *  - What triggers many rerenders?
 *      - TimelinePosition --> Should trigger rerender of movie
 *          - Performance can be improved by splitting video / timeline classes?
 *          - Use jotai to have writeOnlyAtom for timelinePosition on video
 *      - separate timelinePosition and scrollRef.current.scrollTo are redundant.
 * - Solution:
 *      - timeline as WriteOnlyAtom?
 * 
 * Issue: What is setting editorVideoIsPlaying to false?
 *  - When the video is finished and the video is started again from the beginning
 */

test(
    "Test timelinePosition syncs up to video playback",
    () => {
        const uploadScreen = renderer.create(<UploadTimelineScreen></UploadTimelineScreen>)
        expect(uploadScreen.children.length.toBe(1))
    }
)