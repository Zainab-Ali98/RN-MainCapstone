import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import CircleProgress from "../components/CircleProgress";
import { LinearGradient } from "expo-linear-gradient";
import { getChildTask, getChildSavingsGoals } from "../api/parents";
import { useQuery } from "@tanstack/react-query";
const { width, height } = Dimensions.get("window");

const TaskItem = ({ item }) => {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "verified":
        return "#22C55E"; // Green
      case "completed":
        return "#3B82F6"; // Blue
      case "rejected":
        return "#EF4444"; // Red
      default:
        return "#9CA3AF";
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case "verified":
        return "check-circle";
      case "approved":
        return "thumb-up";
      case "rejected":
        return "error-outline";
      default:
        return "pending";
    }
  };

  return (
    <View style={styles.taskBox}>
      <LinearGradient
        colors={[item.color + "20", "#FFFFFF"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.taskGradient}
      >
        <View style={styles.taskContent}>
          <Text style={styles.taskTitle}>{item.title}</Text>
          <View style={styles.taskDetails}>
            <Text style={[styles.rewardText, { color: item.color }]}>
              +{item.amount.toFixed(2)} KWD
            </Text>
            <View
              style={[
                styles.statusBadge,
                { backgroundColor: item.color + "20" },
              ]}
            >
              <Text style={[styles.statusText, { color: item.color }]}>
                {item.status}
              </Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const SavingGoalItem = ({ item }) => {
  const percentage = Math.round((item.progress / item.amount) * 100);
  const remainingAmount = item.amount - item.progress;

  return (
    <View style={[styles.goalCard, { backgroundColor: item.color + "10" }]}>
      <View
        style={[
          styles.goalEmojiContainer,
          { backgroundColor: item.color + "20" },
        ]}
      >
        <Text style={styles.goalEmoji}>{item.emoji}</Text>
      </View>
      <Text style={[styles.goalTitle, { color: item.color }]}>
        {item.title}
      </Text>
      <CircleProgress percentage={percentage} color={item.color} />
      <View style={styles.goalProgress}>
        <Text style={[styles.savedAmount, { color: item.color }]}>
          Saved: {item.progress} KWD
        </Text>
        <Text style={styles.remainingAmount}>Need: {remainingAmount} KWD</Text>
      </View>
    </View>
  );
};

const ProfileScreen = ({ route }) => {
  const navigation = useNavigation();
  const child = route.params; // Get the child data from route params
  console.log("Child data:", child); // Log the child data for debugging

  // Fetch Child Savings Goals
  const {
    data: savingsGoalsData,
    isLoading: isGoalsLoading,
    isError: isGoalsError,
    error: goalsError,
  } = useQuery({
    queryKey: ["childSavingsGoals", child.id],
    queryFn: () => getChildSavingsGoals(child.id),
    enabled: !!child.id,
  });

  // Map savings goals data to match SavingGoalItem expected format
  const savingsGoals =
    savingsGoalsData?.map((goal) => ({
      id: goal.savingsGoalId.toString(),
      title: goal.goalName,
      amount: goal.targetAmount || 0, // Adjust based on actual field name
      progress: goal.currentBalance || 0, // Adjust based on actual field name
    })) || [];

  // Fetch Child Tasks
  const {
    data: tasksData,
    isLoading: isTasksLoading,
    isError: isTasksError,
    error: tasksError,
  } = useQuery({
    queryKey: ["childTasks", child.id],
    queryFn: () => getChildTask(child.id),
  });

  // Map Child Tasks
  const tasks =
    tasksData?.map((task) => ({
      id: task.taskId.toString(),
      title: task.taskName,
      amount: task.rewardAmount || 0, // Adjust based on actual field name (e.g., RewardReward)
      status: task.status || "Pending",
    })) || [];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          {/* Balance Card */}
          <View style={styles.balanceCard}>
            <LinearGradient
              colors={["#4B9EFF", "#7C3AED", "#FFD449"]}
              style={styles.cardBackground}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              locations={[0, 0.5, 1]}
            >
              <View style={styles.cardContent}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardName}>Available Balance</Text>
                </View>
                <Text style={styles.balanceAmount}>
                  KWD {child?.balance.toFixed(2)}
                </Text>
                <View style={styles.cardFooter}>
                  <View
                    style={[
                      styles.paymentMethods,
                      { backgroundColor: "rgba(255, 255, 255, 0.2)" },
                    ]}
                  >
                    <MaterialIcons name="contactless" size={24} color="white" />
                  </View>
                </View>
              </View>
            </LinearGradient>
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonSection}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() =>
                navigation.navigate("DepositScreen", { childId: child.id })
              } // This should work now
            >
              <MaterialIcons
                name="account-balance-wallet"
                size={24}
                color="#6C63FF"
              />
              <Text style={styles.whiteButtonText}>Send Money</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate("CreateTaskScreen")}
            >
              <MaterialIcons
                name="playlist-add-check"
                size={24}
                color="#6C63FF"
              />
              <Text style={styles.whiteButtonText}>Create Task</Text>
            </TouchableOpacity>
          </View>

          {/* Saving Goals */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Saving Goals</Text>
            <FlatList
              data={savingsGoals}
              renderItem={({ item }) => <SavingGoalItem item={item} />}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>

          {/* Task List */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Tasks</Text>
            <FlatList
              data={tasks}
              renderItem={({ item }) => <TaskItem item={item} />}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
          </View>

          {/* Buttons */}
          <View style={styles.buttonSection}>
            <Image
              // source={require("../../assets/bear.png")}
              style={styles.bearImage}
              resizeMode="contain"
            />
            <View style={styles.actionButtonsContainer}>
              {/* <TouchableOpacity
                style={styles.actionButton}
                onPress={() =>
                  navigation.navigate("CreateTaskScreen", { childId: child.id })
                }
              >
                <MaterialIcons
                  name="playlist-add-check"
                  size={24}
                  color="#6C63FF"
                />
                <Text style={styles.whiteButtonText}>Create Task</Text>
              </TouchableOpacity> */}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC", // Light gray background
  },
  scrollContent: {
    paddingBottom: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 39,
    paddingTop: 60,
    alignItems: "center",
  },
  balanceCard: {
    width: "100%",
    height: 200,
    borderRadius: 25,
    overflow: "hidden",
    marginBottom: 24,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardBackground: {
    flex: 1,
    padding: 20,
  },
  cardContent: {
    flex: 1,
    justifyContent: "space-between",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  cardName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
    opacity: 0.9,
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#ffffff",
    marginVertical: 20,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  paymentMethods: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
  },
  section: {
    width: "100%",
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 12,
  },
  taskBox: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginBottom: 12,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  taskLeftBorder: {
    width: 4,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  taskContent: {
    flex: 1,
    padding: 12,
  },
  taskHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    flex: 1,
    marginRight: 12,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
  },
  statusIcon: {
    marginRight: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "500",
  },
  rewardContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rewardText: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: "600",
    color: "#F59E0B",
  },
  goalCard: {
    borderRadius: 20,
    padding: 16,
    width: width * 0.7,
    marginRight: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  goalEmojiContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  goalEmoji: {
    fontSize: 32,
  },
  goalTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 12,
    textAlign: "center",
  },
  goalProgress: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  savedAmount: {
    fontWeight: "600",
  },
  remainingAmount: {
    color: "#7C3AED",
    fontWeight: "600",
  },
  buttonSection: {
    width: "100%",
    marginVertical: 16,
    flexDirection: "row",
    gap: 16,
  },
  actionButton: {
    flex: 1,
    height: 60,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 2,
    borderColor: "#6C63FF",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#6C63FF",
  },
});

export default ProfileScreen;
