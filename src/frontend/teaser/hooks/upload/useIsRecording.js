import { atom, useAtom, useSetAtom } from "jotai";

export const isRecordingAtom = atom(false);
export const readOnlyIsRecordingAtom = atom((get) => get(isRecordingAtom));
export const writeOnlyIsRecordingAtomAtom = atom(
  null, // Cannot get the userAuthAtom
  (_get, set, update) => {
    // Set value of userAuthAtom
    set(isRecordingAtom, update);
    // Set value in SecureStore
  },
);
