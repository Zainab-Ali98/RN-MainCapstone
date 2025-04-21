

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
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { CreateSavingsGoals } from "../api/children";
import { useMutation } from "@tanstack/react-query";

const { width, height } = Dimensions.get("window");

const CreateNewGoal = () => {
  const navigation = useNavigation();
  const [goalInfo, setGoalInfo] = useState({});
  const [image, setImage] = useState("");

  const { mutate } = useMutation({
    mutationKey: ["CreateSavingsGoals"],
    mutationFn: () => CreateSavingsGoals(goalInfo, image),
    onSuccess: () => {
      alert("Goal created successfully!");
      navigation.navigate("ProgressGoalScreen");
    },
    onError: () => {
      alert("Error creating goal. Please try again.");
    },
  });

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/background.png")}
        style={styles.backgroundImage}
        resizeMode="cover"
      />

      <Text style={styles.title}>Create New Goal</Text>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.mainContent}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Goal Name"
              placeholderTextColor="#9E9E9E"
              onChangeText={(value) => {
                setGoalInfo({ ...goalInfo, GoalName: value });
              }}
            />

            <View style={styles.priceContainer}>
              <Text style={styles.priceLabel}>Price</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter amount (kd)"
                placeholderTextColor="#9E9E9E"
                keyboardType="numeric"
                onChangeText={(value) => {
                  setGoalInfo({ ...goalInfo, TargetAmount: parseFloat(value) });
                }}
              />
            </View>

            <TouchableOpacity
              style={styles.imageContainer}
              onPress={() => {
                pickImage();
              }}
            >
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

            {/* {error && <Text style={styles.errorText}>{error}</Text>} */}
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
            mutate();
          }}
        >
          <Text style={styles.buttonText}>Create Goal</Text>
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
  priceContainer: {
    width: "100%",
    gap: 8,
  },
  priceLabel: {
    color: "#000000",
    fontSize: 14,
    fontWeight: "600",
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
  errorText: {
    color: "red",
    fontSize: 14,
    textAlign: "center",
  },
});

export default CreateNewGoal;
