import axios from "axios";
import { getToken } from "./storage";

const baseURL = "http://192.168.1.180:5209/";
const instance = axios.create({
  baseURL: `${baseURL}api/`,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { baseURL };
export default instance;
