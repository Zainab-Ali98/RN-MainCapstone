import React from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ChildrenScreen from "./src/screens/ParentScreen";


export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
       <ChildrenScreen/>

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
