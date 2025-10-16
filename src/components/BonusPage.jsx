import React from "react";
import { Link } from "react-router-dom";

const BonusPage = () => {
  return (
    <section className="relative w-full min-h-[60vh] flex flex-col justify-center items-center overflow-hidden px-4">
      {/* Animated background */}
      <div className="absolute inset-0 animate-gradient"></div>

      {/* Content */}
      <div
        data-aos="fade-up"
        className="relative z-10 flex flex-col md:flex-row justify-center items-center gap-2 text-white"
      >
        <img
          src="/book3.png"
          alt="Bonus book"
          className="w-[220px] sm:w-[260px] md:w-[320px] lg:w-[360px] drop-shadow-lg"
        />

        <div className="text-left font-medium text-lg sm:text-xl md:text-2xl leading-relaxed md:w-[360px] lg:w-[480px] flex flex-col items-start">
          <p>
            Faqat <span className="text-yellow-300 font-semibold">24 soat</span>{" "}
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

          <p className="mt-2">
            <span className="font-semibold text-yellow-300">
              bepul qo‘lga kiriting!
            </span>
          </p>

          <Link target="_blank" to="https://t.me/Ruspeak_admin">
            <button className="beautiful-button mt-4">Bonus !</button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BonusPage;
