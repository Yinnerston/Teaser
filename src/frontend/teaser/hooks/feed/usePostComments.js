/**
 * Query key for top level post comments
 * @param {*} postID
 * @returns
 */
export function getTopLevelPostCommentsQueryKey(postID) {
  return ["feed", "postComments", "topLevel", postID];
}

/**
 * Mutation key for post comment mutation
 * TODO: Still need to consider
 * 1. new identifier of comment --> multiple comments can have the same comment
 * 2. comment text
 * @param {*} userAuthAtomValue
 * @param {*} postID
 * @param {*} commentID parent comment. nullable
 * @returns
 */
export function postPostCommentMutationKey(
  userAuthAtomValue,
  postID,
  commentID = null,
) {
  return userAuthAtomValue !== null
    ? [
        "feed",
        "postComments",
        "postCommentMutation",
        userAuthAtomValue.token_hash,
        postID,
        commentID,
      ]
    : ["feed", "postComments", "mutation", null, postID, commentID];
}

export function postLikePostCommentKey(userAuthAtomValue, postID, commentID) {
  return userAuthAtomValue !== null
    ? [
        "feed",
        "postComments",
        "likeCommentMutation",
        userAuthAtomValue.token_hash,
        postID,
        commentID,
      ]
    : ["feed", "postComments", "mutation", null, postID, commentID];
}
// TODO: replies query key
// TODO: Reply mutation key
