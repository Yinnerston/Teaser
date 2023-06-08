import axiosAPIClient from "../axiosAPIClient";

export function getTopLevelPostComments({ queryKey, pageParam = 1 }) {
  const postID = queryKey[3];
  const response = axiosAPIClient
    .get(`posts/comments/top_level/${postID}?page=${pageParam}&page_size=${5}`)
    .then((res) => res.data);
  return response;
}
