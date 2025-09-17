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
  IoChevronDownOutline,
} from "react-icons/io5";
import { adminDataContext } from "../context/AdminContext.jsx";

const Nav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { admin, logoutAdmin } = useContext(adminDataContext);

  const [showProfile, setShowProfile] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll effect
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
    <>
      {/* Top Navbar (Desktop) */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-gray-900/95 backdrop-blur-lg border-b border-gray-800/50 shadow-2xl"
            : "bg-gray-900/80 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div
              className="flex items-center gap-3 group cursor-pointer"
              onClick={() => navigate("/dashboard")}
            >
              <img
                src="https://res.cloudinary.com/dqo96kemf/image/upload/v1757340085/Adobe_Express_-_file_qavmku.png"
                alt="WellCart"
                className="h-10 w-10 rounded-xl group-hover:scale-110 transition-transform duration-300"
              />
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  WellCart
                </h1>
                <p className="text-xs text-gray-400 -mt-1">Admin Panel</p>
              </div>
            </div>

            {/* Nav Items - Desktop only */}
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
                    <div
                      className={`absolute inset-0 rounded-xl transition-all duration-300 ${
                        active
                          ? `bg-gradient-to-r ${item.gradient} opacity-100`
                          : "bg-gray-800/50 opacity-0 group-hover:opacity-100"
                      }`}
                    ></div>

                    <div className="relative flex items-center gap-2">
                      <Icon
                        className={`w-5 h-5 transition-all duration-300 ${
                          active ? "scale-110" : "group-hover:scale-110"
                        }`}
                      />
                      <span className="font-medium text-sm">{item.name}</span>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-3">
              <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-xl transition-all duration-200">
                <IoSearchOutline className="w-5 h-5" />
              </button>

              <button className="relative p-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-xl transition-all duration-200">
                <IoNotificationsOutline className="w-5 h-5" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              </button>

              {/* Profile */}
              <div className="relative">
                <button
                  onClick={() => setShowProfile(!showProfile)}
                  className="flex items-center gap-3 p-2 hover:bg-gray-800/50 rounded-xl transition-all duration-200 group"
                >
                  <IoPersonCircleOutline className="w-8 h-8 text-blue-400" />
                  <IoChevronDownOutline
                    className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                      showProfile ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {showProfile && (
                  <div className="absolute right-0 mt-2 w-64 bg-gray-800/95 rounded-lg shadow-lg border border-gray-700">
                    <ul className="py-2">
                      <li
                        onClick={() => navigate("/profile")}
                        className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
                      >
                        Profile
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

      {/* Bottom Navbar (Mobile only) */}
      <div className="w-full h-[65px] bg-gray-900/95 backdrop-blur-lg flex items-center justify-around px-2 fixed bottom-0 left-0 z-50 md:hidden border-t border-gray-700">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          return (
            <button
              key={item.name}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center text-xs ${
                active ? "text-white" : "text-gray-400"
              }`}
            >
              <Icon className="w-6 h-6" />
              <span>{item.name}</span>
            </button>
          );
        })}

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex flex-col items-center justify-center text-xs text-red-400"
        >
          <IoLogOutOutline className="w-6 h-6" />
          <span>Logout</span>
        </button>
      </div>
    </>
  );
};

export default Nav;
