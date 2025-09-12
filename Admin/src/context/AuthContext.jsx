import { createContext, useState } from "react";

export const authDataContext = createContext();

const AuthContext = ({ children }) => {
  let serverUrl = "http://localhost:3000"; 
 let value={serverUrl}
  const [authData, setAuthData] = useState(value);
  return (
    <authDataContext.Provider value={{ authData, setAuthData }}>
      {children}
    </authDataContext.Provider>
  );
};

export default AuthContext;
