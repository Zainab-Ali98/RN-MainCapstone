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
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  // Fetch user data on component mount
  useEffect(() => {
    fetchUserData();
  }, []);

  /**
   * Fetches user data from the backend
   * @async
   * @returns {Promise<void>}
   */
  const fetchUserData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Replace with your actual API call
      // const response = await fetch('YOUR_API_ENDPOINT');
      // const data = await response.json();

      // Simulating API call
      setTimeout(() => {
        setUserData({
          firstName: "John",
          lastName: "Doe",
          email: "john.doe@example.com",
        });
        setLoading(false);
      }, 1000);
    } catch (err) {
      setError("Failed to load user data");
      console.error("Error fetching user data:", err);
      setLoading(false);
    }
  };

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
        alert("We need photo access to update your profile picture");
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
      alert("Couldn't update profile picture. Please try again.");
    }
  };

  // Loading state
  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0066FF" />
          <Text style={styles.loadingText}>Loading profile...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Error state
  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <MaterialIcons name="error-outline" size={48} color="#FF4444" />
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={fetchUserData}
            accessible={true}
            accessibilityLabel="Try loading profile again"
          >
            <MaterialIcons name="refresh" size={20} color="#FFFFFF" />
            <Text style={styles.retryButtonText}>Try Again</Text>
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
              accessibilityLabel="Change profile picture"
            >
              {profileImage ? (
                <Image
                  source={{ uri: profileImage }}
                  style={styles.profileImage}
                  accessible={true}
                  accessibilityLabel="Profile picture"
                />
              ) : (
                <View style={styles.placeholderImage}>
                  <MaterialIcons name="add-a-photo" size={32} color="#0066FF" />
                  <Text style={styles.uploadText}>Upload Photo</Text>
                </View>
              )}
              <View style={styles.editIconContainer}>
                <MaterialIcons name="edit" size={16} color="#FFFFFF" />
              </View>
            </TouchableOpacity>
            <Text style={styles.nameText}>
              {userData.firstName} {userData.lastName}
            </Text>
            <Text style={styles.emailText}>{userData.email}</Text>
          </View>
          <View style={styles.infoCard}>
            <Text style={styles.sectionTitle}>Personal Information</Text>

            <View style={styles.infoGroup}>
              <View style={styles.labelContainer}>
                <MaterialIcons name="person" size={20} color="#0066FF" />
                <Text style={styles.label}>First Name</Text>
              </View>
              <View style={styles.valueContainer}>
                <Text style={styles.valueText}>{userData.firstName}</Text>
              </View>
            </View>

            <View style={styles.infoGroup}>
              <View style={styles.labelContainer}>
                <MaterialIcons name="person" size={20} color="#0066FF" />
                <Text style={styles.label}>Last Name</Text>
              </View>
              <View style={styles.valueContainer}>
                <Text style={styles.valueText}>{userData.lastName}</Text>
              </View>
            </View>

            <View style={styles.infoGroup}>
              <View style={styles.labelContainer}>
                <MaterialIcons name="email" size={20} color="#0066FF" />
                <Text style={styles.label}>Email</Text>
              </View>
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
    backgroundColor: "#FFFFFF",
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 32,
    alignItems: "center",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 100,
    alignItems: "center",
    width: "100%",
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 32,
    width: "100%",
  },
  imageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
    position: "relative",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    overflow: "hidden",
  },
  profileImage: {
    width: "100%",
    height: "100%",
    borderRadius: 60,
  },
  placeholderImage: {
    width: "100%",
    height: "100%",
    borderRadius: 60,
    backgroundColor: "#E5F0FF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#0066FF",
    borderStyle: "dashed",
  },
  uploadText: {
    marginTop: 8,
    fontSize: 12,
    color: "#0066FF",
    fontWeight: "500",
  },
  editIconContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#0066FF",
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  nameText: {
    fontSize: 24,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 4,
  },
  emailText: {
    fontSize: 16,
    color: "#0066FF",
    fontWeight: "500",
  },
  infoCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 24,
    width: "90%",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    alignSelf: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 24,
  },
  infoGroup: {
    marginBottom: 20,
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    color: "#6B7280",
    marginLeft: 8,
  },
  valueContainer: {
    backgroundColor: "#E5F0FF",
    borderRadius: 12,
    padding: 16,
    marginLeft: 28,
  },
  valueText: {
    fontSize: 16,
    color: "#1F2937",
    fontWeight: "500",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#6B7280",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  errorText: {
    marginTop: 16,
    marginBottom: 24,
    fontSize: 16,
    color: "#FF4444",
    textAlign: "center",
  },
  retryButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0066FF",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  retryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default PCDetailsScreen;
