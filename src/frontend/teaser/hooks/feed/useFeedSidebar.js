export function getLikePostMutationKey(userAuthAtomValue, post_id) {
  return userAuthAtomValue === null
    ? ["feed", "like_post", null, post_id]
    : ["feed", "like_post", userAuthAtomValue.token_hash, post_id];
}

export function getBookmarkPostMutationKey(userAuthAtomValue, post_id) {
  return userAuthAtomValue === null
    ? ["feed", "bookmark_post", null, post_id]
    : ["feed", "bookmark_post", userAuthAtomValue.token_hash, post_id];
}
