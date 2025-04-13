import React, { useContext, useState, useEffect, useRef } from "react";
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
import { register } from "../api/auth";
import { KeyboardAvoidingView, Platform } from "react-native";
//import {}
const { width, height } = Dimensions.get("window");

function RegisterScreen({ setIsAuth, setRole }) {
  const navigation = useNavigation();
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
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // const handleRegister = () => {
  //   mutate();
  // };

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

        <View style={styles.titleContainer}>
          <Text style={styles.title}>REGISTER</Text>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.content}>
            <View style={styles.profileContainer}>
              <TouchableOpacity
                onPress={() => pickImage()}
                style={styles.profilePicture}
              >
                <Text style={styles.profilePlaceholder}>Add Photo</Text>
              </TouchableOpacity>
              {image && <Image source={{ uri: image }} style={styles.image} />}
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="First Name"
                placeholderTextColor="#9E9E9E"
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
                placeholderTextColor="#9E9E9E"
                autoCapitalize="words"
                onChangeText={(value) => {
                  setUserInfo({ ...userInfo, LastName: value });
                  setError(null);
                }}
              />

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
            </View>

            <View style={styles.buttonSection}>
              <Image
                source={require("../../assets/registerbear.png")}
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

            <View style={styles.dividerContainer}>
              <View style={styles.divider} />
              <Text style={styles.dividerText}>OR</Text>
              <View style={styles.divider} />
            </View>

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
  image: {
    width: 200,
    height: 200,
  },
});

export default RegisterScreen;
