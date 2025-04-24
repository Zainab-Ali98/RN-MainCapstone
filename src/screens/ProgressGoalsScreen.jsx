import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import ConfettiCannon from "react-native-confetti-cannon";
import SavingsGoalList from "../components/SavingsGoalList";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

const ProgressGoalsScreen = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [showCelebration, setShowCelebration] = useState(false);
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(1);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleTabPress = (tab) => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
    setActiveTab(tab);
  };

  const handleGoalComplete = () => {
    setShowCelebration(true);
    setTimeout(() => {
      setShowCelebration(false);
    }, 3000);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <StatusBar style="light" />
        <LinearGradient
          colors={["#FFFFFF", "#FFFFFF", "#FFFFFF"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          {/* Content */}
          <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
            <SavingsGoalList
              filter={activeTab}
              onGoalComplete={handleGoalComplete}
            />
          </Animated.View>

          {/* Celebration */}
          {showCelebration && (
            <ConfettiCannon
              count={200}
              origin={{ x: width / 2, y: -10 }}
              autoStart={true}
              fadeOut={true}
              colors={["#FFFFFF", "#FFFFFF", "#FFFFFF", "#6C63FF"]}
            />
          )}
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});

export default ProgressGoalsScreen;
