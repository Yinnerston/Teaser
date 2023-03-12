import { atom, useAtom } from "jotai";
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
  const [_writeUserAuth, setWriteUserAuth] = useAtom(writeOnlyUserAuthAtom);
  let result = await SecureStore.getItemAsync("auth");
  if (result) {
    let parsed_result = JSON.parse(result);
    setWriteUserAuth(parsed_result);
  }
  console.log("AUTH" + parsed_result);
}

/**
 * Clears the user auth data in the store.
 * Need to set userAuthAtom in the caller.
 */
export async function clearUserAuth() {
  await SecureStore.deleteItemAsync("auth");
}
