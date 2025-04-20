import axios from "axios";
import { getToken } from "./storage";

const instance = axios.create({
  baseURL: "http://192.168.2.83:5209/api",
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
export default instance;
