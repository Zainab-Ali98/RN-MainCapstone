import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { verifyTask } from "../api/parents";

const { width } = Dimensions.get("window");

const TaskDetailsScreen = ({ route }) => {
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const task = route.params;
  const taskId = task?.taskId || task?.id; // Use taskId from route params or fallback to id
  console.log("Task ID:", task); // Log the taskId for debugging
  const mockDate = "2025-04-16";
  const mockDescription = [
    { id: 1, text: "Make your bed" },
    { id: 2, text: "Tidy your desk" },
    { id: 3, text: "Organize your books" },
    { id: 4, text: "Put away laundry" },
  ];
  // if no task picture
  const mockImage = "https://cdn-icons-png.flaticon.com/512/625/625083.png";

  // Mutation to update task status
  const verifyTaskMutation = useMutation({
    mutationKey: ["verifyTask"],
    mutationFn: ({ taskId, verifyData }) => verifyTask(taskId, verifyData),
    onSuccess: () => {
      queryClient.invalidateQueries(["fetchChildTask"]);
      navigation.navigate("ParentScreen");
    },
    onError: (err) => {
      Alert.alert(
        "Error",
        `Failed to update task: ${err.message || "Unknown error"}`
      );
      console.error("Update task status error:", err);
    },
  });

  // Split description into bullet points (assuming it's a string with newlines or commas)
  const getDescriptionBullets = (description) => {
    if (!description) return [];
    return description
      .split(/[\n,]+/)
      .map((text, index) => ({
        id: index + 1,
        text: text.trim(),
      }))
      .filter((item) => item.text);
  };
  const descriptionBullets = getDescriptionBullets(task.description);

  const handleVerifyTask = (status) => {
    const verifyData = {
      isAccepted: status,
    };
    verifyTaskMutation.mutate({ taskId, verifyData });
  };

  const renderProgress = () => {
    return (
      <View style={styles.lottieWrapper}>
        <LottieView
          source={require("../../assets/Walking.json")}
          autoPlay
          loop
          style={styles.lottie}
        />
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        {/* <Text style={styles.backText}>← Back</Text> */}
      </TouchableOpacity>

      <Text style={styles.title}>Task Details</Text>

      {renderProgress()}

      <View style={styles.card}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: task?.taskPicture?.trim() || mockImage }}
            style={styles.image}
          />
        </View>

        <Text style={styles.name}>{task?.taskName}</Text>

        <Text style={styles.sectionHeader}>Description</Text>
        {descriptionBullets.map((item) => (
          <View style={styles.bulletRow} key={item.id}>
            <View style={styles.bulletCircle} />
            <Text style={styles.bulletText}>{item.text}</Text>
          </View>
        ))}

        <Text style={styles.info}>
          <Text style={styles.label}>Assigned to: </Text>
          <Text style={styles.infoValue}>{task?.childName || "—"}</Text>
        </Text>

        <Text style={styles.info}>
          <Text style={styles.label}>Reward Amount: </Text>
          <Text style={styles.infoValue}>{task?.rewardAmount}</Text>
        </Text>

        <Text style={styles.info}>
          <Text style={styles.label}>Created At: </Text>
          <Text style={styles.infoValue}>{task?.dateCreated || mockDate}</Text>
        </Text>

        {task?.status.toLowerCase() === "verify" && (
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#10B981" }]}
              onPress={() => handleVerifyTask(true)}
              disabled={verifyTaskMutation.isLoading}
            >
              <Text style={styles.buttonText}>
                {verifyTaskMutation.isLoading
                  ? "Processing..."
                  : "Mark as Completed"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#EF4444" }]}
              onPress={() => handleVerifyTask(false)}
              disabled={verifyTaskMutation.isLoading}
            >
              <Text style={styles.buttonText}>
                {verifyTaskMutation.isLoading ? "Processing..." : "Reject Task"}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default TaskDetailsScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: 50,
    backgroundColor: "#F3F4F6",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#6B21A8",
    marginBottom: 100,
  },
  backButton: {
    position: "absolute",
    left: 20,
    top: 40,
  },
  backText: {
    color: "#6B21A8",
    fontSize: 19,
  },
  card: {
    width: width * 0.9,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#7C3AED",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
    marginTop: 40,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  name: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 2,
    textAlign: "center",
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "600",
    color: "#4B5563",
    marginBottom: 16,
  },
  bulletRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 13,
    paddingLeft: 10,
  },
  bulletCircle: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#7C3AED",
    marginRight: 13,
  },
  bulletText: {
    fontSize: 16,
    color: "#1F2937",
    fontWeight: "600",
  },
  info: {
    fontSize: 14,
    color: "#1F2937",
    marginBottom: 10,
  },
  label: {
    fontWeight: "600",
    color: "#6B21A8",
  },
  infoValue: {
    fontWeight: "400",
    color: "#1F2937",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
  lottieWrapper: {
    position: "absolute",
    top: 95,
    zIndex: 10,
  },
  lottie: {
    width: 280,
    height: 160,

    alignSelf: "center",
  },
});
