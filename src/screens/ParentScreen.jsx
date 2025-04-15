// import React, { useState, useContext } from "react";
// import {
//   View,
//   Text,
//   ScrollView,
//   TouchableOpacity,
//   StyleSheet,
// } from "react-native";
// import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
// import { ChildCard } from "../components/ChildCard";

// const statuses = ["Ongoing", "Verified", "Completed", "Rejected"];

// const ParentScreen = ({navigation}) => {
//   const [children, setChildren] = useState([{"id": 1, name: "John Doe", status: "Ongoing", imageSrc: "../assets/bear.png" }, { id: 2, name: "Jane Smith", status: "Verified", imageSrc: null }, { id: 3, name: "Sam Brown", status: "Completed", imageSrc: null }, { id: 4, name: "Lucy Green", status: "Rejected", imageSrc: null }]);
//   const [filterStatus, setFilterStatus] = useState(null);

//   const handelChildProfilenPress = (child_id) => {
//     navigation.navigate("Profile");
//   };  
  
//   const handleAddChildPress = () => {
//     navigation.navigate("CreateChildAcc");
//   };

    
//   const handleCreateTask = () => {
//     navigation.navigate("CreateTask");
//   };
  
//   const cycleStatus = (childId) => {
//     setChildren((prevChildren) =>
//       prevChildren.map((child) => {
//         if (child.id === childId) {
//           const currentIndex = statuses.indexOf(child.status);
//           const nextStatus = statuses[(currentIndex + 1) % statuses.length];
//           return { ...child, status: nextStatus };
//         }
//         return child;
//       })
//     );
//   };

//   const filteredChildren = filterStatus
//     ? children.filter((child) => child.status === filterStatus)
//     : children;
  
//   return (
//     <SafeAreaProvider>
//       <SafeAreaView style={styles.container}>
//         <ScrollView contentContainerStyle={styles.scrollContent}>
//           {/* 💰 Balance Card with Purple Border */}
//           <View style={styles.balanceCard}>
//             <Text style={styles.balanceCardLabel}>Balance</Text>
//             <Text style={styles.balanceCardAmount}>245.500 KD</Text>
//           </View>

//           {/* ➕ Add Child Card */}
//           <View style={styles.addCard}>
//             <View style={styles.cardHeader}>
//               <View>
//                 <Text style={styles.cardTitle}>Add Child</Text>
//                 <Text style={styles.cardSubtitle}>
//                   Create a new child account
//                 </Text>
//               </View>
//               <TouchableOpacity
//                 style={styles.addButton}
//                 onPress={() => handleAddChildPress()}
//               >
//                 <Text style={styles.addButtonText}>+ Add</Text>
//               </TouchableOpacity>
//             </View>
//           </View>

//           {/* 🔍 Filter Tabs */}
//           <ScrollView
//             horizontal
//             showsHorizontalScrollIndicator={false}
//             style={styles.filterRow}
//           >
//             <TouchableOpacity
//               onPress={() => setFilterStatus(null)}
//               style={[
//                 styles.filterButton,
//                 filterStatus === null && styles.filterActive,
//               ]}
//             >
//               <Text style={styles.filterText}>All</Text>
//             </TouchableOpacity>
//             {statuses.map((status) => (
//               <TouchableOpacity
//                 key={status}
//                 onPress={() => setFilterStatus(status)}
//                 style={[
//                   styles.filterButton,
//                   filterStatus === status && styles.filterActive,
//                 ]}
//               >
//                 <Text style={styles.filterText}>{status}</Text>
//               </TouchableOpacity>
//             ))}
//           </ScrollView>

//           {/* 👶 Children List */}
//           {filteredChildren.length === 0 ? (
//             <View style={styles.emptyState}>
//               <Text style={styles.emptyTitle}>No children found</Text>
//               <Text style={styles.emptySubtitle}>
//                 Try adding or changing filters
//               </Text>
//             </View>
//           ) : (
//             <>
//               <View style={styles.childrenHeader}>
//                 <Text style={styles.childrenTitle}>Child Progress</Text>
//                 <Text style={styles.childrenCount}>
//                   {filteredChildren.length}
//                 </Text>
//               </View>

//               {filteredChildren.map((child) => (
//                 <ChildCard child={child} cycleStatus={cycleStatus} handleCreateTask={handleCreateTask} openChildProfile={handelChildProfilenPress} key={child.id} />
//               ))}
//             </>
//           )}
//         </ScrollView>
//       </SafeAreaView>
//     </SafeAreaProvider>
//   );
// };

// export default ParentScreen;

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#f9fafb" },
//   scrollContent: { padding: 16, paddingBottom: 100 },

//   // 💰 Updated Balance Card with Purple Border
//   balanceCard: {
//     backgroundColor: "#fff",
//     paddingVertical: 20,
//     paddingHorizontal: 24,
//     borderRadius: 16,
//     borderWidth: 2,
//     borderColor: "#7C3AED",
//     shadowColor: "#000",
//     shadowOpacity: 0.05,
//     shadowOffset: { width: 0, height: 4 },
//     shadowRadius: 8,
//     elevation: 4,
//     marginBottom: 20,
//     alignItems: "center",
//   },
//   balanceCardLabel: {
//     fontSize: 14,
//     color: "#6B7280",
//     marginBottom: 2,
//   },
//   balanceCardAmount: {
//     fontSize: 28,
//     fontWeight: "bold",
//     color: "#7C3AED",
//   },

//   // 👇 The rest of the styles remain unchanged
//   addCard: {
//     backgroundColor: "#7C3AED",
//     borderRadius: 12,
//     marginBottom: 20,
//     padding: 16,
//   },
//   cardHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   cardTitle: { fontSize: 20, fontWeight: "bold", color: "#fff" },
//   cardSubtitle: { color: "#EDE9FE", marginTop: 2 },
//   addButton: {
//     backgroundColor: "#fff",
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderRadius: 8,
//   },
//   addButtonText: {
//     color: "#7C3AED",
//     fontWeight: "bold",
//     fontSize: 16,
//   },
//   emptyState: {
//     alignItems: "center",
//     paddingVertical: 40,
//     backgroundColor: "#fff",
//     borderRadius: 8,
//   },
//   emptyTitle: { fontSize: 16, color: "#6B7280" },
//   emptySubtitle: { fontSize: 14, color: "#9CA3AF", marginTop: 4 },
//   childrenHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 8,
//   },
//   childrenTitle: { fontSize: 18, fontWeight: "bold", color: "#1F2937" },
//   childrenCount: {
//     backgroundColor: "#F3E8FF",
//     color: "#7C3AED",
//     paddingHorizontal: 8,
//     borderRadius: 12,
//     fontSize: 12,
//   },
//   childCard: {
//     marginBottom: 12,
//     backgroundColor: "#fff",
//     borderRadius: 8,
//     padding: 12,
//   },
//   childRow: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   avatar: {
//     height: 48,
//     width: 48,
//     borderRadius: 24,
//     backgroundColor: "#EDE9FE",
//     justifyContent: "center",
//     alignItems: "center",
//     marginRight: 12,
//   },
//   avatarFallback: {
//     backgroundColor: "#E9D5FF",
//     borderRadius: 24,
//     height: 48,
//     width: 48,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   avatarLetter: { fontSize: 18, fontWeight: "bold", color: "#7C3AED" },
//   avatarImage: { height: 48, width: 48, borderRadius: 24 },
//   childName: { fontWeight: "bold", fontSize: 16, color: "#1F2937" },
//   childTasks: { fontSize: 13, color: "#10B981" },
//   uploadLink: { fontSize: 12, color: "#7C3AED", marginTop: 4 },
//   statusBadge: {
//     paddingHorizontal: 10,
//     paddingVertical: 4,
//     borderRadius: 12,
//   },
//   statusText: {
//     color: "#fff",
//     fontWeight: "bold",
//     fontSize: 12,
//   },
//   ongoing: { backgroundColor: "#FBBF24" },
//   verified: { backgroundColor: "#3B82F6" },
//   completed: { backgroundColor: "#10B981" },
//   rejected: { backgroundColor: "#EF4444" },
//   bottomNav: {
//     position: "absolute",
//     bottom: 0,
//     left: 0,
//     right: 0,
//     backgroundColor: "#fff",
//     borderTopWidth: 1,
//     borderColor: "#E5E7EB",
//     flexDirection: "row",
//     justifyContent: "space-around",
//     paddingVertical: 12,
//   },
//   fab: {
//     backgroundColor: "#7C3AED",
//     height: 56,
//     width: 56,
//     borderRadius: 28,
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: -24,
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: "rgba(0,0,0,0.4)",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   modalBox: {
//     backgroundColor: "#fff",
//     borderRadius: 12,
//     padding: 24,
//     width: "80%",
//     alignItems: "center",
//   },
//   modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 16 },
//   modalAddButton: {
//     backgroundColor: "#7C3AED",
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 8,
//     marginBottom: 12,
//   },
//   modalAddText: { color: "#fff", fontWeight: "bold" },
//   modalCancelButton: { paddingVertical: 8 },
//   modalCancelText: { color: "#6B7280" },
//   modalImage: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     marginBottom: 12,
//   },
//   modalImagePlaceholder: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     backgroundColor: "#E5E7EB",
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 12,
//   },
//   modalImageText: { color: "#9CA3AF", fontSize: 12 },
//   modalUploadButton: {
//     backgroundColor: "#E0E7FF",
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//     borderRadius: 6,
//     marginBottom: 8,
//   },
//   modalUploadText: { color: "#4338CA", fontWeight: "500" },
//   inputBox: {
//     width: "100%",
//     marginTop: 16,
//     marginBottom: 8,
//   },
//   inputLabel: { marginBottom: 4, fontSize: 14, color: "#374151" },
//   inputField: {
//     borderWidth: 1,
//     borderColor: "#D1D5DB",
//     borderRadius: 8,
//     padding: 10,
//     backgroundColor: "#F9FAFB",
//   },
//   filterRow: {
//     flexDirection: "row",
//     marginBottom: 12,
//   },
//   filterButton: {
//     backgroundColor: "#E5E7EB",
//     borderRadius: 20,
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     marginRight: 8,
//   },
//   filterActive: {
//     backgroundColor: "#7C3AED",
//   },
//   filterText: {
//     color: "#1F2937",
//     fontSize: 13,
//     fontWeight: "500",
//   },
// });






// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   Image,
// } from "react-native";
// import * as ImagePicker from "expo-image-picker";
// import { MaterialIcons } from "@expo/vector-icons";

// const ParentScreen = ({ navigation }) => {
//   const [activeTab, setActiveTab] = useState("kids");
//   const [greeting, setGreeting] = useState("");
//   const [children, setChildren] = useState([
//     {
//       id: 1,
//       name: "Zainab",
//       balance: 120,
//       status: "Ongoing",
//       image: null,
//     },
//     {
//       id: 2,
//       name: "Noor",
//       balance: 90,
//       status: "Verified",
//       image: null,
//     },
//     {
//       id: 3,
//       name: "Aziz",
//       balance: 140,
//       status: "Accepted",
//       image: null,
//     },
//     {
//       id: 4,
//       name: "Bader",
//       balance: 75,
//       status: "Rejected",
//       image: null,
//     },
//   ]);

//   const [tasks, setTasks] = useState([
//     {
//       id: 101,
//       name: "Clean Room",
//       childName: "Zainab",
//       status: "Verified",
//       date: "2025-04-14",
//     },
//     {
//       id: 102,
//       name: "Homework",
//       childName: "Aziz",
//       status: "Accepted",
//       date: "2025-04-13",
//     },
//     {
//       id: 103,
//       name: "Wash Dishes",
//       childName: "Bader",
//       status: "Rejected",
//       date: "2025-04-12",
//     },
//   ]);

//   const parentName = "Logan";

//   useEffect(() => {
//     const hour = new Date().getHours();
//     if (hour < 12) setGreeting("Good morning");
//     else if (hour < 18) setGreeting("Good afternoon");
//     else setGreeting("Good evening");
//   }, []);

//   const getStatusColor = (status) => {
//     switch (status.toLowerCase()) {
//       case "ongoing":
//         return "#FBBF24";
//       case "verified":
//         return "#3B82F6";
//       case "accepted":
//         return "#10B981";
//       case "rejected":
//         return "#EF4444";
//       default:
//         return "#9CA3AF";
//     }
//   };

//   const handleImagePick = async (childId) => {
//     const result = await ImagePicker.launchImageLibraryAsync({
//       allowsEditing: true,
//       quality: 1,
//       aspect: [1, 1],
//     });

//     if (!result.canceled) {
//       const updated = children.map((child) =>
//         child.id === childId
//           ? { ...child, image: result.assets[0].uri }
//           : child
//       );
//       setChildren(updated);
//     }
//   };

//   // ✅ Navigation handlers
//   const handleAddChildPress = () => {
//     navigation.navigate("CreateChildAcc");
//   };

//   const handelChildProfilenPress = (childId) => {
//     navigation.navigate("Profile", { childId });
//   };

//   const renderChildCard = (child) => (
//     <TouchableOpacity
//       key={child.id}
//       style={styles.card}
//       onPress={() => handelChildProfilenPress(child.id)}
//       onLongPress={() => handleImagePick(child.id)}
//     >
//       <View style={styles.avatar}>
//         {child.image ? (
//           <Image source={{ uri: child.image }} style={styles.image} />
//         ) : (
//           <MaterialIcons name="person" size={40} color="#7C3AED" />
//         )}
//       </View>
//       <Text style={styles.name}>{child.name}</Text>
//       <Text style={styles.balance}>KWD {child.balance.toFixed(2)}</Text>
//       <View
//         style={[
//           styles.statusBadge,
//           { backgroundColor: getStatusColor(child.status) },
//         ]}
//       >
//         <Text style={styles.statusText}>{child.status}</Text>
//       </View>
//     </TouchableOpacity>
//   );

//   const renderTaskBox = (task) => (
//     <View key={task.id} style={styles.taskBox}>
//       <Text style={styles.taskName}>{task.name}</Text>
//       <Text style={styles.taskSub}>
//         {task.childName} - {task.date}
//       </Text>
//       <View
//         style={[
//           styles.statusBadge,
//           { backgroundColor: getStatusColor(task.status) },
//         ]}
//       >
//         <Text style={styles.statusText}>{task.status}</Text>
//       </View>
//     </View>
//   );

//   const totalBalance = children.reduce((sum, c) => sum + c.balance, 0);

//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.greeting}>
//           {greeting}, <Text style={styles.boldName}>{parentName}</Text> 👋
//         </Text>
//         <View style={styles.balanceCard}>
//           <Text style={styles.balanceLabel}>Total Balance</Text>
//           <Text style={styles.balanceValue}>KWD {totalBalance.toFixed(3)}</Text>
//         </View>
//       </View>

//       {/* Tabs */}
//       <View style={styles.tabs}>
//         <TouchableOpacity onPress={() => setActiveTab("kids")}>
//           <Text
//             style={[
//               styles.tabText,
//               activeTab === "kids" && styles.tabTextActive,
//             ]}
//           >
//             All Kids
//           </Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => setActiveTab("history")}>
//           <Text
//             style={[
//               styles.tabText,
//               activeTab === "history" && styles.tabTextActive,
//             ]}
//           >
//             History
//           </Text>
//         </TouchableOpacity>
//       </View>

//       {activeTab === "kids" ? (
//         <>
//           {/* Children */}
//           <View style={styles.grid}>
//             {children.map(renderChildCard)}
//             <TouchableOpacity
//               style={styles.addCard}
//               onPress={handleAddChildPress}
//             >
//               <MaterialIcons name="add" size={30} color="#7C3AED" />
//               <Text style={styles.addText}>Add a child</Text>
//             </TouchableOpacity>
//           </View>

//           {/* Tasks */}
//           <Text style={styles.sectionTitle}>Tasks to Review</Text>
//           {tasks
//             .filter((t) => t.status === "Verified")
//             .map(renderTaskBox)}
//         </>
//       ) : (
//         <>
//           <Text style={styles.sectionTitle}>Task History</Text>
//           {tasks
//             .filter((t) => ["Accepted", "Rejected"].includes(t.status))
//             .map(renderTaskBox)}
//         </>
//       )}
//     </ScrollView>
//   );
// };

// export default ParentScreen;

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#f9fafb" },
//   header: { padding: 24, backgroundColor: "#6C63FF" },
//   greeting: { color: "#fff", fontSize: 20 },
//   boldName: { fontWeight: "bold", fontSize: 22 },
//   balanceCard: {
//     marginTop: 12,
//     backgroundColor: "#fff",
//     borderRadius: 16,
//     padding: 20,
//     borderWidth: 2,
//     borderColor: "#7C3AED",
//   },
//   balanceLabel: { color: "#6B7280" },
//   balanceValue: {
//     fontSize: 26,
//     fontWeight: "bold",
//     color: "#7C3AED",
//     marginTop: 4,
//   },
//   tabs: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     marginVertical: 16,
//   },
//   tabText: { fontSize: 16, color: "#9CA3AF" },
//   tabTextActive: { color: "#7C3AED", fontWeight: "bold" },
//   grid: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     paddingHorizontal: 20,
//     justifyContent: "space-between",
//   },
//   card: {
//     width: "47%",
//     padding: 16,
//     backgroundColor: "#fff",
//     borderRadius: 16,
//     borderColor: "#7C3AED",
//     borderWidth: 2,
//     alignItems: "center",
//     marginBottom: 16,
//   },
//   avatar: {
//     backgroundColor: "#F3E8FF",
//     borderRadius: 40,
//     padding: 10,
//     marginBottom: 10,
//   },
//   image: { width: 50, height: 50, borderRadius: 25 },
//   name: { fontWeight: "600", fontSize: 16, marginBottom: 4, color: "#1F2937" },
//   balance: { color: "#6B7280", fontSize: 14 },
//   statusBadge: {
//     paddingHorizontal: 10,
//     paddingVertical: 4,
//     borderRadius: 12,
//     marginTop: 8,
//   },
//   statusText: { color: "#fff", fontWeight: "600", fontSize: 12 },
//   addCard: {
//     width: "47%",
//     height: 130,
//     borderRadius: 16,
//     borderWidth: 2,
//     borderColor: "#7C3AED",
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 16,
//   },
//   addText: { marginTop: 6, fontWeight: "600", color: "#7C3AED" },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: "600",
//     paddingHorizontal: 20,
//     marginVertical: 10,
//     color: "#1F2937",
//   },
//   taskBox: {
//     backgroundColor: "#fff",
//     marginHorizontal: 20,
//     borderRadius: 16,
//     padding: 16,
//     marginBottom: 14,
//     borderWidth: 1,
//     borderColor: "#E5E7EB",
//   },
//   taskName: { fontSize: 16, fontWeight: "600", color: "#1F2937" },
//   taskSub: { fontSize: 14, color: "#6B7280", marginBottom: 6 },
// });



// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   Image,
// } from "react-native";
// import * as ImagePicker from "expo-image-picker";
// import { MaterialIcons } from "@expo/vector-icons";

// const ParentScreen = ({ navigation }) => {
//   const [activeTab, setActiveTab] = useState("kids");
//   const [greeting, setGreeting] = useState("");
//   const [children, setChildren] = useState([
//     { id: 1, name: "Zainab", balance: 120, status: "Ongoing", image: null },
//     { id: 2, name: "Noor", balance: 90, status: "Verified", image: null },
//     { id: 3, name: "Aziz", balance: 140, status: "Accepted", image: null },
//     { id: 4, name: "Bader", balance: 75, status: "Rejected", image: null },
//   ]);

//   const [tasks, setTasks] = useState([
//     {
//       id: 101,
//       name: "Clean Room",
//       childName: "Zainab",
//       status: "Verified",
//       date: "2025-04-14",
//     },
//     {
//       id: 102,
//       name: "Homework",
//       childName: "Aziz",
//       status: "Accepted",
//       date: "2025-04-13",
//     },
//     {
//       id: 103,
//       name: "Wash Dishes",
//       childName: "Bader",
//       status: "Rejected",
//       date: "2025-04-12",
//     },
//   ]);

//   const parentName = "Logan";

//   useEffect(() => {
//     const hour = new Date().getHours();
//     if (hour < 12) setGreeting("Good morning");
//     else if (hour < 18) setGreeting("Good afternoon");
//     else setGreeting("Good evening");
//   }, []);

//   const getStatusColor = (status) => {
//     switch (status.toLowerCase()) {
//       case "ongoing":
//         return "#FBBF24";
//       case "verified":
//         return "#3B82F6";
//       case "accepted":
//         return "#10B981";
//       case "rejected":
//         return "#EF4444";
//       default:
//         return "#9CA3AF";
//     }
//   };

//   const handleImagePick = async (childId) => {
//     const result = await ImagePicker.launchImageLibraryAsync({
//       allowsEditing: true,
//       quality: 1,
//       aspect: [1, 1],
//     });

//     if (!result.canceled) {
//       const updated = children.map((child) =>
//         child.id === childId
//           ? { ...child, image: result.assets[0].uri }
//           : child
//       );
//       setChildren(updated);
//     }
//   };

//   const totalBalance = children.reduce((sum, c) => sum + c.balance, 0);

//   const renderChildCard = (child) => (
//     <TouchableOpacity
//       key={child.id}
//       style={styles.card}
//       onLongPress={() => handleImagePick(child.id)}
//       onPress={() => navigation.navigate("Profile", { childId: child.id })}
//     >
//       <View style={styles.avatar}>
//         {child.image ? (
//           <Image source={{ uri: child.image }} style={styles.image} />
//         ) : (
//           <MaterialIcons name="person" size={30} color="#7C3AED" />
//         )}
//       </View>
//       <Text style={styles.name}>{child.name}</Text>
//       <Text style={styles.balance}>KWD {child.balance.toFixed(2)}</Text>
//     </TouchableOpacity>
//   );

//   const renderTaskBox = (task) => (
//     <View key={task.id} style={styles.taskBox}>
//       <Text style={styles.taskName}>{task.name}</Text>
//       <Text style={styles.taskSub}>
//         {task.childName} - {task.date}
//       </Text>
//       <View
//         style={[
//           styles.statusBadge,
//           { backgroundColor: getStatusColor(task.status) },
//         ]}
//       >
//         <Text style={styles.statusText}>{task.status}</Text>
//       </View>
//     </View>
//   );

//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.greeting}>
//           {"\n"}
//           {greeting}, <Text style={styles.boldName}>{parentName}</Text> 👋
//         </Text>
//         <View style={styles.balanceCard}>
//           <Text style={styles.balanceLabel}>Total Balance</Text>
//           <Text style={styles.balanceValue}>KWD {totalBalance.toFixed(3)}</Text>
//         </View>
//       </View>

//       {/* Tabs */}
//       <View style={styles.tabs}>
//         <TouchableOpacity onPress={() => setActiveTab("kids")}>
//           <Text
//             style={[
//               styles.tabText,
//               activeTab === "kids" && styles.tabTextActive,
//             ]}
//           >
//             All Kids
//           </Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => setActiveTab("history")}>
//           <Text
//             style={[
//               styles.tabText,
//               activeTab === "history" && styles.tabTextActive,
//             ]}
//           >
//             History
//           </Text>
//         </TouchableOpacity>
//       </View>

//       {activeTab === "kids" ? (
//         <>
//           <View style={styles.grid}>
//             {children.map(renderChildCard)}
//             <TouchableOpacity
//               style={styles.addCard}
//               onPress={() => navigation.navigate("CreateChildAcc")}
//             >
//               <MaterialIcons name="add" size={30} color="#7C3AED" />
//               <Text style={styles.addText}>Add a child</Text>
//             </TouchableOpacity>
//           </View>

//           {/* Tasks */}
//           <Text style={styles.sectionTitle}>Tasks to Review</Text>
//           {tasks.filter((t) => t.status === "Verified").map(renderTaskBox)}
//         </>
//       ) : (
//         <>
//           <Text style={styles.sectionTitle}>Task History</Text>
//           {tasks
//             .filter((t) => ["Accepted", "Rejected"].includes(t.status))
//             .map(renderTaskBox)}
//         </>
//       )}
//     </ScrollView>
//   );
// };

// export default ParentScreen;

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#f9fafb" },
//   header: { padding: 24, paddingTop: 50, backgroundColor: "#6C63FF" },
//   greeting: { color: "#fff", fontSize: 20, marginTop: 10 },
//   boldName: { fontWeight: "bold", fontSize: 22 },
//   balanceCard: {
//     marginTop: 12,
//     backgroundColor: "#fff",
//     borderRadius: 16,
//     padding: 20,
//     borderWidth: 2,
//     borderColor: "#7C3AED",
//   },
//   balanceLabel: { color: "#6B7280" },
//   balanceValue: {
//     fontSize: 26,
//     fontWeight: "bold",
//     color: "#7C3AED",
//     marginTop: 4,
//   },
//   tabs: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     marginVertical: 16,
//   },
//   tabText: { fontSize: 16, color: "#9CA3AF" },
//   tabTextActive: { color: "#7C3AED", fontWeight: "bold" },
//   grid: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     paddingHorizontal: 20,
//     justifyContent: "space-between",
//   },
//   card: {
//     width: "47%",
//     padding: 16,
//     backgroundColor: "#fff",
//     borderRadius: 16,
//     borderColor: "#7C3AED",
//     borderWidth: 2,
//     alignItems: "center",
//     marginBottom: 16,
//   },
//   avatar: {
//     backgroundColor: "#F3E8FF",
//     borderRadius: 40,
//     padding: 10,
//     marginBottom: 10,
//   },
//   image: { width: 50, height: 50, borderRadius: 25 },
//   name: { fontWeight: "600", fontSize: 16, marginBottom: 4, color: "#1F2937" },
//   balance: { color: "#6B7280", fontSize: 14 },
//   statusBadge: {
//     paddingHorizontal: 10,
//     paddingVertical: 4,
//     borderRadius: 12,
//     marginTop: 8,
//   },
//   statusText: { color: "#fff", fontWeight: "600", fontSize: 12 },
//   addCard: {
//     width: "47%",
//     height: 130,
//     borderRadius: 16,
//     borderWidth: 2,
//     borderColor: "#7C3AED",
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 16,
//   },
//   addText: { marginTop: 6, fontWeight: "600", color: "#7C3AED" },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: "600",
//     paddingHorizontal: 20,
//     marginVertical: 10,
//     color: "#1F2937",
//   },
//   taskBox: {
//     backgroundColor: "#fff",
//     marginHorizontal: 20,
//     borderRadius: 16,
//     padding: 16,
//     marginBottom: 14,
//     borderWidth: 1,
//     borderColor: "#E5E7EB",
//   },
//   taskName: { fontSize: 16, fontWeight: "600", color: "#1F2937" },
//   taskSub: { fontSize: 14, color: "#6B7280", marginBottom: 6 },
// });


// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   Image,
// } from "react-native";
// import * as ImagePicker from "expo-image-picker";
// import { MaterialIcons } from "@expo/vector-icons";

// const ParentScreen = ({ navigation }) => {
//   const [activeTab, setActiveTab] = useState("kids");
//   const [greeting, setGreeting] = useState("");
//   const [children, setChildren] = useState([
//     { id: 1, name: "Zainab", balance: 120, status: "Ongoing", image: null },
//     { id: 2, name: "Noor", balance: 90, status: "Verified", image: null },
//     { id: 3, name: "Aziz", balance: 140, status: "Accepted", image: null },
//     { id: 4, name: "Bader", balance: 75, status: "Rejected", image: null },
//   ]);

//   const [tasks, setTasks] = useState([
//     {
//       id: 101,
//       name: "Clean Room",
//       childName: "Zainab",
//       status: "Verified",
//       date: "2025-04-14",
//     },
//     {
//       id: 102,
//       name: "Homework",
//       childName: "Aziz",
//       status: "Accepted",
//       date: "2025-04-13",
//     },
//     {
//       id: 103,
//       name: "Wash Dishes",
//       childName: "Bader",
//       status: "Rejected",
//       date: "2025-04-12",
//     },
//   ]);

//   const parentName = "Ali";

//   useEffect(() => {
//     const hour = new Date().getHours();
//     if (hour < 12) setGreeting("Good morning");
//     else if (hour < 18) setGreeting("Good afternoon");
//     else setGreeting("Good evening");
//   }, []);

//   const getStatusColor = (status) => {
//     switch (status.toLowerCase()) {
//       case "ongoing":
//         return "#FBBF24";
//       case "verified":
//         return "#3B82F6";
//       case "accepted":
//         return "#10B981";
//       case "rejected":
//         return "#EF4444";
//       default:
//         return "#9CA3AF";
//     }
//   };

//   const handleImagePick = async (childId) => {
//     const result = await ImagePicker.launchImageLibraryAsync({
//       allowsEditing: true,
//       quality: 1,
//       aspect: [1, 1],
//     });

//     if (!result.canceled) {
//       const updated = children.map((child) =>
//         child.id === childId
//           ? { ...child, image: result.assets[0].uri }
//           : child
//       );
//       setChildren(updated);
//     }
//   };

//   const totalBalance = children.reduce((sum, c) => sum + c.balance, 0);

//   const renderCardBox = ({ title, subtitle, status }) => (
//     <View key={title} style={styles.card}>
//       <Text style={styles.name}>{title}</Text>
//       <Text style={styles.balance}>{subtitle}</Text>
//       {status && (
//         <View
//           style={[
//             styles.statusBadge,
//             { backgroundColor: getStatusColor(status) },
//           ]}
//         >
//           <Text style={styles.statusText}>{status}</Text>
//         </View>
//       )}
//     </View>
//   );

//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.greeting}>
//           {"\n"}
//           {greeting}, <Text style={styles.boldName}>{parentName}</Text> 
//         </Text>
//         <View style={styles.balanceCard}>
//           <Text style={styles.balanceLabel}>Total Balance</Text>
//           <Text style={styles.balanceValue}>KWD {totalBalance.toFixed(3)}</Text>
//         </View>
//       </View>

//       {/* Tabs */}
//       <View style={styles.tabs}>
//         <TouchableOpacity onPress={() => setActiveTab("kids")}>
//           <Text
//             style={[
//               styles.tabText,
//               activeTab === "kids" && styles.tabTextActive,
//             ]}
//           >
//             All Kids
//           </Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => setActiveTab("history")}>
//           <Text
//             style={[
//               styles.tabText,
//               activeTab === "history" && styles.tabTextActive,
//             ]}
//           >
//             History
//           </Text>
//         </TouchableOpacity>
//       </View>

//       {/* Kids Grid or History Grid */}
//       <View style={styles.grid}>
//         {activeTab === "kids" ? (
//           <>
//             {children.map((child) => (
//               <View key={child.id} style={styles.card}>
//                 <TouchableOpacity
//                   onPress={() =>
//                     navigation.navigate("Profile", { childId: child.id })
//                   }
//                 >
//                   <View style={styles.avatar}>
//                     {child.image ? (
//                       <Image
//                         source={{ uri: child.image }}
//                         style={styles.image}
//                       />
//                     ) : (
//                       <MaterialIcons name="person" size={30} color="#7C3AED" />
//                     )}
//                   </View>
//                 </TouchableOpacity>
//                 <Text style={styles.name}>{child.name}</Text>
//                 <Text style={styles.balance}>
//                   KWD {child.balance.toFixed(2)}
//                 </Text>
//                 <TouchableOpacity
//                   style={styles.uploadBtn}
//                   onPress={() => handleImagePick(child.id)}
//                 >
//                   <Text style={styles.uploadText}>Upload Photo</Text>
//                 </TouchableOpacity>
//               </View>
//             ))}
//             <TouchableOpacity
//               style={styles.addCard}
//               onPress={() => navigation.navigate("CreateChildAcc")}
//             >
//               <MaterialIcons name="add" size={30} color="#7C3AED" />
//               <Text style={styles.addText}>Add a child</Text>
//             </TouchableOpacity>

//             {/* Tasks to Review */}
//             <Text style={styles.sectionTitle}>Tasks to Review</Text>
//             {tasks
//               .filter((t) => t.status === "Verified")
//               .map((task) =>
//                 renderCardBox({
//                   title: task.name,
//                   subtitle: `${task.childName} - ${task.date}`,
//                   status: task.status,
//                 })
//               )}
//           </>
//         ) : (
//           <>
//             <Text style={styles.sectionTitle}>Task History</Text>
//             {tasks
//               .filter((t) => ["Accepted", "Rejected"].includes(t.status))
//               .map((task) =>
//                 renderCardBox({
//                   title: task.name,
//                   subtitle: `${task.childName} - ${task.date}`,
//                   status: task.status,
//                 })
//               )}
//           </>
//         )}
//       </View>
//     </ScrollView>
//   );
// };

// export default ParentScreen;

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#f9fafb" },
//   header: { padding: 24, paddingTop: 50, backgroundColor: "#6C63FF" },
//   greeting: { color: "#fff", fontSize: 20, marginTop: 10 },
//   boldName: { fontWeight: "bold", fontSize: 22 },
//   balanceCard: {
//     marginTop: 12,
//     backgroundColor: "#fff",
//     borderRadius: 16,
//     padding: 20,
//     borderWidth: 2,
//     borderColor: "#7C3AED",
//   },
//   balanceLabel: { color: "#6B7280" },
//   balanceValue: {
//     fontSize: 26,
//     fontWeight: "bold",
//     color: "#7C3AED",
//     marginTop: 4,
//   },
//   tabs: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     marginVertical: 16,
//   },
//   tabText: { fontSize: 16, color: "#9CA3AF" },
//   tabTextActive: { color: "#7C3AED", fontWeight: "bold" },
//   grid: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     paddingHorizontal: 20,
//     justifyContent: "space-between",
//   },
//   card: {
//     width: "47%",
//     padding: 16,
//     backgroundColor: "#fff",
//     borderRadius: 16,
//     borderColor: "#7C3AED",
//     borderWidth: 2,
//     alignItems: "center",
//     marginBottom: 16,
//   },
//   avatar: {
//     backgroundColor: "#F3E8FF",
//     borderRadius: 40,
//     padding: 10,
//     marginBottom: 10,
//   },
//   image: { width: 50, height: 50, borderRadius: 25 },
//   name: { fontWeight: "600", fontSize: 16, marginBottom: 4, color: "#1F2937" },
//   balance: { color: "#6B7280", fontSize: 14 },
//   uploadBtn: {
//     marginTop: 6,
//     backgroundColor: "#EDE9FE",
//     paddingHorizontal: 10,
//     paddingVertical: 4,
//     borderRadius: 10,
//   },
//   uploadText: {
//     fontSize: 12,
//     color: "#7C3AED",
//     fontWeight: "500",
//   },
//   statusBadge: {
//     paddingHorizontal: 10,
//     paddingVertical: 4,
//     borderRadius: 12,
//     marginTop: 8,
//   },
//   statusText: { color: "#fff", fontWeight: "600", fontSize: 12 },
//   addCard: {
//     width: "47%",
//     height: 130,
//     borderRadius: 16,
//     borderWidth: 2,
//     borderColor: "#7C3AED",
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 16,
//   },
//   addText: { marginTop: 6, fontWeight: "600", color: "#7C3AED" },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: "600",
//     paddingHorizontal: 6,
//     marginVertical: 10,
//     width: "100%",
//     color: "#1F2937",
//   },
// });



// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   Image,
// } from "react-native";
// import * as ImagePicker from "expo-image-picker";
// import { MaterialIcons } from "@expo/vector-icons";
// import LottieView from "lottie-react-native";

// const ParentScreen = ({ navigation }) => {
//   const [activeTab, setActiveTab] = useState("kids");
//   const [greeting, setGreeting] = useState("");
//   const [children, setChildren] = useState([
//     { id: 1, name: "Zainab", balance: 120, status: "Ongoing", image: null },
//     { id: 2, name: "Noor", balance: 90, status: "Verified", image: null },
//     { id: 3, name: "Aziz", balance: 140, status: "Accepted", image: null },
//     { id: 4, name: "Bader", balance: 75, status: "Rejected", image: null },
//   ]);

//   const [tasks, setTasks] = useState([
//     {
//       id: 101,
//       name: "Clean Room",
//       childName: "Zainab",
//       status: "Verified",
//       date: "2025-04-14",
//     },
//     {
//       id: 102,
//       name: "Homework",
//       childName: "Aziz",
//       status: "Accepted",
//       date: "2025-04-13",
//     },
//     {
//       id: 103,
//       name: "Wash Dishes",
//       childName: "Bader",
//       status: "Rejected",
//       date: "2025-04-12",
//     },
//   ]);

//   const parentName = "Ali";

//   useEffect(() => {
//     const hour = new Date().getHours();
//     if (hour < 12) setGreeting("Good morning");
//     else if (hour < 18) setGreeting("Good afternoon");
//     else setGreeting("Good evening");
//   }, []);

//   const getStatusColor = (status) => {
//     switch (status.toLowerCase()) {
//       case "ongoing":
//         return "#FBBF24";
//       case "verified":
//         return "#3B82F6";
//       case "accepted":
//         return "#10B981";
//       case "rejected":
//         return "#EF4444";
//       default:
//         return "#9CA3AF";
//     }
//   };

//   const handleImagePick = async (childId) => {
//     const result = await ImagePicker.launchImageLibraryAsync({
//       allowsEditing: true,
//       quality: 1,
//       aspect: [1, 1],
//     });

//     if (!result.canceled) {
//       const updated = children.map((child) =>
//         child.id === childId
//           ? { ...child, image: result.assets[0].uri }
//           : child
//       );
//       setChildren(updated);
//     }
//   };

//   const totalBalance = children.reduce((sum, c) => sum + c.balance, 0);

//   const renderChildCard = (child) => (
//     <TouchableOpacity
//       key={child.id}
//       style={styles.card}
//       onPress={() => navigation.navigate("Profile", { childId: child.id })}
//       onLongPress={() => handleImagePick(child.id)}
//     >
//       <View style={styles.avatar}>
//         {child.image ? (
//           <Image source={{ uri: child.image }} style={styles.image} />
//         ) : (
//           <MaterialIcons name="person" size={30} color="#7C3AED" />
//         )}
//       </View>
//       <Text style={styles.name}>{child.name}</Text>
//       <Text style={styles.balance}>KWD {child.balance.toFixed(2)}</Text>
//     </TouchableOpacity>
//   );

//   const renderTaskBox = (task) => (
//     <View key={task.id} style={styles.card}>
//       <Text style={styles.name}>{task.name}</Text>
//       <Text style={styles.balance}>
//         {task.childName} - {task.date}
//       </Text>
//       <View
//         style={[
//           styles.statusBadge,
//           { backgroundColor: getStatusColor(task.status) },
//         ]}
//       >
//         <Text style={styles.statusText}>{task.status}</Text>
//       </View>
//     </View>
//   );

//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.greeting}>
//           {greeting}, <Text style={styles.boldName}>{parentName}</Text> 
//         </Text>

//         {/* Animated Balance Section */}
//         <View style={styles.balanceCard}>
//           <View style={styles.balanceRow}>
//             <LottieView
//               source={require("../../assets/balance.json")}
//               autoPlay
//               loop
//               style={styles.lottieIcon}
//             />
//             <View>
//               <Text style={styles.balanceLabel}>Total Balance</Text>
//               <Text style={styles.balanceValue}>
//                 KWD {totalBalance.toFixed(3)}
//               </Text>
//             </View>
//           </View>
//         </View>
//       </View>

//       {/* Tabs */}
//       <View style={styles.tabs}>
//         <TouchableOpacity onPress={() => setActiveTab("kids")}>
//           <Text
//             style={[
//               styles.tabText,
//               activeTab === "kids" && styles.tabTextActive,
//             ]}
//           >
//             All Kids
//           </Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => setActiveTab("history")}>
//           <Text
//             style={[
//               styles.tabText,
//               activeTab === "history" && styles.tabTextActive,
//             ]}
//           >
//             History
//           </Text>
//         </TouchableOpacity>
//       </View>

//       {activeTab === "kids" ? (
//         <>
//           <View style={styles.grid}>
//             {children.map(renderChildCard)}
//             <TouchableOpacity
//               style={styles.addCard}
//               onPress={() => navigation.navigate("CreateChildAcc")}
//             >
//               <MaterialIcons name="add" size={30} color="#7C3AED" />
//               <Text style={styles.addText}>Add a child</Text>
//             </TouchableOpacity>
//           </View>

//           {/* Tasks to Review */}
//           <Text style={styles.sectionTitle}>Tasks to Review</Text>
//           <View style={styles.grid}>
//             {tasks
//               .filter((t) => t.status === "Verified")
//               .map(renderTaskBox)}
//           </View>
//         </>
//       ) : (
//         <>
//           <Text style={styles.sectionTitle}>Task History</Text>
//           <View style={styles.grid}>
//             {tasks
//               .filter((t) => ["Accepted", "Rejected"].includes(t.status))
//               .map(renderTaskBox)}
//           </View>
//         </>
//       )}
//     </ScrollView>
//   );
// };

// export default ParentScreen;

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#f9fafb" },
//   header: { padding: 24, paddingTop: 50, backgroundColor: "#6C63FF" },
//   greeting: { color: "#fff", fontSize: 20, marginTop: 10 },
//   boldName: { fontWeight: "bold", fontSize: 22 },
//   balanceCard: {
//     marginTop: 12,
//     backgroundColor: "#fff",
//     borderRadius: 16,
//     padding: 20,
//     borderWidth: 2,
//     borderColor: "#7C3AED",
//   },
//   balanceRow: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   lottieIcon: {
//     width: 60,
//     height: 60,
//     marginRight: 12,
//   },
//   balanceLabel: { color: "#6B7280" },
//   balanceValue: {
//     fontSize: 26,
//     fontWeight: "bold",
//     color: "#7C3AED",
//     marginTop: 4,
//   },
//   tabs: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     marginVertical: 16,
//   },
//   tabText: { fontSize: 16, color: "#9CA3AF" },
//   tabTextActive: { color: "#7C3AED", fontWeight: "bold" },
//   grid: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     paddingHorizontal: 20,
//     justifyContent: "space-between",
//   },
//   card: {
//     width: "47%",
//     padding: 16,
//     backgroundColor: "#fff",
//     borderRadius: 16,
//     borderColor: "#7C3AED",
//     borderWidth: 2,
//     alignItems: "center",
//     marginBottom: 16,
//   },
//   avatar: {
//     backgroundColor: "#F3E8FF",
//     borderRadius: 40,
//     padding: 10,
//     marginBottom: 10,
//   },
//   image: { width: 50, height: 50, borderRadius: 25 },
//   name: { fontWeight: "600", fontSize: 16, marginBottom: 4, color: "#1F2937" },
//   balance: { color: "#6B7280", fontSize: 14 },
//   statusBadge: {
//     paddingHorizontal: 10,
//     paddingVertical: 4,
//     borderRadius: 12,
//     marginTop: 8,
//   },
//   statusText: { color: "#fff", fontWeight: "600", fontSize: 12 },
//   addCard: {
//     width: "47%",
//     height: 130,
//     borderRadius: 16,
//     borderWidth: 2,
//     borderColor: "#7C3AED",
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 16,
//   },
//   addText: { marginTop: 6, fontWeight: "600", color: "#7C3AED" },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: "600",
//     paddingHorizontal: 20,
//     marginVertical: 10,
//     color: "#1F2937",
//   },
// });




import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";

import KidBox from "../components/KidBox";
import TaskBox from "../components/TaskBox";

const ParentScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState("kids");
  const [greeting, setGreeting] = useState("");
  const [children, setChildren] = useState([
    { id: 1, name: "Zainab", balance: 120, status: "Ongoing", image: null },
    { id: 2, name: "Noor", balance: 90, status: "Verified", image: null },
    { id: 3, name: "Aziz", balance: 140, status: "Accepted", image: null },
    { id: 4, name: "Bader", balance: 75, status: "Rejected", image: null },
  ]);

  const [tasks, setTasks] = useState([
    {
      id: 101,
      name: "Clean Room",
      childName: "Zainab",
      status: "Verified",
      date: "2025-04-14",
    },
    {
      id: 102,
      name: "Homework",
      childName: "Aziz",
      status: "Accepted",
      date: "2025-04-13",
    },
    {
      id: 103,
      name: "Wash Dishes",
      childName: "Bader",
      status: "Rejected",
      date: "2025-04-12",
    },
  ]);

  const parentName = "Ali";

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  const handleImagePick = async (childId) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      aspect: [1, 1],
    });

    if (!result.canceled) {
      const updated = children.map((child) =>
        child.id === childId
          ? { ...child, image: result.assets[0].uri }
          : child
      );
      setChildren(updated);
    }
  };

  const totalBalance = children.reduce((sum, c) => sum + c.balance, 0);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>
          {greeting}, <Text style={styles.boldName}>{parentName}</Text>
        </Text>

        {/* Animated Balance */}
        <View style={styles.balanceCard}>
          <View style={styles.balanceRow}>
            <LottieView
              source={require("../../assets/balance.json")}
              autoPlay
              loop
              style={styles.lottieIcon}
            />
            <View>
              <Text style={styles.balanceLabel}>Total Balance</Text>
              <Text style={styles.balanceValue}>
                KWD {totalBalance.toFixed(3)}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity onPress={() => setActiveTab("kids")}>
          <Text
            style={[
              styles.tabText,
              activeTab === "kids" && styles.tabTextActive,
            ]}
          >
            All Kids
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab("history")}>
          <Text
            style={[
              styles.tabText,
              activeTab === "history" && styles.tabTextActive,
            ]}
          >
            History
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      {activeTab === "kids" ? (
        <>
          <View style={styles.grid}>
            {children.map((child) => (
              // <KidBox
              //   key={child.id}
              //   child={child}
              //   onImagePick={handleImagePick}
              //   onPress={() =>
              //     navigation.navigate("Profile", { childId: child.id })
              //   }
              // />
              <KidBox
  key={child.id}
  child={child}
  onImagePick={handleImagePick}
  onNavigate={(id) => navigation.navigate("Profile", { childId: id })}
/>

            ))}
            <TouchableOpacity
              style={styles.addCard}
              onPress={() => navigation.navigate("CreateChildAcc")}
            >
              <MaterialIcons name="add" size={30} color="#7C3AED" />
              <Text style={styles.addText}>Add a child</Text>
            </TouchableOpacity>
          </View>

          {/* Tasks to Review
          <Text style={styles.sectionTitle}>Tasks to Review</Text>
          <View style={styles.grid}>
            {tasks
              .filter((t) => t.status === "Verified")
              .map((task) => (
                <TaskBox
                  key={task.id}
                  task={task}
                  onPress={() =>
                    navigation.navigate("TaskScreen", { taskId: task.id })
                  }
                />
              ))}
          </View> */}

          {/* Tasks to Review */}
<Text style={styles.sectionTitle}>Tasks to Review</Text>
<View style={styles.grid}>
  {tasks
    .filter((t) => t.status === "Verified")
    .map((task) => (
      <TaskBox
        key={task.id}
        task={task}
      />
    ))}
</View>

        </>
      ) : (
        <>
          <Text style={styles.sectionTitle}>Task History</Text>
          <View style={styles.grid}>
            {tasks
              .filter((t) => ["Accepted", "Rejected"].includes(t.status))
              .map((task) => (
                <TaskBox
                  key={task.id}
                  task={task}
                  onPress={() =>
                    navigation.navigate("TaskScreen", { taskId: task.id })
                  }
                />
              ))}
          </View>
        </>
      )}
    </ScrollView>
  );
};

export default ParentScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9fafb" },
  header: { padding: 24, paddingTop: 50, backgroundColor: "#6C63FF" },
  greeting: { color: "#fff", fontSize: 20, marginTop: 10 },
  boldName: { fontWeight: "bold", fontSize: 22 },
  balanceCard: {
    marginTop: 12,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: "#7C3AED",
  },
  balanceRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  lottieIcon: {
    width: 60,
    height: 60,
    marginRight: 12,
  },
  balanceLabel: { color: "#6B7280" },
  balanceValue: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#7C3AED",
    marginTop: 4,
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 16,
  },
  tabText: { fontSize: 16, color: "#9CA3AF" },
  tabTextActive: { color: "#7C3AED", fontWeight: "bold" },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },
  addCard: {
    width: "47%",
    height: 130,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#7C3AED",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  addText: { marginTop: 6, fontWeight: "600", color: "#7C3AED" },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    paddingHorizontal: 20,
    marginVertical: 10,
    color: "#1F2937",
  },
});
