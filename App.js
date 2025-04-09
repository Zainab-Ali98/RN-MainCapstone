import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { AuthNavigator } from "./navigation/AuthNavigator";
import "react-native-gesture-handler";
import ProfileScreen from "./src/screens/ProfileScreen";
import ParentScreen from "./src/screens/ParentScreen";
import CurrentBalanceScreen from "./src/screens/CurrentBalanceScreen";

export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        {/* <AuthNavigator /> */}
        {/* <ProfileScreen/> */}
        {/* <ParentScreen /> */}
        <CurrentBalanceScreen />
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
