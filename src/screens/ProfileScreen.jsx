// import { useNavigation } from "@react-navigation/native";
// import React from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   SafeAreaView,
//   Platform,
//   ScrollView,
//   TouchableOpacity,
//   Dimensions,
//   FlatList,
//   Image,
// } from "react-native";

// const { width, height } = Dimensions.get("window");

// const mockTasks = [
//   { id: "1", title: "Complete homework", amount: 5.0 },
//   { id: "2", title: "Clean room", amount: 3.0 },
//   { id: "3", title: "Read a book", amount: 4.0 },
//   { id: "4", title: "Exercise", amount: 6.0 },
// ];

// const mockSavingGoals = [
//   { id: "1", title: "New Bike", amount: 200, progress: 150 },
//   { id: "2", title: "Video Game", amount: 60, progress: 45 },
//   { id: "3", title: "School Supplies", amount: 100, progress: 80 },
// ];

// const TaskItem = ({ item }) => (
//   <View style={styles.taskItem}>
//     <Text style={styles.taskTitle}>{item.title}</Text>
//     <Text style={styles.taskAmount}>{item.amount.toFixed(2)} KD</Text>
//   </View>
// );

// const SavingGoalItem = ({ item }) => (
//   <View style={styles.goalItem}>
//     <Text style={styles.goalTitle}>{item.title}</Text>
//     <View style={styles.goalProgress}>
//       <View
//         style={[
//           styles.progressBar,
//           { width: `${(item.progress / item.amount) * 100}%` },
//         ]}
//       />
//     </View>
//     <Text style={styles.goalAmount}>
//       {item.progress} KD / {item.amount} KD
//     </Text>
//   </View>
// );

// const ProfileScreen = () => {
//   const navigation = useNavigation(); // Correctly placed inside the component

//   return (
//     <View style={styles.container}>
//       <Image
//         source={require("../../assets/background.png")}
//         style={styles.backgroundImage}
//         resizeMode="cover"
//       />

//       <ScrollView
//         contentContainerStyle={styles.scrollContent}
//         showsVerticalScrollIndicator={false}
//       >
//         <View style={styles.content}>
//           <Text style={styles.title}>PROFILE</Text>

//           <View style={styles.balanceSection}>
//             <Text style={styles.balanceLabel}>Total balance</Text>
//             <Text style={styles.balanceAmount}>3077.20 KD</Text>
//           </View>

//           <View style={styles.mainContent}>
//             <View style={styles.section}>
//               <Text style={styles.sectionTitle}>Saving goals</Text>
//               <FlatList
//                 data={mockSavingGoals}
//                 renderItem={({ item }) => <SavingGoalItem item={item} />}
//                 keyExtractor={(item) => item.id}
//                 scrollEnabled={false}
//               />
//             </View>

//             <View style={styles.section}>
//               <Text style={styles.sectionTitle}>Tasks</Text>
//               <FlatList
//                 data={mockTasks}
//                 renderItem={({ item }) => <TaskItem item={item} />}
//                 keyExtractor={(item) => item.id}
//                 scrollEnabled={false}
//               />
//             </View>
//           </View>

//           <View style={styles.buttonSection}>
//             <Image
//               source={require("../../assets/bear.png")}
//               style={styles.bearImage}
//               resizeMode="contain"
//             />

//             <View style={styles.actionButtonsContainer}>
//               <TouchableOpacity
//                 style={styles.actionButton}
//                 onPress={() => navigation.navigate("Deposit")} // This should work now
//               >
//                 <Text style={styles.actionButtonText}>Deposit</Text>
//               </TouchableOpacity>

//               <TouchableOpacity
//                 style={styles.actionButton}
//                 onPress={() => navigation.navigate("CreateTask")}
//               >
//                 <Text style={styles.actionButtonText}>Create Task</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </ScrollView>
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
//   content: {
//     flex: 1,
//     paddingHorizontal: 39,
//     paddingTop: 60,
//     alignItems: "center",
//   },
//   title: {
//     color: "#ffffff",
//     fontSize: 25,
//     fontWeight: "800",
//     letterSpacing: -0.333,
//     marginBottom: 20,
//   },
//   balanceSection: {
//     alignItems: "center",
//     marginBottom: 30,
//   },
//   balanceLabel: {
//     color: "#ffffff",
//     fontSize: 16,
//     fontWeight: "600",
//     marginBottom: 8,
//   },
//   balanceAmount: {
//     color: "#ffffff",
//     fontSize: 24,
//     fontWeight: "700",
//   },
//   mainContent: {
//     width: "100%",
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
//   section: {
//     marginBottom: 20,
//   },
//   sectionTitle: {
//     fontSize: 16,
//     color: "#111827",
//     fontWeight: "600",
//     marginBottom: 16,
//   },
//   taskItem: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: "#E5E7EB",
//   },
//   taskTitle: {
//     fontSize: 14,
//     color: "#111827",
//     fontWeight: "500",
//   },
//   taskAmount: {
//     fontSize: 14,
//     color: "#4D5DFA",
//     fontWeight: "600",
//   },
//   goalItem: {
//     marginBottom: 16,
//   },
//   goalTitle: {
//     fontSize: 14,
//     color: "#111827",
//     fontWeight: "500",
//     marginBottom: 8,
//   },
//   goalProgress: {
//     height: 8,
//     backgroundColor: "#E5E7EB",
//     borderRadius: 4,
//     overflow: "hidden",
//     marginBottom: 4,
//   },
//   progressBar: {
//     height: "100%",
//     backgroundColor: "#4D5DFA",
//     borderRadius: 4,
//   },
//   goalAmount: {
//     fontSize: 12,
//     color: "#6B7280",
//   },
//   buttonSection: {
//     width: "100%",
//     position: "relative",
//     marginTop: 20,
//   },
//   bearImage: {
//     width: 118,
//     height: 78,
//     position: "absolute",
//     right: 0,
//     top: -60,
//     zIndex: 1,
//   },
//   actionButtonsContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     gap: 16,
//   },
//   actionButton: {
//     flex: 1,
//     height: 72,
//     backgroundColor: "#4D5DFA",
//     borderRadius: 28,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   actionButtonText: {
//     color: "#ffffff",
//     fontSize: 20,
//     fontWeight: "500",
//   },
// });

// export default ProfileScreen;


// // import React from "react";
// // import {
// //   View,
// //   Text,
// //   StyleSheet,
// //   ScrollView,
// //   TouchableOpacity,
// //   Dimensions,
// //   FlatList,
// //   Image,
// // } from "react-native";
// // import { useNavigation } from "@react-navigation/native";
// // import { AnimatedCircularProgress } from "react-native-circular-progress";

// // const { width, height } = Dimensions.get("window");

// // const mockTasks = [
// //   { id: "1", title: "Complete homework", amount: 5.0, status: "Verified" },
// //   { id: "2", title: "Clean room", amount: 3.0, status: "Rejected" },
// //   { id: "3", title: "Read a book", amount: 4.0, status: "Approved" },
// //   { id: "4", title: "Exercise", amount: 6.0, status: "Verified" },
// // ];

// // const mockSavingGoals = [
// //   { id: "1", title: "New Bike", amount: 200, progress: 150 },
// //   { id: "2", title: "Video Game", amount: 60, progress: 45 },
// //   { id: "3", title: "School Supplies", amount: 100, progress: 80 },
// // ];

// // const TaskItem = ({ item }) => {
// //   const getStatusColor = (status) => {
// //     switch (status.toLowerCase()) {
// //       case "verified":
// //         return "#3B82F6";
// //       case "approved":
// //         return "#10B981";
// //       case "rejected":
// //         return "#EF4444";
// //       default:
// //         return "#9CA3AF";
// //     }
// //   };

// //   return (
// //     <View style={styles.taskBox}>
// //       <Text style={styles.taskTitle}>{item.title}</Text>
// //       <Text style={styles.taskAmount}>{item.amount.toFixed(2)} KD</Text>
// //       <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
// //         <Text style={styles.statusText}>{item.status}</Text>
// //       </View>
// //     </View>
// //   );
// // };

// // const SavingGoalItem = ({ item }) => {
// //   const percentage = Math.round((item.progress / item.amount) * 100);
// //   return (
// //     <View style={styles.goalCard}>
// //       <AnimatedCircularProgress
// //         size={70}
// //         width={7}
// //         fill={percentage}
// //         tintColor="#4CAF50"
// //         backgroundColor="#E5E7EB"
// //         style={{ marginBottom: 8 }}
// //       >
// //         {(fill) => <Text style={styles.goalPercentage}>{`${percentage}%`}</Text>}
// //       </AnimatedCircularProgress>
// //       <Text style={styles.goalTitle}>{item.title}</Text>
// //       <Text style={styles.goalAmount}>
// //         {item.progress} KD / {item.amount} KD
// //       </Text>
// //     </View>
// //   );
// // };

// // const ProfileScreen = () => {
// //   const navigation = useNavigation();

// //   return (
// //     <View style={styles.container}>
// //       <Image
// //         source={require("../../assets/background.png")}
// //         style={styles.backgroundImage}
// //         resizeMode="cover"
// //       />

// //       <ScrollView contentContainerStyle={styles.scrollContent}>
// //         <View style={styles.content}>
// //           <Text style={styles.title}>PROFILE</Text>

// //           {/* Balance Card */}
// //           <View style={styles.balanceCard}>
// //             <Text style={styles.balanceLabel}>Total Balance</Text>
// //             <Text style={styles.balanceAmount}>3077.20 KD</Text>
// //           </View>

// //           {/* Saving Goals */}
// //           <View style={styles.section}>
// //             <Text style={styles.sectionTitle}>Saving Goals</Text>
// //             <FlatList
// //               data={mockSavingGoals}
// //               renderItem={({ item }) => <SavingGoalItem item={item} />}
// //               keyExtractor={(item) => item.id}
// //               horizontal
// //               showsHorizontalScrollIndicator={false}
// //             />
// //           </View>

// //           {/* Task List */}
// //           <View style={styles.section}>
// //             <Text style={styles.sectionTitle}>Tasks</Text>
// //             <FlatList
// //               data={mockTasks}
// //               renderItem={({ item }) => <TaskItem item={item} />}
// //               keyExtractor={(item) => item.id}
// //               scrollEnabled={false}
// //             />
// //           </View>

// //           {/* Buttons */}
// //           <View style={styles.buttonSection}>
// //             <Image
// //               source={require("../../assets/bear.png")}
// //               style={styles.bearImage}
// //               resizeMode="contain"
// //             />

// //             <View style={styles.actionButtonsContainer}>
// //               <TouchableOpacity
// //                 style={styles.actionButton}
// //                 onPress={() => navigation.navigate("Deposit")}
// //               >
// //                 <Text style={styles.actionButtonText}>Deposit</Text>
// //               </TouchableOpacity>

// //               <TouchableOpacity
// //                 style={styles.actionButton}
// //                 onPress={() => navigation.navigate("CreateTask")}
// //               >
// //                 <Text style={styles.actionButtonText}>Create Task</Text>
// //               </TouchableOpacity>
// //             </View>
// //           </View>
// //         </View>
// //       </ScrollView>
// //     </View>
// //   );
// // };

// // export default ProfileScreen;

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: "#ffffff",
// //   },
// //   backgroundImage: {
// //     position: "absolute",
// //     width: width,
// //     height: height * 0.5,
// //     top: 0,
// //   },
// //   scrollContent: {
// //     paddingBottom: 40,
// //   },
// //   content: {
// //     flex: 1,
// //     paddingHorizontal: 39,
// //     paddingTop: 60,
// //     alignItems: "center",
// //   },
// //   title: {
// //     color: "#ffffff",
// //     fontSize: 25,
// //     fontWeight: "800",
// //     letterSpacing: -0.333,
// //     marginBottom: 20,
// //   },
// //   balanceCard: {
// //     width: "100%",
// //     backgroundColor: "#ffffff",
// //     padding: 20,
// //     borderRadius: 16,
// //     alignItems: "center",
// //     elevation: 4,
// //     shadowColor: "#000000",
// //     shadowOpacity: 0.1,
// //     shadowOffset: { width: 0, height: 2 },
// //     shadowRadius: 4,
// //     marginBottom: 24,
// //   },
// //   balanceLabel: {
// //     fontSize: 16,
// //     color: "#6B7280",
// //     marginBottom: 4,
// //   },
// //   balanceAmount: {
// //     fontSize: 26,
// //     fontWeight: "bold",
// //     color: "#7C3AED",
// //   },
// //   section: {
// //     width: "100%",
// //     marginBottom: 24,
// //   },
// //   sectionTitle: {
// //     fontSize: 16,
// //     fontWeight: "600",
// //     color: "#1F2937",
// //     marginBottom: 12,
// //   },
// //   taskBox: {
// //     backgroundColor: "#fff",
// //     borderRadius: 16,
// //     padding: 16,
// //     marginBottom: 14,
// //     borderWidth: 1,
// //     borderColor: "#E5E7EB",
// //     elevation: 2,
// //   },
// //   taskTitle: { fontSize: 16, fontWeight: "600", color: "#1F2937" },
// //   taskAmount: { fontSize: 14, color: "#6B7280", marginVertical: 4 },
// //   statusBadge: {
// //     paddingHorizontal: 10,
// //     paddingVertical: 4,
// //     borderRadius: 12,
// //     alignSelf: "flex-start",
// //   },
// //   statusText: {
// //     color: "#fff",
// //     fontWeight: "600",
// //     fontSize: 12,
// //   },
// //   goalCard: {
// //     backgroundColor: "#F9FAFB",
// //     borderRadius: 16,
// //     padding: 16,
// //     width: 130,
// //     alignItems: "center",
// //     marginRight: 12,
// //     borderWidth: 1,
// //     borderColor: "#E5E7EB",
// //   },
// //   goalTitle: {
// //     fontSize: 14,
// //     fontWeight: "600",
// //     color: "#1F2937",
// //     marginBottom: 4,
// //     textAlign: "center",
// //   },
// //   goalAmount: {
// //     fontSize: 12,
// //     color: "#6B7280",
// //     textAlign: "center",
// //   },
// //   goalPercentage: {
// //     fontSize: 14,
// //     fontWeight: "600",
// //     color: "#4CAF50",
// //   },
// //   buttonSection: {
// //     width: "100%",
// //     marginTop: 24,
// //     position: "relative",
// //   },
// //   bearImage: {
// //     width: 118,
// //     height: 78,
// //     position: "absolute",
// //     right: 0,
// //     top: -60,
// //     zIndex: 1,
// //   },
// //   actionButtonsContainer: {
// //     flexDirection: "row",
// //     justifyContent: "space-between",
// //     gap: 16,
// //   },
// //   actionButton: {
// //     flex: 1,
// //     height: 72,
// //     backgroundColor: "#4D5DFA",
// //     borderRadius: 28,
// //     justifyContent: "center",
// //     alignItems: "center",
// //   },
// //   actionButtonText: {
// //     color: "#ffffff",
// //     fontSize: 20,
// //     fontWeight: "500",
// //   },
// // });
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import CircleProgress from "../components/CircleProgress";

const { width, height } = Dimensions.get("window");

const mockTasks = [
  { id: "1", title: "Complete homework", amount: 5.0, status: "Verified" },
  { id: "2", title: "Clean room", amount: 3.0, status: "Rejected" },
  { id: "3", title: "Read a book", amount: 4.0, status: "Approved" },
  { id: "4", title: "Exercise", amount: 6.0, status: "Verified" },
];

const mockSavingGoals = [
  { id: "1", title: "New Bike", amount: 200, progress: 150 },
  { id: "2", title: "Video Game", amount: 60, progress: 45 },
  { id: "3", title: "School Supplies", amount: 100, progress: 80 },
];

const TaskItem = ({ item }) => {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "verified":
        return "#3B82F6";
      case "approved":
        return "#10B981";
      case "rejected":
        return "#EF4444";
      default:
        return "#9CA3AF";
    }
  };

  return (
    <View style={styles.taskBox}>
      <Text style={styles.taskTitle}>{item.title}</Text>
      <Text style={styles.taskAmount}>{item.amount.toFixed(2)} KWD</Text>
      <View
        style={[
          styles.statusBadge,
          { backgroundColor: getStatusColor(item.status) },
        ]}
      >
        <Text style={styles.statusText}>{item.status}</Text>
      </View>
    </View>
  );
};

const SavingGoalItem = ({ item }) => {
  const percentage = Math.round((item.progress / item.amount) * 100);

  return (
    <View style={styles.goalCard}>
      <CircleProgress percentage={percentage} />
      <Text style={styles.goalTitle}>{item.title}</Text>
      <Text style={styles.goalAmount}>
        {item.progress} KWD / {item.amount} KWD
      </Text>
    </View>
  );
};

const ProfileScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/background.png")}
        style={styles.backgroundImage}
        resizeMode="cover"
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          {/* Balance Card */}
          <View style={styles.balanceCard}>
            <Text style={styles.balanceLabel}>Total Available Balance</Text>
            <Text style={styles.balanceAmount}>3077.20 KWD</Text>
          </View>

          {/* Saving Goals */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Saving Goals</Text>
            <FlatList
              data={mockSavingGoals}
              renderItem={({ item }) => <SavingGoalItem item={item} />}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>

          {/* Task List */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Tasks</Text>
            <FlatList
              data={mockTasks}
              renderItem={({ item }) => <TaskItem item={item} />}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
          </View>

          {/* Buttons */}
          <View style={styles.buttonSection}>
            <Image
              // source={require("../../assets/bear.png")}
              style={styles.bearImage}
              resizeMode="contain"
            />
            <View style={styles.actionButtonsContainer}>
              <TouchableOpacity
                style={styles.whiteButton}
                onPress={() => navigation.navigate("Deposit")}
              >
                <MaterialIcons
                  name="account-balance-wallet"
                  size={24}
                  color="#6C63FF"
                />
                <Text style={styles.whiteButtonText}>Send Money</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.whiteButton}
                onPress={() => navigation.navigate("CreateTask")}
              >
                <MaterialIcons
                  name="playlist-add-check"
                  size={24}
                  color="#6C63FF"
                />
                <Text style={styles.whiteButtonText}>Create Task</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ffffff" },
  backgroundImage: {
    position: "absolute",
    width: width,
    height: height * 0.5,
    top: 0,
  },
  scrollContent: { paddingBottom: 40 },
  content: {
    flex: 1,
    paddingHorizontal: 39,
    paddingTop: 60,
    alignItems: "center",
  },
  balanceCard: {
    width: "100%",
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 16,
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    marginBottom: 24,
  },
  balanceLabel: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 4,
  },
  balanceAmount: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000000",
  },
  section: {
    width: "100%",
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 12,
  },
  taskBox: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    elevation: 2,
  },
  taskTitle: { fontSize: 16, fontWeight: "600", color: "#1F2937" },
  taskAmount: { fontSize: 14, color: "#6B7280", marginVertical: 4 },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  statusText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 12,
  },
  goalCard: {
    backgroundColor: "#F9FAFB",
    borderRadius: 16,
    padding: 16,
    width: 130,
    alignItems: "center",
    marginRight: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  goalTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 4,
    textAlign: "center",
  },
  goalAmount: {
    fontSize: 12,
    color: "#6B7280",
    textAlign: "center",
  },
  buttonSection: {
    width: "100%",
    marginTop: 24,
    position: "relative",
  },
  bearImage: {
    width: 118,
    height: 78,
    position: "absolute",
    right: 0,
    top: -60,
    zIndex: 1,
  },
  actionButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
  },
  whiteButton: {
    flex: 1,
    height: 72,
    backgroundColor: "#ffffff",
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#6C63FF",
    borderWidth: 2,
    flexDirection: "row",
    gap: 8,
  },
  whiteButtonText: {
    color: "#6C63FF",
    fontSize: 16,
    fontWeight: "600",
  },
});
