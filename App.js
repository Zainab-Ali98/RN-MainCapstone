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