import axios, { HeadersDefaults } from "axios";
import { BASE_URL } from "../Constants";

const axiosAPIClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    accept: "application/json",
    "Content-Type": "application/json",
  },
});

// TODO: Use global state manager to set this?
// axiosAPIClient.defaults.headers.common["Authorization"] = "";

export default axiosAPIClient;
