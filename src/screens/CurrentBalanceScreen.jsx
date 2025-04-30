import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import { transactions } from "../api/transactions";
import { balance, profile } from "../api/users";
import UserContext from "../context/UserContext";
import { useContext } from "react";
import LottieView from "lottie-react-native";

const { width, height } = Dimensions.get("window");

const getActivityArrow = (type, activity, down, up, win) => {
  if (
    type === "Parent" &&
    activity.senderType === "Parent" &&
    activity.receiverType === "Child"
  ) {
    return down;
  }

  if (
    type === "Child" &&
    activity.senderType === "Parent" &&
    activity.receiverType === "Child"
  ) {
    return up;
  }

  if (
    type === "Child" &&
    activity.senderType === "Child" &&
    activity.receiverType === "SavingsGoal"
  ) {
    return down;
  }

  return win;
};


const CurrentBalanceScreen = () => {
  const { isAuth, role } = useContext(UserContext);
  const type = role;
  
  const { data: balanceData, isLoading: isLoadingProfile } = useQuery({
    queryKey: ["balance"],
    queryFn: balance,
    enabled: !!isAuth,
  });

  const { data: transactionsData, isLoading: isLoadingTransactions } = useQuery(
    {
      queryKey: ["transactions"],
      queryFn: transactions,
      enabled: !!isAuth,
    }
  );

  if (isLoadingProfile || isLoadingTransactions) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4D5DFA" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.balanceCard}>
        <View style={styles.balanceRow}>
          <LottieView
            source={require("../../assets/balance.json")}
            autoPlay
            loop
            style={styles.lottieIcon}
          />
          <View>
            <Text style={styles.balanceLabel}>Total Balance</Text>
            <Text style={styles.balanceValue}>
              KWD {balanceData?.balance.toFixed(3)}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.mainContent}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Activities</Text>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {transactionsData?.map(
            (activity, index) => (
              (
                <View key={activity.transactionId} style={styles.activityItem}>
                  <View style={styles.activityIconContainer}>
                    <Text style={styles.activityIcon}>
                      {getActivityArrow(type, activity, "↓", "↑", "🎉")}
                    </Text>
                  </View>
                  <View style={styles.activityDetails}>
                    <Text style={styles.activityDate}>
                      {new Date(activity.dateCreated).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                          hour12: true,
                        }
                      )}
                    </Text>
                  </View>
                  <Text
                    style={[
                      styles.activityAmount,
                      {
                        color:
                          getActivityArrow(type, activity, "#FF4D4D", "green", "#000"),
                      },
                    ]}
                  >
                    {getActivityArrow(type, activity, "-", "+", "")}
                    {activity.amount} KD
                  </Text>
                </View>
              )
            )
          )}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: height,
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
    backgroundColor: "#4D5DFA",
    borderRadius: 16,
    shadowRadius: 3,
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    padding: 20,
    marginTop: 60,
    marginHorizontal: 16,
  },
  balanceRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  lottieIcon: {
    width: 60,
    height: 60,
    marginRight: 12,
  },
  balanceLabel: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 14,
    fontWeight: "500",
  },
  balanceValue: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 4,
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
    backgroundColor: "rgb(238, 238, 238)",
    borderRadius: 24,
    padding: 20,
    paddingBottom: 0,
    margin: 20,
    marginBottom: 210,
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
  },
  activitiesScrollWrapper: {
    maxHeight: 400,
    borderRadius: 16,
    overflow: "hidden",
  },
  activitiesScroll: {
    borderRadius: 16,
  },
  activitiesContent: {
    paddingBottom: 10,
  },
  activityItem: {
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
  activityIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  activityIcon: {
    color: "#000",
    fontSize: 20,
  },
  activityDetails: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  activityType: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1E40AF",
    marginBottom: 4,
  },
  activityDate: {
    fontSize: 12,
    color: "#6B7280",
  },
  activityAmount: {
    fontSize: 16,
    fontWeight: "600",
  },
});

export default CurrentBalanceScreen;
