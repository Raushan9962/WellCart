import React, { useContext, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { FaShoppingCart } from "react-icons/fa";
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthDataContext } from "../context/AuthContext";
import { IoMdHome } from "react-icons/io";
import { BiCollection } from "react-icons/bi";
import { IoMdContact } from "react-icons/io";

function Nav() {
  const { serverUrl } = useContext(AuthDataContext);
  const { getCurrentUser, userData } = useContext(UserDataContext);
  const [showSearch, setShowSearch] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  let navigate = useNavigate();
 
  const handleLogout = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/auth/logout`, { withCredentials: true });
      navigate("/login");
      console.log("Logout success:", result.data);
      getCurrentUser();
    } catch (error) {
      console.error("Logout failed:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Logout failed");
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <>
      {/* Desktop Navigation - Top */}
      <div className="w-full h-[70px] bg-[#ecfafaec] z-10 fixed top-0 flex items-center justify-between px-[30px] shadow-md shadow-black relative">
        {/* Logo + Title */}
        <div className="w-[30%] flex items-center justify-start gap-[10px]">
          <img src="https://res.cloudinary.com/dqo96kemf/image/upload/v1757340085/Adobe_Express_-_file_qavmku.png" alt="logo" className="h-[70px] w-[70px] mt-[10px]" />
          <h1 className="text-[25px] text-black font-sans font-bold">WellCart</h1>
        </div>

        {/* Navigation Links - Hidden on mobile */}
        <div className="w-[40%] hidden md:flex">
          <ul className="flex justify-center gap-[19px] text-white">
            <li 
              className="text-[15px] cursor-pointer bg-[#0c0c20] hover:bg-slate-500 rounded-2xl py-[10px] px-[20px] transition-colors"
              onClick={() => handleNavigation("/")}
            >
              HOME
            </li>
            <li 
              className="text-[15px] cursor-pointer bg-[#131339] hover:bg-slate-500 rounded-2xl py-[10px] px-[20px] transition-colors"
              onClick={() => handleNavigation("/collections")}
            >
              COLLECTIONS
            </li>
            <li 
              className="text-[15px] cursor-pointer bg-[#0f0f30] hover:bg-slate-500 rounded-2xl py-[10px] px-[20px] transition-colors"
              onClick={() => handleNavigation("/about")}
            >
              ABOUT
            </li>
            <li 
              className="text-[15px] cursor-pointer bg-[#0f0f28] hover:bg-slate-500 rounded-2xl py-[10px] px-[20px] transition-colors"
              onClick={() => handleNavigation("/contact")}
            >
              CONTACT
            </li>
          </ul>
        </div>

        {/* Right Section: Search + Profile + Cart (Desktop only) */}
        <div className="w-[30%] flex items-center justify-end gap-[20px] relative">
          {/* Search icon */}
          <IoMdSearch
            className="w-[38px] h-[38px] text-[#000000] cursor-pointer hover:text-gray-600 transition-colors"
            onClick={() => setShowSearch(!showSearch)}
          />

          {/* Profile */}
          {!userData ? (
            <CgProfile 
              className="w-[29px] h-[29px] text-[#000000] cursor-pointer hover:text-gray-600 transition-colors" 
              onClick={() => setShowProfile(!showProfile)} 
            />
          ) : (
            <div 
              className="w-[30px] h-[30px] bg-[#080808] text-white rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-700 transition-colors"
              onClick={() => setShowProfile(!showProfile)}
            >
              {userData?.name?.slice(0, 1)}
            </div>
          )}

          {/* Cart - Hidden on mobile */}
          <div className="relative hidden md:block">
            <FaShoppingCart 
              className="w-[30px] h-[30px] text-[#000000] cursor-pointer hover:text-gray-600 transition-colors"
              onClick={() => handleNavigation("/cart")}
            />
            <p className="absolute -top-2 -right-2 w-[18px] h-[18px] flex items-center justify-center bg-black text-white rounded-full text-[9px]">
              10
            </p>
          </div>
        </div>

        {/* Search Box */}
        {showSearch && (
          <div className="w-full h-[80px] bg-[#d8f6f9dd] absolute top-full left-0 flex items-center justify-center z-20">
            <input
              type="text"
              className="w-[90%] md:w-[50%] h-[50px] bg-[#233533] rounded-[25px] px-[20px] md:px-[40px] text-white placeholder-gray-300 outline-none text-[16px]"
              placeholder="Search here"
              autoFocus
            />
          </div>
        )}

        {/* Profile Dropdown */}
        {showProfile && (
          <div className="absolute w-[220px] h-auto bg-[#000000d7] top-full right-[4%] border border-[#aaa9a9] rounded-[10px] z-20 mt-2">
            <ul className="w-full flex flex-col text-white text-[17px] py-[10px]">
              {!userData && (
                <li 
                  className="w-full hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer transition-colors"
                  onClick={() => { 
                    navigate("/login"); 
                    setShowProfile(false);
                  }}
                >
                  Login
                </li>
              )}
              {userData && (
                <li 
                  className="w-full hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer transition-colors"
                  onClick={() => { 
                    handleLogout(); 
                    setShowProfile(false);
                  }}
                >
                  Logout
                </li>
              )}
              <li 
                className="w-full hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer transition-colors"
                onClick={() => {
                  handleNavigation("/orders");
                  setShowProfile(false);
                }}
              >
                Orders
              </li>
              <li 
                className="w-full hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer transition-colors"
                onClick={() => {
                  handleNavigation("/about");
                  setShowProfile(false);
                }}
              >
                About
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Mobile Navigation - Bottom */}
      <div className="w-full h-[70px] bg-[#191818] flex items-center justify-around px-[10px] fixed bottom-0 left-0 z-10 md:hidden">
        <button 
          className="text-white flex items-center justify-center flex-col gap-[4px] min-w-[60px]"
          onClick={() => handleNavigation("/")}
        >
          <IoMdHome className="w-[24px] h-[24px]" />
          <span className="text-[11px] font-medium">Home</span>
        </button>
        
        <button 
          className="text-white flex items-center justify-center flex-col gap-[4px] min-w-[80px]"
          onClick={() => handleNavigation("/collections")}
        >
          <BiCollection className="w-[24px] h-[24px]" />
          <span className="text-[11px] font-medium">Collections</span>
        </button>
        
        <button 
          className="text-white flex items-center justify-center flex-col gap-[4px] min-w-[60px]"
          onClick={() => handleNavigation("/contact")}
        >
          <IoMdContact className="w-[24px] h-[24px]" />
          <span className="text-[11px] font-medium">Contact</span>
        </button>
        
        <button 
          className="text-white flex items-center justify-center flex-col gap-[4px] min-w-[50px] relative"
          onClick={() => handleNavigation("/cart")}
        >
          <FaShoppingCart className="w-[24px] h-[24px]" />
          <span className="text-[11px] font-medium">Cart</span>
          <div className="absolute -top-1 right-2 w-[16px] h-[16px] flex items-center justify-center bg-red-600 text-white rounded-full text-[8px] font-bold">
            3
          </div>
        </button>
      </div>

      {/* Overlay for dropdowns */}
      {(showSearch || showProfile) && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-25 z-10"
          onClick={() => {
            setShowSearch(false);
            setShowProfile(false);
          }}
        />
      )}
    </>
  );
}

export default Nav;