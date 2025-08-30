import React, { useContext, useState } from "react";
import logo from "../assets/wellCart.png";
import { IoMdSearch } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { FaShoppingCart } from "react-icons/fa";
import { UserDataContext } from "../context/UserContext"; 
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { authDataContext } from "../context/AuthContext";
function Nav() {
  const { serverUrl } = useContext(authDataContext);
  const { getCurrentUser,userData } = useContext(UserDataContext);
  const [showSearch, setShowSearch] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  let navigate = useNavigate();

  const handleLogout = async() => {
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

  return (
    <div className="w-[100vw] h-[70px] bg-[#ecfafaec] z-10 fixed top-0 flex items-center justify-between px-[30px] shadow-md shadow-black relative">
      {/* Logo + Title */}
      <div className="w-[30%] flex items-center justify-start gap-[10px]">
        <img src={logo} alt="logo" className="w-[30px]" />
        <h1 className="text-[25px] text-black font-sans font-bold">WellCart</h1>
      </div>

      {/* Navigation Links */}
      <div className="w-[40%]">
        <ul className="flex justify-center gap-[19px] text-white">
          <li className="text-[15px] cursor-pointer bg-[#0c0c20] hover:bg-slate-500 rounded-2xl py-[10px] px-[20px]">
            HOME
          </li>
          <li className="text-[15px] cursor-pointer bg-[#131339] hover:bg-slate-500 rounded-2xl py-[10px] px-[20px]">
            COLLECTIONS
          </li>
          <li className="text-[15px] cursor-pointer bg-[#0f0f30] hover:bg-slate-500 rounded-2xl py-[10px] px-[20px]">
            ABOUT
          </li>
          <li className="text-[15px] cursor-pointer bg-[#0f0f28] hover:bg-slate-500 rounded-2xl py-[10px] px-[20px]">
            CONTACT
          </li>
        </ul>
      </div>

      {/* Right Section: Search + Profile + Cart */}
      <div className="w-[30%] flex items-center justify-end gap-[20px] relative">
        {/* Search icon */}
        <IoMdSearch
          className="w-[38px] h-[38px] text-[#000000] cursor-pointer"
          onClick={() => setShowSearch(!showSearch)}
        />

        {/* Profile */}
        {!userData ? (
          <CgProfile className="w-[29px] h-[29px] text-[#000000] cursor-pointer" onClick={() => setShowProfile(!showProfile)} />
        ) : (
          <div className="w-[30px] h-[30px] bg-[#080808] text-white rounded-full flex items-center justify-center">
            {userData?.name?.slice(0, 1)}
          </div>
        )}

        {/* Cart */}
        <div className="relative">
          <FaShoppingCart className="w-[30px] h-[30px] text-[#000000] cursor-pointer" />
          <p className="absolute -top-2 -right-2 w-[18px] h-[18px] flex items-center justify-center bg-black text-white rounded-full text-[9px]">
            10
          </p>
        </div>
      </div>

      {/* Search Box */}
      {showSearch && (
        <div className="w-[100%] h-[80px] bg-[#d8f6f9dd] absolute top-[100%] left-0 flex items-center justify-center">
          <input
            type="text"
            className="w-[50%] h-[60px] bg-[#233533] rounded-[30px] px-[50px] text-white placeholder-gray-300"
            placeholder="Search here"
          />
        </div>
      )}
{showProfile &&  <div className="absolute w-[220px] h-[150px] bg-[#000000d7] top-[110%] right-[4%] border-[1px] border-[#aaa9a9] rounded-[10px] z-10">

<ul className="w-[100%] h-[100%] flex-col flex item-start  justify-around text-white text-[17px] py-[10px]">
  { !userData && <li className="w-[100%] hover:bg-[#2f2f2f] px-[15px] px-[10px] cursor-pointer" onClick={() =>{navigate("/login"); setShowProfile(false)}}>Login</li>}
{ userData && <li className="w-[100%] hover:bg-[#2f2f2f] px-[15px] px-[10px] cursor-pointer" onClick={() =>{handleLogout(); setShowProfile(false)}}>logout</li>}  <li className="w-[100%] hover:bg-[#2f2f2f] px-[15px] px-[10px] cursor-pointer">logout</li>
  <li className="w-[100%] hover:bg-[#2f2f2f] px-[15px] px-[10px] cursor-pointer">Orders</li>
  <li className="w-[100%] hover:bg-[#2f2f2f] px-[15px] px-[10px] cursor-pointer">About</li>
</ul>
      </div>}
    </div>
  );
}

export default Nav;
