import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../src/screens/LoginScreen";
import RegisterScreen from "../src/screens/RegisterScreen";
import TaskScreen from "../src/screens/TaskScreen";
import DepositScreen from "../src/screens/DepositScreen";
import ProfileScreen from "../src/screens/ProfileScreen";

const Stack = createNativeStackNavigator();

export const AuthNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Register"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Task" component={TaskScreen} />
      <Stack.Screen name="Deposit" component={DepositScreen} />

    </Stack.Navigator>
  );
};
