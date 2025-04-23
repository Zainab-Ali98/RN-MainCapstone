import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const TaskBox = ({ task, onPress }) => {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "ongoing":
        return "#FBBF24";
      case "verify":
        return "#3B82F6";
      case "completed":
        return "#10B981";
      case "rejected":
        return "#EF4444";
      default:
        return "#9CA3AF";
    }
  };

  const Content = (
    <View style={styles.card}>
      <Text style={styles.name}>{task.name || task.taskName}</Text>
      <Text style={styles.subtitle}>
        {task.childName} - {task.date || task.dateCreated}
      </Text>
      <View
        style={[
          styles.statusBadge,
          { backgroundColor: getStatusColor(task.status) },
        ]}
      >
        <Text style={styles.statusText}>{task.status}</Text>
      </View>
    </View>
  );

  return onPress ? (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      style={{ width: "47%", marginBottom: 16 }}
    >
      {Content}
    </TouchableOpacity>
  ) : (
    <View style={{ width: "47%", marginBottom: 16 }}>{Content}</View>
  );
};

export default TaskBox;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    borderColor: "#7C3AED",
    borderWidth: 2,
    padding: 16,
  },
  name: {
    fontWeight: "600",
    fontSize: 16,
    color: "#1F2937",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 6,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  statusText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 12,
  },
});
