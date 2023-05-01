import { getPostsFeed } from "../../api/feed/postsFeedApi";
import { PAGINATION_LIMIT } from "../../Constants";

/**
 * Get the queryKey for the home feed.
 * Changes if the user is logged in.
 * @param {*} userAuthAtomValue
 * @param {*} limit
 * @param {*} offset
 * @returns
 */
export function getFeedQueryKey(userAuthAtomValue) {
  return userAuthAtomValue === null
    ? ["posts", "feed", null]
    : ["posts", "feed", userAuthAtomValue.token_hash];
}
