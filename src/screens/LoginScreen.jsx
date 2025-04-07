import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const { width, height } = Dimensions.get("window");

function LoginScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/background.png")}
        style={styles.backgroundImage}
        resizeMode="cover"
      />

      <View style={styles.content}>
        <Text style={styles.title}>LOGIN</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#9E9E9E"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#9E9E9E"
            secureTextEntry
          />
        </View>

        <Image
          source={require("../../assets/bear.png")}
          style={styles.bearImage}
          resizeMode="contain"
        />

        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
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
  content: {
    flex: 1,
    paddingHorizontal: 39,
    paddingTop: 140,
    alignItems: "center",
    zIndex: 10,
  },
  title: {
    color: "#ffffff",
    fontSize: 25,
    fontWeight: "800",
    letterSpacing: -0.333,
    marginBottom: 342,
  },
  inputContainer: {
    width: "100%",
    gap: 37,
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
    backgroundColor: "#ffffff",
  },
  loginButton: {
    width: "100%",
    height: 72,
    borderRadius: 28,
    backgroundColor: "#4D5DFA",
    //marginTop: 56,
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
});

export default LoginScreen;
