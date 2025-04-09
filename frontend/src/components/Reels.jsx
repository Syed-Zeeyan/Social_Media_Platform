import React from "react";

const ReelsComingSoon = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-white"
      style={{ background: "radial-gradient(circle, rgba(75,0,130,0.3) 10%, rgba(0,0,0,1) 90%)" }}
    >
      <div className="flex items-center gap-6 p-6 bg-gray-800 rounded-2xl shadow-2xl">
        {/* Logo */}
        <img src="/Chain.png" alt="Logo" className="w-20 h-20 animate-pulse" />
        
        {/* Text Content */}
        <div className="text-center">
          <h1 className="font-extrabold text-4xl text-purple-500">
            Coming Soon
          </h1>
          <p className="text-gray-300 text-lg mt-2 italic">
            Something Special is Brewing – Stay With Us!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReelsComingSoon;
