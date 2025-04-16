import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CircleProgress = ({
  size = 70,
  strokeWidth = 8,
  percentage = 75,
  color = "#4CAF50",
}) => {
  // Calculate rotation for first half (0-50%)
  const firstHalfRotation =
    percentage <= 50 ? `${(percentage / 50) * 180}deg` : "180deg";

  // Calculate rotation for second half (51-100%)
  const secondHalfRotation =
    percentage > 50 ? `${((percentage - 50) / 50) * 180}deg` : "0deg";

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {/* Background circle */}
      <View style={[styles.background, { borderWidth: strokeWidth }]} />

      {/* First half of progress (0-50%) */}
      <View
        style={[
          styles.progressContainer,
          { transform: [{ rotate: "-90deg" }] },
        ]}
      >
        <View
          style={[
            styles.halfCircle,
            {
              borderWidth: strokeWidth,
              transform: [{ rotate: firstHalfRotation }],
              borderRightColor: "transparent",
              borderBottomColor: "transparent",
              borderLeftColor: color,
              borderTopColor: color,
            },
          ]}
        />
      </View>

      {/* Second half of progress (51-100%) */}
      {percentage > 50 && (
        <View
          style={[
            styles.progressContainer,
            { transform: [{ rotate: "90deg" }] },
          ]}
        >
          <View
            style={[
              styles.halfCircle,
              {
                borderWidth: strokeWidth,
                transform: [{ rotate: secondHalfRotation }],
                borderRightColor: "transparent",
                borderBottomColor: "transparent",
                borderLeftColor: color,
                borderTopColor: color,
              },
            ]}
          />
        </View>
      )}

      {/* Percentage label */}
      <View style={styles.center}>
        <Text style={[styles.label, { color: color }]}>{percentage}%</Text>
      </View>
    </View>
  );
};

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
  progressContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  halfCircle: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 1000,
    borderColor: "#4CAF50",
  },
  center: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default CircleProgress;
