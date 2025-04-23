import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Logout from "../components/Logout";
import { useQuery } from "@tanstack/react-query";
import { getSavingsGoals } from "../api/children";
import { balance } from "../api/users";
import UserContext from "../context/UserContext";
import { useContext } from "react";

const { width, height } = Dimensions.get("window");

const mockTasks = [
  { id: "1", title: "Complete homework", reward: "5.00" },
  { id: "2", title: "Clean your room", reward: "3.00" },
];

const CurrentBalanceScreen = () => {
  const { isAuth } = useContext(UserContext);

  const { data: balanceData, isLoading: isLoadingBalance } = useQuery({
    queryKey: ["balance"],
    queryFn: balance,
    enabled: !!isAuth,
  });

  const { data: savingsGoals, isLoading: isLoadingGoals } = useQuery({
    queryKey: ["savingsGoals"],
    queryFn: getSavingsGoals,
    enabled: !!isAuth,
  });

  if (isLoadingBalance || isLoadingGoals) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4D5DFA" />
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
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <View style={styles.balanceSection}>
            <Text style={styles.balanceLabel}>Total balance</Text>
            <Text style={styles.balanceAmount}>{balanceData?.balance || "0.00"} KD</Text>
          </View>

          <View style={styles.mainContent}>
            <View style={styles.section}>
              {savingsGoals?.map((goal) => (
                <View key={goal.savingsGoalId} style={styles.card}>
                  <View style={styles.cardHeader}>
                    <Text style={styles.cardTitle}>{goal.goalName}</Text>
                    <Text style={styles.cardAmount}>
                      {goal.currentAmount} / {goal.targetAmount} KD
                    </Text>
                  </View>
                  <View style={styles.progressBar}>
                    <View 
                      style={[
                        styles.progressFill, 
                        { width: `${(goal.currentAmount / goal.targetAmount) * 100}%` }
                      ]} 
                    />
                  </View>
                </View>
              ))}
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>My Fun Tasks!</Text>

              {mockTasks.map((task) => (
                <TouchableOpacity key={task.id} style={styles.taskCard}>
                  
                  <View style={styles.taskContent}>
                    <Text style={styles.taskTitle}>{task.title}</Text>
                    <Text style={styles.taskReward}>Earn {task.reward} KD</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Recent Activities</Text>

              <View style={styles.transaction}>
                <View style={styles.transactionLeft}>
                  <View
                    style={[
                      styles.transactionIcon,
                      { backgroundColor: "#4D5DFA" },
                    ]}
                  >
                    <Text style={styles.iconText}>↑</Text>
                  </View>
                  <View>
                    <Text style={styles.transactionTitle}>Deposit</Text>
                    <Text style={styles.transactionDate}>Today, 11:30 AM</Text>
                  </View>
                </View>
                <Text style={[styles.transactionAmount, styles.depositAmount]}>
                  +500.00 KD
                </Text>
              </View>

              <View style={styles.transaction}>
                <View style={styles.transactionLeft}>
                  <View
                    style={[
                      styles.transactionIcon,
                      { backgroundColor: "#FF4D4D" },
                    ]}
                  >
                    <Text style={styles.iconText}>↓</Text>
                  </View>
                  <View>
                    <Text style={styles.transactionTitle}>Withdrawal</Text>
                    <Text style={styles.transactionDate}>
                      Yesterday, 3:20 PM
                    </Text>
                  </View>
                </View>
                <Text
                  style={[styles.transactionAmount, styles.withdrawalAmount]}
                >
                  -200.00 KD
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.buttonSection}>
            <Image
              source={require("../../assets/bear.png")}
              style={styles.bearImage}
              resizeMode="contain"
            />
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>View All Activities</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  backgroundImage: {
    position: "absolute",
    width: width,
    height: height * 0.5,
    top: 0,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 39,
    paddingTop: 60,
    alignItems: "center",
  },
  balanceSection: {
    alignItems: "center",
    marginBottom: 40,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: 20,
    borderRadius: 16,
    width: "100%",
  },
  balanceLabel: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  balanceAmount: {
    color: "#ffffff",
    fontSize: 36,
    fontWeight: "800",
    letterSpacing: 1,
  },
  mainContent: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  section: {
    marginBottom: 20,
    gap: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#174C4F",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#F3F4F6",
    borderRadius: 16,
    padding: 20,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#174C4F",
  },
  cardAmount: {
    fontSize: 16,
    fontWeight: "700",
    color: "#174C4F",
  },
  progressBar: {
    height: 8,
    backgroundColor: "#E5E7EB",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#4D5DFA",
    borderRadius: 4,
  },
  // New Task Styles
  taskCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 2,
  },
  taskContent: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#174C4F",
    marginBottom: 4,
  },
  taskReward: {
    fontSize: 14,
    color: "#4D5DFA",
    fontWeight: "500",
  },
  // Existing styles...
  transaction: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    padding: 16,
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
  },
  transactionLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  iconText: {
    color: "#FFFFFF",
    fontSize: 20,
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#174C4F",
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 12,
    color: "#6B7280",
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: "600",
  },
  depositAmount: {
    color: "#4D5DFA",
  },
  withdrawalAmount: {
    color: "#FF4D4D",
  },
  buttonSection: {
    width: "100%",
    position: "relative",
    marginTop: 20,
  },
  bearImage: {
    width: 118,
    height: 78,
    position: "absolute",
    right: 0,
    top: -60,
    zIndex: 1,
  },
  button: {
    height: 72,
    backgroundColor: "#4D5DFA",
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "500",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CurrentBalanceScreen;
