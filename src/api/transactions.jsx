import axios from 'axios';
import { TransactionsEndpoints } from './endpoints';
import instance from "../api/index";

const transactions = async () => {
  try {
    const response = await instance.get(TransactionsEndpoints.Transactions);
    return response.data;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error;
  }
};
export { transactions };

