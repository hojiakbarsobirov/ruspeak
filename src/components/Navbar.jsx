import React from "react";

const Navbar = () => {
  return (
    <nav className="w-full min-h-[40vh] bg-white flex flex-col justify-center items-center relative overflow-hidden">
      <div className="container mx-auto flex flex-col justify-center items-center text-center px-4 z-10">
        <img
          src="/logotip.png"
          alt="logo"
          className="w-[140px] sm:w-[160px] md:w-[180px] mb-6"
        />

        <h2 className="text-[#1565C0] font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-snug">
          3 oyda <span className="text-yellow-400">»</span> noldan <br className="hidden sm:block" /> 
          razgovorgacha o'rgatamiz
        </h2>

        <div className="mt-6 bg-[#1565C0] text-white font-semibold text-sm sm:text-base px-4 py-2 rounded-full shadow-lg">
          100% KAFOLAT
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
