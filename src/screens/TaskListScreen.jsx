import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as ImagePicker from "react-native-image-picker";
import { useQuery, useMutation } from "@tanstack/react-query";
import { tasks, taskComplete } from "../api/children";
import { balance } from "../api/users";
import UserContext from "../context/UserContext";
import { LinearGradient } from "expo-linear-gradient";
import LottieView from "lottie-react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

const { width } = Dimensions.get("window");

const TaskListScreen = ({ navigation }) => {
  const [selectedTask, setSelectedTask] = useState(null);
  const fadeAnim = useSharedValue(0.2);
  const scaleAnim = useSharedValue(0.9);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: fadeAnim.value,
      transform: [{ scale: scaleAnim.value }],
    };
  });

  useEffect(() => {
    fadeAnim.value = withTiming(1, { duration: 800 });
    scaleAnim.value = withTiming(1, { duration: 800 });
  }, []);

  const { isAuth } = useContext(UserContext);
  const [error, setError] = useState(null);

  const { data: balanceData, isLoading: isLoadingBalance } = useQuery({
    queryKey: ["balance"],
    queryFn: balance,
    enabled: !!isAuth,
  });

  const { data: tasksData, isLoading, refetch } = useQuery({
    queryKey: ["tasks"],
    queryFn: tasks,
    enabled: !!isAuth,
    onSuccess: (data) => {
      console.log("Tasks fetched successfully:", data);
    },
    onError: (error) => {
      setError(error.message || "Failed to fetch tasks");
      console.error("Error fetching tasks:", error);
    },
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

  console.log("tasks", tasksData);

  const sortedTasks = tasksData
    ?.filter((task) => task.status.toLowerCase() === "ongoing") // Filter tasks with status "Ongoing"
    .sort((a, b) => b.taskId - a.taskId); // Sort by taskId in descending order

  return (
    <LinearGradient
      colors={["#F5E6D3", "#E2E8F0", "#E9D8FD"]}
      style={styles.container}
    >
      <View style={styles.content}>
        {/* Balance Card */}
        <TouchableOpacity
          style={styles.balanceCardContainer}
          onPress={() => navigation.navigate("CurrentBalanceScreen")}
        >
          <View style={styles.balanceCard}>
            <View style={styles.balanceLeft}>
              <Text style={styles.balanceLabel}>Total Balance</Text>
              <View style={styles.amountContainer}>
                <Text style={styles.currencySymbol}>KWD</Text>
                <Text style={styles.balanceAmount}>
                  {isLoadingBalance ? "Loading..." : balanceData?.balance || "0.00"}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>

        {/* Mission Title */}
        <View style={styles.missionTitleContainer}>
          <Text style={styles.missionTitle}>Your Amazing Missions</Text>
        </View>

        {/* Task Cards */}
        <View style={styles.taskCardsContainer}>
          {isLoading ? (
            <Text>Loading tasks...</Text>
          ) : error ? (
            <Text style={styles.errorText}>Error: {error}</Text>
          ) : sortedTasks && sortedTasks.length > 0 ? (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalScrollContent}
            >
              {sortedTasks.map((task, index) => (
                <Animated.View
                  key={index}
                  style={[styles.taskCardWrapper, animatedStyle]}
                >
                  <TouchableOpacity
                    style={[
                      styles.taskCard,
                      { backgroundColor: getRandomColor() },
                      selectedTask === task.taskId && styles.selectedTask,
                    ]}
                    onPress={() =>
                      navigation.navigate("ViewTaskScreen", { taskId: task.taskId })
                    }
                  >
                    <View style={styles.bubbleTop} />
                    <View style={styles.taskCardContent}>
                      <View style={styles.taskHeader}>
                        <LottieView
                          source={require("../../assets/Exercise Character.json")}
                          autoPlay
                          loop
                          style={styles.taskAnimation}
                        />
                        <Text style={styles.taskTitle}>{task.taskName}</Text>
                      </View>
                      <View style={styles.taskFooter}>
                        <View style={styles.pointsBadge}>
                          <Text style={styles.pointsText}>
                            +{task.taskPoints} 3yali Points
                          </Text>
                        </View>
                        <View style={styles.rewardContainer}>
                          <Text style={styles.rewardAmount}>
                            {task.rewardAmount} KD
                          </Text>
                          <Text style={styles.rewardLabel}>Reward</Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                </Animated.View>
              ))}
            </ScrollView>
          ) : (
            <Text>No tasks available</Text>
          )}
        </View>

        {/* Start New Adventure Button */}
        <View style={styles.bottomButtonContainer}>
          <LottieView
            source={require("../../assets/Walking.json")}
            autoPlay
            loop
            style={styles.walkingAnimation}
          />
          <TouchableOpacity
            style={styles.createGoalButton}
            onPress={() => navigation.navigate("CreateNewGoal")}
          >
            <LottieView
              source={require("../../assets/star.json")}
              autoPlay
              loop
              style={styles.starAnimation}
            />
            <Text style={styles.createGoalText}>Start New Goal</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

const getRandomColor = () => {
  const colors = [
    "#FF9B9B", // Soft Red
    "#94D8F6", // Sky Blue
    "#B5E6B5", // Mint Green
    "#FFB347", // Orange
    "#C1A7E2", // Purple
    "#FFD93D", // Yellow
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 70,
    paddingBottom: 100,
  },
  balanceCardContainer: { marginBottom: 30 },
  balanceCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    padding: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  balanceLeft: { alignItems: "center" },
  balanceLabel: {
    fontSize: 18,
    color: "#666666",
    marginBottom: 8,
    fontWeight: "500",
  },
  amountContainer: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  currencySymbol: {
    fontSize: 24,
    color: "#666666",
    marginRight: 4,
    fontWeight: "600",
  },
  balanceAmount: {
    fontSize: 42,
    fontWeight: "700",
    color: "#333333",
  },
  missionTitleContainer: { marginBottom: 10 },
  missionTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 10,
    textAlign: "center",
  },
  taskCardsContainer: { marginBottom: 20 },
  horizontalScrollContent: { paddingRight: 20 },
  taskCardWrapper: { marginRight: 15 },
  taskCard: {
    borderRadius: 30,
    padding: 30,
    width: width * 0.9,
    height: 380,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
    borderWidth: 3,
    borderColor: "rgba(255, 255, 255, 0.5)",
    overflow: "hidden",
  },
  selectedTask: { borderWidth: 3, borderColor: "#FFD93D" },
  bubbleTop: {
    position: "absolute",
    top: -20,
    left: "50%",
    marginLeft: -20,
    width: 40,
    height: 40,
    backgroundColor: "inherit",
    borderRadius: 20,
    borderWidth: 3,
    borderColor: "rgba(255, 255, 255, 0.5)",
  },
  taskCardContent: { flex: 1, justifyContent: "space-between" },
  taskHeader: { alignItems: "center", marginTop: 10 },
  taskFooter: { alignItems: "center", gap: 15 },
  taskAnimation: { width: 160, height: 99, alignSelf: "center" },
  taskTitle: {
    color: "#FFFFFF",
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 15,
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  pointsBadge: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    padding: 20,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.5)",
    width: "85%",
  },
  pointsText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
  },
  rewardContainer: {
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    padding: 20,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.5)",
    width: "85%",
  },
  rewardAmount: {
    color: "#FFFFFF",
    fontSize: 40,
    fontWeight: "700",
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  rewardLabel: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "700",
    opacity: 0.9,
  },
  bottomButtonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: "transparent",
  },
  createGoalButton: {
    backgroundColor: "#6C63FF",
    borderRadius: 50,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#4A44C9",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  starAnimation: { width: 40, height: 40, marginRight: -10 },
  createGoalText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
  },
  walkingAnimation: { width: 120, height: 120, alignSelf: "center", marginBottom: -40 },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
    marginVertical: 10,
  },
});

export default TaskListScreen;
