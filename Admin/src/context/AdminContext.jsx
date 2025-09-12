import React, { createContext, useContext, useState, useEffect } from "react";
import { authDataContext } from "./AuthContext.jsx";
import axios from "axios";

export const adminDataContext = createContext();

const AdminContext = ({ children }) => {
  const [adminData, setAdminData] = useState(null);
  const { serverUrl } = useContext(authDataContext); // must be provided by AuthContext.Provider

  const getAdmin = async () => {
    try {
      let result = await axios.get(`${serverUrl}/api/user/getAdmin`, {
        withCredentials: true,
      });
      setAdminData(result.data);
      console.log("Admin data:", result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAdmin();
  }, []);

  const value = {
    adminData,
    setAdminData,
    getAdmin,
  };

  return (
    <adminDataContext.Provider value={value}>
      {children}
    </adminDataContext.Provider>
  );
};

export default AdminContext;
