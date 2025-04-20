import axios from 'axios';
import { UsersEndpoints } from './endpoints';
import instance from "../api/index";
export const balance = async () => {
  try {
    const response = await instance.get(UsersEndpoints.balance);
    return response.data;
  } catch (error) {
    console.error('Error fetching user balance:', error);
    throw error;
  }
};

export const profile = async () => {
  try {
    const response = await instance.get(UsersEndpoints.profile);
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};