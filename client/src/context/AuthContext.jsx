import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = async (username, password) => {
    try {
      const { data } = await axios.post(
        "http://localhost:5003/api/user/login",
        {
          username,
          password,
        }
      );

      const loggedInUser = {
        id: data.user._id,
        username: data.user.username,
        role: data.user.role,
      };

      setUser(loggedInUser);
      localStorage.setItem("user", JSON.stringify(loggedInUser));
    } catch (error) {
      console.error(
        "Login failed:",
        error.response?.data?.message || error.message
      );
      throw new Error(
        error.response?.data?.message || "An error occurred during login"
      );
    }
  };

  const register = async (username, password, role) => {
    try {
      const { data } = await axios.post(
        "http://localhost:5003/api/user/register",
        {
          username,
          password,
          role,
        }
      );

      const registeredUser = {
        id: data.user._id,
        username: data.user.username,
        role: data.user.role,
      };

      // Save user to state and localStorage
      setUser(registeredUser);
      localStorage.setItem("user", JSON.stringify(registeredUser));
    } catch (error) {
      console.error(
        "Registration failed:",
        error.response?.data?.message || error.message
      );
      throw new Error(
        error.response?.data?.message || "An error occurred during registration"
      );
    }
  };

  // Logout Function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // Sync state with localStorage on initialization
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
