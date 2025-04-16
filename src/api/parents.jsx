import axios from 'axios';
import { ParentsEndpoints } from './endpoints';

// Get parent's tasks
export const getParentTasks = async () => {
  try {
    const response = await axios.get(ParentsEndpoints.tasks);
    return response.data;
  } catch (error) {
    console.error('Error fetching parent tasks:', error);
    throw error;
  }
};

// Mark task as complete
export const markTaskComplete = async (taskId) => {
  try {
    const endpoint = ParentsEndpoints.tasksComplete.replace('{id}', taskId);
    const response = await axios.put(endpoint);
    return response.data;
  } catch (error) {
    console.error('Error marking task complete:', error);
    throw error;
  }
};

// Create a new child
export const createChild = async (childData, Image) => {
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

// Deposit money to child
export const depositToChild = async (childId, depositData) => {
  try {
    const endpoint = ParentsEndpoints.depositToChild.replace('{id}', childId);
    const response = await axios.post(endpoint, depositData);
    return response.data;
  } catch (error) {
    console.error('Error depositing to child:', error);
    throw error;
  }
};

// Create a new task
export const createTask = async (taskData, Image) => {
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

// Verify a task
export const verifyTask = async (taskId) => {
  try {
    const endpoint = ParentsEndpoints.tasksVerify.replace('{id}', taskId);
    const response = await axios.put(endpoint);
    return response.data;
  } catch (error) {
    console.error('Error verifying task:', error);
    throw error;
  }
};

// Get child's savings goals
export const getChildSavingsGoals = async (childId) => {
  try {
    const endpoint = ParentsEndpoints.savingsGoals.replace('{id}', childId);
    const response = await axios.get(endpoint);
    return response.data;
  } catch (error) {
    console.error('Error fetching child savings goals:', error);
    throw error;
  }
};
