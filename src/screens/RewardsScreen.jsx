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
import ConfettiCannon from "react-native-confetti-cannon";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { useQuery, useMutation } from "@tanstack/react-query";
import { rewards, redeemReward } from "../api/rewards";
import { profile } from "../api/users";
import UserContext from "../context/UserContext";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AntDesign from "@expo/vector-icons/AntDesign";

const { width, height } = Dimensions.get("window");

const COLOR_MAP = [
  "#42B7FF",
  "#8B72A6",
  "#FBB373",
  "#2E8B57",
  "#3B5998",
  "#D2691E",
];

const RewardsScreen = () => {
  const confettiRef = useRef(null);
  const { isAuth } = useContext(UserContext);
  const [selectedReward, setSelectedReward] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const { data: profileData } = useQuery({
    queryKey: ["profile"],
    queryFn: profile,
    enabled: !!isAuth,
  });

  const { data: rewardsData } = useQuery({
    queryKey: ["rewards"],
    queryFn: rewards,
    enabled: !!isAuth,
  });

  console.log("rewardsData", rewardsData);
  const { mutate: redeem } = useMutation({
    mutationKey: ["redeemReward"],
    mutationFn: redeemReward,
    onSuccess: (data) => {
      setShowModal(false);
      confettiRef.current?.start?.();
      alert(`Requested ${data?.rewardName} 🎉`);
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
        <View
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
            <View
              style={{
                gap: 5,
              }}
            >
              <Text style={styles.rewardText}>{reward.rewardName}</Text>
              <View style={styles.RewardLeft1}>
                <FontAwesome name="circle" size={10} color="white" />
                <Text style={styles.RewardDescription}>
                  {reward.rewardDescription}
                </Text>
              </View>
              <View style={styles.RewardLeft3}>
                <Text style={styles.RewardLabel}>{"Required"}</Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 5,
                  }}
                >
                  <Text style={styles.RewardPrice}>{reward.rewardPrice}</Text>
                  <AntDesign
                    name="star"
                    size={20}
                    color="#FFD700"
                    marginBottom={1}
                  />
                </View>
              </View>
            </View>
            <TouchableOpacity
              style={styles.RewardRedeem}
              onPress={() => onPress(reward)}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
            >
              <Text style={styles.RewardRedeemButton}>{"Redeem"}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../../assets/background.png")}
        style={styles.backgroundImage}
        resizeMode="cover"
      />

      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.centeredTitle}>3yali Rewards</Text>

        <View style={styles.pointsCard}>
          <Text style={styles.balanceLabel}>Current Balance</Text>
          <View style={styles.balanceRow}>
            <Text style={styles.balanceValue}>
              {profileData?.loyaltyPoints || 0}
            </Text>
            <Text style={styles.currency}>Points</Text>
          </View>
        </View>

        <View >
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
  RewardRedeemButton: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  RewardRedeem: {
    backgroundColor: "rgba(255, 255, 255, 0.14)",
    borderRadius: 14,
    paddingVertical: 11,
    paddingHorizontal: 13,
    justifyContent: "center",
    alignItems: "center",
    width: 89,
    height: 37,
    alignSelf: "center",
  },
  RewardPrice: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
  },
  RewardLabel: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
  },
  RewardLeft3: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  RewardLeft1: {
    gap: 5,
    flexDirection: "row",
  },
  RewardDescription: {
    color: "#FFFFFF",
    fontSize: 12,
    flexDirection: "row",
    alignItems: "center",
    juastifyContent: "center",
  },
  container: { flex: 1, backgroundColor: "#ffffff" },
  backgroundImage: {
    position: "absolute",
    width: width,
    height: height * 0.5,
    top: 0,
  },
  scrollView: {
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 40,
  },
  centeredTitle: {
    fontSize: 26,
    fontWeight: "800",
    textAlign: "left",
    color: "#ffff",
    marginBottom: 20,
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 14,
    padding: 14,
    marginTop: 22,
    // marginBottom: 10,
    marginHorizontal: 12,
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 5,
    width: "100%",
  },
  rewardImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
  },
  rewardText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  rewardDescription: {
    fontSize: 14,
    color: "#6B7280",
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
