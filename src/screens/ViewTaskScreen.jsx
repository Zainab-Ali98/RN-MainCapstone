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
import { useNavigation, useRoute } from "@react-navigation/native";
import { useQuery, useMutation } from "@tanstack/react-query";
import { tasks, taskComplete } from "../api/children";

const { width, height } = Dimensions.get("window");

const ViewTaskScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { taskId } = route.params;
  //console.log("taskId from route params:", taskId);

  const {
    data: taskList,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: tasks,
  });

  const { mutate: markComplete, isLoading: isCompleting } = useMutation({
    mutationFn: (taskId) => taskComplete(taskId),
    onSuccess: () => {
      navigation.navigate("TaskListScreen");
    },
    onError: () => {
      alert("Failed to mark task as complete");
    },
  });

  const task = taskList?.find((t) => String(t.taskId) === String(taskId));

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <Text style={styles.loadingText}>Loading task...</Text>
      </View>
    );
  }

  if (isError || !task) {
    return (
      <View style={styles.centered}>
        <Text style={styles.loadingText}>Task not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
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
              <Image source={{ uri: task.taskPicture }} style={styles.image} />
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
                <Text style={styles.value}>{task.taskDescription}</Text>
              </View>
            </View>

            <View style={styles.priceContainer}>
              <Text style={styles.priceLabel}>Reward</Text>
              <View style={styles.priceInputContainer}>
                <Text style={styles.value}>{task.rewardAmount} KD</Text>
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
          onPress={() => {
            //console.log("Marking task as complete with taskId:", taskId);
            markComplete(taskId);
          }}
          disabled={isCompleting}
        >
          <Text style={styles.buttonText}>
            {isCompleting ? "Submitting..." : "Mark as Complete"}
          </Text>
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
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
    color: "#444",
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
    shadowOffset: { width: 0, height: 2 },
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
    justifyContent: "center",
    backgroundColor: "#ffffff",
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
