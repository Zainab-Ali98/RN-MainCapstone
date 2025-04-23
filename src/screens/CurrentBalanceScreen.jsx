import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

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
      <LinearGradient
        colors={["#E3F2FD", "#BBDEFB", "#90CAF9"]}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <View style={styles.balanceSection}>
            <View style={styles.balanceCard}>
              <Text style={styles.balanceLabel}>Total Balance</Text>
              <Text style={styles.balanceAmount}>3077.20 KD</Text>
              <View style={styles.balanceDecoration} />
            </View>
          </View>

          <View style={styles.mainContent}>
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Recent Activities</Text>
              </View>
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
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: height,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    alignItems: "center",
  },
  balanceSection: {
    width: "100%",
    marginBottom: 40,
  },
  balanceCard: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    position: "relative",
    overflow: "hidden",
    minHeight: 140,
  },
  balanceLabel: {
    color: "#4D5DFA",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  balanceAmount: {
    color: "#1E40AF",
    fontSize: 36,
    fontWeight: "800",
    letterSpacing: 1,
  },
  balanceDecoration: {
    position: "absolute",
    top: -50,
    right: -50,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(77, 93, 250, 0.1)",
  },
  mainContent: {
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 24,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  section: {
    marginBottom: 20,
    gap: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1E40AF",
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  activitiesScrollWrapper: {
    maxHeight: 400,
    borderRadius: 16,
    overflow: "hidden",
  },
  activitiesScroll: {
    backgroundColor: "rgba(243, 244, 246, 0.8)",
    padding: 10,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(229, 231, 235, 0.8)",
  },
  activitiesContent: {
    paddingBottom: 10,
  },
  transaction: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
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
    color: "#1E40AF",
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
});

export default CurrentBalanceScreen;
