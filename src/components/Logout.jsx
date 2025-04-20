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
      {/* Delete the token, setIsAuth to false */}
      <MaterialIcons name="logout" size={30} color="red" />
    </TouchableOpacity>
  );
};

export default Logout;

const styles = StyleSheet.create({
  logoutButton: {
    position: "absolute",
    top: 30,
    right: 1,
    zIndex: 10,
    // backgroundColor: "#fff",
    padding: 8,
    borderRadius: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
});
