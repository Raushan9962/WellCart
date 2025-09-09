import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import AuthContext from "../public/context/Authcontext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
  <AuthContext>
   <App />
   
  </AuthContext>
   
  </BrowserRouter>
);
