import axiosAPIClient from "../axiosAPIClient";

/**
 * TODO: Set user interests
 * @param {*} interests
 */
export async function setUserInterests(authToken, interests) {
  try {
    const response = await axiosAPIClient.post(
      "users/categories",
      {
        categories: interests,
      },
      {
        headers: { Authorization: `Bearer ${authToken}` },
      },
    );
    return { status: response.status };
  } catch (error) {
    console.error(error);
    return { status: error.response.status, data: error.response.data.message };
  }
}
