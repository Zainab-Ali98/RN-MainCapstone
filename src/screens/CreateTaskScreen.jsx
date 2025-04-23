import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Platform,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Logout from "../components/Logout";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTaskForChild } from "../api/parents";

const { width, height } = Dimensions.get("window");

const CreateTaskScreen = ({ route }) => {
  const { childId } = route.params;
  const queryClient = useQueryClient();
  const navigation = useNavigation();
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [reward, setReward] = useState(0);
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const increaseReward = () => {
    setReward(reward + 1);
  };

  const decreaseReward = () => {
    if (reward > 0) {
      setReward(reward - 1);
    }
  };

  // Mutation for creating a task
  const createTaskMutation = useMutation({
    mutationFn: ({ taskData, image }) => createTaskForChild(taskData, image),
    onSuccess: () => {
      queryClient.invalidateQueries(["fetchTasks"]);
      queryClient.invalidateQueries(["childTasks", childId]);
      Alert.alert("Success", "Task created successfully!", [
        {
          text: "OK",
          onPress: () => navigation.navigate("ParentScreen"),
        },
      ]);
      // Reset form
      setTaskName("");
      setDescription("");
      setReward(0);
      setImage(null);
    },
    onError: (err) => {
      Alert.alert(
        "Error",
        `Failed to create task: ${err.message || "Unknown error"}`
      );
      console.error("Create task error:", err);
    },
  });

  const handleSubmit = () => {
    // Validate inputs
    if (!taskName.trim()) {
      Alert.alert("Invalid Input", "Task name is required.");
      return;
    }
    if (reward <= 0) {
      Alert.alert("Invalid Input", "Reward must be greater than 0.");
      return;
    }
    // Prepare task data
    const taskData = {
      TaskName: taskName,
      TaskDescription: description ?? "Task Description.",
      RewardAmount: reward,
      ChildId: childId,
    };

    // Trigger mutation
    createTaskMutation.mutate({ taskData, image });
  };

  return (
    <View style={styles.container}>
      {/* <Logout /> */}
      <Image
        source={require("../../assets/background.png")}
        style={styles.backgroundImage}
        resizeMode="cover"
      />

      <Text style={styles.title}>Create Task</Text>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.mainContent}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={taskName}
              onChangeText={setTaskName}
              placeholder="Task Name"
              placeholderTextColor="#9E9E9E"
            />

            <TextInput
              style={[styles.input, styles.textArea]}
              value={description}
              onChangeText={setDescription}
              placeholder="Description"
              placeholderTextColor="#9E9E9E"
              multiline={true}
              numberOfLines={4}
            />

            <View style={styles.rewardContainer}>
              <Text style={styles.rewardLabel}>Reward</Text>
              <View style={styles.rewardInputContainer}>
                <Text style={styles.rewardText}>{reward} KWD</Text>
                <View style={styles.rewardButtons}>
                  <TouchableOpacity
                    style={styles.rewardButton}
                    onPress={decreaseReward}
                  >
                    <Text style={styles.rewardButtonText}>−</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.rewardButton}
                    onPress={increaseReward}
                  >
                    <Text style={styles.rewardButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
              {image ? (
                <Image source={{ uri: image }} style={styles.image} />
              ) : (
                <View style={styles.placeholderImage}>
                  <Text style={styles.placeholderText}>
                    Tap to select an image
                  </Text>
                </View>
              )}
            </TouchableOpacity>
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
          onPress={handleSubmit}
          disabled={createTaskMutation.isLoading}
        >
          <Text style={styles.buttonText}>
            {createTaskMutation.isLoading ? "Creating..." : "Create Task"}
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
    marginBottom: 20,
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
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
    paddingTop: 16,
  },
  rewardContainer: {
    width: "100%",
    gap: 8,
  },
  rewardLabel: {
    color: "#000000",
    fontSize: 14,
    fontWeight: "600",
  },
  rewardInputContainer: {
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
  rewardText: {
    color: "#000000",
    fontSize: 14,
  },
  rewardButtons: {
    flexDirection: "row",
    gap: 16,
  },
  rewardButton: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 4,
  },
  rewardButtonText: {
    fontSize: 18,
    color: "#000000",
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
  placeholderImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  placeholderText: {
    color: "#000000",
    fontSize: 14,
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

export default CreateTaskScreen;
