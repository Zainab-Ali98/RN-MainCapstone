import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import Logout from "../components/Logout";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

// Mock data for testing
const mockTask = {
  taskName: "Clean Your Room",
  description:
    "Make sure to organize your toys and put away your clothes. Don't forget to vacuum the floor!",
  reward: 15,
  image:
    "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
};

const ViewTaskScreen = ({ task = mockTask }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Logout />
      <Image
        source={require("../../assets/background.png")}
        style={styles.backgroundImage}
        resizeMode="cover"
      />

      <Text style={styles.title}>Task Details</Text>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.mainContent}>
          <View style={styles.inputContainer}>
            <View style={styles.imageContainer}>
              <Image source={{ uri: task.image }} style={styles.image} />
            </View>

            <View style={styles.detailContainer}>
              <Text style={styles.label}>Task Name</Text>
              <View style={styles.input}>
                <Text style={styles.value}>{task.taskName}</Text>
              </View>
            </View>

            <View style={styles.detailContainer}>
              <Text style={styles.label}>Description</Text>
              <View style={[styles.input, styles.textArea]}>
                <Text style={styles.value}>{task.description}</Text>
              </View>
            </View>

            <View style={styles.priceContainer}>
              <Text style={styles.priceLabel}>Reward</Text>
              <View style={styles.priceInputContainer}>
                <Text style={styles.priceText}>{task.reward} kd</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.buttonSection}>
        <Image
          source={require("../../assets/bear.png")}
          style={styles.bearImage}
          resizeMode="contain"
        />
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => navigation.navigate("RewardsScreen")}
        >
          <Text style={styles.buttonText}>Mark as Complete</Text>
        </TouchableOpacity>
      </View>
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
  title: {
    color: "#ffffff",
    fontSize: 25,
    fontWeight: "800",
    letterSpacing: -0.333,
    textAlign: "center",
    marginTop: 60,
    marginBottom: 20,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 39,
    paddingTop: 20,
    paddingBottom: 100,
  },
  mainContent: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 20,
    marginTop: 30,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  inputContainer: {
    width: "100%",
    gap: 20,
    marginBottom: 20,
  },
  detailContainer: {
    width: "100%",
    gap: 8,
  },
  input: {
    width: "100%",
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#D9D9D9",
    paddingHorizontal: 16,
    fontSize: 14,
    color: "#000000",
    backgroundColor: "#ffffff",
    justifyContent: "center",
  },
  textArea: {
    height: 100,
    paddingTop: 16,
  },
  label: {
    color: "#000000",
    fontSize: 14,
    fontWeight: "600",
  },
  value: {
    color: "#000000",
    fontSize: 14,
  },
  priceContainer: {
    width: "100%",
    gap: 8,
  },
  priceLabel: {
    color: "#000000",
    fontSize: 14,
    fontWeight: "600",
  },
  priceInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#D9D9D9",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#ffffff",
  },
  priceText: {
    color: "#000000",
    fontSize: 14,
  },
  imageContainer: {
    width: "100%",
    height: 200,
    borderWidth: 1,
    borderColor: "#D9D9D9",
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#ffffff",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  buttonSection: {
    width: "100%",
    position: "absolute",
    bottom: 20,
    paddingHorizontal: 39,
  },
  bearImage: {
    width: 118,
    height: 78,
    position: "absolute",
    right: 50,
    top: -77,
    zIndex: 1,
  },
  submitButton: {
    width: "100%",
    height: 60,
    borderRadius: 28,
    backgroundColor: "#4D5DFA",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 20,
  },
});

export default ViewTaskScreen;
