import React, { useState, useEffect } from "react";
import { FaUser, FaWhatsapp, FaTelegramPlane } from "react-icons/fa";
import { db } from "../firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import "../App.css";

const InfoPage = () => {
  const [timeLeft, setTimeLeft] = useState(60);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [extraPhone, setExtraPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const timer = setInterval(
      () => setTimeLeft((prev) => Math.max(prev - 1, 0)),
      1000
    );
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !phone) {
      alert("Iltimos barcha maydonlarni to'ldiring");
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, "registrations"), {
        name: name.trim(),
        phone: phone.trim(),
        extraPhone: extraPhone.trim(),
        createdAt: serverTimestamp(),
      });

      setSuccess(true);
      setName("");
      setPhone("");
      setExtraPhone("");
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error("Xato yuz berdi:", error);
      alert("Ma'lumot yuborilmadi, qayta urinib ko'ring.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full h-auto flex flex-col justify-center items-center relative px-4 lg:px-0">
      {/* Banner */}
      <div className="absolute inset-0 flex justify-center items-center z-0">
        <img
          src="/banner-img.png"
          alt="world map"
          className="w-full lg:w-[70%] h-[400px] md:h-[500px] lg:h-[450px] object-cover rounded-xl transition-all duration-500"
        />
      </div>

      <header className="flex flex-col items-center gap-6 relative z-10 w-full max-w-[900px]">
        {/* Form Box */}
        <div
          data-aos="fade-up"
          className="bg-white w-full max-w-[350px] sm:max-w-[400px] md:max-w-[350px] p-6 rounded-3xl shadow-2xl flex flex-col items-center text-center transition-all duration-500"
        >
          <h2
            className="text-lg sm:text-xl md:text-2xl text-blue-800 font-bold mb-3"
            style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.5)" }}
          >
            Onlayn darsga yozilish uchun hoziroq
          </h2>
          <p className="mb-5 text-gray-600 text-sm sm:text-base">
             raqamingizni qoldiring
          </p>

          {/* Countdown */}
          <div className="flex gap-3 mb-6 text-center justify-center">
            <div className="flex flex-col items-center">
              <span className="text-3xl md:text-4xl font-mono font-bold text-red-600">
                {String(Math.floor(timeLeft / 3600)).padStart(2, "0")}
              </span>
              <span className="text-xs md:text-sm text-gray-500">Soat</span>
            </div>
            <span className="text-3xl md:text-4xl font-bold text-red-600">:</span>
            <div className="flex flex-col items-center">
              <span className="text-3xl md:text-4xl font-mono font-bold text-red-600">
                {String(Math.floor((timeLeft % 3600) / 60)).padStart(2, "0")}
              </span>
              <span className="text-xs md:text-sm text-gray-500">Minut</span>
            </div>
            <span className="text-3xl md:text-4xl font-bold text-red-600">:</span>
            <div className="flex flex-col items-center">
              <span className="text-3xl md:text-4xl font-mono font-bold text-red-600">
                {String(timeLeft % 60).padStart(2, "0")}
              </span>
              <span className="text-xs md:text-sm text-gray-500">Secund</span>
            </div>
          </div>

          {/* Form */}
          <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
            {/* Name */}
            <div className="relative w-full">
              <FaUser className="absolute top-1/2 left-3 -translate-y-1/2 text-blue-800 text-lg md:text-xl" />
              <input
                type="text"
                placeholder="Ismingiz"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 border text-sm md:text-base border-gray-300 rounded-md px-2 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Phone */}
            <div className="relative w-full flex items-center">
              <img
                src="/uzb-flag.png"
                alt="Uzbekistan Flag"
                className="absolute top-1/2 left-3 -translate-y-1/2 w-5 sm:w-6 md:w-7 rounded-sm"
              />
              <span className="absolute left-10 sm:left-12 top-1/2 -translate-y-1/2 text-gray-700 text-sm md:text-base">
                +998
              </span>
              <input
                type="tel"
                placeholder="00-000-0000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full pl-20 sm:pl-24 md:pl-28 border text-sm md:text-base border-gray-300 rounded-md px-2 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* WhatsApp / Telegram */}
            <div className="relative w-full flex items-center">
              <FaWhatsapp className="absolute top-1/2 left-2.5 -translate-y-1/2 text-green-500 text-lg md:text-xl" />
              <FaTelegramPlane className="absolute top-1/2 left-7 -translate-y-1/2 text-blue-500 text-lg md:text-xl" />
              <input
                type="text"
                placeholder="WhatsApp yoki Telegram raqamingiz"
                value={extraPhone}
                onChange={(e) => setExtraPhone(e.target.value)}
                className="w-full pl-14 md:pl-16 border text-sm md:text-base border-gray-300 rounded-md px-2 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`${
                success
                  ? "bg-green-500 hover:bg-green-600 shadow-[0_0_15px_rgba(34,197,94,0.6)]"
                  : "bg-red-500 hover:bg-red-600 shadow-[0_0_15px_rgba(239,68,68,0.6)]"
              } text-md md:text-lg text-white py-2 px-6 rounded-full transition-all duration-300 disabled:opacity-50`}
            >
              {loading ? "Yuborilmoqda..." : "Ro'yxatdan o'tish"}
            </button>

            {success && (
              <p className="text-green-600 mt-2 text-sm md:text-base">
                Ma'lumot muvaffaqiyatli yuborildi!
              </p>
            )}
          </form>
        </div>

        {/* Book promo */}
        <div
          data-aos="fade-up"
          className="bg-blue-200 w-full max-w-[450px] sm:max-w-[500px] h-[120px] sm:h-[140px] rounded-xl px-0 flex flex-row justify-between items-center mt-6 transition-all duration-500"
        >
          <h3 className="w-[60%] sm:w-[65%] text-gray-600 font-medium text-sm sm:text-base text-center">
            Hoziroq raqamingizni qoldiring va{" "}
            <span className="font-bold">"Ko'chada gaplashamiz"</span> audio 🎧 kitobini
            bepul qo'lga kiriting
          </h3>
          <img
            className="w-[200px] sm:w-[220px] object-contain"
            src="/book3.png"
            alt="book"
          />
        </div>
      </header>
    </section>
  );
};

export default InfoPage;
