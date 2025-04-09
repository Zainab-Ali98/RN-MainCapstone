import React, { useState, useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ChildCard } from "../components/ChildCard";

const statuses = ["Ongoing", "Verified", "Completed", "Rejected"];

const ParentScreen = ({navigation}) => {
  const [children, setChildren] = useState([{"id": 1, name: "John Doe", status: "Ongoing", imageSrc: "../assets/bear.png" }, { id: 2, name: "Jane Smith", status: "Verified", imageSrc: null }, { id: 3, name: "Sam Brown", status: "Completed", imageSrc: null }, { id: 4, name: "Lucy Green", status: "Rejected", imageSrc: null }]);
  const [filterStatus, setFilterStatus] = useState(null);

  const handelChildProfilenPress = (child_id) => {
    navigation.navigate("Profile");
  };  
  
  const handleAddChildPress = () => {
    navigation.navigate("CreateChildAcc");
  };

    
  const handleCreateTask = () => {
    navigation.navigate("CreateTask");
  };
  
  const cycleStatus = (childId) => {
    setChildren((prevChildren) =>
      prevChildren.map((child) => {
        if (child.id === childId) {
          const currentIndex = statuses.indexOf(child.status);
          const nextStatus = statuses[(currentIndex + 1) % statuses.length];
          return { ...child, status: nextStatus };
        }
        return child;
      })
    );
  };

  const filteredChildren = filterStatus
    ? children.filter((child) => child.status === filterStatus)
    : children;
  
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* 💰 Balance Card with Purple Border */}
          <View style={styles.balanceCard}>
            <Text style={styles.balanceCardLabel}>Balance</Text>
            <Text style={styles.balanceCardAmount}>245.500 KD</Text>
          </View>

          {/* ➕ Add Child Card */}
          <View style={styles.addCard}>
            <View style={styles.cardHeader}>
              <View>
                <Text style={styles.cardTitle}>Add Child</Text>
                <Text style={styles.cardSubtitle}>
                  Create a new child account
                </Text>
              </View>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => handleAddChildPress()}
              >
                <Text style={styles.addButtonText}>+ Add</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* 🔍 Filter Tabs */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.filterRow}
          >
            <TouchableOpacity
              onPress={() => setFilterStatus(null)}
              style={[
                styles.filterButton,
                filterStatus === null && styles.filterActive,
              ]}
            >
              <Text style={styles.filterText}>All</Text>
            </TouchableOpacity>
            {statuses.map((status) => (
              <TouchableOpacity
                key={status}
                onPress={() => setFilterStatus(status)}
                style={[
                  styles.filterButton,
                  filterStatus === status && styles.filterActive,
                ]}
              >
                <Text style={styles.filterText}>{status}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* 👶 Children List */}
          {filteredChildren.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>No children found</Text>
              <Text style={styles.emptySubtitle}>
                Try adding or changing filters
              </Text>
            </View>
          ) : (
            <>
              <View style={styles.childrenHeader}>
                <Text style={styles.childrenTitle}>Child Progress</Text>
                <Text style={styles.childrenCount}>
                  {filteredChildren.length}
                </Text>
              </View>

              {filteredChildren.map((child) => (
                <ChildCard child={child} cycleStatus={cycleStatus} handleCreateTask={handleCreateTask} openChildProfile={handelChildProfilenPress} key={child.id} />
              ))}
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default ParentScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9fafb" },
  scrollContent: { padding: 16, paddingBottom: 100 },

  // 💰 Updated Balance Card with Purple Border
  balanceCard: {
    backgroundColor: "#fff",
    paddingVertical: 20,
    paddingHorizontal: 24,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#7C3AED",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 20,
    alignItems: "center",
  },
  balanceCardLabel: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 2,
  },
  balanceCardAmount: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#7C3AED",
  },

  // 👇 The rest of the styles remain unchanged
  addCard: {
    backgroundColor: "#7C3AED",
    borderRadius: 12,
    marginBottom: 20,
    padding: 16,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTitle: { fontSize: 20, fontWeight: "bold", color: "#fff" },
  cardSubtitle: { color: "#EDE9FE", marginTop: 2 },
  addButton: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addButtonText: {
    color: "#7C3AED",
    fontWeight: "bold",
    fontSize: 16,
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 40,
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  emptyTitle: { fontSize: 16, color: "#6B7280" },
  emptySubtitle: { fontSize: 14, color: "#9CA3AF", marginTop: 4 },
  childrenHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  childrenTitle: { fontSize: 18, fontWeight: "bold", color: "#1F2937" },
  childrenCount: {
    backgroundColor: "#F3E8FF",
    color: "#7C3AED",
    paddingHorizontal: 8,
    borderRadius: 12,
    fontSize: 12,
  },
  childCard: {
    marginBottom: 12,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
  },
  childRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    height: 48,
    width: 48,
    borderRadius: 24,
    backgroundColor: "#EDE9FE",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarFallback: {
    backgroundColor: "#E9D5FF",
    borderRadius: 24,
    height: 48,
    width: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarLetter: { fontSize: 18, fontWeight: "bold", color: "#7C3AED" },
  avatarImage: { height: 48, width: 48, borderRadius: 24 },
  childName: { fontWeight: "bold", fontSize: 16, color: "#1F2937" },
  childTasks: { fontSize: 13, color: "#10B981" },
  uploadLink: { fontSize: 12, color: "#7C3AED", marginTop: 4 },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
  ongoing: { backgroundColor: "#FBBF24" },
  verified: { backgroundColor: "#3B82F6" },
  completed: { backgroundColor: "#10B981" },
  rejected: { backgroundColor: "#EF4444" },
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#E5E7EB",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
  },
  fab: {
    backgroundColor: "#7C3AED",
    height: 56,
    width: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -24,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 24,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 16 },
  modalAddButton: {
    backgroundColor: "#7C3AED",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 12,
  },
  modalAddText: { color: "#fff", fontWeight: "bold" },
  modalCancelButton: { paddingVertical: 8 },
  modalCancelText: { color: "#6B7280" },
  modalImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
  },
  modalImagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  modalImageText: { color: "#9CA3AF", fontSize: 12 },
  modalUploadButton: {
    backgroundColor: "#E0E7FF",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginBottom: 8,
  },
  modalUploadText: { color: "#4338CA", fontWeight: "500" },
  inputBox: {
    width: "100%",
    marginTop: 16,
    marginBottom: 8,
  },
  inputLabel: { marginBottom: 4, fontSize: 14, color: "#374151" },
  inputField: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#F9FAFB",
  },
  filterRow: {
    flexDirection: "row",
    marginBottom: 12,
  },
  filterButton: {
    backgroundColor: "#E5E7EB",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
  },
  filterActive: {
    backgroundColor: "#7C3AED",
  },
  filterText: {
    color: "#1F2937",
    fontSize: 13,
    fontWeight: "500",
  },
});
