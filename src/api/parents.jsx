import axios from 'axios';
import { ParentsEndpoints } from './endpoints';
import instance from "../api/index";
const tasks = async () => {
  try {
    const response = await axios.get(ParentsEndpoints.tasks);
    return response.data;
  } catch (error) {
    console.error('Error fetching parent tasks:', error);
    throw error;
  }
};

const getChildTask = async (childId) => {
  try {
    const endpoint = ParentsEndpoints.getChildTasks.replace('{id}', childId);
    const response = await instance.put(endpoint);
    return response.data;
  } catch (error) {
    console.error('Error marking task complete:', error);
    throw error;
  }
};

/* childData is 
    Email - string
    Password - string
    FirstName - string
    LastName - string
    ProfilePicture - string ($binary)
*/
const createChild = async (childData, image) => {
    try {
        const formData = new FormData();
        for (key in childData) {
            formData.append(key, childData[key]);
          }
      if (imagemage) {
        formData.append('image', {
          uri: image,
          type: 'image/jpeg',
          name: 'child-image.jpg'
        });
      }
      const response = await instance.post(ParentsEndpoints.createChild, formData, {
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
      const response = await instance.post(endpoint, depositData);
      return response.data;
    } catch (error) {
      console.error('Error depositing to child:', error);
      throw error;
    }
  };

  /*
    TaskData is
    TaskName - string
    TaskDescription - string
    TaskPicture - string ($binary)
    RewardReward - double
*/
const createTaskForChild = async (taskData, image) => {
    try {
        const formData = new FormData();
        for (key in taskData) {
            formData.append(key, taskData[key]);
          }
    if (image) {
      formData.append('image', {
        uri: image,
        type: 'image/jpeg',
        name: 'task-image.jpg'
      });
    }
    const response = await instance.post(ParentsEndpoints.createTaskForChild, formData, {
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
    const response = await instance.put(endpoint);
    return response.data;
  } catch (error) {
    console.error('Error verifying task:', error);
    throw error;
  }
};

const getChildSavingsGoals = async (childId) => {
    try {
      const endpoint = ParentsEndpoints.getChildSavingsGoals.replace('{id}', childId);
      const response = await instance.get(endpoint);
      return response.data;
    } catch (error) {
      console.error('Error fetching child savings goals:', error);
      throw error;
    }
  };
export { tasks, getChildTask, createChild, depositToChild, createTaskForChild, verifyTask, getChildSavingsGoals };
