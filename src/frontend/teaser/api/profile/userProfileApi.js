import axiosAPIClient from "../axiosAPIClient";

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
