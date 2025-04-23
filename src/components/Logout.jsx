import React, { useContext } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { deleteToken } from "../api/storage";
import UserContext from "../context/UserContext";

const Logout = () => {
  const { isAuth, setIsAuth } = useContext(UserContext);
  return (
    <TouchableOpacity
      style={styles.logoutButton}
      onPress={() => {
        deleteToken();
        setIsAuth(false);
      }}
    >
      <MaterialIcons name="logout" size={22} color="#FFFFFF" />
    </TouchableOpacity>
  );
};

export default Logout;

const styles = StyleSheet.create({
  logoutButton: {
    position: "absolute",
    top: 50,
    right: 16,
    zIndex: 10,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#0066FF",
    alignItems: "center",
    justifyContent: "center",
  },
});
