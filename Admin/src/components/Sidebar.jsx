import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  IoHomeOutline,
  IoAddCircleOutline,
  IoListOutline,
  IoReceiptOutline,
} from "react-icons/io5";

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: IoHomeOutline,
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      name: "Add Product",
      path: "/add",
      icon: IoAddCircleOutline,
      gradient: "from-green-500 to-emerald-500",
    },
    {
      name: "Product List",
      path: "/lists",
      icon: IoListOutline,
      gradient: "from-purple-500 to-pink-500",
    },
    {
      name: "Orders",
      path: "/orders",
      icon: IoReceiptOutline,
      gradient: "from-orange-500 to-red-500",
    },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="hidden md:flex flex-col w-64 bg-gray-900/95 backdrop-blur-lg border-r border-gray-800/50 h-screen fixed left-0 top-0 z-40">
      {/* Logo */}
      <div
        className="flex items-center gap-3 p-6 cursor-pointer"
        onClick={() => navigate("/dashboard")}
      >
        
        <div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            WellCart
          </h1>
          <p className="text-xs text-gray-400 -mt-1">Admin Panel</p>
        </div>
      </div>

      {/* Nav Items */}
      <div className="flex-1 px-4 py-6">
        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`relative group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  active ? "text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                <div
                  className={`absolute inset-0 rounded-xl transition-all duration-300 ${
                    active
                      ? `bg-gradient-to-r ${item.gradient} opacity-100`
                      : "bg-gray-800/50 opacity-0 group-hover:opacity-100"
                  }`}
                ></div>
                <Icon className="relative z-10 w-6 h-6" />
                <span className="relative z-10 font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Logout Button (optional) - or we can keep it in the top navbar */}
    </div>
  );
};

export default Sidebar;