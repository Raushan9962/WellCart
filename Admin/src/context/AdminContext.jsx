import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import { authDataContext } from "./AuthContext.jsx";

export const adminDataContext = createContext();

const AdminProvider = ({ children }) => {
  const { serverUrl } = useContext(authDataContext);
    console.log(serverUrl)
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 🔹 Save admin data to localStorage
  const saveToLocalStorage = (adminData) => {
    try {
      localStorage.setItem("wellcart_admin", JSON.stringify(adminData));
      localStorage.setItem("wellcart_auth", "true");
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  };

  // 🔹 Get admin data from localStorage
  const getFromLocalStorage = () => {
    try {
      const adminData = localStorage.getItem("wellcart_admin");
      const isAuth = localStorage.getItem("wellcart_auth");
      
      if (adminData && isAuth === "true") {
        return JSON.parse(adminData);
      }
      return null;
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return null;
    }
  };

  // 🔹 Clear localStorage
  const clearLocalStorage = () => {
    try {
      localStorage.removeItem("wellcart_admin");
      localStorage.removeItem("wellcart_auth");
    } catch (error) {
      console.error("Error clearing localStorage:", error);
    }
  };

  // 🔹 Login function
  const loginAdmin = async (email, password) => {
    console.log(email, password);
    try {
      const response = await axios.post(
        `${serverUrl}/api/auth/AdminLogin`,
        { email, password }
      );
      
      const adminData = response.data;
      console.log("Login success:", adminData);
      // Save to state
      setAdmin(adminData);
      setIsAuthenticated(true);
      
      // Save to localStorage
      saveToLocalStorage(adminData);
      
      return { success: true, data: adminData };
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      return { 
        success: false, 
        error: error.response?.data?.message || "Login failed" 
      };
    }
  };

  // 🔹 Logout function
  const logoutAdmin = async () => {
    try {
      // Call logout API if you have one
      await axios.post(`${serverUrl}/api/auth/logout`, {}, { withCredentials: true });
    } catch (error) {
      console.error("Logout API error:", error);
    } finally {
      // Clear everything regardless of API response
      setAdmin(null);
      setIsAuthenticated(false);
      clearLocalStorage();
    }
  };

  // 🔹 Fetch current admin details
  const getAdmin = async () => {
    try {
      const response = await axios.get(`${serverUrl}/api/auth/getadmin`, {
        withCredentials: true,
      });
      
      const adminData = response.data;
      setAdmin(adminData);
      setIsAuthenticated(true);
      saveToLocalStorage(adminData);
      
      return adminData;
    } catch (error) {
      console.error("Error fetching admin:", error.response?.data || error.message);
      
      // If API fails, clear auth state
      setAdmin(null);
      setIsAuthenticated(false);
      clearLocalStorage();
      
      throw error;
    }
  };

  // 🔹 Check authentication status on app load
  useEffect(() => {
    const checkAuthStatus = async () => {
      setLoading(true);
      
      try {
        // First check localStorage
        const localAdminData = getFromLocalStorage();
        
        if (localAdminData) {
          // Verify with server
          try {
            await getAdmin();
          } catch (error) {
            // If server verification fails, clear local data
            console.log("Server verification failed, clearing local data");
            clearLocalStorage();
            setAdmin(null);
            setIsAuthenticated(false);
          }
        } else {
          // No local data, user is not authenticated
          setAdmin(null);
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Auth check error:", error);
        setAdmin(null);
        setIsAuthenticated(false);
        clearLocalStorage();
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, [serverUrl]);

  const contextValue = {
    admin,
    loading,
    isAuthenticated,
    loginAdmin,
    logoutAdmin,
    getAdmin,
    setAdmin,
    setIsAuthenticated
  };

  return (
    <adminDataContext.Provider value={contextValue}>
      {children}
    </adminDataContext.Provider>
  );
};

export default AdminProvider;