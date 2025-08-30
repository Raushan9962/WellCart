// context/UserContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { authDataContext } from "./AuthContext"; // import your AuthContext

// Create context
export const UserDataContext = createContext();

// Context provider component
export function UserContextProvider({ children }) {
  const [userData, setUserData] = useState(null);
  const { serverUrl } = useContext(authDataContext); // ✅ pull serverUrl from AuthContext

  const getCurrentUser = async () => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/user/getCurrentUser`,
        { withCredentials: true }
      );
      setUserData(result.data);
      console.log("Current User:", result.data);
    } catch (error) {
      setUserData(null);
      console.error("get user error:", error.message);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  const value = {
    userData,
    setUserData,
    getCurrentUser, // ✅ exposed if needed
  };

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
}

export default UserContextProvider;
