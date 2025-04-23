import React from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import * as Progress from "react-native-progress";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const CIRCLE_SIZE = 200;

const SavingsGoalItem = ({ goal, onDeposit, onBreak }) => {
  const navigation = useNavigation();
  const progress = Math.min(goal.currentBalance / goal.targetAmount, 1);

  const handleDeposit = () => {
    onDeposit(goal);
    navigation.navigate("ChildDepositScreen", {
      savingsGoalId: goal.savingsGoalId,
      goalName: goal.goalName,
    });
  };

  const handleBreak = () => {
    onBreak(goal);
  };

  return (
    <View style={styles.itemContainer}>
      <View style={styles.priceContainer}>
        <Text style={styles.savedAmount}>
          {goal.currentBalance.toFixed(3)} KWD
        </Text>
        <Text style={styles.targetAmount}>
          / {goal.targetAmount.toFixed(3)} KWD
        </Text>
      </View>

      <View style={styles.circleWrapper}>
        <View style={styles.progressCircle}>
          <Progress.Circle
            size={CIRCLE_SIZE + 30}
            progress={progress}
            thickness={15}
            color="#4CAF50"
            unfilledColor="#E5E7EB"
            borderWidth={0}
            showsText={false}
          />
        </View>
        <View style={styles.circularMask}>
          <Image
            source={{ uri: "https://reactjs.org/logo-og.png" }}
            style={styles.productImage}
            resizeMode="contain"
          />
        </View>
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.productName}>{goal.goalName}</Text>
        <View style={styles.statusSection}>
          <View style={styles.statusDot} />
          <Text style={styles.statusText}>
            {progress >= 1 ? "Ready to Purchase!" : goal.status}
          </Text>
        </View>
        {goal.message && <Text style={styles.messageText}>{goal.message}</Text>}
      </View>

      <View style={styles.actionButtonsContainer}>
        <TouchableOpacity style={styles.actionButton} onPress={handleDeposit}>
          <MaterialIcons
            name="account-balance-wallet"
            size={24}
            color="#6C63FF"
          />
          <Text style={styles.buttonText}>Deposit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.breakButton]}
          onPress={handleBreak}
        >
          <MaterialIcons name="pause-circle-filled" size={24} color="#EF4444" />
          <Text style={[styles.buttonText, styles.breakButtonText]}>Break</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 20,
  },
  savedAmount: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  targetAmount: {
    fontSize: 18,
    color: "#6B7280",
    marginLeft: 4,
  },
  circleWrapper: {
    width: CIRCLE_SIZE + 30,
    height: CIRCLE_SIZE + 30,
    justifyContent: "center",
    alignItems: "center",
  },
  progressCircle: {
    position: "absolute",
    width: CIRCLE_SIZE + 30,
    height: CIRCLE_SIZE + 30,
    justifyContent: "center",
    alignItems: "center",
  },
  circularMask: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  productImage: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
  },
  textContainer: {
    alignItems: "center",
    marginTop: 30,
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
    borderRadius: 50,
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
});

export default SavingsGoalItem;
