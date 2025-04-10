import React, { useEffect, useRef } from "react";
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
import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";

const { width, height } = Dimensions.get("window");

function RegisterScreen() {
  const navigation = useNavigation();
  const animationRef = useRef(null);

  useEffect(() => {
    if (animationRef.current) {
      animationRef.current.play();
    }
  }, []);

  return (
    <View style={styles.container}>
      {/* <LottieView
        ref={animationRef}
        source={require("/Users/nuni/Documents/development/RN-MainCapstone/assets/finalbears.json")}
        style={styles.backgroundImage}
        autoPlay
        loop
      /> */}

      <View style={styles.titleContainer}>
        <Text style={styles.title}>REGISTER</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <View style={styles.profileContainer}>
            <View style={styles.profilePicture}>
              <Text style={styles.profilePlaceholder}>Add Photo</Text>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="First Name"
              placeholderTextColor="#9E9E9E"
              autoCapitalize="words"
            />

            <TextInput
              style={styles.input}
              placeholder="Last Name"
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
          </View>

          <View style={styles.buttonSection}>
            <Image
              source={require("../../assets/registerbear.png")}
              style={styles.bearImage}
              resizeMode="contain"
            />

            <TouchableOpacity
              style={styles.registerButton}
              onPress={() => navigation.navigate("Profile")}
            >
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.divider} />
          </View>

          <TouchableOpacity
            style={styles.loginLink}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.loginText}>Already have an account? Login</Text>
          </TouchableOpacity>
        </View>
         <LottieView
        ref={animationRef}
        source={require("/Users/nuni/Documents/development/RN-MainCapstone/assets/bearstwo.json")}
        style={styles.backgroundImage}
        autoPlay
        loop
      />
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
    height: height ,
   top: 0,
  },
  titleContainer: {
    paddingTop: 60,
    paddingHorizontal: 39,
    zIndex: 1,
  },
  title: {
    fontSize: 25,
    fontWeight: "800",
    letterSpacing: -0.333,
    color: "#ffffff",
    textAlign: "center",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 40,
    paddingBottom: 40,
  },
  content: {
    paddingHorizontal: 39,
    alignItems: "center",
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
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginVertical: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#D9D9D9",
  },
  dividerText: {
    color: "#9E9E9E",
    paddingHorizontal: 10,
    fontSize: 14,
  },
  loginLink: {
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
    marginTop: 1,
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
    fontWeight: "500",
  },
});

export default RegisterScreen;
