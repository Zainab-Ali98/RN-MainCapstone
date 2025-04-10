import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { AuthNavigator } from "./src/navigation/AuthNavigator";
import "react-native-gesture-handler";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ParentHomeNavigator } from "./src/navigation/ParentHomeNavigator";


export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator  
      screenOptions={{
        headerShown: false,
      }}>
        
        <Stack.Screen name="Auth" component={AuthNavigator} />
        <Stack.Screen name="Parent" component= {ParentHomeNavigator} />
        
        </Stack.Navigator>
        <StatusBar style="light" />
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
