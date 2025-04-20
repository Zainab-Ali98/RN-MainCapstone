import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RewardsScreen from "../../../screens/RewardsScreen";

const Stack = createNativeStackNavigator();

const RewardsNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="RewardsScreen"
        component={RewardsScreen}
        headerBackButtonMenuEnabled="false"
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default RewardsNavigation;

const styles = StyleSheet.create({});
