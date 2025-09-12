import React, { createContext } from "react";

export const AuthDataContext = createContext(); // ✅ Named export

function AuthContext({ children }) {
  let serverUrl = "http://localhost:3000"; // or your deployed backend URL
  let value = { serverUrl };

  return (
    <AuthDataContext.Provider value={value}>
      {children}
    </AuthDataContext.Provider>
  );
}

export default AuthContext; 
