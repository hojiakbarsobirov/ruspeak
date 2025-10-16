import React from "react";
import { Link } from "react-router-dom";

const BonusPage = () => {
  return (
    <section className="relative w-full min-h-[60vh] flex flex-col justify-center items-center overflow-hidden text-center px-4">
      {/* Animated background */}
      <div className="absolute inset-0  animate-gradient"></div>

      {/* Content */}
      <div data-aos="fade-up" className="relative z-10 flex flex-col md:flex-row justify-center items-center gap-8 md:gap-14 text-white">
        <img
          src="/book3.png"
          alt="Bonus book"
          className="w-[250px] sm:w-[300px] md:w-[380px] lg:w-[420px] drop-shadow-lg"
        />
        <p className="font-medium text-lg sm:text-xl md:text-2xl leading-relaxed md:w-[400px] lg:w-[550px]">
          24 soat ichida <br /> kursga yoziling va <br /> “Ko‘chada gaplashamiz”
          audio kitobini <br />
          <span className="font-semibold text-yellow-300">
            bepul qo‘lga kiriting!
          </span>
        </p>
      </div>

      {/* Button */}
      <div className="relative z-10 mt-8">
        <Link target="_blank" to="https://t.me/Ruspeak_admin">
          <button class="beautiful-button">Bonus !</button>
        </Link>
      </div>
    </section>
  );
};

export default BonusPage;
