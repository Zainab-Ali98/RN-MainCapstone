import 'react-native-gesture-handler'; // must be first!
import React from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ChildrenScreen from "./src/screens/ParentScreen"; // make sure this path is correct
import CurrentTaskScreen from './src/screens/CurrentTaskScreen';

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {/* <ChildrenScreen /> */}
        <CurrentTaskScreen />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
