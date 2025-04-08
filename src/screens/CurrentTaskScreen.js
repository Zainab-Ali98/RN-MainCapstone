import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  SafeAreaView,
  ScrollView,
  Animated,
} from 'react-native';

const CurrentTaskScreen = () => {
  const progress = 0.7; // 70% example for visual

  const handleAccept = () => {
    Alert.alert('✅ Task Accepted', 'You have accepted this task.');
  };

  const handleReject = () => {
    Alert.alert('❌ Task Rejected', 'You have rejected this task.');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.taskHeaderBox}>
          <Text style={styles.taskHeaderText}>📌 Current Task</Text>
        </View>

        {/* Task Card */}
        <View style={styles.taskCard}>
          <Image
            source={{
              uri: 'https://i.pinimg.com/originals/30/39/40/3039407b7ff9e10f4db83b11cb77fae9.jpg',
            }}
            style={styles.taskImage}
          />
          <Text style={styles.taskTitle}>Clean Your Room</Text>

          {/* Progress */}
          <View style={styles.progressContainer}>
            <View style={styles.progressTrack}>
              <Animated.View style={[styles.progressFill, { flex: progress }]} />
              <View style={{ flex: 1 - progress }} />
            </View>
            <Text style={styles.progressText}>{Math.round(progress * 100)}% Complete</Text>
          </View>
        </View>

        {/* 📝 Description */}
        <View style={styles.descriptionBox}>
          <Text style={styles.descriptionTitle}>📝 Task Description</Text>
          <Text style={styles.descriptionText}>
            Your room needs some love! Make sure to:
            {'\n'}• Pick up all toys
            {'\n'}• Make your bed
            {'\n'}• Organize the desk
            {'\n'}• Sweep or vacuum if needed
          </Text>
        </View>

        {/* 🎮 Action Buttons */}
        <View style={styles.actionBox}>
          <TouchableOpacity style={styles.acceptBtn} onPress={handleAccept}>
            <Text style={styles.acceptText}>Accept</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.rejectBtn} onPress={handleReject}>
            <Text style={styles.rejectText}>Reject</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CurrentTaskScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: {
    padding: 20,
    paddingBottom: 120,
  },

  // 📌 Header
  taskHeaderBox: {
    backgroundColor: '#E0E7FF',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  taskHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4338CA',
  },

  // 🪣 Task Card
  taskCard: {
    backgroundColor: '#EEF2FF',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#3B82F6',
    alignItems: 'center',
    marginBottom: 24,
  },
  taskImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
    marginBottom: 6,
  },
  taskTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1D4ED8',
    marginTop: 4,
  },
  progressContainer: {
    marginTop: 16,
    width: '100%',
    alignItems: 'center',
  },
  progressTrack: {
    flexDirection: 'row',
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    width: '100%',
    overflow: 'hidden',
    marginBottom: 6,
  },
  progressFill: {
    backgroundColor: '#3B82F6',
  },
  progressText: {
    fontSize: 12,
    color: '#1D4ED8',
    fontWeight: 'bold',
  },

  // 📝 Description
  descriptionBox: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 16,
    marginBottom: 32,
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1F2937',
  },
  descriptionText: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 22,
  },

  // 🎮 Action Buttons
  actionBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#2563EB',
    borderRadius: 16,
    padding: 12,
  },
  acceptBtn: {
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 12,
  },
  acceptText: {
    color: '#2563EB',
    fontWeight: '600',
  },
  rejectBtn: {
    borderWidth: 1,
    borderColor: '#fff',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 12,
  },
  rejectText: {
    color: '#fff',
    fontWeight: '600',
  },
});
