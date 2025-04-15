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

const { width, height } = Dimensions.get("window");

const mockTasks = [
  {
    id: "1",
    title: "Complete homework",
    reward: "5.00",
    dueDate: "Today",
    statusStep: 2, // 0: Start, 1: Doing, 2: Verified, 3: Done
    requiresPhoto: true,
    verified: false,
    points: 100,
  },
  {
    id: "2",
    title: "Clean your room",
    reward: "3.00",
    dueDate: "Tomorrow",
    statusStep: 1,
    requiresPhoto: true,
    verified: false,
    points: 75,
  },
  {
    id: "3",
    title: "Help with dishes",
    reward: "4.00",
    dueDate: "Today",
    statusStep: 0,
    requiresPhoto: false,
    verified: false,
    points: 50,
  },
];

const statusSteps = ["Start", "Doing", "Verified", "Done"];

const TaskListScreen = ({ navigation }) => {
  const handlTaskListPress = () => {
    navigation.navigate("TaskProfile");
  };

  const handlRewarsPress = () => {
    navigation.navigate("Reward");
  };
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

  return (
    <View style={styles.container}>
      <Logout />
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
          <View style={styles.headerSection}>
            <Text style={styles.title}>My Missions</Text>
            <View style={styles.pointsContainer}>
              <Text style={styles.pointsLabel}>Total Points:</Text>
              <Text style={styles.pointsValue}>225</Text>
            </View>
          </View>

          <View style={styles.mainContent}>
            {mockTasks.map((task) => (
              <TouchableOpacity
                key={task.id}
                style={[
                  styles.taskCard,
                  selectedTask === task.id && styles.selectedTask,
                ]}
                // onPress={() => setSelectedTask(task.id)}
                onPress={() => handlTaskListPress()} 
              >
                <View style={styles.taskHeader}>
                  <View style={styles.taskTitleContainer}>
                    <Text style={styles.taskTitle}>{task.title}</Text>
                    <View style={styles.pointsBadge}>
                      <Text style={styles.pointsText}>+{task.points} pts</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.progressMap}>
                  {statusSteps.map((step, index) => (
                    <View key={index} style={styles.progressStep}>
                      <View
                        style={[
                          styles.circle,
                          index <= task.statusStep ? styles.circleActive : {},
                        ]}
                      />
                      <Text
                        style={[
                          styles.stepLabel,
                          index <= task.statusStep
                            ? styles.stepLabelActive
                            : {},
                        ]}
                      >
                        {step}
                      </Text>
                      {index < statusSteps.length - 1 && (
                        <View
                          style={[
                            styles.line,
                            index < task.statusStep ? styles.lineActive : {},
                          ]}
                        />
                      )}
                    </View>
                  ))}
                </View>

                <View style={styles.taskDetails}>
                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Complete by:</Text>
                    <Text style={styles.detailValue}>{task.dueDate}</Text>
                  </View>
                  <View style={styles.rewardContainer}>
                    <Text style={styles.rewardAmount}>{task.reward} KD</Text>
                    <Text style={styles.rewardLabel}>Reward</Text>
                  </View>
                </View>

                {task.requiresPhoto && (
                  <View style={styles.photoSection}>
                    <TouchableOpacity
                      style={styles.uploadButton}
                      onPress={() => handleImagePick(task.id)}
                    >
                      <View style={styles.uploadButtonContent}>
                        <Image
                          source={require("../../assets/camera.png")}
                          style={styles.cameraIcon}
                          resizeMode="contain"
                        />
                        <Text style={styles.uploadButtonText}>
                          Add Proof Photo
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.buttonSection}>
            <Image
              source={require("../../assets/purple.png")}
              style={styles.bearImage}
              resizeMode="contain"
            />
            <TouchableOpacity
              style={[styles.button, !selectedTask && styles.buttonDisabled]}
              disabled={!selectedTask}
            >
              <Text style={styles.buttonText}
              onPress={() => handlRewarsPress()} >Complete Mission</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ffffff" },
  backgroundImage: {
    position: "absolute",
    width: width,
    height: height * 0.5,
    top: 0,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  title: {
    color: "#ffffff",
    fontSize: 28,
    fontWeight: "800",
    letterSpacing: 1,
  },
  pointsContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    padding: 10,
    borderRadius: 12,
    alignItems: "center",
  },
  pointsLabel: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "600",
  },
  pointsValue: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "700",
  },
  mainContent: {
    backgroundColor: "#ffffff",
    borderRadius: 24,
    padding: 16,
    marginBottom: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    gap: 16,
  },
  taskCard: {
    backgroundColor: "#F8F9FF",
    borderRadius: 20,
    padding: 16,
    borderWidth: 2,
    borderColor: "#E5E7EB",
  },
  selectedTask: {
    borderColor: "#4D5DFA",
    backgroundColor: "#F0F3FF",
  },
  taskHeader: { marginBottom: 12 },
  taskTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#174C4F",
    flex: 1,
  },
  pointsBadge: {
    backgroundColor: "#FFD700",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  pointsText: {
    color: "#000000",
    fontSize: 12,
    fontWeight: "600",
  },
  progressMap: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    marginTop: 10,
  },
  progressStep: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  circle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#D1D5DB",
  },
  circleActive: {
    backgroundColor: "#4D5DFA",
  },
  stepLabel: {
    fontSize: 10,
    marginLeft: 4,
    color: "#9CA3AF",
  },
  stepLabelActive: {
    color: "#4D5DFA",
    fontWeight: "700",
  },
  line: {
    flex: 1,
    height: 2,
    backgroundColor: "#D1D5DB",
    marginHorizontal: 4,
  },
  lineActive: {
    backgroundColor: "#4D5DFA",
  },
  taskDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  detailItem: {},
  detailLabel: {
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "500",
  },
  detailValue: {
    fontSize: 14,
    color: "#174C4F",
    fontWeight: "600",
  },
  rewardContainer: { alignItems: "center" },
  rewardAmount: {
    fontSize: 18,
    color: "#4D5DFA",
    fontWeight: "700",
  },
  rewardLabel: {
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "500",
  },
  photoSection: { marginBottom: 12 },
  uploadButton: {
    backgroundColor: "#4D5DFA15",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  uploadButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  cameraIcon: {
    width: 24,
    height: 24,
  },
  uploadButtonText: {
    color: "#4D5DFA",
    fontSize: 14,
    fontWeight: "600",
  },
  verificationSection: {
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    paddingTop: 12,
  },
  verificationText: {
    fontSize: 14,
    textAlign: "center",
    fontWeight: "500",
    color: "#F59E0B",
  },
  verifiedText: {
    color: "#22C55E",
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
  buttonDisabled: {
    backgroundColor: "#A0A0A0",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "700",
  },
});

export default TaskListScreen;
