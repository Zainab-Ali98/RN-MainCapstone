import React, { useState } from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  Alert,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getSavingsGoals, savingsGoalsBreak } from "../api/children";
import * as Progress from "react-native-progress";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import Logout from "./Logout";

const { width } = Dimensions.get("window");
const CIRCLE_SIZE = 200;

const SavingsGoalList = () => {
  const queryClient = useQueryClient();
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedTab, setSelectedTab] = useState("All");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["savingsGoals"],
    queryFn: getSavingsGoals,
  });

  const breakMutation = useMutation({
    mutationFn: (savingsGoalId) => savingsGoalsBreak(savingsGoalId),
    onSuccess: () => {
      queryClient.invalidateQueries(["savingsGoals"]);
      Alert.alert("Success", "Savings goal broken.");
    },
    onError: (err) => {
      console.error("Break error:", err);
      Alert.alert("Error", "Failed to break savings goal.");
    },
  });

  const inProgressGoals =
    data?.filter((goal) => goal.status === "InProgress") || [];

  const filteredGoals =
    data?.filter((goal) => {
      if (selectedTab === "Completed") return goal.status === "Completed";
      if (selectedTab === "Broken") return goal.status === "Broken";
      return true; // "All"
    }) || [];

  const onViewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  };

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  const handleDeposit = (goal) => {
    navigation.navigate("ChildDepositScreen", {
      savingsGoalId: goal.savingsGoalId,
      goalName: goal.goalName,
    });
  };

  const handleBreak = (goal) => {
    Alert.alert(
      "Break Goal",
      "Are you sure you want to break this saving goal? You'll lose your progress.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Break",
          style: "destructive",
          onPress: () => breakMutation.mutate(goal.savingsGoalId),
        },
      ]
    );
  };

  const currentGoal = inProgressGoals[currentIndex];
  const progress = currentGoal
    ? Math.min(currentGoal?.currentBalance / currentGoal?.targetAmount, 1)
    : 0;

  if (isLoading) {
    return <Text style={styles.loading}>Loading...</Text>;
  }

  if (isError) {
    return <Text style={styles.error}>Error fetching data</Text>;
  }

  return (
    <View style={styles.container}>
      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {["All", "Completed", "Broken"].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tabButton,
              selectedTab === tab && styles.tabButtonActive,
            ]}
            onPress={() => setSelectedTab(tab)}
          >
            <Text
              style={[
                styles.tabButtonText,
                selectedTab === tab && styles.tabButtonTextActive,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Donut Carousel — Always InProgress only */}
        {inProgressGoals.length > 0 && (
          <View style={styles.donutContainer}>
            <View style={styles.priceContainer}>
              <Text style={styles.savedAmount}>
                {currentGoal?.currentBalance.toFixed(3)} KWD
              </Text>
              <Text style={styles.targetAmount}>
                / {currentGoal?.targetAmount.toFixed(3)} KWD
              </Text>
            </View>
 
            <View style={styles.circleWrapper}>
              <Progress.Circle
                size={CIRCLE_SIZE + 30}
                progress={progress}
                thickness={15}
                color="#4CAF50"
                unfilledColor="#E5E7EB"
                borderWidth={0}
                showsText={false}
              />
              <View style={styles.circularMask}>
                <FlatList
                  data={inProgressGoals}
                  renderItem={({ item }) => (
                    <View style={styles.imageContainer}>
                      {item.ProfilePicture ? (
                        // <Image
                        //   source={{ uri: item.SavingsGoalPicture }}
                        //   style={styles.productImage}
                        //   resizeMode="contain"
                        // />

                        <LottieView
                          source={require("../../assets/animations/wallet.json")}
                          autoPlay
                          loop
                          style={{
                            width: 200,
                            height: 200,
                            paddingBottom: 50,
                          }}
                        />
                      ) : (
                        <LottieView
                          source={require("../../assets/animations/wallet.json")}
                          autoPlay
                          loop
                          style={{
                            width: 200,
                            height: 200,
                            paddingBottom: 50,
                          }}
                        />
                      )}
                    </View>
                  )}
                  horizontal
                  pagingEnabled
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item) => item.savingsGoalId.toString()}
                  onViewableItemsChanged={onViewableItemsChanged}
                  viewabilityConfig={viewabilityConfig}
                />
              </View>
            </View>

            <View style={styles.statusContainer}>
              <View style={styles.pagination}>
                {inProgressGoals.map((_, index) => (
                  <View
                    key={index}
                    style={[
                      styles.paginationDot,
                      index === currentIndex && styles.paginationDotActive,
                    ]}
                  />
                ))}
              </View>

              <View style={styles.statusSection}>
                <View style={styles.statusDot} />
                <Text style={styles.statusText}>
                  {progress >= 1 ? "Ready to Purchase!" : currentGoal?.status}
                </Text>
              </View>
            </View>

            <View style={styles.textContainer}>
              <Text style={styles.productName}>{currentGoal?.goalName}</Text>
              {currentGoal?.message && (
                <Text style={styles.messageText}>{currentGoal?.message}</Text>
              )}
            </View>

            <View style={styles.actionButtonsContainer}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleDeposit(currentGoal)}
              >
                <MaterialIcons
                  name="account-balance-wallet"
                  size={24}
                  color="#6C63FF"
                />
                <Text style={styles.buttonText}>Deposit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, styles.breakButton]}
                onPress={() => handleBreak(currentGoal)}
              >
                <MaterialIcons
                  name="pause-circle-filled"
                  size={24}
                  color="#EF4444"
                />
                <Text style={[styles.buttonText, styles.breakButtonText]}>
                  Break
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Filtered Goals List */}
        <View style={styles.filteredGoalsContainer}>
          {filteredGoals.length === 0 ? (
            <Text style={styles.noGoals}>
              No goals available for this filter.
            </Text>
          ) : (
            filteredGoals.map(
              (goal) => (
                console.log(goal),
                (
                  <View key={goal.savingsGoalId} style={styles.goalCard}>
                    <Text style={styles.goalName}>{goal.goalName}</Text>
                    <Text style={styles.goalStatus}>{goal.status}</Text>
                    <Text style={styles.goalProgress}>
                      {goal.status === "InProgress"
                        ? `${goal.currentBalance.toFixed(3)} / `
                        : ""}
                      {goal.targetAmount.toFixed(3)} KWD
                    </Text>
                  </View>
                )
              )
            )
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 16,
    gap: 12,
    backgroundColor: "#F3F4F6",
    marginBottom: 16,
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  tabButtonActive: {
    backgroundColor: "#6C63FF",
    borderColor: "#6C63FF",
  },
  tabButtonText: {
    color: "#6B7280",
    fontSize: 14,
    fontWeight: "500",
  },
  tabButtonTextActive: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  scrollView: {
    flex: 1,
  },
  donutContainer: {
    alignItems: "center",
    paddingVertical: 20,
  },
  filteredGoalsContainer: {
    padding: 20,
  },
  goalCard: {
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  goalName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
  },
  goalStatus: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 4,
  },
  goalProgress: {
    fontSize: 16,
    color: "#4CAF50",
    fontWeight: "500",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  savedAmount: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  targetAmount: {
    fontSize: 18,
    color: "#6B7280",
  },
  statusContainer: {
    gap: 10,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#CACACA",
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: "#4CAF50",
  },
  statusSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#4CAF50",
  },
  statusText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#000000",
    fontFamily: "Inter",
  },
  textContainer: {
    alignItems: "center",
  },
  productName: {
    fontSize: 32,
    fontWeight: "500",
    color: "#000000",
    fontFamily: "Inter",
    marginBottom: 15,
  },
  messageText: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 10,
    textAlign: "center",
  },
  actionButtonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
    marginTop: 40,
    width: "100%",
    paddingHorizontal: 20,
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 28,
    backgroundColor: "#ffffff",
    borderWidth: 2,
    borderColor: "#6C63FF",
    gap: 8,
  },
  breakButton: {
    borderColor: "#EF4444",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#6C63FF",
  },
  breakButtonText: {
    color: "#EF4444",
  },
  loading: {
    color: "#000",
    textAlign: "center",
    marginTop: 20,
  },
  error: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
  noGoals: {
    color: "#000",
    textAlign: "center",
    marginTop: 20,
  },
  circleWrapper: {
    width: CIRCLE_SIZE + 30,
    height: CIRCLE_SIZE + 30,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  circularMask: {
    position: "absolute",
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  imageContainer: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    justifyContent: "center",
    alignItems: "center",
  },
  productImage: {
    width: "100%",
    height: "100%",
  },
});

export default SavingsGoalList;
