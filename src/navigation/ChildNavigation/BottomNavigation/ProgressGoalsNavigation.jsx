import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProgressGoalsScreen from "../../../screens/ProgressGoalsScreen";
import ChildDepositScreen from "../../../screens/ChildDepositScreen";


const Stack = createNativeStackNavigator();

const ProgressGoalsNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProgressGoalsScreen"
        component={ProgressGoalsScreen}
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

export default ProgressGoalsNavigation;

const styles = StyleSheet.create({});
