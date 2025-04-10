import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../screens/ProfileScreen";
import DepositScreen from "../screens/DepositScreen";
import ParentScreen from "../screens/ParentScreen";
import CreatenewAcc from "../screens/CreatenewAcc";
import CreateTaskScreen from "../screens/CreateTaskScreen";

const Stack = createNativeStackNavigator();

export const ParentHomeNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Parent"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Parent" component={ParentScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="CreateChildAcc" component={CreatenewAcc} />
      <Stack.Screen name="Deposit" component={DepositScreen} />
      <Stack.Screen name="CreateTask" component={CreateTaskScreen} />
    </Stack.Navigator>
  );
};
