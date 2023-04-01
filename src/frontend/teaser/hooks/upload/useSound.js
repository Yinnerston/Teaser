import { atom } from "jotai";

export const editorSoundAtom = atom(null);

export const editorHasAddedSoundAtomAtom = atom(
  (get) => get(editorSoundAtom) != null,
);
