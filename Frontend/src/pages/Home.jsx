import React, { useState, useEffect } from "react";
import Background from "../component/Background";


function Home() {
  const heroData = [
    { text1: "Discover the Best of Bold Fashion", text2: "Limited Time Only!" },
    { text1: "Explore Our Best Collection", text2: "Shop Now!" },
    { text1: "Choose Your Perfect Fashion Fit", text2: "Now on Sale!" },
  ];

  const [heroCount, setHeroCount] = useState(0);

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroCount((prev) => (prev + 1) % heroData.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col-reverse lg:flex-row w-full min-h-screen overflow-x-hidden">
      {/* Left Section (Text content) */}
      <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start justify-center text-center lg:text-left text-white px-6 md:px-10 py-8 md:py-16 bg-gradient-to-l from-[#141414] to-[#0c2025]">
        {/* Hero Text Component */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-wide">
          {heroData[heroCount].text1}
        </h1>

        <p className="mt-4 text-lg md:text-2xl text-gray-300">
          {heroData[heroCount].text2}
        </p>

        {/* CTA Button */}
        <button className="mt-8 px-8 md:px-10 py-3 md:py-4 bg-blue-600 hover:bg-blue-700 transition-all duration-300 rounded-full text-lg font-semibold shadow-lg hover:scale-105">
          Shop Now
        </button>

        {/* Navigation Dots */}
        <div className="mt-6 flex items-center justify-center lg:justify-start gap-3">
          {heroData.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${
                heroCount === index ? "bg-orange-400" : "bg-white"
              }`}
              onClick={() => setHeroCount(index)}
            />
          ))}
        </div>
      </div>

      {/* Right Section (Background image) */}
    <div className="w-full lg:w-1/2 h-72 sm:h-96 md:h-[28rem] lg:h-auto flex justify-center items-center relative">
        <Background heroCount={heroCount} />
      </div>

    </div>
  );
}

export default Home;
