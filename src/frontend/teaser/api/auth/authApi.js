import axios from "axios";
import { useQuery, useMutation } from "react-query";
import { BASE_URL } from "../../Constants";
import axiosAPIClient from "../axiosAPIClient";

// axiosAPIClient.defaults.headers.common["Content-Type"] = "application/json";

export const registerUserFunction = async ({
  username,
  email,
  phone,
  password,
  dob,
  terms_of_service_accepted,
}) => {
  var status_code;
  try {
    const response = await axiosAPIClient.post("register", {
      username: username,
      email: email,
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

export const loginUserFunction = async (username, password) => {
  console.log("LOGIN");
  var statusCode = 200;
  var data;
  try {
    const response = await axiosAPIClient.post("login", {
      params: {
        username: username,
        password: password,
      },
    });
    data = response.data;
  } catch (error) {
    console.log("LOGIN ERROR: ", error);
    statusCode = 400;
    data = error.message;
  }
  return { statusCode, data };
};

export const tokenPairFunction = async (user) => {
  const response = await axiosAPIClient.post("token/pair", user);
  return response.data;
};

export const tokenRefreshFunction = async (token) => {
  const response = await axiosAPIClient.post("token/refresh", token);
  return response.data;
};

export const tokenVerifyFunction = async (token) => {
  const response = await axiosAPIClient.post("token/verify", token);
  return response.data;
};
