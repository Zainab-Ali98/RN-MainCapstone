import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Animated,
} from "react-native";

const { height } = Dimensions.get("window");

const TaskScreen = () => {
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: 0.48, 
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        
        <View style={styles.headerContainer}>
          <View style={styles.headerBadge}>
            <Text style={styles.headerText}>Current Task</Text>
          </View>
          <Text style={styles.subHeaderText}>You're almost there!</Text>
        </View>

        
        <View style={styles.taskDetails}>
          <Text style={styles.taskName}>Clean Your Room</Text>
          <Text style={styles.taskDescription}>
            Make your room neat by picking up toys, folding clothes, and organizing your desk. This task helps keep your space clean and tidy!
          </Text>
          <View style={styles.badgeRow}>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>🟡 In Progress</Text>
            </View>
            <Text style={styles.dueText}>Due in: 3 Days</Text>
            <Text style={styles.pointsText}>🎖 20 pts</Text>
          </View>
        </View>

        
        <View style={styles.imageSection}>
          <Image
            source={{
              uri: "https://cdn.pixabay.com/photo/2021/09/20/10/09/kids-room-6639469_1280.png",
            }}
            style={styles.taskImage}
            resizeMode="cover"
          />
        </View>

        
        <View style={styles.progressSection}>
          <Text style={styles.progressTitle}>Task Progress</Text>

          <View style={styles.progressContainer}>
            <View style={styles.progressTrack}>
              <Animated.View
                style={[
                  styles.progressFill,
                  {
                    width: progressAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: ["0%", "100%"],
                    }),
                  },
                ]}
              />
              <View style={[styles.progressDot, { left: 0 }]} />
              <View style={[styles.progressDot, { left: "48%" }]} />
              <View style={[styles.progressDot, { right: 0 }]} />
            </View>

            <View style={styles.progressLabels}>
              <Text style={styles.progressLabel}>Start</Text>
              <Text style={styles.progressLabel}>Mid</Text>
              <Text style={styles.progressLabel}>Finish</Text>
            </View>
          </View>
        </View>

       
        <View style={styles.actionSection}>
         
          <View style={styles.actionButton}>
            <Image
              source={require("../../assets/purple.png")}
              style={styles.buttonImage}
              resizeMode="contain"
            />
            <TouchableOpacity style={[styles.finalButton, styles.accepted]}>
              <Text style={styles.finalButtonText}>Accepted</Text>
            </TouchableOpacity>
          </View>

        
          <View style={styles.actionButton}>
            <Image
              source={require("../../assets/blue.png")}
              style={styles.buttonImage}
              resizeMode="contain"
            />
            <TouchableOpacity style={[styles.finalButton, styles.rejected]}>
              <Text style={styles.finalButtonText}>Rejected</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default TaskScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "##FFFFFF",
  },
  content: {
    maxWidth: 457,
    width: "100%",
    minHeight: height,
    borderRadius: 40,
    paddingTop: 54,
    paddingHorizontal: 26,
    paddingBottom: 54,
    alignSelf: "center",
  },

  
  headerContainer: {
    marginBottom: 16,
    alignItems: "flex-start",
  },
  headerBadge: {
    backgroundColor: "#E0E7FF",
    paddingHorizontal: 16,
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
    color: "#6B7280",
    marginTop: 4,
  },

  
  taskDetails: {
    marginBottom: 20,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#3B82F6",
    backgroundColor: "#ffffff",
  },
  taskName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 6,
  },
  taskDescription: {
    fontSize: 14,
    color: "#4B5563",
    lineHeight: 20,
    marginBottom: 10,
  },
  badgeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  statusBadge: {
    backgroundColor: "#FCD34D",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#92400E",
  },
  dueText: {
    fontSize: 12,
    color: "#6B7280",
  },
  pointsText: {
    fontSize: 12,
    color: "#10B981",
    fontWeight: "bold",
    marginLeft: "auto",
  },

  
  imageSection: {
    alignItems: "center",
    marginBottom: -30,
  },
  taskImage: {
    width: 154,
    height: 154,
    borderRadius: 77,
  },

  
  progressSection: {
    borderRadius: 24,
    padding: 16,
    backgroundColor: "#F4F4F4",
    marginBottom: 22,
  },
  progressTitle: {
    color: "#174C4F",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 24,
  },
  progressTrack: {
    height: 14,
    position: "relative",
    marginBottom: 20,
    justifyContent: "center",
    backgroundColor: "#D9D9D9",
    borderRadius: 3,
  },
  progressFill: {
    position: "absolute",
    height: 6,
    backgroundColor: "#1433FF",
    borderRadius: 3,
    top: "50%",
    marginTop: -3,
    left: 0,
  },
  progressDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#1433FF",
    position: "absolute",
    top: "50%",
    marginTop: -7,
  },
  progressLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  progressLabel: {
    fontSize: 10,
    fontWeight: "600",
    color: "#174C4F",
  },

  
  actionSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 55,
  },
  actionButton: {
    alignItems: "center",
    width: "48%",
  },
  buttonImage: {
    width: 132,
    height: 109,
    marginBottom: 0,
  },
  finalButton: {
    width: 140,
    height: 50,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  accepted: {
    backgroundColor: "#7C3AED",
  },
  rejected: {
    backgroundColor: "#2563EB",
  },
  finalButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
