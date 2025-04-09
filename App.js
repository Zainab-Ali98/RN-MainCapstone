import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { AuthNavigator } from "./navigation/AuthNavigator";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "react-native-gesture-handler";
import DepositScreen from "./src/screens/DepositScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import ParentScreen from "./src/screens/ParentScreen";
import TaskScreen from "./src/screens/TaskScreen";

export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        {/* <AuthNavigator /> */}
        {/* <ProfileScreen/> */}
        {/* <ParentScreen /> */}
        <TaskScreen />
        <StatusBar style="light" />
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
