import axios from 'axios';
import { ChildrenEndpoints } from './endpoints';

const tasks = async () => {
  try {
    const response = await axios.get(ChildrenEndpoints.tasks);
    return response.data;
  } catch (error) {
    console.error('Error fetching child tasks:', error);
    throw error;
  }
};

const taskComplete = async (taskId) => {
  try {
    const endpoint = ChildrenEndpoints.tasksComplete.replace('{id}', taskId);
    const response = await axios.put(endpoint);
    return response.data;
  } catch (error) {
    console.error('Error marking task complete:', error);
    throw error;
  }
};

const getSavingsGoals = async () => {
  try {
    const response = await axios.get(ChildrenEndpoints.savingsGoals);
    return response.data;
  } catch (error) {
    console.error('Error fetching savings goals:', error);
    throw error;
  }
};

const CreateSavingsGoals = async (goalInfo, image) => {
  try {
    const formData = new FormData();
    formData.append('goalInfo', JSON.stringify(goalInfo));
    if (Image) {
      formData.append('image', {
        uri: image,
        type: 'image/jpeg',
        name: 'goal-image.jpg'
      });
    }
    const response = await axios.post(ChildrenEndpoints.savingsGoals, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating savings goal:', error);
    throw error;
  }
};

const savingsGoalsDeposit = async (goalId, depositData) => {
  try {
    const endpoint = ChildrenEndpoints.savingsGoalsDeposit.replace('{id}', goalId);
    const response = await axios.post(endpoint, depositData);
    return response.data;
  } catch (error) {
    console.error('Error depositing to savings goal:', error);
    throw error;
  }
};

const savingsGoalsBreak = async (goalId) => {
  try {
    const endpoint = ChildrenEndpoints.savingsGoalsBreak.replace('{id}', goalId);
    const response = await axios.post(endpoint);
    return response.data;
  } catch (error) {
    console.error('Error breaking savings goal:', error);
    throw error;
  }
}

export { tasks, taskComplete, getSavingsGoals, CreateSavingsGoals, savingsGoalsDeposit, savingsGoalsBreak };
