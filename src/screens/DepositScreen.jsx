import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Logout from "../components/Logout";
import { depositToChild } from "../api/parents";
import { useMutation, useQuery } from "@tanstack/react-query";
import { balance } from "../api/users";
import { useQueryClient } from "@tanstack/react-query";

const { width } = Dimensions.get("window");

const DepositScreen = ({ navigation, route }) => {
  const { childId } = route.params; // Get childId from route params
  // Get parent balance data for validation (dont allow the parent to send more than what they have)
  const [amount, setAmount] = useState("0");
  const queryClient = useQueryClient();
  const insets = useSafeAreaInsets();
  console.log("Child ID:", childId); // Log the childId for debugging

  // Fetch Parent balance from backend
  const {
    data: balanceData,
    isLoading: isBalanceLoading,
    isError: isBalanceError,
    error: balanceError,
  } = useQuery({
    queryKey: ["fetchBalance"],
    queryFn: () => balance(),
  });
  const parentBalance = balanceData?.balance ?? 0;

  // Call the API to deposit the amount
  const depositMutation = useMutation({
    mutationFn: ({ childId, depositData }) =>
      depositToChild(childId, depositData),
    onSuccess: () => {
      queryClient.invalidateQueries(["fetchBalance"]);
      queryClient.invalidateQueries(["fetchChildren"]);
      Alert.alert("Success", `Deposit of ${amount} KD sent to child!`, [
        {
          text: "OK",
          onPress: () => navigation.navigate("ParentScreen"), // Navigate to ParentScreen after success
        },
      ]);
      setAmount("0"); // Reset amount after success
    },
    onError: (err) => {
      Alert.alert("Error", "Failed to send deposit. Please try again.");
      console.error("Deposit error:", err);
    },
  });

  const handleNumberPress = (num) => {
    if (amount === "0") {
      setAmount(num.toString());
    } else {
      setAmount(amount + num.toString());
    }
  };

  const handleDecimalPress = () => {
    if (!amount.includes(".")) {
      setAmount(amount + ".");
    }
  };

  const handleClear = () => {
    setAmount("0");
  };
  const handleDeposit = async () => {
    const depositAmount = parseFloat(amount);
    // Validate input
    if (isNaN(depositAmount) || depositAmount <= 0) {
      Alert.alert(
        "Invalid Amount",
        "Please enter a valid amount greater than 0."
      );
      return;
    }
    if (depositAmount > parentBalance) {
      Alert.alert(
        "Insufficient Balance",
        `You only have ${parentBalance.toFixed(3)} KWD available.`
      );
      return;
    }
    // Trigger mutation
    depositMutation.mutate({
      childId,
      depositData: { amount: depositAmount },
    });
  };

  const renderButton = (value, isSpecial = false) => (
    <TouchableOpacity
      style={[styles.button, isSpecial && styles.specialButton]}
      onPress={() => {
        if (value === ".") {
          handleDecimalPress();
        } else {
          handleNumberPress(value);
        }
      }}
    >
      <View
        style={[styles.buttonInner, isSpecial && styles.specialButtonInner]}
      >
        <Text
          style={[styles.buttonText, isSpecial && styles.specialButtonText]}
        >
          {value}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* <Logout /> */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.content,
          { paddingTop: insets.top + 20 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* <View style={styles.amountSection}>
          <Text style={styles.label}>Enter Amount</Text>
          <Text style={styles.amount}>{amount} KD</Text>
          <View style={styles.divider} />
        </View> */}
        <View style={styles.amountSection}>
          <Text style={styles.balanceText}>
            Your Balance:{" "}
            {isBalanceLoading
              ? "Loading..."
              : `${parentBalance.toFixed(3)} KWD`}
          </Text>
          <Text style={styles.amount}>
            {isBalanceLoading
              ? "Loading..."
              : isBalanceError
              ? "Error"
              : `${amount} KWD`}
          </Text>
          <View style={styles.divider} />
        </View>

        <View style={styles.keypad}>
          <View style={styles.row}>
            {renderButton("1")}
            {renderButton("2")}
            {renderButton("3")}
          </View>
          <View style={styles.row}>
            {renderButton("4")}
            {renderButton("5")}
            {renderButton("6")}
          </View>
          <View style={styles.row}>
            {renderButton("7")}
            {renderButton("8")}
            {renderButton("9")}
          </View>
          <View style={styles.row}>
            {renderButton(".")}
            {renderButton("0")}
            <TouchableOpacity style={[styles.button]} onPress={handleClear}>
              <LinearGradient
                colors={["#4D5DFA", "#4D5DFA"]}
                style={styles.clearButtonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Text style={styles.clearButtonText}>Clear</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={styles.enterButton}
          onPress={handleDeposit}
          disabled={isBalanceLoading || depositMutation.isLoading}
        >
          <LinearGradient
            colors={["#4D5DFA", "#4D5DFA"]}
            style={styles.enterButtonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.enterButtonText}>
              {depositMutation.isLoading ? "Processing..." : "Enter"}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  content: {
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 45,
    flex: 1,
  },
  amountSection: {
    alignItems: "center",
    marginTop: 40,
  },
  label: {
    color: "#000000",
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
  },
  amount: {
    color: "#4D5DFA",
    fontSize: 36,
    fontWeight: "700",
    marginTop: 24,
    textAlign: "center",
  },
  balanceText: {
    color: "#6B7280",
    fontSize: 16,
    marginTop: 8,
    textAlign: "center",
  },
  divider: {
    width: 224,
    height: 1,
    backgroundColor: "#4D5DFA",
    marginTop: 6,
    marginBottom: 41,
  },
  keypad: {
    width: "100%",
    paddingHorizontal: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  button: {
    width: 89,
    height: 68,
    borderRadius: 17,
    overflow: "hidden",
  },
  buttonInner: {
    flex: 1,
    backgroundColor: "#F5F6FA",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#4D5DFA",
    fontSize: 24,
    fontWeight: "500",
    textAlign: "center",
  },
  sendButton: {
    backgroundColor: "transparent",
  },
  sendButtonGradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  sendButtonText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "500",
  },
  clearButtonGradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  clearButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
  enterButton: {
    width: 225,
    height: 68,
    borderRadius: 17,
    marginTop: 32,
    overflow: "hidden",
  },
  enterButtonGradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  enterButtonText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "500",
  },
  specialButton: {
    backgroundColor: "transparent",
  },
  specialButtonInner: {
    backgroundColor: "transparent",
  },
  specialButtonText: {
    color: "#FFFFFF",
  },
});

export default DepositScreen;
