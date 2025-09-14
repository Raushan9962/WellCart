import React, { useContext } from "react";
import { IoLogOutOutline } from "react-icons/io5";
import { adminDataContext } from "../context/AdminContext.jsx";
import { useNavigate } from "react-router-dom";

const LogoutButton = ({ className = "" }) => {
  const { logoutAdmin } = useContext(adminDataContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutAdmin();
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout error:", error);
      // Even if logout API fails, redirect to login
      navigate("/login", { replace: true });
    }
  };

  return (
    <button
      onClick={handleLogout}
      className={`flex items-center gap-2 px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all ${className}`}
    >
      <IoLogOutOutline className="w-5 h-5" />
      <span>Logout</span>
    </button>
  );
};

export default LogoutButton;

// Usage in your components:
// import LogoutButton from "./LogoutButton";
// <LogoutButton className="your-custom-classes" />