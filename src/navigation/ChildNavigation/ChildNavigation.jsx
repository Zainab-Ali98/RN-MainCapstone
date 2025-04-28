import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ChildHomeNavigation from "./BottomNavigation/ChildHomeNavigation";
import RewardsNavigation from "./BottomNavigation/RewardsNavigation";
import ChildProfileNavigation from "./BottomNavigation/ChildProfileNavigation";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import CurrentBalanceScreen from "../../screens/CurrentBalanceScreen";
import ProgressGoalsNavigation from "./BottomNavigation/ProgressGoalsNavigation";

import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
const Tab = createBottomTabNavigator();

const ChildNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          borderTopWidth: 0,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={ChildHomeNavigation}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" size={24} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Rewards"
        component={RewardsNavigation}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <AntDesign name="star" size={24} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Goals"
        component={ProgressGoalsNavigation}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="money-bill-alt" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ChildProfileNavigation}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default ChildNavigation;

const styles = StyleSheet.create({});
