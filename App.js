import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { AuthNavigator } from "./src/navigation/AuthNavigator";
import "react-native-gesture-handler";
import { getToken, getRole } from "./src/api/storage";
import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserContext from "./src/context/UserContext";
import ParentNavigation from "./src/navigation/ParentNavigation/ParentNavigation";
import ChildNavigation from "./src/navigation/ChildNavigation/ChildNavigation";
import ViewTaskScreen from "./src/screens/ViewTaskScreen";
import CreateNewGoal from "./src/screens/CreateNewGoal";
import ChildListScreen from "./src/screens/ChildListScreen";
import RewardsScreen from "./src/screens/RewardsScreen";
import TaskListScreen from "./src/screens/TaskListScreen";
import ProgressGoalsScreen from "./src/screens/ProgressGoalsScreen";
import TaskDetailsScreen from "./src/screens/TaskDetailsScreen";
import ChildDepositScreen from "./src/screens/ChildDepositScreen";
import ParentScreen from "./src/screens/ParentScreen";
import { LogBox } from "react-native";
LogBox.ignoreAllLogs(); // Ignore all log notifications

const queryClient = new QueryClient();

export default function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await getToken();
        const storedRole = await getRole();
        if (token && storedRole) {
          setIsAuth(true);
          setRole(storedRole);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
      } finally {
      }
    };

    checkAuth();
  }, []);

  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <UserContext.Provider value={{ isAuth, setIsAuth, role, setRole }}>
          {/* <ViewTaskScreen />  */}
          {/* <CreateNewGoal/>
          {/* <ParentScreen /> */}
          {/* <ProfileScreen /> */}
          {/* <ProgressGoalsScreen /> */}
          {/* <TaskDetailsScreen/> */}

          {isAuth ? (
            role === "Parent" ? (
              <ParentNavigation />
            ) : (
              <ChildNavigation />
            )
          ) : (
            <AuthNavigator setIsAuth={setIsAuth} setRole={setRole} />
          )}

          <StatusBar style="light" />
        </UserContext.Provider>
      </QueryClientProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
