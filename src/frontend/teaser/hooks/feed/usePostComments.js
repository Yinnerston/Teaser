/**
 * Query key for top level post comments
 * @param {*} postID
 * @returns
 */
export function getTopLevelPostCommentsQueryKey(postID) {
  return ["feed", "postComments", "topLevel", postID];
}

// TODO: replies query key
// TODO: Reply mutation key
