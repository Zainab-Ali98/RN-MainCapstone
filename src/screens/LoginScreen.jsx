import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
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
  // const handleLoginPress = () => {
  //   navigation.navigate("Parent");
  // };

  // const handleLoginChildPress = () => {
  //   navigation.navigate("Child");
  // };
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

      <Text style={styles.title}>LOGIN</Text>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#9E9E9E"
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
              placeholderTextColor="#9E9E9E"
              secureTextEntry
              onChangeText={(value) => {
                setUserInfo({ ...userInfo, password: value });
                setError(null);
              }}
            />
            {error && <Text style={styles.errorText}>{error}</Text>}
          </View>

          <Image
            source={require("../../assets/bear.png")}
            style={styles.bearImage}
            resizeMode="contain"
          />

          <TouchableOpacity
            style={styles.loginButton}
            // onPress={handleLoginPress}
            // onPress={handleLoginChildPress}
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
      </ScrollView>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: 200,
  },
  content: {
    flex: 1,
    paddingHorizontal: 39,
    alignItems: "center",
  },
  inputContainer: {
    width: "100%",
    gap: 37,
    marginTop: 142,
  },
  input: {
    width: "100%",
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#D9D9D9",
    paddingHorizontal: 16,
    fontSize: 14,
    color: "#000",
    backgroundColor: "transparent",
  },
  loginButton: {
    width: "100%",
    height: 72,
    borderRadius: 28,
    backgroundColor: "#4D5DFA",
    justifyContent: "center",
    alignItems: "center",
  },
  bearImage: {
    width: 118,
    height: 78,
    marginTop: 28,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 20,
  },
  registerLink: {
    marginTop: 20,
    padding: 10,
  },
  registerText: {
    color: "#4D5DFA",
    fontSize: 16,
    textAlign: "center",
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
  errorText: {
    color: "red",
    marginTop: 5,
  },
});

export default LoginScreen;
