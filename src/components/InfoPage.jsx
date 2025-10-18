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

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(
      () => setTimeLeft((prev) => Math.max(prev - 1, 0)),
      1000
    );
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600)
      .toString()
      .padStart(2, "0");
    const mins = Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  };

  // Form submit
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
    <section className="w-full h-auto flex flex-col justify-center items-center relative px-4">
      {/* Banner */}
      <div className="absolute w-full h-[600px] lg:w-[70%] lg:h-[450px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <img
          src="/banner-img.png"
          alt="world map"
          className="w-full h-full object-cover rounded-xl"
        />
      </div>

      <header className="flex flex-col items-center gap-4 relative z-10">
        {/* Form Box */}
        <div data-aos="fade-up" className="bg-white w-[250px] h-[430px] p-4 rounded-2xl shadow-2xl flex flex-col items-center text-center">
          <h2
            className="text-lg text-blue-800 font-bold mb-2"
            style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.5)" }}
          >
            Onlayn darsga yozilish uchun hoziroq
          </h2>
          <p className="mb-4 text-gray-600 text-sm">
            Hoziroq raqamingizni qoldiring
          </p>
          <div className="flex gap-2 mb-6 text-center">
            {/* Soatlar */}
            <div className="flex flex-col items-center">
              <span className="text-3xl font-mono font-bold text-red-600">
                {String(Math.floor(timeLeft / 3600)).padStart(2, "0")}
              </span>
              <span className="text-xs text-gray-500">Soat</span>
            </div>

            <span className="text-3xl font-bold text-red-600">:</span>

            {/* Minutlar */}
            <div className="flex flex-col items-center">
              <span className="text-3xl font-mono font-bold text-red-600">
                {String(Math.floor((timeLeft % 3600) / 60)).padStart(2, "0")}
              </span>
              <span className="text-xs text-gray-500">Minut</span>
            </div>

            <span className="text-3xl font-bold text-red-600">:</span>

            {/* Sekundlar */}
            <div className="flex flex-col items-center">
              <span className="text-3xl font-mono font-bold text-red-600">
                {String(timeLeft % 60).padStart(2, "0")}
              </span>
              <span className="text-xs text-gray-500">Secund</span>
            </div>
          </div>

          <form className="w-full flex flex-col gap-3" onSubmit={handleSubmit}>
            {/* Ism input */}
            <div className="relative w-full">
              <FaUser className="absolute top-1/2 left-3 -translate-y-1/2 text-blue-800" />
              <input
                type="text"
                placeholder="Ismingiz"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 border text-sm border-gray-300 rounded-md px-2 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Telefon input */}
            <div className="relative w-full flex items-center">
              <img
                src="/uzb-flag.png"
                alt="Uzbekistan Flag"
                className="absolute top-1/2 left-3 -translate-y-1/2 w-5 rounded-sm"
              />
              <span className="absolute left-10 top-1/2 -translate-y-1/2 text-gray-700 text-sm">
                +998
              </span>
              <input
                type="tel"
                placeholder="00-000-0000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full pl-20 border text-sm border-gray-300 rounded-md px-2 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* WhatsApp va Telegram input */}
            <div className="relative w-full flex items-center">
              <FaWhatsapp className="absolute top-1/2 left-2.5 -translate-y-1/2 text-green-500 text-lg" />
              <FaTelegramPlane className="absolute top-1/2 left-7 -translate-y-1/2 text-blue-500 text-lg" />
              <input
                type="tel"
                placeholder="WhatsApp yoki Telegram raqamingiz"
                value={extraPhone}
                onChange={(e) => setExtraPhone(e.target.value)}
                className="w-full pl-14 border text-sm border-gray-300 rounded-md px-2 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="bg-red-500 text-md hover:bg-red-600 text-white py-2 px-6 rounded-full 
             shadow-[0_0_15px_rgba(239,68,68,0.6)] transition-all duration-300 
             disabled:opacity-50"
            >
              {loading ? "Yuborilmoqda..." : "Ro'yxatdan o'tish"}
            </button>

            {success && (
              <p className="text-green-600 mt-2 text-sm">
                Ma'lumot muvaffaqiyatli yuborildi!
              </p>
            )}
          </form>
        </div>

        {/* Book promo box */}
        <div data-aos="fade-up" className="bg-blue-200 w-full max-w-[400px] h-[120px] rounded-xl px-0 flex flex-row justify-between items-center mt-4 relative">
          <h3 className="w-[600px] text-gray-600 font-medium text-center text-sm pl-5 text-shadow-strong">
            Hoziroq raqamingizni qoldiring va{" "}
            <span className="font-bold">"Ko'chada gaplashamiz"</span> audio 🎧
            kitobini bepul qo'lga kiriting
          </h3>
          <img
            className="w-[120px] sm:w-[180px] object-contain"
            src="/book3.png"
            alt="book"
          />
        </div>
      </header>
    </section>
  );
};

export default InfoPage;
