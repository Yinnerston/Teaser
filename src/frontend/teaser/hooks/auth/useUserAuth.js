import { atom } from "jotai";

export const userAuthAtom = atom("");
export const readOnlyUserAuthAtom = atom((get) => get(userAuthAtom));
export const writeOnlyUserAuthAtom = atom(
  null, // Cannot get the userAuthAtom
  (_get, set, update) => {
    // Set value of userAuthAtom
    set(userAuthAtom, update);
  },
);
