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
} from "react-native";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getSavingsGoals, savingsGoalsBreak } from "../api/children";
import * as Progress from "react-native-progress";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");
const CIRCLE_SIZE = 200;

const SavingsGoalList = () => {
  const queryClient = useQueryClient();
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch savings goals
  const { data, isLoading, isError } = useQuery({
    queryKey: ["savingsGoals"],
    queryFn: getSavingsGoals,
  });

  // Mutation for breaking a goal
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

  if (isLoading) {
    return <Text style={styles.loading}>Loading...</Text>;
  }

  if (isError) {
    return <Text style={styles.error}>Error fetching data</Text>;
  }

  const inProgressGoals = data
    ? data.filter((goal) => goal.status === "InProgress")
    : [];

  // Handle swipe to update current index
  const onViewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  };

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  // Navigation to deposit screen
  const handleDeposit = (goal) => {
    navigation.navigate("ChildDepositScreen", {
      savingsGoalId: goal.savingsGoalId,
      goalName: goal.goalName,
    });
  };

  // Break goal confirmation
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
    ? Math.min(currentGoal.currentBalance / currentGoal.targetAmount, 1)
    : 0;

  return (
    <View style={styles.container}>
      {inProgressGoals.length > 0 ? (
        <View style={styles.content}>
          {/* Static Donut Progress */}
          <View style={styles.middleContainer}>
            <View style={styles.priceContainer}>
              <Text style={styles.savedAmount}>
                {currentGoal.currentBalance.toFixed(3)} KWD
              </Text>
              <Text style={styles.targetAmount}>
                / {currentGoal.targetAmount.toFixed(3)} KWD
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
              {/* Scrollable Images Inside the Donut */}
              <View style={styles.circularMask}>
                <FlatList
                  data={inProgressGoals}
                  renderItem={({ item }) => (
                    <View style={styles.imageContainer}>
                      <Image
                        source={{ uri: item.imageUri }}
                        style={styles.productImage}
                        resizeMode="contain"
                      />
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

            {/* Pagination Dots & Status*/}
            <View
              style={{
                gap: 10,
              }}
            >
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
                  {progress >= 1 ? "Ready to Purchase!" : currentGoal.status}
                </Text>
              </View>
            </View>

            <View style={styles.textContainer}>
              <Text style={styles.productName}>{currentGoal.goalName}</Text>

              {currentGoal.message && (
                <Text style={styles.messageText}>{currentGoal.message}</Text>
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

          {/* Details of Current Goal */}
          {currentGoal && <View style={styles.detailsContainer}></View>}
        </View>
      ) : (
        <Text style={styles.noGoals}>
          No in-progress savings goals available.
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    flex: 1,
    alignItems: "center",
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
  detailsContainer: {
    alignItems: "center",
    marginTop: 20,
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
  middleContainer: {
    position: "absolute",
    top: "40%",
    left: "40%",
    transform: [
      { translateX: -(CIRCLE_SIZE + 30) / 2 },
      { translateY: -(CIRCLE_SIZE + 30) / 2 },
    ],
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,

  },
});

export default SavingsGoalList;
