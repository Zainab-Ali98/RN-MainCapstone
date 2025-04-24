import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import ProfileScreen from "../screens/ProfileScreen";
import DepositScreen from "../screens/DepositScreen";
import ParentScreen from "../screens/ParentScreen";
import CreatenewAcc from "../screens/CreatenewAcc";
import CreateTaskScreen from "../screens/CreateTaskScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
//import TopLogoutButton from "../components/TopLogoutButton";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { deleteToken } from "../api/storage";
import UserContext from "../context/UserContext";
// import TaskDetailsScreen from "../screens/TaskDetailsScreen";
import TaskScreen from "../screens/TaskScreen";

const Tab = createBottomTabNavigator();

export const ParentHomeNavigator = () => {
  const { isAuth, setIsAuth } = useContext(UserContext);

  return (
    <Tab.Navigator
      initialRouteName="Parent"
      screenOptions={{
        headerShown: true,
        headerRight: () => {
          return (
            <TouchableOpacity
              onPress={() => {
                deleteToken();
                setIsAuth(false);
              }}
            >
              {/* Delete the token, setIsAuth to false */}
              <MaterialIcons name="logout" size={30} color="red" />
            </TouchableOpacity>
          );
        },
      }}
    >
      <Tab.Screen
        name="Parent"
        component={ParentScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" size={size} color={color} />
          ),
          tabBarLabel: "Home",
        }}
      />

      <Tab.Screen name="Profile" component={ProfileScreen} />
      
      <Tab.Screen name="CreateChildAcc" component={CreatenewAcc} />
      <Tab.Screen name="Deposit" component={DepositScreen} />
      <Tab.Screen name="CreateTask" component={CreateTaskScreen} />
    </Tab.Navigator>
  );
};
