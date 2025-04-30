import React from "react";
import { View, Image, StyleSheet } from "react-native";
import * as Progress from "react-native-progress";

const CIRCLE_SIZE = 50;

const ProgressDonut = ({ current, total }) => {
  const progress = Math.min(current / total, 1);
  return (
    <Progress.Circle
      size={CIRCLE_SIZE + 30}
      progress={progress}
      thickness={8}
      color="#4CAF50"
      unfilledColor="#E5E7EB"
      borderWidth={0}
      showsText={true}
      formatText={() => `${Math.round(progress * 100)}%`}
      textStyle={{ fontSize: 14, color: "#4CAF50" }}
    />
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
});
