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
export function getFeedQueryKey(userAuthAtomValue, limit, offset) {
  return userAuthAtomValue === null
    ? ["posts", "feed", null, limit, offset]
    : ["posts", "feed", userAuthAtomValue.token_hash, limit, offset];
}

/**
 * Prefetch a feed
 * @param {*} queryClient
 * @param {*} userAuthAtomValue
 */
export async function prefetchFeed(queryClient, userAuthAtomValue) {
  await queryClient.prefetchInfiniteQuery({
    queryKey: getFeedQueryKey(userAuthAtomValue, PAGINATION_LIMIT, 0),
    queryFn: getPostsFeed,
    getNextPageParam: (lastPage, allPages) =>
      lastPage?.items.length < PAGINATION_LIMIT ? undefined : 2, // TODO: implement cursor page number in backend
  });
}
