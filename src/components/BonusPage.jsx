import React from "react";
import { FaArrowRight } from "react-icons/fa";

const BonusPage = () => {
  return (
    <section className="w-full min-h-auto bg-white flex flex-col justify-center items-center px-4 py-10 overflow-hidden relative">
      {/* Fonda RUSPEAK.UZ */}
      <div className="absolute inset-0 flex justify-center items-center text-gray-100 text-[6rem] sm:text-[8rem] font-extrabold opacity-10 select-none">
        RUSPEAK.UZ
      </div>

      {/* Asosiy konteyner */}
      <div className="relative bg-white rounded-2xl max-w-4xl w-full flex flex-col items-center z-10 p-6 gap-10">
        {/* Logo tepada */}
        <img
          src="/logotip.png"
          alt="RuSpeak logo"
          className="w-[220px] sm:w-[260px] object-contain"
        />

        {/* Kitob + matn yonma-yon */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-8">
          {/* Kitob rasmi */}
          <img
            src="/book.png"
            alt="Book"
            className="w-[260px] sm:w-[300px] object-contain"
          />

          {/* Matn */}
          <p className="text-[#26338C] text-center sm:text-left font-medium text-[15px] sm:text-[17px] leading-snug max-w-[320px]">
            24 soat ichida kursga yoziling va{" "}
            <span className="text-[#F50057] font-bold">57.000</span> so‘mlik
            mini-audiyo kitobga bepul ega bo‘ling!
          </p>
        </div>

        {/* BONUS tugmasi */}
        <div className="flex flex-col items-center gap-2">
          <del className="text-gray-400 text-md font-semibold">57.000</del>
          <button className="bg-[#2196F3] hover:bg-[#1e88e5] text-white font-bold text-lg px-10 py-2 rounded-xl flex items-center gap-2 transition-all">
            BONUS <FaArrowRight className="text-white" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default BonusPage;
