import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { AuthNavigator } from "./src/navigation/AuthNavigator";
import "react-native-gesture-handler";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ParentHomeNavigator } from "./src/navigation/ParentHomeNavigator";
import { ChildHomeNavigator } from "./src/navigation/ChildHomeNavigator";
import { getToken, getRole } from "./src/api/storage";
import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserContext from "./src/context/UserContext";
import { ParkingMeterIcon } from "lucide-react";


const queryClient = new QueryClient();

export default function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [role, setRole] = useState(null);

  const Stack = createNativeStackNavigator();
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
          {isAuth ? (
            role === "Parent" ? (
              <ParentHomeNavigator />
          
            ) : (
              <ChildHomeNavigator />
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
