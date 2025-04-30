import { ChildrenEndpoints } from "./endpoints";
import instance from "../api/index";

const tasks = async (taskId) => {
  try {
    const response = await instance.get(ChildrenEndpoints.tasks);
    return response.data;
  } catch (error) {
    console.error("Error fetching child tasks:", error);
    throw error;
  }
};

const taskComplete = async (taskId) => {
  if (!taskId) {
    throw new Error("taskId is required to complete a task.");
  }
  try {
    const endpoint = ChildrenEndpoints.tasksComplete.replace("{id}", taskId);
    const response = await instance.put(endpoint, {});
    return response.data;
  } catch (error) {
    console.error(
      "Error marking task complete:",
      error.response?.data || error.message
    );
    throw error;
  }
};

const getSavingsGoals = async () => {
  try {
    const response = await instance.get(ChildrenEndpoints.getSavingsGoals);
    return response.data;
  } catch (error) {
    console.error("Error fetching savings goals:", error);
    throw error;
  }
};

/* goalInfo is an object containing the goal information
    GoalName - string
    TargetAmount - double
*/
const createSavingsGoals = async (goalInfo, image) => {
  try {
    const formData = new FormData();
    for (key in goalInfo) {
      formData.append(key, goalInfo[key]);
    }
    if (image) {
      formData.append("SavingsGoalPicture", {
        uri: image,
        type: "image/jpeg",
        name: "goal-image.jpg",
      });
    }
    const response = await instance.post(
      ChildrenEndpoints.createSavingsGoal,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating savings goal:", error);
    throw error;
  }
};

const savingsGoalsDeposit = async (goalId, amount) => {
  try {
    const endpoint = ChildrenEndpoints.savingsGoalsDeposit.replace(
      "{id}",
      goalId
    );
    const depositData = {
      amount: amount,
    };
    //console.log("Deposit Data:", depositData);
    //console.log("Deposit Data:", endpoint);
    const response = await instance.post(endpoint, depositData);
    return response.data;
  } catch (error) {
    console.error("Error depositing to savings goal:", error.response.data);
    throw error;
  }
};

const savingsGoalsBreak = async (goalId) => {
  try {
    const endpoint = ChildrenEndpoints.savingsGoalsBreak.replace(
      "{id}",
      goalId
    );
    const response = await instance.post(endpoint);
    return response.data;
  } catch (error) {
    console.error("Error breaking savings goal:", error);
    throw error;
  }
};

export {
  tasks,
  taskComplete,
  getSavingsGoals,
  createSavingsGoals,
  savingsGoalsDeposit,
  savingsGoalsBreak,
};
