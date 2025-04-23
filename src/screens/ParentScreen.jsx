import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
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

  const [showEmojiModal, setShowEmojiModal] = useState(false);
  const [selectedChildId, setSelectedChildId] = useState(null);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  // Fetch Parent Name from backend using the balance endpoint
  const {
    data: balanceData,
    isError,
    error,
  } = useQuery({
    queryKey: ["fetchBalance"],
    queryFn: () => balance(),
  });

  const parentName = balanceData?.name ?? "Parent";
  const totalBalance = balanceData?.balance ?? 0;

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
      console.log("Children data:", data);
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

  const handleImagePick = async (childId) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      aspect: [1, 1],
    });

    if (!result.canceled) {
      const updated = filteredChildren?.map((child) =>
        child.id === childId ? { ...child, image: result.assets[0].uri } : child
      );
      // setChildren(updated);
    }
  };
  const handleEmojiSelect = (type) => {
    const emoji = type === "boy" ? "👦" : "👧";
    const updated = filteredChildren?.map((child) =>
      child.id === selectedChildId
        ? { ...child, emoji: emoji, image: null }
        : child
    );

    // setChildren(updated);
    setShowEmojiModal(false);
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Verified":
        return styles.statusVerified;
      case "Ongoing":
        return styles.statusOngoing;
      case "Accepted":
        return styles.statusAccepted;
      case "Rejected":
        return styles.statusRejected;
      default:
        return {};
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Logout />
      <View style={styles.header}>
        <View style={styles.greetingSection}>
          <View style={styles.greetingBox}>
            <MaterialIcons name="wb-sunny" size={24} color="#FFD700" />
            <View style={styles.greetingTextContainer}>
              <Text style={styles.dayText}>{greeting}</Text>
              <Text style={styles.nameText}>{parentName}</Text>
            </View>
          </View>
        </View>

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
            {filteredChildren?.map((child) => (
              <TouchableOpacity
                key={child.id}
                style={styles.childCard}
                onPress={() => navigation.navigate("ProfileScreen", child)}
              >
                <View style={styles.childContent}>
                  <View style={styles.childHeader}>
                    <View style={styles.avatarContainer}>
                      {child.image ? (
                        <Image
                          source={{ uri: child.image }}
                          style={styles.childImage}
                        />
                      ) : child.emoji ? (
                        <View style={styles.emojiContainer}>
                          <Text style={styles.emojiText}>{child.emoji}</Text>
                        </View>
                      ) : (
                        <View style={styles.placeholderImage}>
                          <MaterialIcons
                            name="person"
                            size={30}
                            color="#0066FF"
                          />
                        </View>
                      )}
                    </View>
                    <View style={styles.nameContainer}>
                      <Text
                        style={styles.childName}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                      >
                        {child.name}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.childBalance}>
                    <Text style={styles.balanceAmount}>
                      KWD {child.balance}
                    </Text>
                  </View>

                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      style={styles.uploadButton}
                      onPress={() => handleImagePick(child.id)}
                    >
                      <MaterialIcons
                        name="add-a-photo"
                        size={24}
                        color="#0066FF"
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.uploadButton}
                      onPress={() => {
                        setSelectedChildId(child.id);
                        setShowEmojiModal(true);
                      }}
                    >
                      <MaterialIcons
                        name="emoji-emotions"
                        size={24}
                        color="#0066FF"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              style={styles.addCard}
              onPress={() => navigation.navigate("CreatenewAcc")}
            >
              <MaterialIcons name="add" size={30} color="#0066FF" />
              <Text style={styles.addText}>Add a child</Text>
            </TouchableOpacity>
          </View>

          {/* Tasks to Review */}
          <Text style={styles.sectionTitle}>Tasks to Review</Text>
          <View style={styles.grid}>
            {taskFilteredData
              ?.filter((t) => t.status === "Verify")
              .map((task) => (
                <TouchableOpacity
                  key={task.id}
                  style={styles.taskCard}
                  onPress={() =>
                    navigation.navigate("TaskDetailsScreen", { task })
                  }
                >
                  <View style={styles.taskHeader}>
                    <View style={styles.taskIcon}>
                      <MaterialIcons
                        name="assignment"
                        size={20}
                        color="#0066FF"
                      />
                    </View>
                    <Text style={styles.taskStatus}>{task.status}</Text>
                  </View>
                  <Text style={styles.taskName}>{task.name}</Text>
                  <View style={styles.taskFooter}>
                    <Text style={styles.childName}>{task.childName}</Text>
                    <Text style={styles.taskDate}>{task.date}</Text>
                  </View>
                </TouchableOpacity>
              ))}
          </View>
        </>
      ) : (
        <>
          <Text style={styles.sectionTitle}>Task History</Text>
          <View style={styles.grid}>
            {taskFilteredData
              ?.filter((t) => ["Completed", "Rejected"].includes(t.status))
              .map((task) => (
                <TouchableOpacity
                  key={task.id}
                  style={styles.taskCard}
                  onPress={() =>
                    navigation.navigate("TaskScreen", { taskId: task.id })
                  }
                >
                  <View style={styles.taskHeader}>
                    <View style={styles.taskIcon}>
                      <MaterialIcons
                        name="assignment"
                        size={20}
                        color="#0066FF"
                      />
                    </View>
                    <View
                      style={[
                        styles.taskStatus,
                        task.status === "Accepted"
                          ? styles.statusAccepted
                          : styles.statusRejected,
                      ]}
                    >
                      <Text style={styles.statusText}>{task.status}</Text>
                    </View>
                  </View>

                  <Text style={styles.taskName}>{task.name}</Text>

                  <View style={styles.taskFooter}>
                    <View style={styles.childInfo}>
                      <MaterialIcons name="person" size={16} color="#6B7280" />
                      <Text style={styles.childName}>{task.childName}</Text>
                    </View>
                    <View style={styles.dateInfo}>
                      <MaterialIcons name="event" size={16} color="#6B7280" />
                      <Text style={styles.taskDate}>{task.date}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
          </View>
        </>
      )}

      {/* Emoji Selection Modal */}
      <Modal
        visible={showEmojiModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowEmojiModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Choose an Avatar</Text>
            <View style={styles.emojiGrid}>
              <TouchableOpacity
                style={styles.emojiOption}
                onPress={() => handleEmojiSelect("boy")}
              >
                <View style={styles.emojiCircle}>
                  <Text style={styles.modalEmojiText}>👦</Text>
                </View>
                <Text style={styles.emojiLabel}>Boy</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.emojiOption}
                onPress={() => handleEmojiSelect("girl")}
              >
                <View style={styles.emojiCircle}>
                  <Text style={styles.modalEmojiText}>👧</Text>
                </View>
                <Text style={styles.emojiLabel}>Girl</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowEmojiModal(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default ParentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDFAF6",
  },
  header: {
    padding: 24,
    paddingTop: 50,
    backgroundColor: "#0066FF",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  greetingSection: {
    paddingHorizontal: 4,
    marginBottom: 20,
  },
  greetingBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: 16,
    borderRadius: 20,
    borderLeftWidth: 4,
    borderLeftColor: "#FFD700",
  },
  greetingTextContainer: {
    marginLeft: 12,
  },
  dayText: {
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: 16,
    fontWeight: "500",
  },
  nameText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 4,
  },
  balanceCard: {
    backgroundColor: "#0066FF",
    borderRadius: 16,
    padding: 20,
    marginTop: 12,
    marginHorizontal: 16,
    borderStyle: "dashed",
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.3)",
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
  balanceLabel: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 14,
    fontWeight: "500",
  },
  balanceValue: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 4,
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 16,
    paddingHorizontal: 20,
  },
  tabText: {
    fontSize: 16,
    color: "#6B7280",
    fontWeight: "500",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: "#F3F4F6",
  },
  tabTextActive: {
    color: "#0066FF",
    backgroundColor: "#E5F0FF",
    fontWeight: "600",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 16,
    gap: 12,
  },
  childCard: {
    width: "47%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  childContent: {
    gap: 12,
  },
  childHeader: {
    alignItems: "center",
    width: "100%",
    marginBottom: 12,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    marginBottom: 8,
  },
  childImage: {
    width: "100%",
    height: "100%",
    borderRadius: 30,
  },
  emojiContainer: {
    width: "100%",
    height: "100%",
    borderRadius: 30,
    backgroundColor: "#E5F0FF",
    justifyContent: "center",
    alignItems: "center",
  },
  emojiText: {
    fontSize: 32,
  },
  placeholderImage: {
    width: "100%",
    height: "100%",
    borderRadius: 30,
    backgroundColor: "#E5F0FF",
    justifyContent: "center",
    alignItems: "center",
  },
  nameContainer: {
    backgroundColor: "#E5F0FF",
    padding: 8,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
  },
  childName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0066FF",
    textAlign: "center",
  },
  childBalance: {
    alignItems: "center",
    marginBottom: 12,
  },
  balanceAmount: {
    fontSize: 16,
    fontWeight: "500",
    color: "#0066FF",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  uploadButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E5F0FF",
    padding: 10,
    borderRadius: 12,
    aspectRatio: 1,
  },
  addCard: {
    width: "47%",
    height: 130,
    borderRadius: 16,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  addText: {
    marginTop: 6,
    color: "#0066FF",
    fontSize: 14,
    fontWeight: "600",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
    paddingHorizontal: 16,
    marginVertical: 16,
  },
  taskCard: {
    width: "47%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  taskHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  taskIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: "#E5F0FF",
    alignItems: "center",
    justifyContent: "center",
  },
  taskStatus: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusAccepted: {
    backgroundColor: "#E5FFE9",
  },
  statusRejected: {
    backgroundColor: "#FFE5E5",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#1F2937",
  },
  taskName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 12,
  },
  taskFooter: {
    gap: 8,
  },
  childInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  dateInfo: {
    flexDirection: "row",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  taskDate: {
    fontSize: 12,
    color: "#6B7280",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 20,
  },
  emojiGrid: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginBottom: 20,
  },
  emojiOption: {
    alignItems: "center",
  },
  emojiCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#E5F0FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  modalEmojiText: {
    fontSize: 40,
  },
  emojiLabel: {
    fontSize: 16,
    color: "#1F2937",
    fontWeight: "500",
  },
  closeButton: {
    backgroundColor: "#0066FF",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
