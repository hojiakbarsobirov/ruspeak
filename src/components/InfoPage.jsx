import React, { useState } from "react";
import { FaWhatsapp, FaTelegramPlane } from "react-icons/fa";
import { db } from "../firebase/config";
import { collection, addDoc } from "firebase/firestore";

const InfoPage = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [extraPhone, setExtraPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !phone) {
      alert("Iltimos, ism va telefon raqamingizni kiriting!");
      return;
    }

    setLoading(true);

    try {
      await addDoc(collection(db, "registrations"), {
        name,
        phone,
        extraPhone,
        createdAt: new Date().toISOString(),
      });
      alert("✅ Ma’lumot muvaffaqiyatli yuborildi!");
      setName("");
      setPhone("");
      setExtraPhone("");
    } catch (err) {
      console.error(err);
      alert("❌ Xatolik yuz berdi!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full min-h-screen bg-white flex flex-col justify-center items-center px-4 py-10">
      <h2 className="text-center text-lg sm:text-xl font-medium mb-6 leading-relaxed">
        Onlayn darsga yozilish uchun hoziroq <br /> raqamingizni qoldiring
      </h2>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-4"
      >
        <input
          type="text"
          placeholder="Ismingiz"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition-all text-gray-700"
        />

        <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3 gap-2 focus-within:border-blue-500 transition-all">
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

        <div className="border border-gray-300 rounded-xl p-3 flex flex-col gap-3 bg-gray-50">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 flex-shrink-0">
              <FaWhatsapp className="text-green-500 text-2xl" />
              <FaTelegramPlane className="text-sky-500 text-2xl" />
            </div>
            <p className="text-sm text-gray-600 leading-snug">
              Agar chet elda bo‘lsangiz, WhatsApp yoki Telegram raqamingizni yozib
              qoldiring.
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

        <button
          type="submit"
          disabled={loading}
          className="bg-[#FF9800] hover:bg-[#f48b00] text-white font-semibold py-3 rounded-xl text-center transition-all"
        >
          {loading ? "Yuborilmoqda..." : "Rus tilini hoziroq boshlang!"}
        </button>
      </form>
    </section>
  );
};

export default InfoPage;
