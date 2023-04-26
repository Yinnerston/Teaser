import { atom, useAtom, useSetAtom } from "jotai";
import * as SecureStore from "expo-secure-store";

export const userAuthAtom = atom("");
export const readOnlyUserAuthAtom = atom((get) => get(userAuthAtom));
export const writeOnlyUserAuthAtom = atom(
  null, // Cannot get the userAuthAtom
  (_get, set, update) => {
    // Set value of userAuthAtom
    set(userAuthAtom, update);
    // Set value in SecureStore
  },
);

/**
 * Write auth data to secure store.
 * Need to set userAuthAtom in the caller.
 * @param {*} data
 */
export async function setUserAuthStore(data) {
  await SecureStore.setItemAsync("auth", data);
}

/**
 * Set user auth from secure store if it exists
 */
export async function setUserAuthFromStore() {
  const setWriteUserAuth = useSetAtom(writeOnlyUserAuthAtom);
  let result = await SecureStore.getItemAsync("auth");
  if (result) {
    let parsed_result = JSON.parse(result);
    setWriteUserAuth(parsed_result);
  }
}

/**
 * Clears the user auth data in the store.
 * Need to set userAuthAtom in the caller.
 */
export async function clearUserAuth() {
  await SecureStore.deleteItemAsync("auth");
}

export const userTCAcceptedAtom = atom(false);

/**
 * Client State atom that is set to true if user just completed registration.
 */
export const isLoginAfterRegisterAtom = atom(false);
