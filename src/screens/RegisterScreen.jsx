import React, { useState, useEffect } from "react";
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
import { useMutation } from "@tanstack/react-query";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  useDerivedValue,
  interpolateColor,
} from "react-native-reanimated";
import { register } from "../api/auth";
import { KeyboardAvoidingView, Platform } from "react-native";

const { width, height } = Dimensions.get("window");

function RegisterScreen({ setIsAuth, setRole }) {
  const navigation = useNavigation();

  // Animation scale
  const scale = useSharedValue(1);
  scale.value = withRepeat(
    withSequence(
      withTiming(1.08, { duration: 600 }),
      withTiming(1, { duration: 600 })
    ),
    -1,
    true
  );

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  // Rainbow animated color
  const colorProgress = useSharedValue(0);
  useEffect(() => {
    colorProgress.value = withRepeat(
      withTiming(1, { duration: 2000 }),
      -1,
      true
    );
  }, []);

  const rainbowColor = useDerivedValue(() =>
    interpolateColor(
      colorProgress.value,
      [0, 0.2, 0.4, 0.6, 0.8, 1],
      ["#FF0000", "#FF9900", "#33FF33", "#00FFFF", "#3333FF", "#FF00FF"]
    )
  );

  const rainbowTextStyle = useAnimatedStyle(() => ({
    color: rainbowColor.value,
  }));

  // const [authenticated, setAuthenticated] = useContext(UserContext);
  const [userInfo, setUserInfo] = useState({});
  const [image, setImage] = useState("");
  const [error, setError] = useState(null);

  const { mutate, isError } = useMutation({
    mutationKey: ["register"],
    mutationFn: (ui, im) => register(ui, im),
    onSuccess: (data) => {
      setIsAuth(true);
      setRole(data.role);
    },
    onError: (error) => {
      setError(error.message || "Something went wrong");
      console.log("\nError message: ", error, "\n");
    },
  });

  const handleRegister = () => {
    if (
      !userInfo.email ||
      !userInfo.password ||
      !userInfo.FirstName ||
      !userInfo.LastName
    ) {
      setError("Please enter all details");
      return;
    }
    setError(null);
    mutate(userInfo, image);
  };

  const pickImage = async () => {
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
  

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <View style={styles.container}>
        <Image
          source={require("../../assets/background.png")}
          style={styles.backgroundImage}
          resizeMode="cover"
        />

        {/* Header */}
        <View style={styles.titleContainer}>
          <Text style={styles.welcomeStatic}>Welcome to </Text>
          <Animated.Text
            style={[styles.abkidsText, animatedStyle, rainbowTextStyle]}
          >
            ABKIDS
          </Animated.Text>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            {/* Upload Photo */}
            <View style={styles.profileContainer}>
              <TouchableOpacity
                onPress={pickImage}
                style={styles.profilePicture}
              >
                {image ? (
                  <Image
                    source={{ uri: image }}
                    style={styles.profileImageUploaded}
                  />
                ) : (
                  <Text style={styles.profilePlaceholder}>Add Photo</Text>
                )}
              </TouchableOpacity>
            </View>

            {/* Form Card */}
            <View style={styles.inputCard}>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="First Name"
                  placeholderTextColor="#6B7280"
                  autoCapitalize="words"
                  onFocus={() => console.log("First Name input focused")}
                  onChangeText={(value) => {
                    setUserInfo({ ...userInfo, FirstName: value });
                    setError(null);
                  }}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Last Name"
                  placeholderTextColor="#6B7280"
                  autoCapitalize="words"
                  onChangeText={(value) => {
                    setUserInfo({ ...userInfo, LastName: value });
                    setError(null);
                  }}
                />
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
              </View>
            </View>

            {/* Register Button */}
            <View style={styles.buttonSection}>
              <Image
                source={require("../../assets/bear.png")}
                style={styles.bearImage}
                resizeMode="contain"
              />
              <TouchableOpacity
                style={styles.registerButton}
                onPress={handleRegister}
              >
                <Text style={styles.buttonText}>Register</Text>
              </TouchableOpacity>
            </View>

            {/* Divider */}
            <View style={styles.dividerContainer}>
              <View style={styles.divider} />
              <Text style={styles.dividerText}>OR</Text>
              <View style={styles.divider} />
            </View>

            {/* Login Link */}
            <TouchableOpacity
              style={styles.loginLink}
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={styles.loginText}>
                Already have an account? Login
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ffffff" },
  backgroundImage: {
    position: "absolute",
    width: width,
    height: height * 0.5,
    top: 0,
  },
  titleContainer: {
    paddingTop: 70,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    zIndex: 10,
    gap: 6,
  },
  welcomeStatic: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1E3A8A",
  },
  abkidsText: {
    fontSize: 28,
    fontWeight: "900",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 30,
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
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#9CA3AF",
    borderStyle: "dashed",
  },
  profilePlaceholder: {
    color: "#9CA3AF",
    fontSize: 16,
  },
  profileImageUploaded: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  inputCard: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    borderColor: "#E5E7EB",
    borderWidth: 1,
    padding: 20,
    marginBottom: -10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
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
  buttonSection: {
    width: "100%",
    position: "relative",
  },
  registerButton: {
    height: 56,
    backgroundColor: "#4D5DFA",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "700",
  },
  bearImage: {
    width: 118,
    height: 78,
  },

  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginVertical: 20,
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
    backgroundColor: "#E5E7EB",
  },
  dividerText: {
    color: "#6B7280",
    paddingHorizontal: 10,
    fontSize: 14,
  },
  loginLink: {
    padding: 10,
  },
  loginText: {
    color: "#2563EB",
    fontSize: 16,
    fontWeight: "500",
  },
});

export default RegisterScreen;
