import React from "react";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
import SavingsGoalList from "../components/SavingsGoalList";

const ProgressGoalsScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <StatusBar barStyle="dark-content" />
      <SavingsGoalList />
    </SafeAreaView>
    
  );
};

const styles = StyleSheet.create({});

export default ProgressGoalsScreen;
