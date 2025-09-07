import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AuthContext from "./context/AuthContext.jsx";  // ✅ provider
import UserContext from "./context/UserContext.jsx";  // ✅ provider

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthContext>
      <UserContext>
        <App />
      </UserContext>
    </AuthContext>
  </BrowserRouter>
);
