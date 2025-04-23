import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const KidBox = ({ child, onImagePick, onNavigate }) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onNavigate(child.id)}
      activeOpacity={0.9}
    >
      <View style={styles.avatar}>
        {child.image ? (
          <Image source={{ uri: child.image }} style={styles.image} />
        ) : (
          <MaterialIcons name="person" size={30} color="#4F46E5" />
        )}
      </View>

      <Text style={styles.name}>{child.name}</Text>
      <Text style={styles.balance}>KWD {child.balance.toFixed(2)}</Text>

      <TouchableOpacity
        onPress={() => onImagePick(child.id)}
        style={styles.uploadButton}
      >
        <MaterialIcons name="cloud-upload" size={20} color="#4F46E5" />
        <Text style={styles.uploadText}>Upload</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default KidBox;

const styles = StyleSheet.create({
  card: {
    width: "47%",
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  avatar: {
    backgroundColor: "#EEF2FF",
    borderRadius: 40,
    padding: 10,
    marginBottom: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  name: {
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 4,
    color: "#1F2937",
  },
  balance: {
    color: "#6B7280",
    fontSize: 14,
    marginBottom: 8,
  },
  uploadButton: {
    marginTop: 4,
    alignItems: "center",
    backgroundColor: "#EEF2FF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    flexDirection: "row",
    gap: 4,
  },
  uploadText: {
    fontSize: 12,
    color: "#4F46E5",
    fontWeight: "500",
  },
});
