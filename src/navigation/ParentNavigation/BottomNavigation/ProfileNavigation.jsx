import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PCDetailsScreen from '../../../screens/PCDetailsScreen';

const Stack = createNativeStackNavigator();
const ProfileNavigation = () => {
  return (
    <Stack.Navigator>
    <Stack.Screen
      name="PCDetailsScreen"
      component={PCDetailsScreen}
      headerBackButtonMenuEnabled="false"
      options={{ headerShown: false }}
    />
    
  </Stack.Navigator>
  )
}

export default ProfileNavigation

const styles = StyleSheet.create({})