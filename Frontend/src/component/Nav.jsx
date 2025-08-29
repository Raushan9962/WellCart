import React from 'react'
import  logo from '../assets/wellCart.png'

const Nav = () => {
  return (
    <div className="flex justify-between items-center px-5 py-3 bg-[#22222a] not-last: text-white">
      <div className="flex items-center gap-2">
        <img src={logo} alt="logo" className="w-[30px]" />
        <h1 className="text-[25px] text-white font-sans">WellCart</h1>
      </div>

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
    </div>
  );
}



export default Nav