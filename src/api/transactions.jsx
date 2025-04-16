import axios from 'axios';
import { TransactionsEndpoints } from './endpoints';

const transactions = async () => {
  try {
    const response = await axios.get(TransactionsEndpoints.Transactions);
    return response.data;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error;
  }
};
export { transactions };
