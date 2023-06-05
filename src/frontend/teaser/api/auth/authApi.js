import axiosAPIClient from "../axiosAPIClient";

// axiosAPIClient.defaults.headers.common["Content-Type"] = "application/json";

/**
 * Register user to server
 * @param {username, phone, password, dob, terms_of_service_accepted} props
 * @returns
 */
export const registerUserFunction = async ({
  username,
  phone,
  password,
  dob,
  terms_of_service_accepted,
}) => {
  try {
    const response = await axiosAPIClient.post("register", {
      username: username,
      phone: phone,
      password: password,
      dob: dob,
      terms_of_service_accepted: terms_of_service_accepted,
    });
    return { status: response.status, data: response.data };
  } catch (error) {
    console.error(error);
    return { status: error.response.status, data: error.response.data.message };
  }
};

/**
 * Login user to server
 * @param {username, password} props
 * @returns
 */
export const loginUserFunction = async ({ username, password }) => {
  try {
    const response = await axiosAPIClient.post("login", {
      username: username,
      password: password,
    });
    return { status: response.status, data: response.data };
  } catch (error) {
    console.error(error);
    return { status: error.response.status, data: error.response.data.message };
  }
};

/**
 * TODO: Unused Pair token
 * @param {*} user
 * @returns
 */
export const tokenPairFunction = async (user) => {
  const response = await axiosAPIClient.post("token/pair", user);
  return response.data;
};

/**
 * TODO: Unused Refresh token
 * @param {*} token
 * @returns
 */
export const tokenRefreshFunction = async (token) => {
  const response = await axiosAPIClient.post("token/refresh", token);
  return response.data;
};

/**
 * TODO: Unused Verify token
 * @param {*} token
 * @returns
 */
export const tokenVerifyFunction = async (token) => {
  const response = await axiosAPIClient.post("token/verify", token);
  return response.data;
};

/**
 * Logout user from server
 * @param authToken string token hash representation
 * @returns
 */
export const logoutUserFunction = async (authToken) => {
  try {
    const response = await axiosAPIClient.post(
      "logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      },
    );
    return { status: response.status, data: response.data };
  } catch (error) {
    console.error(error);
    return { status: error.response.status, data: error.response.data.message };
  }
};
