// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   Dimensions,
//   Modal,
//   Image,
// } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
// import { useSafeAreaInsets } from "react-native-safe-area-context";

// const { width } = Dimensions.get("window");

// const REDEMPTION_OPTIONS = [
//   {
//     id: 1,
//     title: "Cash Reward",
//     points: 1000,
//     description: "Convert your points to cash",
//     image: require("../../assets/bear.png"),
//   },
//   {
//     id: 2,
//     title: "PlayStation Gift Card",
//     points: 2000,
//     description: "Get a PlayStation Store gift card",
//     image: require("../../assets/bear.png"),
//   },
//   {
//     id: 3,
//     title: "Shopping Gift Card",
//     points: 1500,
//     description: "Get a shopping gift card",
//     image: require("../../assets/bear.png"),
//   },
// ];

// const RewardsScreen = ({ navigation }) => {
//   const insets = useSafeAreaInsets();
//   const [selectedReward, setSelectedReward] = useState(null);
//   const [showRequestModal, setShowRequestModal] = useState(false);

//   const handleRedeemPress = (reward) => {
//     setSelectedReward(reward);
//     setShowRequestModal(true);
//   };

//   const sendRequest = () => {
//     // Here you would implement the logic to send the request to parents
//     setShowRequestModal(false);
//     // Show success message or feedback
//   };

//   const RedemptionCard = ({ item }) => (
//     <TouchableOpacity
//       style={styles.redemptionCard}
//       onPress={() => handleRedeemPress(item)}
//     >
//       <Image source={item.image} style={styles.redemptionImage} />
//       <View style={styles.redemptionContent}>
//         <Text style={styles.redemptionTitle}>{item.title}</Text>
//         <Text style={styles.redemptionPoints}>{item.points} Points</Text>
//         <Text style={styles.redemptionDescription}>{item.description}</Text>
//       </View>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       <LinearGradient
//         colors={["#1433FF", "rgba(217, 217, 217, 0)"]}
//         style={[styles.header, { paddingTop: insets.top + 20 }]}
//         start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 1 }}
//       >
//         <Text style={styles.headerTitle}>3yali Points</Text>
//       </LinearGradient>

//       <ScrollView
//         style={styles.scrollView}
//         contentContainerStyle={styles.content}
//         showsVerticalScrollIndicator={false}
//       >
//         <View style={styles.pointsCard}>
//           <View style={styles.pointsContainer}>
//             <Text style={styles.pointsText}>658</Text>
//             <Text style={styles.pointsLabel}>3YALI POINTS</Text>
//             <Text style={styles.tierText}>Silver Tier</Text>
//             <Text style={styles.nextTierText}>342 points until Gold Tier</Text>
//           </View>
//         </View>

//         <View style={styles.rewardsInfoCard}>
//           <Text style={styles.rewardsInfoText}>
//             Complete <Text style={styles.boldText}>8 TASKS</Text> to get a{" "}
//             <Text style={styles.boldText}>SPECIAL REWARD!</Text>
//           </Text>

//           <View style={styles.progressGrid}>
//             <View style={styles.row}>
//               {[1, 2, 3, 4].map((index) => (
//                 <View key={index} style={styles.progressItem}>
//                   <View
//                     style={[
//                       styles.progressCircle,
//                       index <= 3 && styles.completedCircle,
//                     ]}
//                   >
//                     <Text
//                       style={[
//                         styles.progressNumber,
//                         index <= 3 && styles.completedNumber,
//                       ]}
//                     >
//                       {index}
//                     </Text>
//                   </View>
//                 </View>
//               ))}
//             </View>
//             <View style={styles.row}>
//               {[5, 6, 7, 8].map((index) => (
//                 <View key={index} style={styles.progressItem}>
//                   <View
//                     style={[
//                       styles.progressCircle,
//                       index === 8 && styles.specialProgressCircle,
//                     ]}
//                   >
//                     {index === 8 ? (
//                       <Text style={styles.rewardText}>REWARD</Text>
//                     ) : (
//                       <Text style={styles.progressNumber}>{index}</Text>
//                     )}
//                   </View>
//                 </View>
//               ))}
//             </View>
//           </View>
//         </View>

//         <View style={styles.redeemSection}>
//           <Text style={styles.sectionTitle}>Redeem Your Points</Text>
//           <Text style={styles.sectionSubtitle}>
//             Choose a reward to send a request to your parents
//           </Text>

//           {REDEMPTION_OPTIONS.map((option) => (
//             <RedemptionCard key={option.id} item={option} />
//           ))}
//         </View>
//       </ScrollView>

//       {/* Request Modal */}
//       <Modal
//         visible={showRequestModal}
//         transparent
//         animationType="slide"
//         onRequestClose={() => setShowRequestModal(false)}
//       >
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalTitle}>Send Request to Parents</Text>
//             {selectedReward && (
//               <>
//                 <Text style={styles.modalDescription}>
//                   Would you like to request to redeem {selectedReward.points}{" "}
//                   points for:
//                 </Text>
//                 <Text style={styles.modalRewardTitle}>
//                   {selectedReward.title}
//                 </Text>
//                 <Image
//                   source={selectedReward.image}
//                   style={styles.modalImage}
//                   resizeMode="contain"
//                 />
//               </>
//             )}
//             <View style={styles.modalButtons}>
//               <TouchableOpacity
//                 style={[styles.modalButton, styles.modalButtonCancel]}
//                 onPress={() => setShowRequestModal(false)}
//               >
//                 <Text style={styles.modalButtonTextCancel}>Cancel</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={[styles.modalButton, styles.modalButtonSend]}
//                 onPress={sendRequest}
//               >
//                 <Text style={styles.modalButtonTextSend}>Send Request</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#ffffff",
//   },
//   header: {
//     height: 236,
//     width: "100%",
//     justifyContent: "flex-start",
//     alignItems: "center",
//   },
//   headerTitle: {
//     color: "#FFF",
//     fontSize: 25,
//     fontWeight: "800",
//     letterSpacing: -0.333,
//   },
//   scrollView: {
//     flex: 1,
//   },
//   content: {
//     alignItems: "center",
//     paddingHorizontal: 20,
//     paddingTop: 20,
//     paddingBottom: 40,
//   },
//   pointsCard: {
//     backgroundColor: "#ffffff",
//     borderRadius: 20,
//     padding: 20,
//     width: "100%",
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//     marginBottom: 20,
//   },
//   pointsContainer: {
//     alignItems: "center",
//     padding: 20,
//   },
//   pointsText: {
//     fontSize: 48,
//     fontWeight: "700",
//     color: "#4D5DFA",
//     marginBottom: 5,
//   },
//   pointsLabel: {
//     fontSize: 16,
//     color: "#666",
//     marginBottom: 15,
//     fontWeight: "600",
//   },
//   tierText: {
//     fontSize: 24,
//     fontWeight: "600",
//     color: "#7C3AED",
//     marginBottom: 10,
//   },
//   nextTierText: {
//     fontSize: 14,
//     color: "#666",
//   },
//   rewardsInfoCard: {
//     backgroundColor: "#ffffff",
//     borderRadius: 20,
//     padding: 20,
//     width: "100%",
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//     marginBottom: 20,
//   },
//   rewardsInfoText: {
//     fontSize: 16,
//     color: "#333",
//     textAlign: "center",
//     marginBottom: 20,
//   },
//   boldText: {
//     fontWeight: "700",
//     color: "#4D5DFA",
//   },
//   progressGrid: {
//     width: "100%",
//   },
//   row: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     marginBottom: 20,
//   },
//   progressItem: {
//     alignItems: "center",
//   },
//   progressCircle: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     backgroundColor: "#F0F0F0",
//     justifyContent: "center",
//     alignItems: "center",
//     borderWidth: 2,
//     borderColor: "#4D5DFA",
//   },
//   completedCircle: {
//     backgroundColor: "#4D5DFA",
//   },
//   completedNumber: {
//     color: "#ffffff",
//   },
//   specialProgressCircle: {
//     backgroundColor: "#7C3AED",
//   },
//   progressNumber: {
//     fontSize: 18,
//     fontWeight: "600",
//     color: "#4D5DFA",
//   },
//   rewardText: {
//     fontSize: 12,
//     fontWeight: "700",
//     color: "#ffffff",
//     textAlign: "center",
//   },
//   redeemSection: {
//     width: "100%",
//     paddingTop: 20,
//   },
//   sectionTitle: {
//     fontSize: 20,
//     fontWeight: "700",
//     color: "#1F2937",
//     marginBottom: 8,
//   },
//   sectionSubtitle: {
//     fontSize: 14,
//     color: "#6B7280",
//     marginBottom: 20,
//   },
//   redemptionCard: {
//     backgroundColor: "#ffffff",
//     borderRadius: 16,
//     padding: 16,
//     marginBottom: 16,
//     flexDirection: "row",
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 3.84,
//     elevation: 3,
//   },
//   redemptionImage: {
//     width: 80,
//     height: 80,
//     borderRadius: 12,
//     marginRight: 16,
//   },
//   redemptionContent: {
//     flex: 1,
//   },
//   redemptionTitle: {
//     fontSize: 18,
//     fontWeight: "600",
//     color: "#1F2937",
//     marginBottom: 4,
//   },
//   redemptionPoints: {
//     fontSize: 16,
//     fontWeight: "700",
//     color: "#4D5DFA",
//     marginBottom: 4,
//   },
//   redemptionDescription: {
//     fontSize: 14,
//     color: "#6B7280",
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   modalContent: {
//     backgroundColor: "#ffffff",
//     borderRadius: 20,
//     padding: 24,
//     width: width * 0.9,
//     alignItems: "center",
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: "700",
//     color: "#1F2937",
//     marginBottom: 16,
//     textAlign: "center",
//   },
//   modalDescription: {
//     fontSize: 16,
//     color: "#6B7280",
//     marginBottom: 8,
//     textAlign: "center",
//   },
//   modalRewardTitle: {
//     fontSize: 18,
//     fontWeight: "600",
//     color: "#4D5DFA",
//     marginBottom: 16,
//     textAlign: "center",
//   },
//   modalImage: {
//     width: 120,
//     height: 120,
//     marginBottom: 24,
//   },
//   modalButtons: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     width: "100%",
//     paddingHorizontal: 16,
//   },
//   modalButton: {
//     flex: 1,
//     height: 48,
//     borderRadius: 24,
//     justifyContent: "center",
//     alignItems: "center",
//     marginHorizontal: 8,
//   },
//   modalButtonCancel: {
//     backgroundColor: "#EF4444",
//   },
//   modalButtonSend: {
//     backgroundColor: "#4D5DFA",
//   },
//   modalButtonTextCancel: {
//     color: "#ffffff",
//     fontSize: 16,
//     fontWeight: "600",
//   },
//   modalButtonTextSend: {
//     color: "#ffffff",
//     fontSize: 16,
//     fontWeight: "600",
//   },
// });

// export default RewardsScreen;

// import React, { useState, useRef } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   Dimensions,
//   Modal,
//   Image,
// } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import ConfettiCannon from "react-native-confetti-cannon";

// const { width } = Dimensions.get("window");

// const REDEMPTION_OPTIONS = [
//   {
//     id: 1,
//     title: "Cash Reward",
//     points: 1000,
//     description: "Convert your points to cash",
//     image: require("../../assets/bear.png"),
//   },
//   {
//     id: 2,
//     title: "PlayStation Gift Card",
//     points: 2000,
//     description: "Get a PlayStation Store gift card",
//     image: require("../../assets/bear.png"),
//   },
//   {
//     id: 3,
//     title: "Shopping Gift Card",
//     points: 1500,
//     description: "Get a shopping gift card",
//     image: require("../../assets/bear.png"),
//   },
// ];

// const RewardsScreen = () => {
//   const insets = useSafeAreaInsets();
//   const [selectedReward, setSelectedReward] = useState(null);
//   const [showRequestModal, setShowRequestModal] = useState(false);
//   const [showConfirmationModal, setShowConfirmationModal] = useState(false);
//   const [points, setPoints] = useState(3000);
//   const confettiRef = useRef(null);

//   const handleRedeemPress = (reward) => {
//     setSelectedReward(reward);
//     setShowRequestModal(true);
//   };

//   const sendRequest = () => {
//     setPoints((prev) => prev - selectedReward.points);
//     setShowRequestModal(false);
//     setShowConfirmationModal(true);
//     confettiRef.current?.start();
//   };

//   const RedemptionCard = ({ item }) => (
//     <TouchableOpacity
//       style={styles.redemptionCard}
//       onPress={() => handleRedeemPress(item)}
//     >
//       <Image source={item.image} style={styles.redemptionImage} />
//       <View style={styles.redemptionContent}>
//         <Text style={styles.redemptionTitle}>{item.title}</Text>
//         <Text style={styles.redemptionPoints}>{item.points} Points</Text>
//         <Text style={styles.redemptionDescription}>{item.description}</Text>
//       </View>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       <LinearGradient
//         colors={["#1433FF", "rgba(217, 217, 217, 0)"]}
//         style={[styles.header, { paddingTop: insets.top + 20 }]}
//         start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 1 }}
//       >
//         <Text style={styles.headerTitle}>3yali Points</Text>
//       </LinearGradient>

//       <ScrollView
//         style={styles.scrollView}
//         contentContainerStyle={styles.content}
//         showsVerticalScrollIndicator={false}
//       >
//         <View style={styles.pointsCard}>
//           <View style={styles.pointsContainer}>
//             <Text style={styles.pointsText}>{points}</Text>
//             <Text style={styles.pointsLabel}>3YALI POINTS</Text>
//             <Text style={styles.tierText}>Silver Tier</Text>
//             <Text style={styles.nextTierText}>342 points until Gold Tier</Text>
//           </View>
//         </View>

//         <View style={styles.redeemSection}>
//           <Text style={styles.sectionTitle}>Redeem Your Points</Text>
//           <Text style={styles.sectionSubtitle}>
//             Choose a reward to send a request to your parents
//           </Text>

//           {REDEMPTION_OPTIONS.map((option) => (
//             <RedemptionCard key={option.id} item={option} />
//           ))}
//         </View>
//       </ScrollView>

//       {/* Request Modal */}
//       <Modal
//         visible={showRequestModal}
//         transparent
//         animationType="slide"
//         onRequestClose={() => setShowRequestModal(false)}
//       >
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalTitle}>Send Request to Parents</Text>
//             {selectedReward && (
//               <>
//                 <Text style={styles.modalDescription}>
//                   Would you like to request to redeem {selectedReward.points} points for:
//                 </Text>
//                 <Text style={styles.modalRewardTitle}>{selectedReward.title}</Text>
//                 <Image
//                   source={selectedReward.image}
//                   style={styles.modalImage}
//                   resizeMode="contain"
//                 />
//               </>
//             )}
//             <View style={styles.modalButtons}>
//               <TouchableOpacity
//                 style={[styles.modalButton, styles.modalButtonCancel]}
//                 onPress={() => setShowRequestModal(false)}
//               >
//                 <Text style={styles.modalButtonTextCancel}>Cancel</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={[styles.modalButton, styles.modalButtonSend]}
//                 onPress={sendRequest}
//               >
//                 <Text style={styles.modalButtonTextSend}>Send Request</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>

//       {/* Confirmation Modal */}
//       <Modal
//         visible={showConfirmationModal}
//         transparent
//         animationType="fade"
//         onRequestClose={() => setShowConfirmationModal(false)}
//       >
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalTitle}>Request Sent!</Text>
//             <Text style={styles.modalDescription}>
//               Request has been sent to your parent.{"\n"}Waiting for confirmation.
//             </Text>
//             <TouchableOpacity
//               style={[styles.modalButton, styles.modalButtonSend, { marginTop: 20 }]}
//               onPress={() => setShowConfirmationModal(false)}
//             >
//               <Text style={styles.modalButtonTextSend}>OK</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>

//       {/* Confetti */}
//       <ConfettiCannon
//         ref={confettiRef}
//         count={80}
//         origin={{ x: width / 2, y: 0 }}
//         fadeOut
//         autoStart={false}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#ffffff",
//   },
//   header: {
//     height: 236,
//     width: "100%",
//     justifyContent: "flex-start",
//     alignItems: "center",
//   },
//   headerTitle: {
//     color: "#FFF",
//     fontSize: 25,
//     fontWeight: "800",
//   },
//   scrollView: {
//     flex: 1,
//   },
//   content: {
//     alignItems: "center",
//     paddingHorizontal: 20,
//     paddingTop: 20,
//     paddingBottom: 40,
//   },
//   pointsCard: {
//     backgroundColor: "#ffffff",
//     borderRadius: 20,
//     padding: 20,
//     width: "100%",
//     marginBottom: 20,
//     elevation: 5,
//   },
//   pointsContainer: {
//     alignItems: "center",
//   },
//   pointsText: {
//     fontSize: 48,
//     fontWeight: "700",
//     color: "#4D5DFA",
//   },
//   pointsLabel: {
//     fontSize: 16,
//     color: "#666",
//     fontWeight: "600",
//     marginBottom: 15,
//   },
//   tierText: {
//     fontSize: 24,
//     fontWeight: "600",
//     color: "#7C3AED",
//     marginBottom: 10,
//   },
//   nextTierText: {
//     fontSize: 14,
//     color: "#666",
//   },
//   redeemSection: {
//     width: "100%",
//     paddingTop: 20,
//   },
//   sectionTitle: {
//     fontSize: 20,
//     fontWeight: "700",
//     color: "#1F2937",
//     marginBottom: 8,
//   },
//   sectionSubtitle: {
//     fontSize: 14,
//     color: "#6B7280",
//     marginBottom: 20,
//   },
//   redemptionCard: {
//     backgroundColor: "#ffffff",
//     borderRadius: 16,
//     padding: 16,
//     marginBottom: 16,
//     flexDirection: "row",
//     alignItems: "center",
//     elevation: 3,
//   },
//   redemptionImage: {
//     width: 80,
//     height: 80,
//     borderRadius: 12,
//     marginRight: 16,
//   },
//   redemptionContent: {
//     flex: 1,
//   },
//   redemptionTitle: {
//     fontSize: 18,
//     fontWeight: "600",
//     color: "#1F2937",
//     marginBottom: 4,
//   },
//   redemptionPoints: {
//     fontSize: 16,
//     fontWeight: "700",
//     color: "#4D5DFA",
//     marginBottom: 4,
//   },
//   redemptionDescription: {
//     fontSize: 14,
//     color: "#6B7280",
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   modalContent: {
//     backgroundColor: "#ffffff",
//     borderRadius: 20,
//     padding: 24,
//     width: width * 0.9,
//     alignItems: "center",
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: "700",
//     color: "#1F2937",
//     marginBottom: 16,
//     textAlign: "center",
//   },
//   modalDescription: {
//     fontSize: 16,
//     color: "#6B7280",
//     textAlign: "center",
//     marginBottom: 16,
//   },
//   modalRewardTitle: {
//     fontSize: 18,
//     fontWeight: "600",
//     color: "#4D5DFA",
//     marginBottom: 16,
//     textAlign: "center",
//   },
//   modalImage: {
//     width: 120,
//     height: 120,
//     marginBottom: 24,
//   },
//   modalButtons: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     width: "100%",
//   },
//   modalButton: {
//     flex: 1,
//     height: 48,
//     borderRadius: 24,
//     justifyContent: "center",
//     alignItems: "center",
//     marginHorizontal: 8,
//   },
//   modalButtonCancel: {
//     backgroundColor: "#EF4444",
//   },
//   modalButtonSend: {
//     backgroundColor: "#4D5DFA",
//   },
//   modalButtonTextCancel: {
//     color: "#ffffff",
//     fontSize: 16,
//     fontWeight: "600",
//   },
//   modalButtonTextSend: {
//     color: "#ffffff",
//     fontSize: 16,
//     fontWeight: "600",
//   },
// });

// export default RewardsScreen;

// import React from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   SafeAreaView,
//   TouchableOpacity,
//   ScrollView,
// } from "react-native";
// import { useNavigation } from "@react-navigation/native";

// const RewardsScreen = () => {
//   const navigation = useNavigation();

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity
//           onPress={() => navigation.goBack()}
//           style={styles.backButton}
//         >
//           <Text style={styles.backButtonText}>← Back</Text>
//         </TouchableOpacity>
//         <Text style={styles.title}>Rewards</Text>
//       </View>

//       <ScrollView style={styles.content}>
//         <View style={styles.balanceCard}>
//           <Text style={styles.balanceTitle}>Current Balance</Text>
//           <View style={styles.balanceAmount}>
//             <Text style={styles.amount}>250</Text>
//             <Text style={styles.currency}>KWD</Text>
//           </View>
//         </View>

//         <View style={styles.rewardsList}>
//           <Text style={styles.sectionTitle}>Available Rewards</Text>

//           <TouchableOpacity style={styles.rewardCard}>
//             <Text style={styles.rewardTitle}>Complete All Tasks</Text>
//             <Text style={styles.rewardPoints}>+50 points</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.rewardCard}>
//             <Text style={styles.rewardTitle}>Daily Login Bonus</Text>
//             <Text style={styles.rewardPoints}>+10 points</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.rewardCard}>
//             <Text style={styles.rewardTitle}>Achievement Unlocked</Text>
//             <Text style={styles.rewardPoints}>+25 points</Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   header: {
//     padding: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: "#EDF1F7",
//   },
//   backButton: {
//     marginBottom: 10,
//   },
//   backButtonText: {
//     fontSize: 16,
//     color: "#007AFF",
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#000",
//   },
//   content: {
//     flex: 1,
//     padding: 20,
//   },
//   balanceCard: {
//     backgroundColor: "#FD9FDD",
//     borderRadius: 16,
//     padding: 20,
//     marginBottom: 30,
//   },
//   balanceTitle: {
//     fontSize: 16,
//     color: "#130F26",
//     marginBottom: 8,
//   },
//   balanceAmount: {
//     flexDirection: "row",
//     alignItems: "flex-end",
//   },
//   amount: {
//     fontSize: 36,
//     fontWeight: "bold",
//     color: "#000",
//   },
//   currency: {
//     fontSize: 18,
//     color: "#000",
//     marginLeft: 4,
//     marginBottom: 6,
//   },
//   rewardsList: {
//     gap: 16,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: "600",
//     color: "#130F26",
//     marginBottom: 16,
//   },
//   rewardCard: {
//     backgroundColor: "#FAFAFA",
//     borderRadius: 16,
//     padding: 20,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   rewardTitle: {
//     fontSize: 16,
//     color: "#000",
//   },
//   rewardPoints: {
//     fontSize: 16,
//     color: "#4960F9",
//     fontWeight: "600",
//   },
// });

// export default RewardsScreen;

import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
  Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import ConfettiCannon from "react-native-confetti-cannon";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import Logout from "../components/Logout";

const { width, height } = Dimensions.get("window");

const REWARDS = [
  {
    id: 1,
    title: "Cash Reward",
    points: 1000,
    image: require("../../assets/bear.png"),
  },
  {
    id: 2,
    title: "PlayStation Gift Card",
    points: 2000,
    image: require("../../assets/bear.png"),
  },
  {
    id: 3,
    title: "V-Bucks",
    points: 1500,
    image: require("../../assets/bear.png"),
  },
  {
    id: 4,
    title: "Roblox Card",
    points: 1200,
    image: require("../../assets/bear.png"),
  },
];

const COLOR_MAP = ["#FFE4F0", "#E1F0FF", "#FFF6CC", "#E0FFE1"];

const RewardsScreen = () => {
  const navigation = useNavigation();
  const confettiRef = useRef(null);
  const [balance, setBalance] = useState(2500);
  const [selectedReward, setSelectedReward] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    confettiRef.current?.start?.();
  }, []);

  const handleRedeem = (reward) => {
    if (balance < reward.points) {
      alert("Not enough points for this reward!");
      return;
    }
    setSelectedReward(reward);
    setShowModal(true);
  };

  const confirmRedemption = () => {
    setBalance((prev) => prev - selectedReward.points);
    setShowModal(false);
    confettiRef.current?.start?.();
    alert(`Requested ${selectedReward.title} 🎉`);
  };

  const AnimatedRewardCard = ({ reward, index, onPress }) => {
    const scale = useSharedValue(1);
    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ scale: scale.value }],
    }));

    const handlePressIn = () => {
      scale.value = withSpring(0.95);
    };

    const handlePressOut = () => {
      scale.value = withSpring(1);
    };

    return (
      <Animated.View style={[styles.animatedCard, animatedStyle]}>
        <TouchableOpacity
          onPress={() => onPress(reward)}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          activeOpacity={0.9}
          style={[
            styles.rewardCard,
            { backgroundColor: COLOR_MAP[index % COLOR_MAP.length] },
          ]}
        >
          <View style={styles.cardContent}>
            <Image source={reward.image} style={styles.rewardImage} />
            <View>
              <Text style={styles.rewardText}>{reward.title}</Text>
              <Text style={styles.rewardPoints}>Cost: {reward.points} pts</Text>
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Logout />
      <Image
        source={require("../../assets/background.png")}
        style={styles.backgroundImage}
        resizeMode="cover"
      />

      <LinearGradient
        colors={["#1433FF", "rgba(217, 217, 217, 0)"]}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backButton}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>3ayli Rewards</Text>
        </View>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.pointsCard}>
          <Text style={styles.balanceLabel}>Current Balance</Text>
          <View style={styles.balanceRow}>
            <Text style={styles.balanceValue}>{balance}</Text>
            <Text style={styles.currency}>Points</Text>
          </View>
        </View>

        <View style={styles.rewardsWrapper}>
          <Text style={styles.sectionTitle}>Redeem Your Points</Text>

          {REWARDS.map((reward, index) => (
            <AnimatedRewardCard
              key={reward.id}
              reward={reward}
              index={index}
              onPress={handleRedeem}
            />
          ))}
        </View>
      </ScrollView>

      <ConfettiCannon
        ref={confettiRef}
        count={80}
        origin={{ x: width / 2, y: -20 }}
        fadeOut
        autoStart={false}
      />

      <Modal
        visible={showModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Confirm Redemption</Text>
            {selectedReward && (
              <>
                <Text style={styles.modalText}>Do you want to redeem:</Text>
                <Text style={styles.modalReward}>{selectedReward.title}</Text>
                <Text style={styles.modalCost}>
                  for {selectedReward.points} points?
                </Text>
              </>
            )}
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: "#EF4444" }]}
                onPress={() => setShowModal(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: "#4D5DFA" }]}
                onPress={confirmRedemption}
              >
                <Text style={styles.modalButtonText}>Yes, Redeem</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ffffff" },
  backgroundImage: {
    position: "absolute",
    width: width,
    height: height * 0.5,
    top: 0,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    zIndex: 1,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    color: "#ffffff",
    fontSize: 16,
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: "#ffffff",
  },
  scrollView: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  pointsCard: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    marginBottom: 30,
    elevation: 5,
  },
  balanceLabel: {
    fontSize: 16,
    color: "#6B7280",
    fontWeight: "500",
    marginBottom: 8,
  },
  balanceRow: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  balanceValue: {
    fontSize: 48,
    fontWeight: "700",
    color: "#4D5DFA",
  },
  currency: {
    fontSize: 18,
    marginLeft: 6,
    marginBottom: 6,
    color: "#4D5DFA",
  },
  rewardsWrapper: {
    gap: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 10,
  },
  animatedCard: {
    borderRadius: 16,
    marginBottom: 12,
  },
  rewardCard: {
    padding: 18,
    borderRadius: 16,
    elevation: 3,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  rewardImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
  },
  rewardText: {
    fontSize: 16,
    color: "#1F2937",
    fontWeight: "600",
  },
  rewardPoints: {
    fontSize: 14,
    color: "#4D5DFA",
    fontWeight: "500",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 24,
    width: "85%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
    color: "#111827",
  },
  modalText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 6,
    color: "#374151",
  },
  modalReward: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 6,
    color: "#4D5DFA",
  },
  modalCost: {
    fontSize: 16,
    color: "#6B7280",
  },
  modalButtons: {
    flexDirection: "row",
    marginTop: 20,
    gap: 10,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});

export default RewardsScreen;