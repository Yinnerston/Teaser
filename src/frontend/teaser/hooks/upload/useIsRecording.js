import { atom, useAtom, useSetAtom } from "jotai";

export const isRecordingAtom = atom(false);
export const readOnlyIsRecordingAtom = atom((get) => get(isRecordingAtom));
// Flip the boolean of isRecording
export const writeOnlyIsRecordingAtomAtom = atom(
  null, // Cannot get the userAuthAtom
  (_get, set, update) => {
    // Set value of userAuthAtom
    set(isRecordingAtom, (current) => !current);
    // Set value in SecureStore
  },
);
