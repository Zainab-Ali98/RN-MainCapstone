import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CircleProgress = ({ size = 70, strokeWidth = 8, percentage = 75, color = "#4CAF50" }) => {
  const rotateValue = `${(percentage / 100) * 360}deg`;

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <View style={[styles.background, { borderWidth: strokeWidth }]} />
      <View
        style={[
          styles.foreground,
          {
            borderWidth: strokeWidth,
            borderRightColor: "transparent",
            borderTopColor: "transparent",
            transform: [{ rotate: rotateValue }],
            borderLeftColor: color,
            borderBottomColor: color,
          },
        ]}
      />
      <View style={styles.center}>
        <Text style={styles.label}>{percentage}%</Text>
      </View>
    </View>
  );
};

export default CircleProgress;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 1000,
    borderColor: "#E5E7EB",
  },
  foreground: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 1000,
    borderColor: "#4CAF50",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
  },
  label: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#4CAF50",
  },
});
