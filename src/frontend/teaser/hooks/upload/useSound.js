import { atom } from "jotai";
import { msToWidth } from "../../utils/videoTimelineWidth";
import { Audio } from "expo-av";

class SoundClip {
  constructor(id, title, sound, author, thumbnail) {
    this.key = id; // no overlap with video q node?
    this.title = title;
    this.sound = sound;
    this.author = author;
    this.thumbnail = thumbnail;
    this.startTimeMs = 0;
    // Variables to reduce computation
    this.startTimeWidth = 0;
    this.endTimeMs = 0;
    this.endTimeWidth = 0;
    this.durationWidth = msToWidth(sound.duration); // TODO: Max width vs video after crop (this)
    this.soundRef = null;
    this.createSoundAsync();
  }

  async handlePlaybackStatusUpdate(status) {
    if (status.isLoaded) {
      if (status.didJustFinish) {
        console.log("FINISHED");
      }
    }
  }

  async createSoundAsync() {
    const { sound } = await Audio.Sound.createAsync(
      { uri: this.sound.url },
      { shouldPlay: false },
      this.handlePlaybackStatusUpdate,
      true,
    );
    this.soundRef = sound;
  }

  async seekToOffsetPositionAsync(ms) {
    let msOffset = ms - this.startTimeMs;
    if (this.soundRef != null) {
      this.soundRef.setPositionAsync(msOffset);
    }
  }

  setStartTimeMs(ms) {
    if (ms > 0) {
      ms = ms + 1; // Add 0.1ms offset from the prev video
    }
    this.startTimeMs = ms;
    this.startTimeWidth = msToWidth(ms);
    let endTimeMs = this.startTimeMs + this.sound.duration;
    this.endTimeMs = endTimeMs;
    this.endTimeWidth = msToWidth(endTimeMs);
    // TODO: Check if enqueued atom exceeds the maximum duration of a video?
  }
  // TODO: change the duration of a sound clip
}

const _editorSoundAtom = atom(null);

export const readOnlyEditorSoundAtomAtom = atom((get) => get(_editorSoundAtom));

export const writeOnlyEditorSoundAtomAtom = atom(null, (get, set, update) => {
  const { id, title, sound, author, thumbnail } = update;
  let newSoundClip = new SoundClip(id, title, sound, author, thumbnail);
  set(_editorSoundAtom, newSoundClip);
});

export const readWriteEditorSoundAtomAtom = atom(
  (get) => get(_editorSoundAtom),
  (get, set, update) => {
    let newSoundClip = new SoundClip(update);
    set(_editorSoundAtom, newSoundClip);
  },
);

export const editorSoundIsSetAtomAtom = atom(
  (get) => get(_editorSoundAtom) != null,
);
