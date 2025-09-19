// src/pages/Add.jsx
import React, { useState } from "react";
import Nav from "../components/Nav.jsx";
import Sidebar from "../components/Sidebar.jsx"; // ✅ fixed path


function Add() {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  return (
    <div className="w-[100vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-white overflow-x-hidden relative">
      <Nav />
      <Sidebar />

      <div className="w-[82%] h-[100%] flex items-center justify-start overflow-x-hidden absolute right-0">
        <form
          action=""
          className="w-[100%] md:w-[90%] h-[100%] mt-[70px] flex flex-col gap-[30px] py-[60px] px-[30px] md:px-[60px]"
        >
          <div className="w-[400px] h-[50px] text-[25px] md:text-[40px] text-white">
            Add Product Page
          </div>

          {/* Upload Image Section */}
          <div className="w-[80%] h-[130px] flex items-start justify-center flex-col mt-[20px] gap-[10px]">
            <p className="text-[20px] md:text-[25px] font-semibold">
              Upload Images
            </p>
            <div className="w-[100%] h-[100%] flex items-center justify-start gap-4">
              {/* Image 1 */}
              <label
                htmlFor="image1"
                className="w-[65px] h-[65px] md:w-[100px] md:h-[100px] cursor-pointer hover:scale-105 transition-all"
              >
                <img
                  src={image1 ? URL.createObjectURL(image1) : upload}
                  alt="Upload"
                  className="w-[100%] h-[100%] object-cover rounded-md border border-gray-500"
                />
              </label>
              <input
                type="file"
                id="image1"
                hidden
                onChange={(e) => setImage1(e.target.files[0])}
              />

              {/* Image 2 */}
              <label
                htmlFor="image2"
                className="w-[65px] h-[65px] md:w-[100px] md:h-[100px] cursor-pointer hover:scale-105 transition-all"
              >
                <img
                  src={image2 ? URL.createObjectURL(image2) : upload}
                  alt="Upload"
                  className="w-[100%] h-[100%] object-cover rounded-md border border-gray-500"
                />
              </label>
              <input
                type="file"
                id="image2"
                hidden
                onChange={(e) => setImage2(e.target.files[0])}
              />

              {/* Image 3 */}
              <label
                htmlFor="image3"
                className="w-[65px] h-[65px] md:w-[100px] md:h-[100px] cursor-pointer hover:scale-105 transition-all"
              >
                <img
                  src={image3 ? URL.createObjectURL(image3) : upload}
                  alt="Upload"
                  className="w-[100%] h-[100%] object-cover rounded-md border border-gray-500"
                />
              </label>
              <input
                type="file"
                id="image3"
                hidden
                onChange={(e) => setImage3(e.target.files[0])}
              />

              {/* Image 4 */}
              <label
                htmlFor="image4"
                className="w-[65px] h-[65px] md:w-[100px] md:h-[100px] cursor-pointer hover:scale-105 transition-all"
              >
                <img
                  src={image4 ? URL.createObjectURL(image4) : upload}
                  alt="Upload"
                  className="w-[100%] h-[100%] object-cover rounded-md border border-gray-500"
                />
              </label>
              <input
                type="file"
                id="image4"
                hidden
                onChange={(e) => setImage4(e.target.files[0])}
              />
            </div>
          </div>

          {/* Product Name */}
          <div className="flex flex-col gap-[10px]">
            <p className="text-[20px] md:text-[25px] font-semibold">
              Product Name
            </p>
            <input
              type="text"
              placeholder="Enter product name"
              className="p-3 w-[300px] md:w-[500px] text-black rounded-md outline-none"
            />
          </div>

          {/* Product Price */}
          <div className="flex flex-col gap-[10px]">
            <p className="text-[20px] md:text-[25px] font-semibold">
              Product Price
            </p>
            <input
              type="number"
              placeholder="Enter product price"
              className="p-3 w-[300px] md:w-[500px] text-black rounded-md outline-none"
            />
          </div>

          {/* Product Description */}
          <div className="flex flex-col gap-[10px]">
            <p className="text-[20px] md:text-[25px] font-semibold">
              Product Description
            </p>
            <textarea
              placeholder="Enter product description"
              className="p-3 w-[300px] md:w-[500px] h-[120px] text-black rounded-md outline-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 rounded-md hover:bg-blue-700 transition-all mt-5"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default Add;
