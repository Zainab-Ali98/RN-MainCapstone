import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TaskListScreen from "../../../screens/TaskListScreen";
import CurrentBalanceScreen from "../../../screens/CurrentBalanceScreen";

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

    </Stack.Navigator>

    
  );
};

export default ChildHomeNavigation;

const styles = StyleSheet.create({});
