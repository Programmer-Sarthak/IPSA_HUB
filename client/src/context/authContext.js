import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user !== null) {  
      setCurrentUser(user);
    }
    setLoading(false);
  }, []);

  // User login function
  const login = async (inputs) => {
    try {
      const url = "http://localhost:8800/api/auth/login"; // User login endpoint
      const res = await axios.post(url, inputs, { withCredentials: true });

      console.log("User Login Response:", res.data); // Log the user response

      if (res.data) {
        setCurrentUser(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
      }
    } catch (error) {
      console.error("User Login error:", error.response?.data || error.message);
      throw error; // Rethrow the error to handle it in the Login component
    }
  };

  // Admin login function
  const adminLogin = async (inputs) => {
    try {
      const url = "http://localhost:8800/api/admin/login"; // Admin login endpoint
      const res = await axios.post(url, inputs, { withCredentials: true });

      console.log("Admin Login Response:", res.data); // Log the admin response

      if (res.data) {
        setCurrentUser(res.data);
        localStorage.setItem("admin", JSON.stringify(res.data)); // Store admin info
      }
    } catch (error) {
      console.error("Admin Login error:", error.response?.data || error.message);
      throw error; // Rethrow the error to handle it in the AdminLogin component
    }
  };

  // Logout function for both user and admin
  const logout = async () => {
    try {
      await axios.post("http://localhost:8800/api/auth/logout", {}, { withCredentials: true });
      setCurrentUser(null);
      localStorage.removeItem("user");
      localStorage.removeItem("admin");
      
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, adminLogin, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
