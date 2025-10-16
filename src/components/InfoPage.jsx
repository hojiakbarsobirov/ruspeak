import React, { useState } from "react";
import { FaWhatsapp, FaTelegramPlane } from "react-icons/fa";
import { db } from "../firebase/config";
import { collection, addDoc } from "firebase/firestore";

const InfoPage = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [extraPhone, setExtraPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    if (!name || !phone) {
      alert("Iltimos, ism va telefon raqamingizni kiriting!");
      return;
    }

    setLoading(true);
    setSuccess(false);

    try {
      await addDoc(collection(db, "registrations"), {
        name,
        phone,
        extraPhone,
        createdAt: new Date().toISOString(),
      });

      setName("");
      setPhone("");
      setExtraPhone("");
      setSuccess(true);
    } catch (err) {
      console.error(err);
      alert("❌ Xatolik yuz berdi!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      data-aos="fade-up"
      className="w-full min-h-screen flex flex-col justify-center items-center px-4 py-10"
    >
      {/* Title */}
      <h2
        className="text-center text-2xl sm:text-3xl font-semibold text-white mb-6 leading-snug"
        style={{ textShadow: "0 2px 8px rgba(0, 0, 0, 0.4)" }}
      >
        Onlayn darsga yozilish uchun hoziroq <br className="hidden sm:block" />
        raqamingizni qoldiring 📘
      </h2>

      {/* Form */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 sm:p-8 flex flex-col gap-5">
        {/* Name */}
        <input
          type="text"
          placeholder="Ismingiz"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-orange-500 transition-all text-gray-700 w-full"
        />

        {/* Main phone */}
        <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3 gap-2 focus-within:border-orange-500 transition-all">
          <img
            src="https://flagcdn.com/w40/uz.png"
            alt="Uzbekistan flag"
            className="w-6 h-4 object-cover"
          />
          <span className="text-gray-500">+998</span>
          <input
            type="tel"
            placeholder="00-000-0000"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="flex-1 outline-none text-gray-700"
          />
        </div>

        {/* Extra phone */}
        <div className="border border-gray-300 rounded-xl p-3 flex flex-col gap-3 bg-gray-50">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 flex-shrink-0">
              <FaWhatsapp
                className="text-green-500 text-2xl"
                style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.3))" }}
              />
              <FaTelegramPlane
                className="text-sky-500 text-2xl"
                style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.3))" }}
              />
            </div>
            <p
              className="text-sm text-gray-600 leading-snug"
              style={{ textShadow: "0 1px 3px rgba(0, 0, 0, 0.15)" }}
            >
              Agar chet elda bo‘lsangiz, WhatsApp yoki Telegram raqamingizni
              yozib qoldiring.
            </p>
          </div>

          <input
            type="tel"
            placeholder="WhatsApp yoki Telegram raqamingiz"
            value={extraPhone}
            onChange={(e) => setExtraPhone(e.target.value)}
            className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-sky-500 transition-all text-gray-700 bg-white"
          />
        </div>

        {/* Button */}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className={`${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-orange-500 hover:bg-orange-600"
          } text-white font-semibold py-3 rounded-xl transition-all shadow-md hover:shadow-lg`}
          style={{ textShadow: "0 1px 3px rgba(0,0,0,0.25)" }}
        >
          {loading ? "Yuborilmoqda..." : "Rus tilini hoziroq boshlang!"}
        </button>

        {success && (
          <p
            className="text-green-600 text-center mt-2 font-medium"
            style={{ textShadow: "0 1px 3px rgba(0,0,0,0.2)" }}
          >
            ✅ Ma’lumot muvaffaqiyatli yuborildi!
          </p>
        )}
      </div>

      {/* Footer */}
      <p
        className="text-center text-gray-200 text-sm mt-8"
        style={{ textShadow: "0 1px 3px rgba(0,0,0,0.4)" }}
      >
        © 2025 Ruspeak. Barcha huquqlar himoyalangan.
      </p>
    </section>
  );
};

export default InfoPage;
