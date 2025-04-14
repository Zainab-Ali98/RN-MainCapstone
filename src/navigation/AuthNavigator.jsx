import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";

const Stack = createNativeStackNavigator();

export const AuthNavigator = ({ setIsAuth, setRole }) => {
  return (
    <Stack.Navigator
      initialRouteName="Register"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Register">
        {(props) => (
          <RegisterScreen {...props} setIsAuth={setIsAuth} setRole={setRole} />
        )}
      </Stack.Screen>

      <Stack.Screen name="Login" >
        {(props) => (
          <LoginScreen {...props} setIsAuth={setIsAuth} setRole={setRole} />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};
