import axiosAPIClient from "../axiosAPIClient";

export function getPostsFeed({ queryKey }) {
  const token_hash = queryKey[2];
  const limit = queryKey[3];
  const offset = queryKey[4];
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
    .get(`posts/feed?limit=${limit}&offset=${offset}`)
    .then((res) => res.data);
  return response;
}
