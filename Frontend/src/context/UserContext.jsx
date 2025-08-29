import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { authDataContext } from "./AuthContext"; // 👈 import your AuthContext

export const UserDataContext = createContext();

function UserContext({ children }) {
  const [userData, setUserData] = useState(null);
  const { serverUrl } = useContext(authDataContext); // ✅ now works

  const getCurrentUser = async () => {
    try {
      let result = await axios.get(
        serverUrl + "/api/user/getCurrentUser",
        { withCredentials: true }
      );
      setUserData(result.data);
      console.log(result.data);
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
    getCurrentUser, // optional: expose this so components can refresh user
  };

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
}

export default UserContext;
