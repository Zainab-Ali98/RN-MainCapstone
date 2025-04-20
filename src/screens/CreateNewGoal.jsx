

// import React, { useState } from "react";
// import {
//   View,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   Image,
//   Platform,
//   Dimensions,
//   ScrollView,
// } from "react-native";
// import * as ImagePicker from "expo-image-picker";
// import { useNavigation } from "@react-navigation/native";

// const { width, height } = Dimensions.get("window");

// const CreateNewGoal = () => {
//   const navigation = useNavigation();
//   const [goalName, setGoalName] = useState("");
//   const [description, setDescription] = useState("");
//   const [price, setPrice] = useState(0);
//   const [image, setImage] = useState(null);

//   const pickImage = async () => {
//     const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

//     if (status !== "granted") {
//       alert("Sorry, we need camera roll permissions to make this work!");
//       return;
//     }

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

//   const increasePrice = () => {
//     setPrice(price + 1);
//   };

//   const decreasePrice = () => {
//     if (price > 0) {
//       setPrice(price - 1);
//     }
//   };

//   const handleSubmit = () => {
//     navigation.navigate("ProgressGoalScreen", {
//       goalName,
//       description,
//       price,
//       image,
//     });
//   };

//   return (
//     <View style={styles.container}>
//       <Image
//         source={require("../../assets/background.png")}
//         style={styles.backgroundImage}
//         resizeMode="cover"
//       />

//       <Text style={styles.title}>Create New Goal</Text>

//       <ScrollView
//         style={styles.scrollView}
//         contentContainerStyle={styles.scrollContent}
//         showsVerticalScrollIndicator={false}
//       >
//         <View style={styles.mainContent}>
//           <View style={styles.inputContainer}>
//             <TextInput
//               style={styles.input}
//               value={goalName}
//               onChangeText={setGoalName}
//               placeholder="Goal Name"
//               placeholderTextColor="#9E9E9E"
//             />

//             <TextInput
//               style={[styles.input, styles.textArea]}
//               value={description}
//               onChangeText={setDescription}
//               placeholder="Description"
//               placeholderTextColor="#9E9E9E"
//               multiline={true}
//               numberOfLines={4}
//             />

//             <View style={styles.priceContainer}>
//               <Text style={styles.priceLabel}>Price</Text>
//               <View style={styles.priceInputContainer}>
//                 <Text style={styles.priceText}>{price} kd</Text>
//                 <View style={styles.priceButtons}>
//                   <TouchableOpacity
//                     style={styles.priceButton}
//                     onPress={decreasePrice}
//                   >
//                     <Text style={styles.priceButtonText}>−</Text>
//                   </TouchableOpacity>
//                   <TouchableOpacity
//                     style={styles.priceButton}
//                     onPress={increasePrice}
//                   >
//                     <Text style={styles.priceButtonText}>+</Text>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             </View>

//             <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
//               {image ? (
//                 <Image source={{ uri: image }} style={styles.image} />
//               ) : (
//                 <View style={styles.placeholderImage}>
//                   <Text style={styles.placeholderText}>
//                     Tap to select an image
//                   </Text>
//                 </View>
//               )}
//             </TouchableOpacity>
//           </View>
//         </View>
//       </ScrollView>

//       <View style={styles.buttonSection}>
//         <Image
//           source={require("../../assets/bear.png")}
//           style={styles.bearImage}
//           resizeMode="contain"
//         />
//         <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
//           <Text style={styles.buttonText}>Create Goal</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

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
//   title: {
//     color: "#ffffff",
//     fontSize: 25,
//     fontWeight: "800",
//     letterSpacing: -0.333,
//     textAlign: "center",
//     marginTop: 60,
//     marginBottom: 20,
//   },
//   scrollView: {
//     flex: 1,
//   },
//   scrollContent: {
//     paddingHorizontal: 39,
//     paddingTop: 20,
//     paddingBottom: 100,
//   },
//   mainContent: {
//     backgroundColor: "#ffffff",
//     borderRadius: 20,
//     padding: 20,
//     marginBottom: 20,
//     elevation: 4,
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
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
//     color: "#000000",
//     backgroundColor: "#ffffff",
//   },
//   textArea: {
//     height: 100,
//     textAlignVertical: "top",
//     paddingTop: 16,
//   },
//   priceContainer: {
//     width: "100%",
//     gap: 8,
//   },
//   priceLabel: {
//     color: "#000000",
//     fontSize: 14,
//     fontWeight: "600",
//   },
//   priceInputContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     borderWidth: 1,
//     borderColor: "#D9D9D9",
//     borderRadius: 8,
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     backgroundColor: "#ffffff",
//   },
//   priceText: {
//     color: "#000000",
//     fontSize: 14,
//   },
//   priceButtons: {
//     flexDirection: "row",
//     gap: 16,
//   },
//   priceButton: {
//     width: 30,
//     height: 30,
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#f5f5f5",
//     borderRadius: 4,
//   },
//   priceButtonText: {
//     fontSize: 18,
//     color: "#000000",
//   },
//   imageContainer: {
//     width: "100%",
//     height: 200,
//     borderWidth: 1,
//     borderColor: "#D9D9D9",
//     borderRadius: 8,
//     overflow: "hidden",
//     backgroundColor: "#ffffff",
//   },
//   image: {
//     width: "100%",
//     height: "100%",
//   },
//   placeholderImage: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#f5f5f5",
//   },
//   placeholderText: {
//     color: "#000000",
//     fontSize: 14,
//   },
//   buttonSection: {
//     width: "100%",
//     position: "absolute",
//     bottom: 20,
//     paddingHorizontal: 39,
//   },
//   bearImage: {
//     width: 118,
//     height: 78,
//     position: "absolute",
//     right: 50,
//     top: -77,
//     zIndex: 1,
//   },
//   submitButton: {
//     width: "100%",
//     height: 60,
//     borderRadius: 28,
//     backgroundColor: "#4D5DFA",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   buttonText: {
//     color: "#ffffff",
//     fontSize: 20,
//   },
// });

// export default CreateNewGoal;

import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Platform,
  Dimensions,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const CreateNewGoal = () => {
  const navigation = useNavigation();
  const [goalName, setGoalName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

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

  const increasePrice = () => {
    setPrice(price + 1);
  };

  const decreasePrice = () => {
    if (price > 0) {
      setPrice(price - 1);
    }
  };

  const handleSubmit = () => {
    navigation.navigate("ProgressGoalScreen", {
      goalName,
      price,
      image,
    });
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/background.png")}
        style={styles.backgroundImage}
        resizeMode="cover"
      />

      <Text style={styles.title}>Create New Goal</Text>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.mainContent}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={goalName}
              onChangeText={setGoalName}
              placeholder="Goal Name"
              placeholderTextColor="#9E9E9E"
            />

            <View style={styles.priceContainer}>
              <Text style={styles.priceLabel}>Price</Text>
              <View style={styles.priceInputContainer}>
                <Text style={styles.priceText}>{price} kd</Text>
                <View style={styles.priceButtons}>
                  <TouchableOpacity
                    style={styles.priceButton}
                    onPress={decreasePrice}
                  >
                    <Text style={styles.priceButtonText}>−</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.priceButton}
                    onPress={increasePrice}
                  >
                    <Text style={styles.priceButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
              {image ? (
                <Image source={{ uri: image }} style={styles.image} />
              ) : (
                <View style={styles.placeholderImage}>
                  <Text style={styles.placeholderText}>
                    Tap to select an image
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <View style={styles.buttonSection}>
        <Image
          source={require("../../assets/bear.png")}
          style={styles.bearImage}
          resizeMode="contain"
        />
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Create Goal</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
    color: "#ffffff",
    fontSize: 25,
    fontWeight: "800",
    letterSpacing: -0.333,
    textAlign: "center",
    marginTop: 60,
    marginBottom: 20,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 39,
    paddingTop: 20,
    paddingBottom: 100,
  },
  mainContent: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 20,
    marginTop: 30,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
      
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  inputContainer: {
    width: "100%",
    gap: 20,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#D9D9D9",
    paddingHorizontal: 16,
    fontSize: 14,
    color: "#000000",
    backgroundColor: "#ffffff",
  },
  priceContainer: {
    width: "100%",
    gap: 8,
  },
  priceLabel: {
    color: "#000000",
    fontSize: 14,
    fontWeight: "600",
  },
  priceInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#D9D9D9",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#ffffff",
  },
  priceText: {
    color: "#000000",
    fontSize: 14,
  },
  priceButtons: {
    flexDirection: "row",
    gap: 16,
  },
  priceButton: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 4,
  },
  priceButtonText: {
    fontSize: 18,
    color: "#000000",
  },
  imageContainer: {
    width: "100%",
    height: 200,
    borderWidth: 1,
    borderColor: "#D9D9D9",
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#ffffff",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  placeholderImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  placeholderText: {
    color: "#000000",
    fontSize: 14,
  },
  buttonSection: {
    width: "100%",
    position: "absolute",
    bottom: 20,
    paddingHorizontal: 39,
  },
  bearImage: {
    width: 118,
    height: 78,
    position: "absolute",
    right: 50,
    top: -77,
    zIndex: 1,
  },
  submitButton: {
    width: "100%",
    height: 60,
    borderRadius: 28,
    backgroundColor: "#4D5DFA",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 20,
  },
});

export default CreateNewGoal;
