import React, { createContext } from "react";

export const authDataContext = createContext();  // <-- proper export

function AuthContext({ children }) {
  let serverUrl = "http://localhost:3000";
  let value = { serverUrl };

  return (
    <authDataContext.Provider value={value}>
      {children}
    </authDataContext.Provider>
  );
}
export default AuthContext;

