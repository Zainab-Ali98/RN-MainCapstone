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
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const CreateTaskScreen = ({ navigation }) => {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [reward, setReward] = useState(12);
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

  const handleSubmit = () => {
    navigation.navigate("ViewTask", {
      taskName,
      description,
      reward,
      image,
    });
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/background.png")}
        style={styles.backgroundImage}
        resizeMode="cover"
      />

      <Text style={styles.title}>CREATE TASK</Text>

      <View style={styles.content}>
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
              <Text style={styles.rewardText}>{reward} kd</Text>
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

        <Image
          source={require("../../assets/bear.png")}
          style={styles.bearImage}
          resizeMode="contain"
        />

        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => navigation.navigate("Parent")}
        >
          <Text style={styles.buttonText}>Create Task</Text>
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
  inputContainer: {
    width: "100%",
    gap: 20,
    marginTop: 20,
  },
  input: {
    width: "100%",
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#D9D9D9",
    paddingHorizontal: 16,
    fontSize: 14,
    color: "#9E9E9E",
    backgroundColor: "transparent",
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
    backgroundColor: "rgba(255, 255, 255, 0.1)",
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
  },
  image: {
    width: "100%",
    height: "100%",
  },
  placeholderImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  placeholderText: {
    color: "#000000",
    fontSize: 14,
  },
  // bearImage: {
  //   width: 100,
  //   height: 70,
  //   // position: "absolute",
  //   right: 0,
  //   // top: -50,
  //   zIndex: 1,
  // },
  bearImage: {
    width: 118,
    height: 78,
    marginTop: 28,
  },
  submitButton: {
    width: "100%",
    height: 60,
    borderRadius: 28,
    backgroundColor: "#4D5DFA",
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 20,
    marginBottom: 30,
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
    top: -67,
    zIndex: 1,
  },
});

export default CreateTaskScreen;
