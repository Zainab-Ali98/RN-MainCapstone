import React from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
const test = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View
          activeOpacity={0.9}
          style={[
            styles.RewardList,
            { backgroundColor: COLOR_MAP[index % COLOR_MAP.length] },
          ]}
        >
          <View style={styles.RewardLeft}>
            <Text style={styles.RewardName}>{reward.rewardName}</Text>
            <View style={styles.RewardLeft1}>
              <FontAwesome name="circle" size={10} color="white" />
              <Text style={styles.RewardDescription}>
                {reward.rewardDescription}
              </Text>
            </View>
            <View style={styles.RewardLeft2}>
              <Text style={styles.RewardLabel}>{"Required"}</Text>
              <View style={styles.RewardLeft3}>
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default test;

const styles = StyleSheet.create({
  RewardRedeem: {
    backgroundColor: "#FFFFFF24",
    borderRadius: 14,
    paddingVertical: 11,
    paddingHorizontal: 13,
  },
  RewardLeft: {
    alignItems: "flex-start",
    gap: 5,
  },
  RewardList: {
    flexDirection: "RewardList",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#42B6FF",
    borderRadius: 14,
    padding: 14,
    marginTop: 22,
    marginBottom: 825,
    marginHorizontal: 12,
  },
  RewardLeft1: {
    flexDirection: "RewardList",
      gap: 5,
    alignItems: "center",
  },
  RewardLeft2: {
    flexDirection: "RewardList",
    alignItems: "center",
    gap: 10,
  },
  RewardLeft3: {
    flexDirection: "RewardList",
    gap: 5,
    alignItems: "center",
  },
  RewardName: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  RewardDescription: {
    color: "#FFFFFF",
    fontSize: 12,
  },
  RewardLabel: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
  },
  RewardPrice: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
  },
  RewardRedeemButton: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
