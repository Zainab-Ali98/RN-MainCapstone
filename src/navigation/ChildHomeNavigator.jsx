import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TaskListScreen from "../screens/TaskListScreen";
import ViewTaskScreen from "../screens/ViewTaskScreen";
import RewardsScreen from "../screens/RewardsScreen";
import CreateNewGoal from "../screens/CreateNewGoal";

const Stack = createNativeStackNavigator();

export const ChildHomeNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Child"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Child" component={TaskListScreen} />
      <Stack.Screen name="TaskProfile" component={ViewTaskScreen} />
      <Stack.Screen name="Reward" component={RewardsScreen} />
      <Stack.Screen name="CreateNewGoal" component={CreateNewGoal} />

    </Stack.Navigator>
  );
};
