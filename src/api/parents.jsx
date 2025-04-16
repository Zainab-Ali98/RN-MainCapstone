import axios from 'axios';
import { ParentsEndpoints } from './endpoints';

const tasks = async () => {
  try {
    const response = await axios.get(ParentsEndpoints.tasks);
    return response.data;
  } catch (error) {
    console.error('Error fetching parent tasks:', error);
    throw error;
  }
};

const getTask = async (childId) => {
  try {
    const endpoint = ParentsEndpoints.tasksComplete.replace('{id}', childId);
    const response = await axios.put(endpoint);
    return response.data;
  } catch (error) {
    console.error('Error marking task complete:', error);
    throw error;
  }
};

const createChild = async (childData, Image) => {
    try {
      const formData = new FormData();
      formData.append('childData', JSON.stringify(childData));
      if (Image) {
        formData.append('image', {
          uri: Image,
          type: 'image/jpeg',
          name: 'child-image.jpg'
        });
      }
      const response = await axios.post(ParentsEndpoints.createChild, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating child:', error);
      throw error;
    }
  };

const depositToChild = async (childId, depositData) => {
    try {
      const endpoint = ParentsEndpoints.depositToChild.replace('{id}', childId);
      const response = await axios.post(endpoint, depositData);
      return response.data;
    } catch (error) {
      console.error('Error depositing to child:', error);
      throw error;
    }
  };

const createTask = async (taskData, Image) => {
  try {
    const formData = new FormData();
    formData.append('taskData', JSON.stringify(taskData));
    if (Image) {
      formData.append('image', {
        uri: Image,
        type: 'image/jpeg',
        name: 'task-image.jpg'
      });
    }
    const response = await axios.post(ParentsEndpoints.createTask, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
};

const verifyTask = async (taskId) => {
  try {
    const endpoint = ParentsEndpoints.tasksVerify.replace('{id}', taskId);
    const response = await axios.put(endpoint);
    return response.data;
  } catch (error) {
    console.error('Error verifying task:', error);
    throw error;
  }
};

const getSavingsGoals = async (childId) => {
    try {
      const endpoint = ParentsEndpoints.savingsGoals.replace('{id}', childId);
      const response = await axios.get(endpoint);
      return response.data;
    } catch (error) {
      console.error('Error fetching child savings goals:', error);
      throw error;
    }
  };
export { tasks, getTask, createChild, depositToChild, createTask, verifyTask, getSavingsGoals };
