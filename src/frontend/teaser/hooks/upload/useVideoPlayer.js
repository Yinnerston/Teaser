import { atom } from "jotai";
import {
  TEASER_VIDEO_MAX_LENGTH_MS,
  TEASER_VIDEO_REFRESH_RATE_MS,
  START_FROM_PREV_VIDEO_END,
} from "../../Constants";
import { _queueAtom, frontAtom } from "./useMainVideoQueue";
/**
 * Global time position of the editor video.
 * Used to overlays
 */
export const globalVideoTimeAtom = atom(0);
/**
 * TODO: Set this when choosing a length for the teaser video in the camera screen.
 */
export const videoMaxDurationAtom = atom(TEASER_VIDEO_MAX_LENGTH_MS);

// TODO: What am I doing with frontAtom then?
const _curPlayingVideoAtom = atom(null);
export const curPlayingVideoAtom = atom(
  (get) => {
    let curPlaying = get(_curPlayingVideoAtom);
    if (curPlaying != null) {
      return curPlaying;
    }
    return get(_queueAtom)[0];
  },
  (get, set, update) => {
    // If given START_FROM_PREV_VIDEO_END video, reset to frontAtom
    if (update == START_FROM_PREV_VIDEO_END) {
      set(_curPlayingVideoAtom, get(_queueAtom)[0]);
    } else {
      set(_curPlayingVideoAtom, update);
    }
  },
);
// TODO: Add for overlays

export const curPlayingVideoStartEndAtom = atom((get) => {
  let curPlayingVideo = get(_curPlayingVideoAtom);
  let curPlayingVideoEndTime =
    curPlayingVideo.startTimeMs + curPlayingVideo.video.duration;
  return [curPlayingVideo.startTimeMs, curPlayingVideoEndTime];
});

/**
 * Whether the editor is paused or playing video.
 */
export const editorVideoPlayingStatusAtom = atom(false);

/**
 * Increment the incrementGlobalVideoTimeAtom by TEASER_VIDEO_REFRESH_RATE_MS
 * if the editor video hasn't exceeded videoMaxDurationAtom
 * otherwise set editorVideoIsPlayingAtom to false.
 */
// export const incrementGlobalVideoTimeAtom = atom(null, (get, set, update) => {
//   const newTime = get(globalVideoTimeAtom) + TEASER_VIDEO_REFRESH_RATE_MS;
//   if (newTime < get(videoMaxDurationAtom)) {
//     set(globalVideoTimeAtom, newTime);
//   } else {
//     // Video ended as it went past the time
//     set(editorVideoIsPlayingAtom, false);
//   }
// });

export const timelinePositionAtom = atom(0);

export const readOnlyTimelinePositionAtom = atom((get) =>
  get(timelinePositionAtom),
);

export const writeOnlyTimelinePositionAtom = atom(null, (get, set, update) =>
  set(timelinePositionAtom, update),
);
