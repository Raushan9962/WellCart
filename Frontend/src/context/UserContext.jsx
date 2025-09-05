// context/UserContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { authDataContext } from "./AuthContext"; // ✅ AuthContext must export authDataContext + Provider

// Create context
export const UserDataContext = createContext();

// Context provider component
export function UserContextProvider({ children }) {
  const [userData, setUserData] = useState(null);
  const { serverUrl } = useContext(authDataContext); // comes from AuthContext

  // Fetch current user
  const getCurrentUser = async () => {
    if (!serverUrl) return; // avoid calling with undefined
    try {
      const { data } = await axios.get(
        `${serverUrl}/api/user/getCurrentUser`,
        { withCredentials: true }
      );
      setUserData(data);
      console.log("✅ Current User:", data);
    } catch (error) {
      console.error("❌ get user error:", error.response?.data || error.message);
      setUserData(null);
    }
  };

  // Run once on mount or when serverUrl changes
  useEffect(() => {
    getCurrentUser();
  }, [serverUrl]);

  const value = {  
    userData,
    setUserData,
    getCurrentUser, // exposed for manual refresh after login/logout
  };

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
}

export default UserContextProvider;
