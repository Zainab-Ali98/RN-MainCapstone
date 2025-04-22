
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Logout from "../components/Logout";

const { width, height } = Dimensions.get("window");

const mockTasks = [
  { id: "1", title: "Complete homework", reward: "5.00" },
  { id: "2", title: "Clean your room", reward: "3.00" },
];

const mockActivities = [
  {
    id: "1",
    type: "Deposit",
    amount: "+500.00 KD",
    color: "#4D5DFA",
    icon: "↑",
    date: "Today, 11:30 AM",
  },
  {
    id: "2",
    type: "Withdrawal",
    amount: "-200.00 KD",
    color: "#FF4D4D",
    icon: "↓",
    date: "Yesterday, 3:20 PM",
  },
  // Add more mock transactions to demonstrate scrolling
  {
    id: "3",
    type: "Deposit",
    amount: "+100.00 KD",
    color: "#4D5DFA",
    icon: "↑",
    date: "Yesterday, 9:00 AM",
  },
  {
    id: "4",
    type: "Withdrawal",
    amount: "-50.00 KD",
    color: "#FF4D4D",
    icon: "↓",
    date: "2 days ago",
  },
  {
    id: "5",
    type: "Deposit",
    amount: "+20.00 KD",
    color: "#4D5DFA",
    icon: "↑",
    date: "2 days ago",
  },
  {
    id: "6",
    type: "Withdrawal",
    amount: "-10.00 KD",
    color: "#FF4D4D",
    icon: "↓",
    date: "3 days ago",
  },
];

const CurrentBalanceScreen = () => {
  return (
    <View style={styles.container}>
      {/* <Logout /> */}
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
            <Text style={styles.balanceAmount}>3077.20 KD</Text>
          </View>

          <View style={styles.mainContent}>
            <View style={styles.section}>
              <View style={styles.card}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardTitle}>New Bike Goal</Text>
                  <Text style={styles.cardAmount}>150.00 / 200.00 KD</Text>
                </View>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: "75%" }]} />
                </View>
              </View>
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
              <View style={styles.activitiesScrollWrapper}>
                <ScrollView
                  style={styles.activitiesScroll}
                  contentContainerStyle={styles.activitiesContent}
                  showsVerticalScrollIndicator={true}
                  nestedScrollEnabled={true}
                >
                  {mockActivities.map((activity) => (
                    <View key={activity.id} style={styles.transaction}>
                      <View style={styles.transactionLeft}>
                        <View
                          style={[
                            styles.transactionIcon,
                            { backgroundColor: activity.color },
                          ]}
                        >
                          <Text style={styles.iconText}>{activity.icon}</Text>
                        </View>
                        <View>
                          <Text style={styles.transactionTitle}>
                            {activity.type}
                          </Text>
                          <Text style={styles.transactionDate}>
                            {activity.date}
                          </Text>
                        </View>
                      </View>
                      <Text
                        style={[
                          styles.transactionAmount,
                          activity.type === "Deposit"
                            ? styles.depositAmount
                            : styles.withdrawalAmount,
                        ]}
                      >
                        {activity.amount}
                      </Text>
                    </View>
                  ))}
                </ScrollView>
              </View>
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
  activitiesScrollWrapper: {
    maxHeight: 200,
    borderRadius: 12,
    overflow: "hidden",
  },
  activitiesScroll: {
    backgroundColor: "#F3F4F6",
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  activitiesContent: {
    paddingBottom: 10,
  },
  // transaction: {
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  //   alignItems: "center",
  //   marginBottom: 12,
  //   padding: 16,
  //   backgroundColor: "#FFFFFF",
  //   borderRadius: 12,
  //   elevation: 2,
  //   shadowColor: "#000",
  //   shadowOffset: {
  //     width: 0,
  //     height: 1,
  //   },
  //   shadowOpacity: 0.1,
  //   shadowRadius: 2,
  // },
  transaction: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    overflow: "hidden", // <— Optional safety net
  },
  transactionLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
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
  // transactionAmount: {
  //   fontSize: 16,
  //   fontWeight: "600",
  // },
  transactionAmount: {
    fontSize: 16,
    fontWeight: "600",
    maxWidth: 100, // You can tweak this
    textAlign: "right",
    flexShrink: 1,
  },
  depositAmount: {
    color: "#4D5DFA",
  },
  withdrawalAmount: {
    color: "#FF4D4D",
  },
});

export default CurrentBalanceScreen;
