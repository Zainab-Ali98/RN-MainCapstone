import instance from ".";
import { setRole, setToken } from "./storage";

const register = async (userInfo, image) => {
  const formData = new FormData();
  for (key in userInfo) {
    formData.append(key, userInfo[key]);
  }
  formData.append("image", {
    name: "image.jpeg",
    type: "image/jpeg",
    uri: image,
  });
  try {
    const res = await instance.post("/auth/register", formData);
    console.log(res.data);
    setToken(res.data.token);
    setRole(res.data.role);
    return res.data;
  } catch (error) {
    console.error(
      "Registration error:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
const login = async (userInfo) => {
  try {
    const res = await instance.post("/auth/login", userInfo);
    console.log("LOGIN TOKEN", res.data.token);
    setToken(res.data.token);
    return res.data;
  } catch (error) {
    console.error(
      "Login error:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export { register, login };
