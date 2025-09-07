import React, { useState, useEffect } from "react";

function Home() {
  // Hero section data
  const heroData = [
    { text1: "Discover the Best of Bold Fashion", text2: "Limited Time Only!" },
    { text1: "Explore Our Best Collection", text2: "Shop Now!" },
    { text1: "Choose your Perfect Fashion Fit", text2: "Now on Sale!" },
  ];

  // State to track which hero item is active
  const [heroCount, setHeroCount] = useState(0);

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroCount((prev) => (prev + 1) % heroData.length);
    }, 3000); // change text every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] flex flex-col items-center justify-center text-white">
      {/* Hero Main Text */}
      <h1 className="text-4xl md:text-6xl font-bold text-center px-4">
        {heroData[heroCount].text1}
      </h1>

      {/* Hero Sub Text */}
      <p className="text-lg md:text-2xl mt-4 text-gray-300">
        {heroData[heroCount].text2}
      </p>

      {/* CTA Button */}
      <button className="mt-6 px-8 py-3 bg-blue-600 hover:bg-blue-700 transition-colors rounded-full text-lg font-semibold">
        Shop Now
      </button>
    </div>
  );
}

export default Home;
