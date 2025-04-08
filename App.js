import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { AuthNavigator } from "./navigation/AuthNavigator";
import "react-native-gesture-handler";
import ProfileScreen from "./src/screens/ProfileScreen";

export default function App() {
  return (

    <NavigationContainer>
      <View style={styles.container}>
        <AuthNavigator />
        {/* <ProfileScreen/> */}
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
