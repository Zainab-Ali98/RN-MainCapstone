

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

import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ChildCard } from "../components/ChildCard";
import Logout from "../components/Logout";


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
     <Logout/>
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

  const handelChildProfilenPress = (child_id) => {
    navigation.navigate("ProfileScreen");
  };

  const handleAddChildPress = () => {
    navigation.navigate("CreatenewAcc");
  };

  const handleCreateTask = () => {
    navigation.navigate("CreateTask");
  };

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
