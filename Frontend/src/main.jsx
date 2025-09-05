import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AuthContextProvider from "./context/AuthContext.jsx";  // ✅ provider
import UserContextProvider from "./context/UserContext.jsx";  // ✅ provider

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthContextProvider>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </AuthContextProvider>
  </BrowserRouter>
);
