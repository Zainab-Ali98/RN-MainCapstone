// import React, { useContext, useState, useEffect, useRef } from "react";
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
// const { width, height } = Dimensions.get("window");

// function RegisterScreen() {
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
//       <Image
//         source={require("../../assets/background.png")}
//         style={styles.backgroundImage}
//         resizeMode="cover"
//       />

//       <View style={styles.titleContainer}>
//         <Text style={styles.title}>REGISTER</Text>
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

// export default RegisterScreen;







// import React, { useState } from "react";
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
// import Animated, {
//   useSharedValue,
//   useAnimatedStyle,
//   withRepeat,
//   withSequence,
//   withTiming,
// } from "react-native-reanimated";
// const { width, height } = Dimensions.get("window");

// function RegisterScreen() {
//   const navigation = useNavigation();
//   const [image, setImage] = useState(null);

//   // Animated scaling for ABKids
//   const scale = useSharedValue(1);
//   scale.value = withRepeat(
//     withSequence(
//       withTiming(1.08, { duration: 600 }),
//       withTiming(1, { duration: 600 })
//     ),
//     -1,
//     true
//   );

//   const animatedStyle = useAnimatedStyle(() => ({
//     transform: [{ scale: scale.value }],
//   }));

//   const pickImage = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ["images"],
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     if (!result.canceled) {
//       setImage(result.assets[0].uri);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Image
//         source={require("../../assets/background.png")}
//         style={styles.backgroundImage}
//         resizeMode="cover"
//       />

//       {/* Animated Header */}
//       <View style={styles.titleContainer}>
//         <Text style={styles.welcomeStatic}>Welcome to </Text>
//         <Animated.Text style={[styles.abkidsText, animatedStyle]}>
//         ABKKIDS

//         </Animated.Text>
       
//       </View>

//       <ScrollView
//         style={styles.scrollView}
//         contentContainerStyle={styles.scrollContent}
//         showsVerticalScrollIndicator={false}
//       >
//         <View style={styles.content}>
//           {/* Profile Image Picker */}
//           <View style={styles.profileContainer}>
//             <TouchableOpacity
//               onPress={pickImage}
//               style={styles.profilePicture}
//             >
//               <Text style={styles.profilePlaceholder}>Add Photo</Text>
//             </TouchableOpacity>
//             {image && <Image source={{ uri: image }} style={styles.image} />}
//           </View>

//           {/* Form Input Card */}
//           <View style={styles.inputCard}>
//             <View style={styles.inputContainer}>
//               <TextInput
//                 style={styles.input}
//                 placeholder="First Name"
//                 placeholderTextColor="#6B7280"
//               />
//               <TextInput
//                 style={styles.input}
//                 placeholder="Last Name"
//                 placeholderTextColor="#6B7280"
//               />
//               <TextInput
//                 style={styles.input}
//                 placeholder="Email"
//                 placeholderTextColor="#6B7280"
//                 keyboardType="email-address"
//               />
//               <TextInput
//                 style={styles.input}
//                 placeholder="Password"
//                 placeholderTextColor="#6B7280"
//                 secureTextEntry
//               />
//             </View>
//           </View>

//           {/* Button */}
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
//               <Text style={styles.buttonText}>Create Account</Text>
//             </TouchableOpacity>
//           </View>

//           {/* Divider */}
//           <View style={styles.dividerContainer}>
//             <View style={styles.divider} />
//             <Text style={styles.dividerText}>OR</Text>
//             <View style={styles.divider} />
//           </View>

//           {/* Login link */}
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
//   container: { flex: 1, backgroundColor: "#ffffff" },
//   backgroundImage: {
//     position: "absolute",
//     width: width,
//     height: height * 0.5,
//     top: 0,
//   },
//   titleContainer: {
//     paddingTop: 70,
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "flex-end",
//     zIndex: 10,
//     gap: 6,
//   },
//   welcomeStatic: {
//     fontSize: 22,
//     fontWeight: "700",
//     color: "#1E3A8A", // Darker blue
//   },
//   abkidsText: {
//     fontSize: 28,
//     fontWeight: "900",
//     color: "#3B82F6", // Animated part
//   },
//   scrollView: {
//     flex: 1,
//   },
//   scrollContent: {
//     paddingTop: 30,
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
//     backgroundColor: "#F3F4F6",
//     justifyContent: "center",
//     alignItems: "center",
//     borderWidth: 1.5,
//     borderColor: "#9CA3AF",
//     borderStyle: "dashed",
//   },
//   profilePlaceholder: {
//     color: "#9CA3AF",
//     fontSize: 16,
//   },
//   image: {
//     width: 180,
//     height: 180,
//     marginTop: 10,
//     borderRadius: 16,
//   },
//   inputCard: {
//     width: "100%",
//     backgroundColor: "#ffffff",
//     borderRadius: 16,
//     borderColor: "#E5E7EB",
//     borderWidth: 1,
//     padding: 20,
//     marginBottom: 20,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.05,
//     shadowRadius: 8,
//     elevation: 3,
//   },
//   inputContainer: {
//     width: "100%",
//     gap: 18,
//   },
//   input: {
//     width: "100%",
//     height: 50,
//     borderRadius: 10,
//     backgroundColor: "#F9FAFB",
//     borderColor: "#CBD5E1",
//     borderWidth: 1,
//     paddingHorizontal: 16,
//     fontSize: 14,
//     color: "#111827",
//   },
//   buttonSection: {
//     width: "100%",
//     marginTop: 20,
//     paddingTop: 60,
//     position: "relative",
//   },
//   registerButton: {
//     height: 56,
//     backgroundColor: "#2563EB",
//     borderRadius: 16,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   buttonText: {
//     color: "#ffffff",
//     fontSize: 18,
//     fontWeight: "700",
//   },
//   bearImage: {
//     width: 140,
//     height: 100,
//     position: "absolute",
//     right: 0,
//     top: 0,
//     zIndex: 1,
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
//     backgroundColor: "#E5E7EB",
//   },
//   dividerText: {
//     color: "#6B7280",
//     paddingHorizontal: 10,
//     fontSize: 14,
//   },
//   loginLink: {
//     padding: 10,
//   },
//   loginText: {
//     color: "#2563EB",
//     fontSize: 16,
//     fontWeight: "500",
//   },
// });

// export default RegisterScreen;





// import React, { useState } from "react";
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
// import Animated, {
//   useSharedValue,
//   useAnimatedStyle,
//   withRepeat,
//   withSequence,
//   withTiming,
// } from "react-native-reanimated";
// import { LinearGradient } from "expo-linear-gradient";

// const { width, height } = Dimensions.get("window");

// function RegisterScreen() {
//   const navigation = useNavigation();
//   const [image, setImage] = useState(null);

//   const scale = useSharedValue(1);
//   scale.value = withRepeat(
//     withSequence(
//       withTiming(1.05, { duration: 500 }),
//       withTiming(1, { duration: 500 })
//     ),
//     -1,
//     true
//   );

//   const animatedStyle = useAnimatedStyle(() => ({
//     transform: [{ scale: scale.value }],
//   }));

//   const pickImage = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     if (!result.canceled) {
//       setImage(result.assets[0].uri);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Image
//         source={require("../../assets/background.png")}
//         style={styles.backgroundImage}
//         resizeMode="cover"
//       />

//       {/* Animated Welcome Line */}
//       <View style={styles.titleContainer}>
//         <Text style={styles.welcomeText}>
//           Welcome to{" "}
//           <Animated.Text style={[styles.abkidsText, animatedStyle]}>
//             ABKids
//           </Animated.Text>
//         </Text>
//       </View>

//       <ScrollView
//         style={styles.scrollView}
//         contentContainerStyle={styles.scrollContent}
//         showsVerticalScrollIndicator={false}
//       >
//         <View style={styles.content}>
//           {/* Upload Photo */}
//           <View style={styles.profileContainer}>
//             <TouchableOpacity onPress={pickImage} style={styles.profilePicture}>
//               {image ? (
//                 <Image source={{ uri: image }} style={styles.image} />
//               ) : (
//                 <Text style={styles.profilePlaceholder}>Add Photo</Text>
//               )}
//             </TouchableOpacity>
//           </View>

//           {/* Glittery Gradient Border Card */}
//           <LinearGradient
//             colors={["#dfe4ff", "#f3e8ff", "#f0f8ff"]}
//             start={{ x: 0, y: 0 }}
//             end={{ x: 1, y: 1 }}
//             style={styles.cardWrapper}
//           >
//             <View style={styles.cardInner}>
//               <TextInput
//                 style={styles.input}
//                 placeholder="First Name"
//                 placeholderTextColor="#6B7280"
//               />
//               <TextInput
//                 style={styles.input}
//                 placeholder="Last Name"
//                 placeholderTextColor="#6B7280"
//               />
//               <TextInput
//                 style={styles.input}
//                 placeholder="Email"
//                 placeholderTextColor="#6B7280"
//                 keyboardType="email-address"
//               />
//               <TextInput
//                 style={styles.input}
//                 placeholder="Password"
//                 placeholderTextColor="#6B7280"
//                 secureTextEntry
//               />
//             </View>
//           </LinearGradient>

//           {/* Register Button */}
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
//               <Text style={styles.buttonText}>Create Account</Text>
//             </TouchableOpacity>
//           </View>

//           {/* Login Link */}
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
//   container: { flex: 1, backgroundColor: "#ffffff" },
//   backgroundImage: {
//     position: "absolute",
//     width: width,
//     height: height * 0.5,
//     top: 0,
//   },
//   titleContainer: {
//     paddingTop: 70,
//     alignItems: "center",
//     zIndex: 10,
//   },
//   welcomeText: {
//     fontSize: 22,
//     fontWeight: "600",
//     color: "#F9FAFB",
//   },
//   abkidsText: {
//     fontSize: 28,
//     fontWeight: "900",
//     color: "#ffffff",
//   },
//   scrollView: { flex: 1 },
//   scrollContent: {
//     paddingTop: 30,
//     paddingBottom: 40,
//   },
//   content: {
//     paddingHorizontal: 32,
//     alignItems: "center",
//   },
//   profileContainer: {
//     marginBottom: 20,
//     alignItems: "center",
//   },
//   profilePicture: {
//     width: 120,
//     height: 120,
//     borderRadius: 60,
//     backgroundColor: "#F3F4F6",
//     justifyContent: "center",
//     alignItems: "center",
//     borderWidth: 1.5,
//     borderColor: "#9CA3AF",
//     borderStyle: "dashed",
//   },
//   profilePlaceholder: {
//     color: "#6B7280",
//     fontSize: 14,
//   },
//   image: {
//     width: 120,
//     height: 120,
//     borderRadius: 60,
//   },
//   cardWrapper: {
//     width: "100%",
//     borderRadius: 18,
//     padding: 2,
//     marginBottom: 30,
//     shadowColor: "#c5b4ff",
//     shadowOpacity: 0.25,
//     shadowOffset: { width: 0, height: 4 },
//     shadowRadius: 12,
//     elevation: 8,
//   },
//   cardInner: {
//     backgroundColor: "#ffffff",
//     borderRadius: 16,
//     padding: 20,
//   },
//   input: {
//     height: 50,
//     borderRadius: 10,
//     backgroundColor: "#ffffff",
//     borderColor: "#D1D5DB",
//     borderWidth: 1,
//     paddingHorizontal: 16,
//     fontSize: 14,
//     color: "#111827",
//     marginBottom: 16,
//   },
//   buttonSection: {
//     width: "100%",
//     marginTop: 20,
//     paddingTop: 60,
//     position: "relative",
//   },
//   registerButton: {
//     height: 56,
//     backgroundColor: "#2563EB",
//     borderRadius: 16,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   buttonText: {
//     color: "#ffffff",
//     fontSize: 18,
//     fontWeight: "700",
//   },
//   bearImage: {
//     width: 140,
//     height: 100,
//     position: "absolute",
//     right: 0,
//     top: 0,
//     zIndex: 1,
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
//     backgroundColor: "#E5E7EB",
//   },
//   dividerText: {
//     color: "#6B7280",
//     paddingHorizontal: 10,
//     fontSize: 14,
//   },
//   loginLink: {
//     padding: 10,
//   },
//   loginText: {
//     color: "#2563EB",
//     fontSize: 16,
//     fontWeight: "500",
//   },
// });

// export default RegisterScreen;





// import React, { useState, useEffect } from "react";
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
// import Animated, {
//   useSharedValue,
//   useAnimatedStyle,
//   withRepeat,
//   withTiming,
// } from "react-native-reanimated";
// import MaskedView from "@react-native-masked-view/masked-view";
// import { LinearGradient } from "expo-linear-gradient";

// const { width, height } = Dimensions.get("window");

// function RegisterScreen() {
//   const navigation = useNavigation();
//   const [image, setImage] = useState(null);

//   // Rainbow animation for ABKids
//   const animation = useSharedValue(0);
//   useEffect(() => {
//     animation.value = withRepeat(withTiming(1, { duration: 3000 }), -1, true);
//   }, []);

//   const pickImage = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     if (!result.canceled) {
//       setImage(result.assets[0].uri);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Image
//         source={require("../../assets/background.png")}
//         style={styles.backgroundImage}
//         resizeMode="cover"
//       />

//       {/* Animated Welcome Line */}
//       <View style={styles.titleContainer}>
//         <Text style={styles.welcomeText}>
//           Welcome to{" "}
//           <MaskedView
//             maskElement={<Text style={styles.abkidsText}>ABKids</Text>}
//           >
//             <Animated.View style={styles.rainbowGradient}>
//               <LinearGradient
//                 colors={["#FF5F6D", "#FFC371", "#42E695", "#3BB2B8", "#6A82FB", "#FC5C7D"]}
//                 start={{ x: 0, y: 0 }}
//                 end={{ x: 1, y: 0 }}
//                 style={{ flex: 1 }}
//               />
//             </Animated.View>
//           </MaskedView>
//         </Text>
//       </View>

//       <ScrollView
//         style={styles.scrollView}
//         contentContainerStyle={styles.scrollContent}
//         showsVerticalScrollIndicator={false}
//       >
//         <View style={styles.content}>
//           {/* Upload Photo */}
//           <View style={styles.profileContainer}>
//             <TouchableOpacity onPress={pickImage} style={styles.profilePicture}>
//               {image ? (
//                 <Image source={{ uri: image }} style={styles.image} />
//               ) : (
//                 <Text style={styles.profilePlaceholder}>Add Photo</Text>
//               )}
//             </TouchableOpacity>
//           </View>

//           {/* Glittery Gradient Border Card */}
//           <LinearGradient
//             colors={["#dfe4ff", "#f3e8ff", "#f0f8ff"]}
//             start={{ x: 0, y: 0 }}
//             end={{ x: 1, y: 1 }}
//             style={styles.cardWrapper}
//           >
//             <View style={styles.cardInner}>
//               <TextInput
//                 style={styles.input}
//                 placeholder="First Name"
//                 placeholderTextColor="#6B7280"
//               />
//               <TextInput
//                 style={styles.input}
//                 placeholder="Last Name"
//                 placeholderTextColor="#6B7280"
//               />
//               <TextInput
//                 style={styles.input}
//                 placeholder="Email"
//                 placeholderTextColor="#6B7280"
//                 keyboardType="email-address"
//               />
//               <TextInput
//                 style={styles.input}
//                 placeholder="Password"
//                 placeholderTextColor="#6B7280"
//                 secureTextEntry
//               />
//             </View>
//           </LinearGradient>

//           {/* Register Button */}
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
//               <Text style={styles.buttonText}>Create Account</Text>
//             </TouchableOpacity>
//           </View>

//           {/* Login Link */}
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
//   container: { flex: 1, backgroundColor: "#ffffff" },
//   backgroundImage: {
//     position: "absolute",
//     width: width,
//     height: height * 0.5,
//     top: 0,
//   },
//   titleContainer: {
//     paddingTop: 70,
//     alignItems: "center",
//     zIndex: 10,
//   },
//   welcomeText: {
//     fontSize: 22,
//     fontWeight: "600",
//     color: "#F9FAFB",
//     textAlign: "center",
//   },
//   abkidsText: {
//     fontSize: 28,
//     fontWeight: "900",
//     color: "black",
//   },
//   rainbowGradient: {
//     width: 120,
//     height: 30,
//   },
//   scrollView: { flex: 1 },
//   scrollContent: {
//     paddingTop: 30,
//     paddingBottom: 40,
//   },
//   content: {
//     paddingHorizontal: 32,
//     alignItems: "center",
//   },
//   profileContainer: {
//     marginBottom: 20,
//     alignItems: "center",
//   },
//   profilePicture: {
//     width: 120,
//     height: 120,
//     borderRadius: 60,
//     backgroundColor: "#F3F4F6",
//     justifyContent: "center",
//     alignItems: "center",
//     borderWidth: 1.5,
//     borderColor: "#9CA3AF",
//     borderStyle: "dashed",
//   },
//   profilePlaceholder: {
//     color: "#6B7280",
//     fontSize: 14,
//   },
//   image: {
//     width: 120,
//     height: 120,
//     borderRadius: 60,
//   },
//   cardWrapper: {
//     width: "100%",
//     borderRadius: 18,
//     padding: 2,
//     marginBottom: 30,
//     shadowColor: "#c5b4ff",
//     shadowOpacity: 0.25,
//     shadowOffset: { width: 0, height: 4 },
//     shadowRadius: 12,
//     elevation: 8,
//   },
//   cardInner: {
//     backgroundColor: "#ffffff",
//     borderRadius: 16,
//     padding: 20,
//   },
//   input: {
//     height: 50,
//     borderRadius: 10,
//     backgroundColor: "#ffffff",
//     borderColor: "#D1D5DB",
//     borderWidth: 1,
//     paddingHorizontal: 16,
//     fontSize: 14,
//     color: "#111827",
//     marginBottom: 16,
//   },
//   buttonSection: {
//     width: "100%",
//     marginTop: 20,
//     paddingTop: 60,
//     position: "relative",
//   },
//   registerButton: {
//     height: 56,
//     backgroundColor: "#2563EB",
//     borderRadius: 16,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   buttonText: {
//     color: "#ffffff",
//     fontSize: 18,
//     fontWeight: "700",
//   },
//   bearImage: {
//     width: 140,
//     height: 100,
//     position: "absolute",
//     right: 0,
//     top: 0,
//     zIndex: 1,
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
//     backgroundColor: "#E5E7EB",
//   },
//   dividerText: {
//     color: "#6B7280",
//     paddingHorizontal: 10,
//     fontSize: 14,
//   },
//   loginLink: {
//     padding: 10,
//   },
//   loginText: {
//     color: "#2563EB",
//     fontSize: 16,
//     fontWeight: "500",
//   },
// });






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

const { width, height } = Dimensions.get("window");

function RegisterScreen() {
  const navigation = useNavigation();
  const [image, setImage] = useState(null);

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
    <View style={styles.container}>
      <Image
        source={require("../../assets/background.png")}
        style={styles.backgroundImage}
        resizeMode="cover"
      />

      {/* Header */}
      <View style={styles.titleContainer}>
        <Text style={styles.welcomeStatic}>Welcome to </Text>
        <Animated.Text style={[styles.abkidsText, animatedStyle, rainbowTextStyle]}>
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
            <TouchableOpacity onPress={pickImage} style={styles.profilePicture}>
              {image ? (
                <Image source={{ uri: image }} style={styles.profileImageUploaded} />
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
              />
              <TextInput
                style={styles.input}
                placeholder="Last Name"
                placeholderTextColor="#6B7280"
              />
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#6B7280"
                keyboardType="email-address"
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#6B7280"
                secureTextEntry
              />
            </View>
          </View>

          {/* Register Button */}
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
              <Text style={styles.buttonText}>Create Account</Text>
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
            <Text style={styles.loginText}>Already have an account? Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
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
    fontSize: 18,
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
