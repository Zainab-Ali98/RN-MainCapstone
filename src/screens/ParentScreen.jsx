import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { balance, profile } from "../api/users";
import { useQuery } from "@tanstack/react-query";
import { getChildren, getTasks } from "../api/parents";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";

import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ChildCard } from "../components/ChildCard";
import Logout from "../components/Logout";

import KidBox from "../components/KidBox";
import TaskBox from "../components/TaskBox";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

const ParentScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState("kids");
  const [greeting, setGreeting] = useState("");
  const [childImages, setChildImages] = useState({}); // { childId: imageUri }

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

  // Fetch Parent Name from backend using the balance endpoint
  const {
    data: balanceData,
    isError,
    error,
  } = useQuery({
    queryKey: ["fetchBalance"],
    queryFn: () => balance(),
  });
  const parentName = balanceData?.name || "Parent";
  const totalBalance = balanceData?.balance ?? 0;

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
        child.id === childId ? { ...child, image: result.assets[0].uri } : child
      );
      setChildren(updated);
    }
  };

  // Fetch Children from backend using the getChildren endpoint
  const {
    data: childrenData,
    isLoading: isChildrenLoading,
    isError: isChildrenError,
    error: childrenError,
  } = useQuery({
    queryKey: ["fetchChildren"],
    queryFn: () => getChildren(),
    onSuccess: (data) => {
      //console.log("Children data:", data);
    },
    onError: (error) => {
      console.error("Error fetching children:", error);
    },
  });
  const filteredChildren = childrenData?.map((child) => ({
    key: child.childId,
    id: child.childId,
    name: child.firstName + " " + child.lastName,
    balance: child.balance ?? 0,
    status: "Active", // Placeholder, update later if backend provides
    image: child.profilePicture,
  }));
  const children = filteredChildren ?? [];

  // Fetch Tasks from backend
  const {
    data: tasksData,
    isLoading: isTasksLoading,
    isError: isTasksError,
    error: tasksError,
  } = useQuery({
    queryKey: ["fetchTasks"],
    queryFn: () => getTasks(),
    onSuccess: (data) => {
      //console.log("Task data:", data);
    },
    onError: (error) => {
      console.error("Error fetching children:", error);
    },
  });

  const taskFilteredData = tasksData?.map((task) => {
    const child = childrenData?.find((c) => c.childId === task.childId);
    const date = task.date ? new Date(task.date) : new Date("2025-04-14");
    return {
      key: task.taskId,
      id: task.taskId,
      name: task.taskName,
      childName: child
        ? `${child.firstName} ${child.lastName}`
        : "Unknown Child",
      status: task.status,
      //  US style: 20 Apr 2025
      // date: date.toLocaleDateString("en-US", {
      //   year: "numeric",
      //   month: "long",
      //   day: "numeric",
      // }),
      date: date
        .toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
        .split("/")
        .join("/"),
    };
  });
  const tasksList = taskFilteredData ?? [];
  //console.log("Children data:", taskFilteredData);

  return (
    <ScrollView style={styles.container}>
      <Logout />
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
            {children.length === 0 && !isChildrenLoading ? (
              <Text style={styles.sectionTitle}>No children found</Text>
            ) : (
              children.map((child) => (
                <KidBox
                  key={child.id}
                  child={child}
                  onImagePick={handleImagePick}
                  onNavigate={(id) =>
                    navigation.navigate("ProfileScreen", child)
                  }
                />
              ))
            )}
            <TouchableOpacity
              style={styles.addCard}
              onPress={() => navigation.navigate("CreatenewAcc")}
            >
              <MaterialIcons name="add" size={30} color="#7C3AED" />
              <Text style={styles.addText}>Add a child</Text>
            </TouchableOpacity>
          </View>

          {/* Tasks to Review */}
          <Text style={styles.sectionTitle}>Tasks to Review</Text>
          <View style={styles.grid}>
            {tasksList
              .filter((t) => t.status === "Verify")
              .map((task) => (
                <TaskBox
                  key={task.id}
                  task={task}
                  onPress={() =>
                    navigation.navigate("TaskDetailsScreen", { task })
                  }
                />
              ))}
          </View>
        </>
      ) : (
        <>
          <Text style={styles.sectionTitle}>Task History</Text>
          <View style={styles.grid}>
            {tasksList
              .filter((t) => ["Completed", "Rejected"].includes(t.status))
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
