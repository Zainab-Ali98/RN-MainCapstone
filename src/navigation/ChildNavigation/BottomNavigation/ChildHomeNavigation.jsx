import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TaskListScreen from "../../../screens/TaskListScreen";
import CurrentBalanceScreen from "../../../screens/CurrentBalanceScreen";
import ViewTaskScreen from "../../../screens/ViewTaskScreen";
import CreateNewGoal from "../../../screens/CreateNewGoal";
import RewardsScreen from "../../../screens/RewardsScreen";
import ProgressGoalScreen from "../../../screens/ProgressGoalScreen";
import ChildDepositScreen from "../../../screens/ChildDepositScreen";

const Stack = createNativeStackNavigator();

const ChildHomeNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TaskListScreen"
        component={TaskListScreen}
        headerBackButtonMenuEnabled="false"
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="CurrentBalanceScreen"
        component={CurrentBalanceScreen}
        headerBackButtonMenuEnabled="false"
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="ViewTaskScreen"
        component={ViewTaskScreen}
        headerBackButtonMenuEnabled="false"
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="CreateNewGoal"
        component={CreateNewGoal}
        headerBackButtonMenuEnabled="false"
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="RewardsScreen"
        component={RewardsScreen}
        headerBackButtonMenuEnabled="false"
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="ProgressGoalScreen"
        component={ProgressGoalScreen}
        headerBackButtonMenuEnabled="false"
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="ChildDepositScreen"
        component={ChildDepositScreen}
        headerBackButtonMenuEnabled="false"
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default ChildHomeNavigation;

const styles = StyleSheet.create({});
