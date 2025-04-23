import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const FeatureCard = ({ icon, title, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <View style={styles.iconContainer}>
      <Ionicons name={icon} size={24} color="#FFB627" />
    </View>
    <Text style={styles.title}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 16,
    width: "47%",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#FFF7E6",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 14,
    color: "#1F2937",
    textAlign: "center",
    fontWeight: "500",
  },
});

export default FeatureCard;
