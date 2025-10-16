import React from "react";
import { Link } from "react-router-dom";

const BonusPage = () => {
  return (
    <section className="relative w-full min-h-[60vh] flex flex-col justify-center items-center overflow-hidden text-center px-4">
      {/* Animated background */}
      <div className="absolute inset-0 animate-gradient"></div>

      {/* Content */}
      <div
        data-aos="fade-up"
        className="relative z-10 flex flex-col md:flex-row justify-center items-center gap-5 md:gap-10 text-white"
      >
        <img
          src="/book3.png"
          alt="Bonus book"
          className="w-[220px] sm:w-[280px] md:w-[350px] lg:w-[400px] drop-shadow-lg"
        />
        <p className="font-medium text-lg sm:text-xl md:text-2xl leading-relaxed md:w-[380px] lg:w-[520px]">
          24 soat ichida <br /> kursga yoziling va <br /> “Ko‘chada gaplashamiz”
          audio{" "}
          <span
            role="img"
            aria-label="headphones"
            className="inline-block text-yellow-300 text-2xl align-middle ml-1"
          >
            🎧
          </span>{" "}
          kitobini <br />
          <span className="font-semibold text-yellow-300">
            bepul qo‘lga kiriting!
          </span>
          <br />
          <Link target="_blank" to="https://t.me/Ruspeak_admin">
            <button className="beautiful-button mt-3">Bonus !</button>
          </Link>
        </p>
      </div>
    </section>
  );
};

export default BonusPage;
