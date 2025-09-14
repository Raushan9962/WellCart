import React, { createContext, useState } from "react";

// Create Auth Context
export const authDataContext = createContext();

const AuthProvider = ({ children }) => {
  // You can set your backend URL here
  const [serverUrl] = useState("http://localhost:3000");

  return (
    <authDataContext.Provider value={{ serverUrl }}>
      {children}
    </authDataContext.Provider>
  );
};

export default AuthProvider;
