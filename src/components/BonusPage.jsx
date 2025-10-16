import React from "react";
import { Link } from "react-router-dom";

const BonusPage = () => {
  return (
    <section className="relative w-full min-h-auto flex flex-col justify-center items-center overflow-hidden px-4 py-10">
      {/* Animated background */}
      <div className="absolute inset-0 animate-gradient"></div>

      {/* Content */}
      <div
        data-aos="fade-up"
        className="relative z-10 flex flex-col md:flex-row justify-center items-center text-white gap-6 md:gap-4"
      >
        {/* Image */}
        <img
          src="/book3.png"
          alt="Bonus book"
          className="w-[200px] sm:w-[240px] md:w-[320px] lg:w-[360px] drop-shadow-lg mb-3 md:mb-0"
        />

        {/* Text content */}
        <div
          className="font-medium text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed flex flex-col items-center md:items-start text-center md:text-left md:w-[360px] lg:w-[480px]"
          style={{
            textShadow:
              "0 1px 3px rgba(0,0,0,0.3), 0 2px 6px rgba(0,0,0,0.25)", // ✅ Yumshoq chiroyli soya
          }}
        >
          <p>
            Faqat{" "}
            <span className="text-yellow-300 font-semibold text-lg sm:text-xl drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)]">
              24 soat
            </span>{" "}
            ichida kursga yoziling —
          </p>

          <p className="mt-2">
            va “Ko‘chada gaplashamiz”
            <span
              role="img"
              aria-label="headphones"
              className="inline-block text-yellow-300 text-2xl align-middle ml-1"
            >
              🎧
            </span>{" "}
            audio kitobini
          </p>

          <p className="mt-2 text-lg sm:text-xl font-semibold text-yellow-300 drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)]">
            bepul qo‘lga kiriting!
          </p>

          <Link target="_blank" to="https://t.me/Ruspeak_admin">
            <button className="beautiful-button mt-5 sm:mt-6 px-8 py-3 text-base sm:text-lg">
              Bonus
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BonusPage;
