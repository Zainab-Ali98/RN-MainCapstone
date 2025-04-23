import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Modal,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useQuery, useMutation } from "@tanstack/react-query";
import { rewards, redeemReward } from "../api/rewards";
import UserContext from "../context/UserContext";

const { width } = Dimensions.get("window");

const RewardsScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { isAuth } = useContext(UserContext);
  const [selectedReward, setSelectedReward] = useState(null);
  const [showRequestModal, setShowRequestModal] = useState(false);

  const { data: rewardsData, isLoading } = useQuery({
    queryKey: ["rewards"],
    queryFn: rewards,
    enabled: !!isAuth,
  });

  const { mutate: redeem, isLoading: isRedeeming } = useMutation({
    mutationKey: ["redeemReward"],
    mutationFn: redeemReward,
    onSuccess: () => {
      setShowRequestModal(false);
      Alert.alert("Success", "Reward request sent successfully!");
    },
    onError: (error) => {
      Alert.alert("Error", error.message || "Failed to redeem reward");
    },
  });

  const handleRedeemPress = (reward) => {
    setSelectedReward(reward);
    setShowRequestModal(true);
  };

  const confirmRedemption = () => {
    if (selectedReward) {
      redeem(selectedReward.rewardId);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4D5DFA" />
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <LinearGradient
        colors={["#4D5DFA", "#6C63FF"]}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.headerTitle}>Rewards</Text>
      </LinearGradient>

      <ScrollView style={styles.content}>
        <View style={styles.rewardsContainer}>
          {rewardsData?.map((reward, index) => (
            <TouchableOpacity
              key={reward.rewardId}
              style={styles.rewardCard}
              onPress={() => handleRedeemPress(reward)}
            >
              <Image
                source={{ uri: reward.imageUrl }}
                style={styles.rewardImage}
                resizeMode="cover"
              />
              <View style={styles.rewardInfo}>
                <Text style={styles.rewardTitle}>{reward.title}</Text>
                <Text style={styles.rewardDescription}>{reward.description}</Text>
                <Text style={styles.rewardPoints}>{reward.points} points</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <Modal
        visible={showRequestModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowRequestModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Confirm Redemption</Text>
            <Text style={styles.modalText}>
              Are you sure you want to redeem {selectedReward?.title} for {selectedReward?.points} points?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowRequestModal(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={confirmRedemption}
                disabled={isRedeeming}
              >
                {isRedeeming ? (
                  <ActivityIndicator color="#ffffff" />
                ) : (
                  <Text style={styles.modalButtonText}>Confirm</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    padding: 20,
    paddingTop: 40,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  rewardsContainer: {
    gap: 20,
  },
  rewardCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  rewardImage: {
    width: "100%",
    height: 200,
  },
  rewardInfo: {
    padding: 16,
  },
  rewardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 8,
  },
  rewardDescription: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 12,
  },
  rewardPoints: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4D5DFA",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
    width: width * 0.8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 16,
    textAlign: "center",
  },
  modalText: {
    fontSize: 16,
    color: "#666666",
    marginBottom: 24,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
  },
  modalButton: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#E5E7EB",
  },
  confirmButton: {
    backgroundColor: "#4D5DFA",
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default RewardsScreen; 