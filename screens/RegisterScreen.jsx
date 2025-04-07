import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Image,
} from "react-native";

const { width, height } = Dimensions.get("window");

function RegisterScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/background.png")}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <Text style={styles.title}>REGISTER</Text>

          <View style={styles.profileContainer}>
            <View style={styles.profilePicture}>
              <Text style={styles.profilePlaceholder}>Add Photo</Text>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              placeholderTextColor="#9E9E9E"
              autoCapitalize="words"
            />

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

            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              placeholderTextColor="#9E9E9E"
              secureTextEntry
            />
          </View>

          <View style={styles.buttonSection}>
            <Image
              source={require("../assets/registerbear.png")}
              style={styles.bearImage}
              resizeMode="contain"
            />
       
            <TouchableOpacity style={styles.registerButton}>
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.loginLink}>
            <Text style={styles.loginText}>Already have an account? Login</Text>
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
  scrollContent: {
    minHeight: height,
    paddingBottom: 40,
  },
  content: {
    paddingHorizontal: 39,
    paddingTop: 140,
    alignItems: "center",
  },
  title: {
    fontSize: 25,
    fontWeight: "800",
    letterSpacing: -0.333,
    marginBottom: 30,
    color: "#ffffff",
  },
  profileContainer: {
    marginBottom: 30,
    alignItems: "center",
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D9D9D9",
    borderStyle: "dashed",
  },
  profilePlaceholder: {
    color: "#9E9E9E",
    fontSize: 16,
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
    color: "#9E9E9E",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 20,
  },
  loginLink: {
    marginTop: 20,
    padding: 10,
  },
  buttonSection: {
    width: "100%",
    marginTop: 15,
    position: "relative",
    paddingTop: 80,
  },
  registerButton: {
    width: "100%",
    height: 72,
    borderRadius: 28,
    backgroundColor: "#4D5DFA",
    justifyContent: "center",
    alignItems: "center",
  },
  bearImage: {
    width: 150,
    height: 100,
    position: "absolute",
    right: 0,
    top: 0,
    zIndex: 1,
  },
  loginText: {
    color: "#4D5DFA",
    fontSize: 16,
  },
});

export default RegisterScreen;
