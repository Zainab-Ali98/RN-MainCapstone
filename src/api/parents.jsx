import axios from "axios";
import { ParentsEndpoints } from "./endpoints";
import instance from "../api/index";

const getTasks = async () => {
  try {
    const response = await instance.get(ParentsEndpoints.tasks);
    //console.log("Tasks:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching parent tasks:", error);
    throw error;
  }
};
const getChildren = async () => {
  try {
    const response = await instance.get(ParentsEndpoints.getChildren);
    //console.log("Children:", response.data);
    return response.data; // Array of { childId, firstName, lastName, childAccountId, balance }
  } catch (error) {
    if (error.response) {
      console.error("Error fetching children:", {
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data,
        message: error.message,
      });
    } else if (error.request) {
      console.error("Network Error fetching children:", {
        message: error.message,
        request: error.request,
      });
    } else {
      console.error("Error setting up children request:", {
        message: error.message,
      });
    }
    throw {
      message: error.message,
      status: error.response?.status || null,
      statusText: error.response?.statusText || null,
      data: error.response?.data || null,
    };
  }
};
const getChildTask = async (childId) => {
  try {
    const endpoint = ParentsEndpoints.getChildTasks.replace("{id}", childId);
    const response = await instance.get(endpoint);
    return response.data;
  } catch (error) {
    console.error("Error marking task complete:", error);
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
    if (image) {
      formData.append("image", {
        uri: image,
        type: "image/jpeg",
        name: "child-image.jpg",
      });
    }
    const response = await instance.post(
      ParentsEndpoints.createChild,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating child:", error.message, error.response.data);
    throw error;
  }
};

const depositToChild = async (childId, depositData) => {
  try {
    const endpoint = ParentsEndpoints.depositToChild.replace("{id}", childId);
    // const depositData = {
    //   amount: amount,
    // };
    //console.log("Deposit Data:", depositData);
    //console.log("Endpoint:", endpoint);
    const response = await instance.post(endpoint, depositData);
    return response.data;
  } catch (error) {
    console.error("Error depositing to child:", error);
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
    //console.log("Image", image);
    const formData = new FormData();
    for (key in taskData) {
      formData.append(key, taskData[key]);
    }
    if (image) {
      formData.append("taskPicture", {
        uri: image,
        type: "image/jpeg",
        name: "task-image.jpg",
      });
    }
    const response = await instance.post(
      ParentsEndpoints.createTaskForChild,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};

const verifyTask = async (taskId, verifyData) => {
  try {
    const endpoint = ParentsEndpoints.tasksVerify.replace("{id}", taskId);
    //console.log("Verify Data:", verifyData);
    const response = await instance.put(endpoint, verifyData);
    return response.data;
  } catch (error) {
    console.error("Error verifying task:", error);
    throw error;
  }
};

const getChildSavingsGoals = async (childId) => {
  try {
    const endpoint = ParentsEndpoints.getChildSavingsGoals.replace(
      "{id}",
      childId
    );
    const response = await instance.get(endpoint);
    return response.data;
  } catch (error) {
    console.error("Error fetching child savings goals:", error);
    throw error;
  }
};
export {
  getTasks,
  getChildren,
  getChildTask,
  createChild,
  depositToChild,
  createTaskForChild,
  verifyTask,
  getChildSavingsGoals,
};
