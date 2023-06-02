import axiosAPIClient from "../axiosAPIClient";
import { PAGINATION_LIMIT } from "../../Constants";
export function getPostsFeed({ queryKey, pageParam = 1 }) {
  const token_hash = queryKey[2];
  // TODO: queryKey is defined as length == 3 if logged in otherwise 2? ==> ["posts", "feed", token_hash === queryKey[2]]
  // if (userAuthAtomValue != null)  {   // get general feed
  //     const response = await axiosAPIClient.get("posts/feed",)
  //     return response.data;
  // } else  {   // TODO: get personalised feed
  //     const response = await axiosAPIClient.get("posts/forYouFeed", {
  //         Authorization: `Bearer ${userAuthAtomValue.token_hash}`,
  //       },)
  //     return response.data;
  // }
  const response = axiosAPIClient
    .get(`posts/feed?page=${pageParam}&page_size=${PAGINATION_LIMIT}`)
    .then((res) => res.data);
  return response;
}

export function likePost(authToken, postID) {
  const response = axiosAPIClient
    .post(
      "posts/like",
      {
        post_id: postID,
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

export function bookmarkPost(authToken, postID) {
  const response = axiosAPIClient
    .post(
      "posts/bookmark",
      {
        post_id: postID,
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
