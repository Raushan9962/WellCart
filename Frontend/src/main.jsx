import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AuthContext from "./context/AuthContext.jsx";
import UserContextProvider from "./context/UserContext.jsx"; // ✅ import correctly

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthContext>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </AuthContext>
  </BrowserRouter>
);
