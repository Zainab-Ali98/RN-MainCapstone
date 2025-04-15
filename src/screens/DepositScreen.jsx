import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Logout from "../components/Logout";

const { width } = Dimensions.get("window");

const DepositScreen = ({ navigation }) => {
  const [amount, setAmount] = useState("0");
  const insets = useSafeAreaInsets();

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
      <Logout />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.content,
          { paddingTop: insets.top + 20 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.amountSection}>
          <Text style={styles.label}>Enter Amount</Text>
          <Text style={styles.amount}>{amount} KD</Text>
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
          onPress={() => navigation.navigate("Profile")}
        >
          <LinearGradient
            colors={["#4D5DFA", "#4D5DFA"]}
            style={styles.enterButtonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.enterButtonText}> Enter </Text>
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
  divider: {
    width: 224,
    height: 1,
    backgroundColor: "#4D5DFA",
    marginTop: 44,
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
