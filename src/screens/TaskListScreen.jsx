import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "react-native-image-picker";
import Logout from "../components/Logout";
import { useQuery, useMutation } from "@tanstack/react-query";
import { tasks, taskComplete } from "../api/children";
import UserContext from "../context/UserContext";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

// const mockTasks = [
//   {
//     id: "1",
//     title: "Complete homework",
//     reward: "5.00",
//     dueDate: "Today",
//     statusStep: 2, 
//     requiresPhoto: true,
//     verified: false,
//     points: 100,
//   },
//   {
//     id: "2",
//     title: "Clean your room",
//     reward: "3.00",
//     dueDate: "Tomorrow",
//     statusStep: 1,
//     requiresPhoto: true,
//     verified: false,
//     points: 75,
//   },
//   {
//     id: "3",
//     title: "Help with dishes",
//     reward: "4.00",
//     dueDate: "Today",
//     statusStep: 0,
//     requiresPhoto: false,
//     verified: false,
//     points: 50,
//   },
// ];

const statusSteps = ["Start", "Doing", "Verified", "Done"];

const TaskListScreen = () => {
  const navigation = useNavigation();
  const { isAuth } = useContext(UserContext);
  const [selectedTask, setSelectedTask] = useState(null);
  const [error, setError] = useState(null);

  const { data: tasksData, isLoading, refetch } = useQuery({
    queryKey: ["tasks"],
    queryFn: tasks,
    enabled: !!isAuth,
  });

  const { mutate: updateTaskStatus } = useMutation({
    mutationKey: ["updateTaskStatus"],
    mutationFn: taskComplete,
    onSuccess: () => {
      refetch();
      Alert.alert("Success", "Task status updated successfully");
    },
    onError: (error) => {
      setError(error.message || "Failed to update task status");
      console.error("Error updating task status:", error);
    },
  });

  const handleTaskListPress = (task) => {
    navigation.navigate("ViewTaskScreen", { task });
  };

  const handleRewardsPress = () => {
    navigation.navigate("Reward");
  };

  const handleImagePick = async (taskId) => {
    try {
      const response = await ImagePicker.launchImageLibrary({
        mediaType: "photo",
        includeBase64: false,
        maxHeight: 2000,
        maxWidth: 2000,
      });

      if (response.didCancel) return;
      
      updateTaskStatus(taskId);
      Alert.alert("Great job", "Photo uploaded! Waiting for parent to check.");
    } catch (error) {
      console.error("Image picker error:", error);
      Alert.alert("Oops!", "Something went wrong. Try again?");
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4D5DFA" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity onPress={() => refetch()}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Logout />
      <Image
        source={require("../../assets/background.png")}
        style={styles.backgroundImage}
        resizeMode="cover"
      />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <View style={styles.headerSection}>
            <Text style={styles.title}>My Missions</Text>
            <View style={styles.pointsContainer}>
              <Text style={styles.pointsLabel}>Total Points:</Text>
              <Text style={styles.pointsValue}>225</Text>
            </View>
          </View>

          <View style={styles.mainContent}>
            {tasksData?.map((task) => (
              <TouchableOpacity
                key={task.taskId}
                style={[
                  styles.taskItem,
                  selectedTask === task.taskId && styles.selectedTask,
                ]}
                onPress={() => handleTaskListPress(task)}
              >
                <View style={styles.taskHeader}>
                  <Text style={styles.taskName}>{task.taskName}</Text>
                  <Text style={styles.taskReward}>{task.rewardAmount} kd</Text>
                </View>
                <Text style={styles.taskDescription} numberOfLines={2}>
                  {task.taskDescription}
                </Text>
                <View style={styles.taskFooter}>
                  <Text style={styles.taskStatus}>
                    Status: {task.status || "Pending"}
                  </Text>
                  {task.status === "Pending" && (
                    <TouchableOpacity
                      style={styles.uploadButton}
                      onPress={() => handleImagePick(task.taskId)}
                    >
                      <Text style={styles.uploadButtonText}>Upload Photo</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.buttonSection}>
            <Image
              source={require("../../assets/purple.png")}
              style={styles.bearImage}
              resizeMode="contain"
            />
            <TouchableOpacity
              style={[styles.button, !selectedTask && styles.buttonDisabled]}
              disabled={!selectedTask}
              onPress={handleRewardsPress}
            >
              <Text style={styles.buttonText}>Complete Mission</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ffffff" },
  backgroundImage: {
    position: "absolute",
    width: width,
    height: height * 0.5,
    top: 0,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  title: {
    color: "#ffffff",
    fontSize: 28,
    fontWeight: "800",
    letterSpacing: 1,
  },
  pointsContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    padding: 10,
    borderRadius: 12,
    alignItems: "center",
  },
  pointsLabel: {
    color: "#ffffff",
    fontSize: 12,
    marginBottom: 4,
  },
  pointsValue: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
  mainContent: {
    gap: 15,
  },
  taskItem: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedTask: {
    borderColor: "#4D5DFA",
    borderWidth: 2,
  },
  taskHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  taskName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
  },
  taskReward: {
    fontSize: 16,
    color: "#4D5DFA",
    fontWeight: "600",
  },
  taskDescription: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 10,
  },
  taskFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  taskStatus: {
    fontSize: 14,
    color: "#666666",
  },
  uploadButton: {
    backgroundColor: "#4D5DFA",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
  },
  uploadButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "500",
  },
  buttonSection: {
    marginTop: 30,
    alignItems: "center",
  },
  bearImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#4D5DFA",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    width: "100%",
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#cccccc",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  retryText: {
    color: "#4D5DFA",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default TaskListScreen;
