import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthNavigator } from "./navigation/AuthNavigator";
// import { SafeAreaProvider } from "react-native-safe-area-context";
import "react-native-gesture-handler";
import DepositScreen from "./src/screens/DepositScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import ParentScreen from "./src/screens/ParentScreen";
import TaskScreen from "./src/screens/TaskScreen";
import RewardsScreen from "./src/screens/RewardsScreen";
import ViewTaskScreen from "./src/ViewTaskScreen";

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <View style={styles.container}>
          {/* <TaskScreen /> */}
          {/* <RewardsScreen /> */}
       
          
          <StatusBar style="light" />
        </View>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
