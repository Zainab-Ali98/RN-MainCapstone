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

const { width, height } = Dimensions.get("window");

const mockChildren = [
  { id: "1", name: "Sarah", age: "10", balance: "150.00" },
  { id: "2", name: "Ahmed", age: "8", balance: "75.50" },
];

const ChildListScreen = () => {
  return (
    <View style={styles.container}>
      
      <Image
        source={require("../../assets/background.png")}
        style={styles.backgroundImage}
        resizeMode="cover"
      />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <Text style={styles.title}>MY CHILDREN</Text>

          <View style={styles.mainContent}>
            {mockChildren.map((child) => (
              <TouchableOpacity key={child.id} style={styles.childCard}>
                <View style={styles.childInfo}>
                  <Text style={styles.childName}>{child.name}</Text>
                  <Text style={styles.childAge}>{child.age} years old</Text>
                </View>
                <View style={styles.balanceContainer}>
                  <Text style={styles.balanceLabel}>Balance</Text>
                  <Text style={styles.balanceAmount}>{child.balance} KD</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.buttonSection}>
            <Image
              source={require("../../assets/bear.png")}
              style={styles.bearImage}
              resizeMode="contain"
            />
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Add Child</Text>
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
  content: {
    flex: 1,
    paddingHorizontal: 39,
    paddingTop: 60,
    paddingBottom: 20,
  },
  title: {
    color: "#ffffff",
    fontSize: 25,
    fontWeight: "800",
    letterSpacing: -0.333,
    marginBottom: 30,
    textAlign: "center",
  },
  mainContent: {
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
    gap: 16,
  },
  childCard: {
    backgroundColor: "#F3F4F6",
    borderRadius: 16,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  childInfo: {
    flex: 1,
  },
  childName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#174C4F",
    marginBottom: 4,
  },
  childAge: {
    fontSize: 14,
    color: "#6B7280",
  },
  balanceContainer: {
    alignItems: "flex-end",
  },
  balanceLabel: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 4,
  },
  balanceAmount: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4D5DFA",
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
});

export default ChildListScreen;
