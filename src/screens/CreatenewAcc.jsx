// import React, { useContext, useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   TouchableOpacity,
//   Dimensions,
//   ScrollView,
//   Image,
// } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import * as ImagePicker from "expo-image-picker";
// import Logout from "../components/Logout";
// const { width, height } = Dimensions.get("window");

// function CreateNewAcc() {
//   const navigation = useNavigation();
//   // const [authenticated, setAuthenticated] = useContext(UserContext);
//   const [userInfo, setUserInfo] = useState({
//     email: "",
//     password: "",
//     name: "",
//   });

//   const [image, setImage] = useState(null);

//   // const { mutate } = useMutation({
//   //   mutationFn: () => register(userInfo, image),
//   //   onSuccess: () => {
//   //     setAuthenticated(true);
//   //   },
//   // });

//   const pickImage = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ["images"],
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     console.log(result);

//     if (!result.canceled) {
//       setImage(result.assets[0].uri);
//     }
//   };

//   // const handleRegister = () => {
//   //   mutate();
//   // };

//   return (
//     <View style={styles.container}>
//       <Logout />
//       <Image
//         source={require("../../assets/background.png")}
//         style={styles.backgroundImage}
//         resizeMode="cover"
//       />

//       <View style={styles.titleContainer}>
//         <Text style={styles.title}>Create new child account</Text>
//       </View>

//       <ScrollView
//         style={styles.scrollView}
//         contentContainerStyle={styles.scrollContent}
//         showsVerticalScrollIndicator={false}
//       >
//         <View style={styles.content}>
//           <View style={styles.profileContainer}>
//             <TouchableOpacity
//               onPress={() => pickImage()}
//               style={styles.profilePicture}
//             >
//               <Text style={styles.profilePlaceholder}>Add Photo</Text>
//             </TouchableOpacity>
//             {image && <Image source={{ uri: image }} style={styles.image} />}
//           </View>

//           <View style={styles.inputContainer}>
//             <TextInput
//               style={styles.input}
//               placeholder="First Name"
//               placeholderTextColor="#9E9E9E"
//               autoCapitalize="words"
//             />

//             <TextInput
//               style={styles.input}
//               placeholder="Last Name"
//               placeholderTextColor="#9E9E9E"
//               autoCapitalize="words"
//             />

//             <TextInput
//               style={styles.input}
//               placeholder="Email"
//               placeholderTextColor="#9E9E9E"
//               keyboardType="email-address"
//               autoCapitalize="none"
//             />

//             <TextInput
//               style={styles.input}
//               placeholder="Password"
//               placeholderTextColor="#9E9E9E"
//               secureTextEntry
//             />
//           </View>

//           <View style={styles.buttonSection}>
//             <Image
//               source={require("../../assets/registerbear.png")}
//               style={styles.bearImage}
//               resizeMode="contain"
//             />

//             <TouchableOpacity
//               style={styles.registerButton}
//               onPress={() => navigation.navigate("Profile")}
//             >
//               <Text style={styles.buttonText}>Register</Text>
//             </TouchableOpacity>
//           </View>

//           <View style={styles.dividerContainer}>
//             <View style={styles.divider} />
//             <Text style={styles.dividerText}>OR</Text>
//             <View style={styles.divider} />
//           </View>

//           <TouchableOpacity
//             style={styles.loginLink}
//             onPress={() => navigation.navigate("Login")}
//           >
//             <Text style={styles.loginText}>Already have an account? Login</Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#ffffff",
//   },
//   backgroundImage: {
//     position: "absolute",
//     width: width,
//     height: height * 0.5,
//     top: 0,
//   },
//   titleContainer: {
//     paddingTop: 60,
//     paddingHorizontal: 39,
//     zIndex: 1,
//   },
//   title: {
//     fontSize: 25,
//     fontWeight: "800",
//     letterSpacing: -0.333,
//     color: "#ffffff",
//     textAlign: "center",
//   },
//   scrollView: {
//     flex: 1,
//   },
//   scrollContent: {
//     paddingTop: 40,
//     paddingBottom: 40,
//   },
//   content: {
//     paddingHorizontal: 39,
//     alignItems: "center",
//   },
//   profileContainer: {
//     marginBottom: 30,
//     alignItems: "center",
//   },
//   profilePicture: {
//     width: 120,
//     height: 120,
//     borderRadius: 60,
//     backgroundColor: "#F5F5F5",
//     justifyContent: "center",
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: "#D9D9D9",
//     borderStyle: "dashed",
//   },
//   profilePlaceholder: {
//     color: "#9E9E9E",
//     fontSize: 16,
//   },
//   inputContainer: {
//     width: "100%",
//     gap: 20,
//   },
//   input: {
//     width: "100%",
//     height: 50,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: "#D9D9D9",
//     paddingHorizontal: 16,
//     fontSize: 14,
//     color: "#9E9E9E",
//   },
//   buttonText: {
//     color: "#ffffff",
//     fontSize: 20,
//   },
//   dividerContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     width: "100%",
//     marginVertical: 20,
//   },
//   divider: {
//     flex: 1,
//     height: 1,
//     backgroundColor: "#D9D9D9",
//   },
//   dividerText: {
//     color: "#9E9E9E",
//     paddingHorizontal: 10,
//     fontSize: 14,
//   },
//   loginLink: {
//     padding: 10,
//   },
//   buttonSection: {
//     width: "100%",
//     marginTop: 15,
//     position: "relative",
//     paddingTop: 80,
//   },
//   registerButton: {
//     width: "100%",
//     height: 72,
//     borderRadius: 28,
//     backgroundColor: "#4D5DFA",
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 1,
//   },
//   bearImage: {
//     width: 150,
//     height: 100,
//     position: "absolute",
//     right: 0,
//     top: 0,
//     zIndex: 1,
//   },
//   loginText: {
//     color: "#4D5DFA",
//     fontSize: 16,
//     fontWeight: "500",
//   },
//   image: {
//     width: 200,
//     height: 200,
//   },
// });

// export default CreateNewAcc;

import React, { useContext, useState } from "react";
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
import * as ImagePicker from "expo-image-picker";
import Logout from "../components/Logout";
import { KeyboardAvoidingView, Platform } from "react-native";

const { width, height } = Dimensions.get("window");

function CreateNewAcc() {
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    FirstName: "",
    LastName: "",
  });

  const [image, setImage] = useState(null);

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

  const handleRegister = () => {
    navigation.navigate("Profile");
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <View style={styles.container}>
        {/* <Logout /> */}
        <Image
          source={require("../../assets/background.png")}
          style={styles.backgroundImage}
          resizeMode="cover"
        />

        <View style={styles.titleContainer}>
          <Text style={styles.title}>Add Child Account</Text>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
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

            <View style={styles.inputCard}>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="First Name"
                  placeholderTextColor="#6B7280"
                  autoCapitalize="words"
                  onChangeText={(value) => {
                    setUserInfo({ ...userInfo, FirstName: value });
                  }}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Last Name"
                  placeholderTextColor="#6B7280"
                  autoCapitalize="words"
                  onChangeText={(value) => {
                    setUserInfo({ ...userInfo, LastName: value });
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
                  }}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor="#6B7280"
                  secureTextEntry
                  onChangeText={(value) => {
                    setUserInfo({ ...userInfo, password: value });
                  }}
                />
              </View>
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
                <Text style={styles.buttonText}>Create</Text>
              </TouchableOpacity>
            </View>
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
  title: {
    fontSize: 28,
    fontWeight: "900",
    color: "#ffff",
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
    marginTop: 20,
    paddingTop: 60,
    position: "relative",
  },
  registerButton: {
    height: 56,
    backgroundColor: "#2563EB",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "700",
  },
  bearImage: {
    width: 140,
    height: 100,
    position: "absolute",
    right: 0,
    top: -20,
    zIndex: 1,
  },
});

export default CreateNewAcc;