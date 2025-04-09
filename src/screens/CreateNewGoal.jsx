import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";

const { width, height } = Dimensions.get("window");

const CreateNewGoal = () => {
  const [goalName, setGoalName] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = () => {
    // Handle form submission
    console.log({
      goalName,
      price,
    });
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/background.png")}
        style={styles.backgroundImage}
        resizeMode="cover"
      />

      <Text style={styles.title}>CREATE NEW GOAL</Text>

      <View style={styles.content}>
        <View style={styles.formContainer}>
          <View style={styles.detailGroup}>
            <Text style={styles.label}>Goal Name</Text>
            <View style={styles.detailBox}>
              <TextInput
                style={styles.input}
                value={goalName}
                onChangeText={setGoalName}
                placeholder="Enter goal name"
                placeholderTextColor="#000000"
              />
            </View>
          </View>

          <View style={styles.detailGroup}>
            <Text style={styles.label}>Price</Text>
            <View style={styles.detailBox}>
              <TextInput
                style={styles.input}
                value={price}
                onChangeText={setPrice}
                placeholder="Enter price"
                placeholderTextColor="#000000"
                keyboardType="numeric"
              />
            </View>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Create Goal</Text>
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
    paddingTop: 420,
    alignItems: "center",
    justifyContent: "space-between",
  },
  formContainer: {
    width: "100%",
    gap: 20,
    marginTop: 100,
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
  input: {
    color: "#000000",
    fontSize: 14,
  },
  buttonContainer: {
    width: "100%",
    position: "relative",
    marginTop: 20,
    marginBottom: 20,
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
  bearImage: {
    width: 100,
    height: 70,
    position: "absolute",
    right: 0,
    top: -65,
    zIndex: 1,
  },
});

export default CreateNewGoal; 