import { RewardsEndpoints } from './endpoints';
import instance from "../api/index";

const rewards = async () => {
  try {
    const response = await instance.get(RewardsEndpoints.rewards);
    console.log("rewards",response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching rewards:', error);
    throw error;
  }
};

const createReward = async (rewardData) => {
  try {
    const response = await instance.post(RewardsEndpoints.create, rewardData);
    return response.data;
  } catch (error) {
    console.error('Error creating reward:', error);
    throw error;
  }
};

const redeemReward = async (rewardId) => {
  try {
    const endpoint = RewardsEndpoints.redeem.replace('{id}', rewardId);
    const response = await instance.post(endpoint);
    return response.data;
  } catch (error) {
    console.error('Error redeeming reward:', error);
    throw error;
  }
};

const convertPoints = async (points) => {
  try {
    const response = await instance.post(RewardsEndpoints.convertPoints, { points });
    return response.data;
  } catch (error) {
    console.error('Error converting points:', error);
    throw error;
  }
};

export { rewards, createReward, redeemReward, convertPoints }; 