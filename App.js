import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
// import RegisterScreen from "./screens/LoginScreen";
// import LoginScreen from "./screens/LoginScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import RegisterScreen from "./src/screens/RegisterScreen";

export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        {/* <RegisterScreen/> */}
        <ProfileScreen />
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
