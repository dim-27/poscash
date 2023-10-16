import { postAPI } from "@/repositories/api";
import { createContext, useState } from "react";
import { useNavigate } from "react-router";

export const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const getToken = () => {
    const tokenString = sessionStorage.getItem("token");
    const userToken = JSON.parse(tokenString);
    return userToken?.token;
  };

  const getUserId = () => {
    const tokenString = sessionStorage.getItem("token");
    const userToken = JSON.parse(tokenString);
    return userToken?.id;
  };

  const login = () => {
    const tokenString = sessionStorage.getItem("token");
    const userToken = JSON.parse(tokenString);
    const valid = userToken?.token;
    return valid ? true : false;
  };

  const admin = () => {
    const tokenString = sessionStorage.getItem("token");
    const userToken = JSON.parse(tokenString);
    const role = userToken?.role;
    return role === 1 ? true : false;
  };
  // sessionStorage.clear();
  const [token, setToken] = useState(getToken());
  const [userId, setUserId] = useState(getUserId());
  const [isLogin, setIsLogin] = useState(login());
  const [isAdmin] = useState(admin());

  const saveToken = (userToken) => {
    sessionStorage.setItem("token", JSON.stringify(userToken));
    setToken(userToken.token);
    setUserId(userToken.id);
    setIsLogin(true);
    navigate("/");
    window.location.reload();
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  const loginCashier = async (data) => {
    const res = await postAPI("user/login-cashier", data);
    saveToken(res.data);
  };

  const loginAdmin = async (data) => {
    console.log(data);
    const res = await postAPI("user/login-admin", data);
    saveToken(res.data);
  };

  return (
    <AuthContext.Provider
      value={{
        setToken,
        logout,
        loginCashier,
        loginAdmin,
        saveToken,
        token,
        userId,
        isLogin,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
