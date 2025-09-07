import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { AuthDataContext } from "./AuthContext.jsx";

export const UserDataContext = createContext();

export function UserContext({ children }) {
  const [userData, setUserData] = useState(null);
  const { serverUrl } = useContext(AuthDataContext);

  const getCurrentUser = async () => {
    if (!serverUrl) return;

    try {
      // ✅ Always send cookies
      const result = await axios.get(`${serverUrl}/api/user/getCurrentUser`, {
        withCredentials: true,
      });

      setUserData(result.data);
      console.log("✅ User data:", result.data);
    } catch (error) {
      console.error("❌ get user error:", error.response?.data || error.message);
      setUserData(null);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, [serverUrl]);

  return (
    <UserDataContext.Provider value={{ userData, setUserData, getCurrentUser }}>
      {children}
    </UserDataContext.Provider>
  );
}

export default UserContext;
