import axiosAPIClient from "../axiosAPIClient";
import { PAGINATION_LIMIT } from "../../Constants";
export async function getUserProfile(token_hash) {
  const response = await axiosAPIClient.get("users/profile", {
    headers: {
      accept: "*/*",
      Authorization: `Bearer ${token_hash}`,
    },
  });
  return response.data;
}

export async function getUserProfileFromUsername(username) {
  const response = await axiosAPIClient.get(`users/${username}/profile`, {
    headers: {
      accept: "*/*",
    },
  });
  return response.data;
}

export async function getUserProfilePostsFromUsername(
  _token_hash,
  username,
  pageParam,
) {
  const response = await axiosAPIClient.get(
    `posts/users/${username}?page=${pageParam}&page_size=${PAGINATION_LIMIT}`,
    {
      headers: {
        accept: "*/*",
      },
    },
  );
  return response.data;
}

export async function getOwnUserProfilePosts(token_hash, pageParam) {
  const response = await axiosAPIClient.get(
    `posts/self?page=${pageParam}&page_size=${PAGINATION_LIMIT}`,
    {
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token_hash}`,
      },
    },
  );
  return response.data;
}
