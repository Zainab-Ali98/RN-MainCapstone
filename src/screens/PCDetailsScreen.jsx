/**
 * PCDetailsScreen Component
 *
 * A screen component that displays user profile and contact details.
 * Features:
 * - Profile image upload
 * - Display of user information
 * - Responsive design for all screen sizes
 * - Loading and error states
 * - Accessibility support
 */

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  useWindowDimensions,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import { profile } from "../api/users";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import Logout from "../components/Logout";

/**
 * @typedef {Object} UserData
 * @property {string} firstName - User's first name
 * @property {string} lastName - User's last name
 * @property {string} email - User's email address
 */

const PCDetailsScreen = ({ navigation }) => {
  // Screen dimensions for responsive design
  const { width, height } = useWindowDimensions();

  // State management
  const [profileImage, setProfileImage] = useState(null);
  //const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user data on component mount
  // useEffect(() => {
  //   fetchUserData();
  // }, []);

  /**
   * Fetches user data from the backend
   * @async
   * @returns {Promise<void>}
   */
  // const fetchUserData = async () => {
  //   try {
  //     setLoading(true);
  //     setError(null);

  //     // Replace with your actual API call
  //     // const response = await fetch('YOUR_API_ENDPOINT');
  //     // const data = await response.json();

  //     // Simulating API call
  //     setTimeout(() => {
  //       setUserData({
  //         firstName: "John",
  //         lastName: "Doe",
  //         email: "john.doe@example.com",
  //       });
  //       setLoading(false);
  //     }, 1000);
  //   } catch (err) {
  //     setError("Failed to load user data");
  //     console.error("Error fetching user data:", err);
  //     setLoading(false);
  //   }
  // };

  // Fetch user data from the backend

  const {
    data: userData,
    isError,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["userData"],
    queryFn: () => profile(),
    onSuccess: (data) => {
      console.log("User data fetched successfully:", data);
    },
    onError: (error) => {
      setError("Failed to load user data");
      console.error("Error fetching user data:", error);
      setLoading(false);
    },
  });

  /**
   * Handles profile image selection
   * @async
   * @returns {Promise<void>}
   */
  const pickImage = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        setProfileImage(result.assets[0].uri);
        // Here you would typically upload the image to your backend
      }
    } catch (err) {
      console.error("Error picking image:", err);
      alert("Failed to pick image");
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4D5DFA" />
          <Text style={styles.loadingText}>Loading profile...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Error state
  if (isError) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={fetchUserData}
            accessible={true}
            accessibilityLabel="Retry loading profile"
            accessibilityHint="Double tap to try loading the profile again"
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Image
        source={require("../../assets/background.png")}
        style={[styles.backgroundImage, { width, height: height * 0.5 }]}
        resizeMode="cover"
      />
      <Logout />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.content, { width: width * 0.9 }]}>
          <View style={styles.profileSection}>
            <TouchableOpacity
              onPress={pickImage}
              style={styles.imageContainer}
              accessible={true}
              accessibilityLabel="Profile picture"
              accessibilityHint="Double tap to change profile picture"
            >
              {profileImage ? (
                <Image
                  source={{ uri: userData.profilePicture }}
                  style={styles.profileImage}
                  accessible={true}
                  accessibilityLabel="Profile picture"
                />
              ) : (
                <View style={styles.placeholderImage}>
                  <Text style={styles.placeholderText}>Add Photo</Text>
                </View>
              )}
            </TouchableOpacity>
            <Text style={styles.nameText}>
              {userData.firstName} {userData.lastName}
            </Text>
          </View>
          <View style={styles.infoCard}>
            <View style={styles.infoGroup}>
              <Text style={styles.label}>First Name</Text>
              <View style={styles.valueContainer}>
                <Text style={styles.valueText}>{userData.firstName}</Text>
              </View>
            </View>

            <View style={styles.infoGroup}>
              <Text style={styles.label}>Last Name</Text>
              <View style={styles.valueContainer}>
                <Text style={styles.valueText}>{userData.lastName}</Text>
              </View>
            </View>

            <View style={styles.infoGroup}>
              <Text style={styles.label}>Email</Text>
              <View style={styles.valueContainer}>
                <Text style={styles.valueText}>{userData.email}</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    color: "#4D5DFA",
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    color: "#FF4444",
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  retryButton: {
    backgroundColor: "#4D5DFA",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingVertical: 40,
    justifyContent: "center",
  },
  content: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 30,
  },
  imageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: "hidden",
    marginBottom: 16,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#4D5DFA",
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
  placeholderImage: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
  placeholderText: {
    color: "#6c757d",
    fontSize: 14,
    fontWeight: "500",
  },
  nameText: {
    fontSize: 28,
    fontWeight: "700",
    color: "#000",
    textAlign: "center",
  },
  infoCard: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  infoGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6c757d",
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  valueContainer: {
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#4D5DFA",
  },
  valueText: {
    fontSize: 16,
    color: "#212529",
    fontWeight: "500",
  },
});

export default PCDetailsScreen;
