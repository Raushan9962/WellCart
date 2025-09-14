import React, { useState, useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  IoHomeOutline, 
  IoAddCircleOutline, 
  IoListOutline, 
  IoReceiptOutline,
  IoLogOutOutline,
  IoPersonCircleOutline,
  IoNotificationsOutline,
  IoSearchOutline,
  IoChevronDownOutline
} from "react-icons/io5";
import { adminDataContext } from "../context/AdminContext.jsx";

const Nav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { admin, logoutAdmin } = useContext(adminDataContext);

  const [showProfile, setShowProfile] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: IoHomeOutline,
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      name: "Add Product",
      path: "/add",
      icon: IoAddCircleOutline,
      gradient: "from-green-500 to-emerald-500"
    },
    {
      name: "Product List",
      path: "/lists",
      icon: IoListOutline,
      gradient: "from-purple-500 to-pink-500"
    },
    {
      name: "Orders",
      path: "/orders",
      icon: IoReceiptOutline,
      gradient: "from-orange-500 to-red-500"
    }
  ];

  const handleLogout = async () => {
    try {
      await logoutAdmin();
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout error:", error);
      navigate("/login", { replace: true });
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-gray-900/95 backdrop-blur-lg border-b border-gray-800/50 shadow-2xl"
          : "bg-gray-900/80 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo Section */}
          <div
            className="flex items-center justify-start gap-4 flex-shrink-0"
            onClick={() => navigate("/dashboard")}
          >
            <div className="relative">
              <img
                src="https://res.cloudinary.com/dqo96kemf/image/upload/v1757340085/Adobe_Express_-_file_qavmku.png"
                alt="WellCart"
                className="h-20 w-20 rounded-xl group-hover:scale-110 transition-transform duration-300 p-1.5"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-400 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-400 bg-clip-text text-transparent">
                WellCart
              </h1>
              <p className="text-xs text-gray-400 -mt-1">Admin Panel</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`relative group px-4 py-2 rounded-xl transition-all duration-300 ${
                    active ? "text-white" : "text-gray-400 hover:text-white"
                  }`}
                >
                  {/* Background */}
                  <div
                    className={`absolute inset-0 rounded-xl transition-all duration-300 ${
                      active
                        ? `bg-gradient-to-r ${item.gradient} opacity-100`
                        : "bg-gray-800/50 opacity-0 group-hover:opacity-100"
                    }`}
                  ></div>

                  {/* Content */}
                  <div className="relative flex items-center gap-2">
                    <Icon
                      className={`w-5 h-5 transition-all duration-300 ${
                        active ? "scale-110" : "group-hover:scale-110"
                      }`}
                    />
                    <span className="font-medium text-sm">{item.name}</span>
                  </div>

                  {/* Active Indicator */}
                  {active && (
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-xl transition-all duration-200">
              <IoSearchOutline className="w-5 h-5" />
            </button>

            {/* Notifications */}
            <button className="relative p-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-xl transition-all duration-200">
              <IoNotificationsOutline className="w-5 h-5" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowProfile(!showProfile)}
                className="flex items-center gap-3 p-2 hover:bg-gray-800/50 rounded-xl transition-all duration-200 group"
              >
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <IoPersonCircleOutline className="w-8 h-8 text-blue-400 group-hover:text-blue-300 transition-colors" />
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></div>
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-medium text-white">
                      {admin?.name || "Admin"}
                    </p>
                    <p className="text-xs text-gray-400">
                      {admin?.email || "admin@wellcart.com"}
                    </p>
                  </div>
                </div>
                <IoChevronDownOutline
                  className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                    showProfile ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {showProfile && (
                <div className="absolute right-0 mt-2 w-64 bg-gray-800/95 rounded-lg shadow-lg border border-gray-700">
                  <ul className="py-2">
                    <li
                      onClick={() => navigate("/profile")}
                      className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
                    >
                      Profile
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
                      Settings
                    </li>
                    <li
                      onClick={handleLogout}
                      className="px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center gap-2 text-red-400"
                    >
                      <IoLogOutOutline /> Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
