import axios, { HeadersDefaults } from "axios";
import { BASE_URL } from "../Constants";

const axiosAPIClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// TODO: Use global state manager to set this?
// axiosAPIClient.defaults.headers.common["Authorization"] = "";

export default axiosAPIClient;
