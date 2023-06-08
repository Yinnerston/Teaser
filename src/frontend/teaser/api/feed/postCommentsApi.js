import axiosAPIClient from "../axiosAPIClient";

export function getTopLevelPostComments({ queryKey, pageParam = 1 }) {
  const postID = queryKey[3];
  const response = axiosAPIClient
    .get(`posts/comments/top_level/${postID}?page=${pageParam}&page_size=${5}`)
    .then((res) => res.data);
  return response;
}

export function postPostComment(
  authToken,
  postID,
  commentText,
  commentAncestorId = null,
) {
  const response = axiosAPIClient
    .post(
      "posts/comment",
      {
        post_id: postID,
        comment_text: commentText,
        comment_ancestor_id: commentAncestorId,
      },
      {
        headers: { accept: "*/*", Authorization: `Bearer ${authToken}` },
      },
    )
    .then((res) => res.data)
    .catch(function (error) {
      console.log("error from data :", error.toJSON());
    });
  return response;
}
