import axios from "axios";
import { UsersEndpoints } from "./endpoints";
import instance from ".";

export const balance = async () => {
  try {
    const response = await instance.get(UsersEndpoints.balance);
    console.log("User balance:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching user balance:", error);
    throw error;
  }
};

export const profile = async () => {
  try {
    const response = await axios.get(UsersEndpoints.profile);
    return response.data;
  } catch (error) {
    console.error("Error fetching user profile:", error.response.status);
    throw error;
  }
};
