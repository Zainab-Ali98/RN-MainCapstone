import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const { width, height } = Dimensions.get("window");

// Mock data for testing
const mockTask = {
  taskName: "Clean Your Room",
  description: "Make sure to organize your toys and put away your clothes. Don't forget to vacuum the floor!",
  reward: 15,
  image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
};

const ViewTaskScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/background.png")}
        style={styles.backgroundImage}
        resizeMode="cover"
      />

      <Text style={styles.title}>TASK DETAILS</Text>

      <View style={styles.content}>
        <View style={styles.taskContainer}>
          <Image
            source={{ uri: mockTask.image }}
            style={styles.taskImage}
            resizeMode="cover"
          />

          <View style={styles.detailsContainer}>
            <View style={styles.detailGroup}>
              <Text style={styles.label}>Task Name</Text>
              <View style={styles.detailBox}>
                <Text style={styles.value}>{mockTask.taskName}</Text>
              </View>
            </View>

            <View style={styles.detailGroup}>
              <Text style={styles.label}>Description</Text>
              <View style={styles.detailBox}>
                <Text style={styles.value}>{mockTask.description}</Text>
              </View>
            </View>

            <View style={styles.detailGroup}>
              <Text style={styles.label}>Reward</Text>
              <View style={styles.detailBox}>
                <Text style={styles.rewardValue}>{mockTask.reward} kd</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.completeButton}>
            <Text style={styles.buttonText}>Mark as Complete</Text>
          </TouchableOpacity>
          <Image
            source={require("../../assets/bear.png")}
            style={styles.bearImage}
            resizeMode="contain"
          />
        </View>
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
    position: "absolute",
    top: 140,
    alignSelf: "center",
    color: "#ffffff",
    fontSize: 25,
    fontWeight: "800",
    letterSpacing: -0.333,
    zIndex: 10,
  },
  content: {
    flex: 1,
    paddingHorizontal: 39,
    paddingTop: 180,
    alignItems: "center",
    justifyContent: "space-between",
  },
  taskContainer: {
    width: "100%",
    gap: 20,
    marginTop: 20,
  },
  taskImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 20,
  },
  detailsContainer: {
    width: "100%",
    gap: 20,
  },
  detailGroup: {
    marginBottom: 20,
  },
  label: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  detailBox: {
    borderWidth: 1,
    borderColor: "#4D5DFA",
    borderRadius: 8,
    padding: 16,
    backgroundColor: "transparent",
  },
  value: {
    color: "#000000",
    fontSize: 14,
  },
  rewardValue: {
    color: "#000000",
    fontSize: 20,
    fontWeight: "bold",
  },
  buttonContainer: {
    width: "100%",
    position: "relative",
    marginTop: 20,
    marginBottom: 20,
  },
  completeButton: {
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
  bearImage: {
    width: 100,
    height: 70,
    position: "absolute",
    right: 0,
    top: -50,
    zIndex: 1,
  },
});

export default ViewTaskScreen;
import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const { width, height } = Dimensions.get("window");

// Mock data for testing
const mockTask = {
  taskName: "Clean Your Room",
  description: "Make sure to organize your toys and put away your clothes. Don't forget to vacuum the floor!",
  reward: 15,
  image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
};

const ViewTaskScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/background.png")}
        style={styles.backgroundImage}
        resizeMode="cover"
      />

      <Text style={styles.title}>TASK DETAILS</Text>

      <View style={styles.content}>
        <View style={styles.taskContainer}>
          <Image
            source={{ uri: mockTask.image }}
            style={styles.taskImage}
            resizeMode="cover"
          />

          <View style={styles.detailsContainer}>
            <View style={styles.detailGroup}>
              <Text style={styles.label}>Task Name</Text>
              <View style={styles.detailBox}>
                <Text style={styles.value}>{mockTask.taskName}</Text>
              </View>
            </View>

            <View style={styles.detailGroup}>
              <Text style={styles.label}>Description</Text>
              <View style={styles.detailBox}>
                <Text style={styles.value}>{mockTask.description}</Text>
              </View>
            </View>

            <View style={styles.detailGroup}>
              <Text style={styles.label}>Reward</Text>
              <View style={styles.detailBox}>
                <Text style={styles.rewardValue}>{mockTask.reward} kd</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.completeButton}>
            <Text style={styles.buttonText}>Mark as Complete</Text>
          </TouchableOpacity>
          <Image
            source={require("../../assets/bear.png")}
            style={styles.bearImage}
            resizeMode="contain"
          />
        </View>
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
    position: "absolute",
    top: 140,
    alignSelf: "center",
    color: "#ffffff",
    fontSize: 25,
    fontWeight: "800",
    letterSpacing: -0.333,
    zIndex: 10,
  },
  content: {
    flex: 1,
    paddingHorizontal: 39,
    paddingTop: 180,
    alignItems: "center",
    justifyContent: "space-between",
  },
  taskContainer: {
    width: "100%",
    gap: 20,
    marginTop: 20,
  },
  taskImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 20,
  },
  detailsContainer: {
    width: "100%",
    gap: 20,
  },
  detailGroup: {
    marginBottom: 20,
  },
  label: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  detailBox: {
    borderWidth: 1,
    borderColor: "#4D5DFA",
    borderRadius: 8,
    padding: 16,
    backgroundColor: "transparent",
  },
  value: {
    color: "#000000",
    fontSize: 14,
  },
  rewardValue: {
    color: "#000000",
    fontSize: 20,
    fontWeight: "bold",
  },
  buttonContainer: {
    width: "100%",
    position: "relative",
    marginTop: 20,
    marginBottom: 20,
  },
  completeButton: {
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
  bearImage: {
    width: 100,
    height: 70,
    position: "absolute",
    right: 0,
    top: -50,
    zIndex: 1,
  },
});

export default ViewTaskScreen;
