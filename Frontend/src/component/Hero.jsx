import React from "react";
import { FaCircle } from "react-icons/fa";

const Hero = ({ heroData, heroCount, setHeroCount }) => {
  return (
    <div className="w-full h-full relative">
      {/* Hero Text */}
      <div
        className="
          absolute text-[#88d9ee] 
          text-xl sm:text-2xl md:text-4xl lg:text-5xl 
          left-4 sm:left-8 md:left-16 lg:left-20 
          top-4 sm:top-6 md:top-20 lg:top-32
        "
      >
        <p className="font-bold">{heroData.text1}</p>
        <p className="mt-2 text-base sm:text-lg md:text-2xl lg:text-3xl">
          {heroData.text2}
        </p>
      </div>

      {/* Navigation Dots */}
      <div
        className="
          absolute flex items-center gap-2
          left-4 sm:left-8 md:left-16 lg:left-20
          bottom-4 sm:bottom-6 md:bottom-10 lg:bottom-16
        "
      >
        {[0, 1, 2].map((index) => (
          <FaCircle
            key={index}
            className={`w-3 sm:w-4 h-3 sm:h-4 cursor-pointer ${
              heroCount === index ? "text-orange-400" : "text-white"
            }`}
            onClick={() => setHeroCount(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
