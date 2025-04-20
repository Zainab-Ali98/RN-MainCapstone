import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as ImagePicker from "react-native-image-picker";
import Logout from "../components/Logout";
import LottieView from "lottie-react-native";

const { width, height } = Dimensions.get("window");

// Import animations statically
const taskAnimations = {
  exercise: require("../../assets/Exercise Character.json"),
};

const mockTasks = [
  {
    id: "1",
    title: "Complete homework",
    reward: "5.00",
    points: 100,
    animation: "exercise",
  },
  {
    id: "2",
    title: "Clean your room",
    reward: "3.00",
    points: 75,
    animation: "boy",
  },
  {
    id: "3",
    title: "Help with dishes",
    reward: "4.00",
    points: 50,
    animation: "girl",
  },
];

const TaskListScreen = ({ navigation }) => {
  const [selectedTask, setSelectedTask] = useState(null);

  const handleImagePick = async (taskId) => {
    try {
      const response = await ImagePicker.launchImageLibrary({
        mediaType: "photo",
        includeBase64: false,
        maxHeight: 2000,
        maxWidth: 2000,
      });

      if (response.didCancel) return;
      Alert.alert("Great job", "Photo uploaded! Waiting for parent to check.");
    } catch (error) {
      Alert.alert("Oops!", "Something went wrong. Try again?");
    }
  };

  const handleCreateGoal = () => {
    navigation.navigate("CreateNewGoal");
  };

  const handleTaskPress = (task) => {
    navigation.navigate("ViewTaskScreen", { task });
  };

  const handleBalancePress = () => {
    navigation.navigate("CurrentBalanceScreen");
  };

  return (
    <View style={styles.container}>
      <Logout />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {/* Welcome Message */}
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeText}>Welcome Back, Champ! 🌟</Text>
          </View>

          {/* Balance Card */}
          <TouchableOpacity
            style={styles.balanceCardContainer}
            onPress={() => navigation.navigate("CurrentBalanceScreen")}
          >
            <View style={styles.balanceCard}>
              <LottieView
                source={require("../../assets/coin.json")}
                autoPlay
                loop
                style={styles.balanceAnimation}
              />

              <Text style={styles.balanceTitle}>Your Treasure Box</Text>
              <Text style={styles.balanceAmount}>225 KWD</Text>
            </View>
          </TouchableOpacity>

          {/* <TouchableOpacity
              style={styles.balanceCardContainer}
              onPress={handleBalancePress}
              activeOpacity={0.7}
            >
              <LinearGradient
                colors={["#FFFFFF", "#F8F9FF"]}
                style={styles.balanceCard}
              >
                <LottieView
                  source={require("../../assets/coin.json")}
                  autoPlay
                  loop
                  style={styles.balanceAnimation}
                />
                <Text style={styles.balanceTitle}>Your Treasure Box</Text>
                <Text style={styles.balanceAmount}>225 KWD</Text>
              </LinearGradient>
            </TouchableOpacity> */}
          {/* Create Goal Button */}
          <TouchableOpacity
            style={styles.createGoalButton}
            onPress={() => navigation.navigate("CreateNewGoal")}
          >
            <LottieView
              source={require("../../assets/star.json")}
              autoPlay
              loop
              style={styles.starAnimation}
            />
            <Text style={styles.createGoalText}>Start New Adventure!</Text>
          </TouchableOpacity>

          {/* Mission Title */}
          <Text style={styles.missionTitle}>Your Missions</Text>

          {/* Task Cards */}
          <View style={styles.taskCardsContainer}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalScrollContent}
            >
              {mockTasks.map((task) => (
                <TouchableOpacity
                  key={task.id}
                  style={[
                    styles.taskCard,
                    { backgroundColor: getRandomColor() },
                    selectedTask === task.id && styles.selectedTask,
                  ]}
                  onPress={() =>
                    navigation.navigate("ViewTaskScreen", { task })
                  }
                >
                  <LottieView
                    source={require("../../assets/Exercise Character.json")}
                    autoPlay
                    loop
                    style={styles.taskAnimation}
                  />
                  <Text style={styles.taskTitle}>{task.title}</Text>
                  <View style={styles.pointsBadge}>
                    <Text style={styles.pointsText}>
                      +{task.points} 3yali Points
                    </Text>
                  </View>
                  <View style={styles.rewardContainer}>
                    <Text style={styles.rewardAmount}>{task.reward} KD</Text>
                    <Text style={styles.rewardLabel}>Reward</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const getRandomColor = () => {
  const colors = [
    "#FF9B9B", // Soft Red
    "#94D8F6", // Sky Blue
    "#B5E6B5", // Mint Green
    "#FFB347", // Orange
    "#C1A7E2", // Purple
    "#FFD93D", // Yellow
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8FF",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
  },
  welcomeContainer: {
    alignItems: "center",
    marginBottom: 25,
  },
  welcomeText: {
    fontSize: 25,
    fontWeight: "700",
    color: "#6C63FF",
    textAlign: "center",
    marginTop: 10,
  },
  balanceCardContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  balanceCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    padding: 20,
    width: width * 0.9,
    alignItems: "center",
    shadowColor: "#6C63FF",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  balanceAnimation: {
    width: 80,
    height: 80,
  },
  balanceTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#6C63FF",
    marginTop: 10,
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: "700",
    color: "#FF6B6B",
    marginTop: 5,
  },
  createGoalButton: {
    backgroundColor: "#6C63FF",
    borderRadius: 20,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
    shadowColor: "#4A44C9",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
    width: "100%",
    marginHorizontal: 4,
  },
  starAnimation: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  createGoalText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
  },
  missionTitle: {
    fontSize: 26,
    fontWeight: "700",
    color: "#6C63FF",
    marginBottom: 20,
    textAlign: "center",
  },
  taskCardsContainer: {
    marginBottom: 20,
  },
  horizontalScrollContent: {
    paddingRight: 20,
  },
  taskCard: {
    borderRadius: 25,
    padding: 20,
    marginRight: 15,
    width: width * 0.8,
    height: 250,
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
  },
  selectedTask: {
    borderWidth: 3,
    borderColor: "#FFD93D",
  },
  taskAnimation: {
    width: 80,
    height: 80,
    alignSelf: "center",
  },
  taskTitle: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  pointsBadge: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    padding: 10,
    borderRadius: 15,
    alignSelf: "center",
    marginVertical: 10,
  },
  pointsText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
  },
  rewardContainer: {
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    padding: 10,
    borderRadius: 15,
  },
  rewardAmount: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "700",
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  rewardLabel: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    opacity: 0.9,
  },
});

export default TaskListScreen;
