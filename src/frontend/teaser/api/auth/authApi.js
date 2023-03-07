import axios from "axios";
import { useQuery, useMutation } from "react-query";
import { BASE_URL } from "../../Constants";
import axiosAPIClient from "../axiosAPIClient";

authApi.defaults.headers.common["Content-Type"] = "application/json";

export const registerUserFunction = async (user) => {
  const response = await axiosAPIClient.post("register", user);
  return response.data;
};

export const loginUserFunction = async (username, password) => {
  const response = await axiosAPIClient.post("login", {
    params: {
      username: username,
      password: password,
    },
  });
  return response.data;
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
