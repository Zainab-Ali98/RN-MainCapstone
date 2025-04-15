import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
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
          <MaterialIcons name="person" size={30} color="#6C63FF" />
        )}
      </View>

      <Text style={styles.name}>{child.name}</Text>
      <Text style={styles.balance}>KWD {child.balance.toFixed(2)}</Text>

      <TouchableOpacity
        onPress={() => onImagePick(child.id)}
        style={styles.uploadIcon}
      >
        <MaterialIcons name="cloud-upload" size={20} color="#FF69B4" />
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
    borderColor: "#7C3AED",
    borderWidth: 2,
    alignItems: "center",
    marginBottom: 16,
  },
  avatar: {
    backgroundColor: "#F3E8FF",
    borderRadius: 40,
    padding: 10,
    marginBottom: 10,
  },
  image: { width: 50, height: 50, borderRadius: 25 },
  name: { fontWeight: "600", fontSize: 16, marginBottom: 4, color: "#1F2937" },
  balance: { color: "#6B7280", fontSize: 14 },
  uploadIcon: {
    marginTop: 8,
    alignItems: "center",
  },
  uploadText: {
    fontSize: 12,
    color: "#FF69B4", 
    marginTop: 2,
  },
});
