import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import CustomAlert from "../components/CustomAlert";

const { height } = Dimensions.get("window");

const TaskScreen = () => {
  const navigation = useNavigation();
  const [alertConfig, setAlertConfig] = useState({
    visible: false,
    title: "",
    message: "",
    type: "success",
  });

  const handleAccept = () => {
    setAlertConfig({
      visible: true,
      title: "Task Accepted",
      message: "You have accepted the task completion.",
      type: "success",
    });
  };

  const handleReject = () => {
    setAlertConfig({
      visible: true,
      title: "Task Rejected",
      message: "You have rejected the task completion.",
      type: "error",
    });
  };

  const handleAlertClose = () => {
    setAlertConfig({ ...alertConfig, visible: false });
    navigation.navigate("ParentScreen");
  };

  // This would come from your backend
  const taskDetails = {
    title: "Clean Your Room",
    points: 20,
    status: "Verify",
    description:
      "Make your room neat by picking up toys, folding clothes, and organizing your desk. This task helps keep your space clean and tidy!",
    imageUrl: null, // This would come from backend, null if no image
    completionDate: "2024-03-20",
    childName: "Sarah",
  };

  // Fallback images for different task types
  const taskTypeImages = {
    cleaning:
      "https://cdn.pixabay.com/photo/2021/09/20/10/09/kids-room-6639469_1280.png",
    homework:
      "https://cdn.pixabay.com/photo/2017/08/10/02/05/tiles-shapes-2617112_1280.jpg",
    exercise:
      "https://cdn.pixabay.com/photo/2017/07/31/11/31/people-2557396_1280.jpg",
    default:
      "https://cdn.pixabay.com/photo/2017/08/10/02/05/tiles-shapes-2617112_1280.jpg",
  };

  return (
    <View style={styles.container}>
      <View style={styles.backgroundShapes}>
        <View style={[styles.shape, styles.shape1]} />
        <View style={[styles.shape, styles.shape2]} />
        <View style={[styles.shape, styles.shape3]} />
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <MaterialIcons name="arrow-back" size={24} color="#4338CA" />
          </TouchableOpacity>

          <View style={styles.headerContainer}>
            <View style={styles.headerBadge}>
              <Text style={styles.headerText}>Task Review</Text>
            </View>
            <Text style={styles.subHeaderText}>
              Verify {taskDetails.childName}'s task completion
            </Text>
          </View>

          <View style={styles.taskCard}>
            <View style={styles.cardContent}>
              <Text style={styles.taskName}>{taskDetails.title}</Text>
              <View style={styles.badgeRow}>
                <View style={styles.statusBadge}>
                  <Text style={styles.statusText}>{taskDetails.status}</Text>
                </View>
                <View style={styles.pointsContainer}>
                  <Text style={styles.pointsLabel}>3yali points</Text>
                  <Text style={styles.pointsText}>{taskDetails.points}</Text>
                </View>
              </View>

              <View style={styles.divider} />

              <Text style={styles.taskDescription}>
                {taskDetails.description}
              </Text>

              <View style={styles.divider} />

              <View style={styles.imageSection}>
                <Image
                  source={{
                    uri: taskDetails.imageUrl || taskTypeImages.cleaning,
                  }}
                  style={styles.taskImage}
                  resizeMode="cover"
                />
              </View>
            </View>
          </View>

          <View style={styles.actionSection}>
            <TouchableOpacity
              style={[styles.actionButton, styles.acceptButton]}
              onPress={handleAccept}
            >
              <View style={styles.buttonContent}>
                <Text style={styles.actionButtonText}>Accept Task</Text>
                <MaterialIcons name="check-circle" size={24} color="#fff" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, styles.rejectButton]}
              onPress={handleReject}
            >
              <View style={styles.buttonContent}>
                <Text style={styles.actionButtonText}>Reject Task</Text>
                <MaterialIcons name="cancel" size={24} color="#fff" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <CustomAlert
        visible={alertConfig.visible}
        title={alertConfig.title}
        message={alertConfig.message}
        type={alertConfig.type}
        onClose={handleAlertClose}
      />
    </View>
  );
};

export default TaskScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  backgroundShapes: {
    ...StyleSheet.absoluteFillObject,
    overflow: "hidden",
  },
  shape: {
    position: "absolute",
    borderRadius: 100,
    opacity: 0.1,
  },
  shape1: {
    width: 200,
    height: 200,
    backgroundColor: "#3B82F6",
    top: -50,
    left: -50,
  },
  shape2: {
    width: 150,
    height: 150,
    backgroundColor: "#60A5FA",
    top: 100,
    right: -30,
  },
  shape3: {
    width: 100,
    height: 100,
    backgroundColor: "#93C5FD",
    bottom: 50,
    left: 50,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    maxWidth: 457,
    width: "100%",
    minHeight: height,
    paddingTop: 24,
    paddingHorizontal: 16,
    paddingBottom: 24,
    alignSelf: "center",
  },
  backButton: {
    marginBottom: 16,
    padding: 4,
  },
  headerContainer: {
    marginBottom: 16,
    alignItems: "flex-start",
  },
  headerBadge: {
    backgroundColor: "#E0E7FF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#3B82F6",
  },
  headerText: {
    color: "#4338CA",
    fontSize: 18,
    fontWeight: "700",
  },
  subHeaderText: {
    fontSize: 14,
    color: "#546E7A",
    marginTop: 4,
  },
  taskCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    overflow: "hidden",
  },
  cardContent: {
    padding: 20,
  },
  taskName: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 12,
  },
  badgeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  statusBadge: {
    backgroundColor: "#E0E7FF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4338CA",
  },
  pointsContainer: {
    alignItems: "center",
    backgroundColor: "#F0F9FF",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  pointsLabel: {
    fontSize: 12,
    color: "#0369A1",
    marginBottom: 2,
  },
  pointsText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#0369A1",
  },
  divider: {
    height: 1,
    backgroundColor: "#E2E8F0",
    marginVertical: 16,
  },
  taskDescription: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E293B",
    lineHeight: 24,
  },
  imageSection: {
    alignItems: "center",
    marginTop: 12,
  },
  taskImage: {
    width: 200,
    height: 200,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  actionSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginTop: 8,
  },
  actionButton: {
    flex: 1,
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    gap: 8,
  },
  acceptButton: {
    backgroundColor: "#4CAF50",
  },
  rejectButton: {
    backgroundColor: "#EF4444",
  },
  actionButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },
});
