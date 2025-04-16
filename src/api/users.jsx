import axios from 'axios';
import { UsersEndpoints } from './endpoints';

export const balance = async () => {
  try {
    const response = await axios.get(UsersEndpoints.balance);
    return response.data;
  } catch (error) {
    console.error('Error fetching user balance:', error);
    throw error;
  }
};

export const profile = async () => {
  try {
    const response = await axios.get(UsersEndpoints.profile);
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};