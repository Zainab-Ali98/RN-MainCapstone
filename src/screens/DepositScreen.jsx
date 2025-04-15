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
      <LinearGradient
        colors={["#1433FF", "rgba(217, 217, 217, 0)"]}
        style={[styles.header, { paddingTop: insets.top + 20 }]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.headerTitle}>Deposit</Text>
      </LinearGradient>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.label}>Enter Amount</Text>
        <Text style={styles.amount}>{amount} KD</Text>

        <View style={styles.divider} />

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
            <TouchableOpacity
              style={[styles.button, styles.sendButton]}
              onPress={() => navigation.navigate("Profile")}
            >
              <LinearGradient
                colors={["#1433FF", "#4D5DFA"]}
                style={styles.sendButtonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Text style={styles.sendButtonText}>→</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
          <LinearGradient
            colors={["#1433FF", "#4D5DFA"]}
            style={styles.clearButtonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.clearButtonText}>Clear</Text>
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
  header: {
    height: 236,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  headerTitle: {
    color: "#FFF",
    fontSize: 25,
    fontWeight: "800",
    letterSpacing: -0.333,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 45,
    paddingBottom: 45,
  },
  label: {
    color: "#2747FD",
    fontSize: 18,
    fontWeight: "400",
    textAlign: "center",
  },
  amount: {
    color: "#B6BFFF",
    fontSize: 36,
    fontWeight: "700",
    marginTop: 24,
    textAlign: "center",
  },
  divider: {
    width: 224,
    height: 1,
    backgroundColor: "#DEE1EF",
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
    color: "#2743FD",
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
  clearButton: {
    width: 225,
    height: 68,
    borderRadius: 17,
    marginTop: 32,
    overflow: "hidden",
  },
  clearButtonGradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  clearButtonText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "500",
    textAlign: "center",
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
