import React from "react";
import { View, Image, StyleSheet } from "react-native";
import * as Progress from "react-native-progress";

const CIRCLE_SIZE = 200;

const ProgressDonut = ({ goal }) => {
    const progress = Math.min(goal.currentBalance / goal.targetAmount, 1);
  return (
    <View style={styles.circleWrapper}>
      <View style={styles.progressCircle}>
        <Progress.Circle
          size={CIRCLE_SIZE + 30}
          progress={progress}
          thickness={15}
          color="#4CAF50"
          unfilledColor="#E5E7EB"
          borderWidth={0}
          showsText={false}
        />
      </View>
      <View style={styles.circularMask}>
        <Image
          source={{ uri: "https://reactjs.org/logo-og.png" }} // Replace with goal.imageUri if available
          style={styles.productImage}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

export default ProgressDonut;

const styles = StyleSheet.create({
  circleWrapper: {
    width: CIRCLE_SIZE + 30,
    height: CIRCLE_SIZE + 30,
    justifyContent: "center",
    alignItems: "center",
  },
  progressCircle: {
    position: "absolute",
    width: CIRCLE_SIZE + 30,
    height: CIRCLE_SIZE + 30,
    justifyContent: "center",
    alignItems: "center",
  },
  circularMask: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  productImage: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
  },
});
