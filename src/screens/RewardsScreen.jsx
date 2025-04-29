import React, { useState, useRef, useEffect, useContext } from "react";
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
import { useQuery, useMutation } from "@tanstack/react-query";
import { rewards, redeemReward } from "../api/rewards";
import { profile } from "../api/users";
import UserContext from "../context/UserContext";

const { width, height } = Dimensions.get("window");

const COLOR_MAP = ["#FFE4F0", "#E1F0FF", "#FFF6CC", "#E0FFE1"];

const RewardsScreen = () => {
  const navigation = useNavigation();
  const confettiRef = useRef(null);
  const { isAuth } = useContext(UserContext);
  const [selectedReward, setSelectedReward] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const { data: profileData } = useQuery({
    queryKey: ["profile"],
    queryFn: profile,
    enabled: !!isAuth,
  });

  const { data: rewardsData, isLoading } = useQuery({
    queryKey: ["rewards"],
    queryFn: rewards,
    enabled: !!isAuth,
  });

  const { mutate: redeem, isLoading: isRedeeming } = useMutation({
    mutationKey: ["redeemReward"],
    mutationFn: redeemReward,
    onSuccess: () => {
      setShowModal(false);
      confettiRef.current?.start?.();
      alert(`Requested ${selectedReward.title} 🎉`);
    },
    onError: (error) => {
      alert(error.message || "Failed to redeem reward");
    },
  });

  useEffect(() => {
    confettiRef.current?.start?.();
  }, []);

  const handleRedeem = (reward) => {
    if (profileData?.loyaltyPoints < reward.rewardPrice) {
      alert("Not enough points for this reward!");
      return;
    }
    setSelectedReward(reward);
    setShowModal(true);
  };

  const confirmRedemption = () => {
    if (selectedReward) {
      redeem(selectedReward.rewardId);
    }
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
              <Text style={styles.rewardText}>{reward.rewardName}</Text>
              <Text style={styles.rewardDescription}>
                Description: {reward.rewardDescription}
              </Text>
              <Text style={styles.rewardPoints}>
                Cost: {reward.rewardPrice} pts
              </Text>
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
          <Text style={styles.headerTitle}>3yali Rewards</Text>
        </View>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.pointsCard}>
          <Text style={styles.balanceLabel}>Current Balance</Text>
          <View style={styles.balanceRow}>
            <Text style={styles.balanceValue}>
              {profileData?.loyaltyPoints || 0}
            </Text>
            <Text style={styles.currency}>Points</Text>
          </View>
        </View>

        <View style={styles.rewardsWrapper}>
          <Text style={styles.sectionTitle}>Redeem Your Points</Text>

          {rewardsData?.map((reward, index) => (
            <AnimatedRewardCard
              key={reward.rewardId}
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
                <Text style={styles.modalReward}>
                  {selectedReward.rewardName}
                </Text>
                <Text style={styles.modalCost}>
                  for {selectedReward.rewardPrice} points?
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
