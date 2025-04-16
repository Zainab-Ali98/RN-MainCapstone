import axios from 'axios';
import { UsersEndpoints } from './endpoints';

// Get user's balance
export const getUserBalance = async () => {
  try {
    const response = await axios.get(UsersEndpoints.balance);
    return response.data;
  } catch (error) {
    console.error('Error fetching user balance:', error);
    throw error;
  }
};

// Get user's profile
export const getUserProfile = async () => {
  try {
    const response = await axios.get(UsersEndpoints.profile);
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};
