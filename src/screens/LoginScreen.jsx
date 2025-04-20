import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";

import { useMutation } from "@tanstack/react-query";
import { login } from "../api/auth";

const { width, height } = Dimensions.get("window");

function LoginScreen({ navigation, setIsAuth, setRole }) {
  const [userInfo, setUserInfo] = useState({});
  const [error, setError] = useState(null);

  const { mutate, isError } = useMutation({
    mutationKey: ["login"],
    mutationFn: () => login(userInfo),
    onSuccess: (data) => {
      setIsAuth(true);
      setRole(data.role);
    },
    onError: (error) => {
      setError(error.message || "Something went wrong");
      console.log("\nError message: ", error, "\n");
    },
  });

  const handleRegisterPress = () => {
    navigation.navigate("Register");
  };

  const handleLoginPress = () => {
    if (!userInfo.email || !userInfo.password) {
      setError("Please enter email and password");
      return;
    }
    setError(null);
    mutate();
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/background.png")}
        style={styles.backgroundImage}
        resizeMode="cover"
      />

      <View style={styles.contentWrapper}>
        <View style={styles.content}>
          <View style={styles.inputCard}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#6B7280"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={(value) => {
                  setUserInfo({ ...userInfo, email: value });
                  setError(null);
                }}
              />

              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#6B7280"
                secureTextEntry
                onChangeText={(value) => {
                  setUserInfo({ ...userInfo, password: value });
                  setError(null);
                }}
              />
              {error && <Text style={styles.errorText}>{error}</Text>}
            </View>
          </View>

          <Image
            source={require("../../assets/bear.png")}
            style={styles.bearImage}
            resizeMode="contain"
          />

          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLoginPress}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <View style={styles.orContainer}>
            <View style={styles.line} />
            <Text style={styles.orText}>OR</Text>
            <View style={styles.line} />
          </View>

          <TouchableOpacity
            style={styles.registerLink}
            onPress={handleRegisterPress}
          >
            <Text style={styles.registerText}>
              Don't have an account? Register
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

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
  contentWrapper: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 39,
    marginTop: height * 0.15, // Added margin from top
  },
  content: {
    width: "100%",
    alignItems: "center",
  },
  inputCard: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    borderColor: "#E5E7EB",
    borderWidth: 1,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  inputContainer: {
    width: "100%",
    gap: 18,
  },
  input: {
    width: "100%",
    height: 50,
    borderRadius: 10,
    backgroundColor: "#F9FAFB",
    borderColor: "#CBD5E1",
    borderWidth: 1,
    paddingHorizontal: 16,
    fontSize: 14,
    color: "#111827",
  },
  loginButton: {
    width: "100%",
    height: 72,
    borderRadius: 28,
    backgroundColor: "#4D5DFA",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  bearImage: {
    width: 118,
    height: 78,
    marginTop: 28,
    marginBottom: -20,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 20,
  },
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#D9D9D9",
  },
  orText: {
    color: "#9E9E9E",
    marginHorizontal: 10,
    fontSize: 14,
  },
  registerLink: {
    padding: 10,
  },
  registerText: {
    color: "#4D5DFA",
    fontSize: 16,
    fontWeight: "500",
  },
  errorText: {
    color: "red",
    marginTop: 5,
    textAlign: "center",
  },
});

export default LoginScreen;
