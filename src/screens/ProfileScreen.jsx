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
import Logout from "../components/Logout";
import { getChildTask, getChildSavingsGoals } from "../api/parents";
import { useQuery } from "@tanstack/react-query";

const { width, height } = Dimensions.get("window");

const mockTasks = [
  { id: "1", title: "Complete homework", amount: 5.0, status: "Verified" },
  { id: "2", title: "Clean room", amount: 3.0, status: "Rejected" },
  { id: "3", title: "Read a book", amount: 4.0, status: "Approved" },
  { id: "4", title: "Exercise", amount: 6.0, status: "Verified" },
];

const mockSavingGoals = [
  { id: "1", title: "New Bike", amount: 200, progress: 150 },
  { id: "2", title: "Video Game", amount: 60, progress: 45 },
  { id: "3", title: "School Supplies", amount: 100, progress: 80 },
];

const TaskItem = ({ item }) => {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "verified":
        return "#3B82F6";
      case "completed":
        return "#10B981";
      case "rejected":
        return "#EF4444";
      default:
        return "#9CA3AF";
    }
  };

  return (
    <View style={styles.taskBox}>
      <Text style={styles.taskTitle}>{item.title}</Text>
      <Text style={styles.taskAmount}>{item.amount.toFixed(2)} KWD</Text>
      <View
        style={[
          styles.statusBadge,
          { backgroundColor: getStatusColor(item.status) },
        ]}
      >
        <Text style={styles.statusText}>{item.status}</Text>
      </View>
    </View>
  );
};

const SavingGoalItem = ({ item }) => {
  const percentage = Math.round((item.progress / item.amount) * 100);

  return (
    <View style={styles.goalCard}>
      <CircleProgress percentage={percentage} />
      <Text style={styles.goalTitle}>{item.title}</Text>
      <Text style={styles.goalAmount}>
        {item.progress} KWD / {item.amount} KWD
      </Text>
    </View>
  );
};

const ProfileScreen = ({ route }) => {
  const navigation = useNavigation();
  const child = route.params; // Get the child data from route params
  console.log("Child data:", child); // Log the child data for debugging

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
      amount: task.reward || 0, // Adjust based on actual field name (e.g., RewardReward)
      status: task.status || "Pending",
    })) || [];

  return (
    <View style={styles.container}>
      {/* <Logout /> */}
      <Image
        source={require("../../assets/background.png")}
        style={styles.backgroundImage}
        resizeMode="cover"
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          {/* Balance Card */}
          <View style={styles.balanceCard}>
            <Text style={styles.balanceLabel}>Total Available Balance</Text>
            <Text style={styles.balanceAmount}>
              ${child?.balance.toFixed(2)}
            </Text>
          </View>

          {/* Saving Goals */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Saving Goals</Text>
            <FlatList
              data={mockSavingGoals}
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
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => navigation.navigate("DepositScreen")} // This should work now
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
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ffffff" },
  backgroundImage: {
    position: "absolute",
    width: width,
    height: height * 0.5,
    top: 0,
  },
  scrollContent: { paddingBottom: 40 },
  content: {
    flex: 1,
    paddingHorizontal: 39,
    paddingTop: 60,
    alignItems: "center",
  },
  balanceCard: {
    width: "100%",
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 16,
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    marginBottom: 24,
  },
  balanceLabel: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 4,
  },
  balanceAmount: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000000",
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
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    elevation: 2,
  },
  taskTitle: { fontSize: 16, fontWeight: "600", color: "#1F2937" },
  taskAmount: { fontSize: 14, color: "#6B7280", marginVertical: 4 },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  statusText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 12,
  },
  goalCard: {
    backgroundColor: "#F9FAFB",
    borderRadius: 16,
    padding: 16,
    width: 130,
    alignItems: "center",
    marginRight: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  goalTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 4,
    textAlign: "center",
  },
  goalAmount: {
    fontSize: 12,
    color: "#6B7280",
    textAlign: "center",
  },
  buttonSection: {
    width: "100%",
    marginTop: 24,
    position: "relative",
  },
  bearImage: {
    width: 118,
    height: 78,
    position: "absolute",
    right: 0,
    top: -60,
    zIndex: 1,
  },
  actionButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
  },
  whiteButton: {
    flex: 1,
    height: 72,
    backgroundColor: "#ffffff",
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#6C63FF",
    borderWidth: 2,
    flexDirection: "row",
    gap: 8,
  },
  whiteButtonText: {
    color: "#6C63FF",
    fontSize: 16,
    fontWeight: "600",
  },
});
