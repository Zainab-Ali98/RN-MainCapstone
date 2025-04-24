import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ParentScreen from "../../../screens/ParentScreen";
import CreatenewAcc from "../../../screens/CreatenewAcc";
import ProfileScreen from "../../../screens/ProfileScreen";
import DepositScreen from "../../../screens/DepositScreen";
import CreateTaskScreen from "../../../screens/CreateTaskScreen";
import TaskDetailsScreen from "../../../screens/TaskDetailsScreen";
import TaskScreen from "../../../screens/TaskScreen";

const Stack = createNativeStackNavigator();

const HomeNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ParentScreen"
        component={ParentScreen}
        headerBackButtonMenuEnabled="false"
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="CreatenewAcc"
        component={CreatenewAcc}
        headerBackButtonMenuEnabled="false"
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        headerBackButtonMenuEnabled="false"
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="DepositScreen"
        component={DepositScreen}
        headerBackButtonMenuEnabled="false"
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="CreateTaskScreen"
        component={CreateTaskScreen}
        headerBackButtonMenuEnabled="false"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TaskDetailsScreen"
        component={TaskDetailsScreen}
        headerBackButtonMenuEnabled="false"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TaskScreen"
        component={TaskScreen}
        headerBackButtonMenuEnabled="false"
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigation;

const styles = StyleSheet.create({});
