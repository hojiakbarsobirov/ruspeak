import React, { useState, useEffect } from "react";
import {
  FaUser,
  FaPhone,
  FaWhatsapp,
  FaTelegramPlane,
  FaClock,
  FaCheckCircle,
  FaStar,
  FaAward,
  FaUsers,
  FaChartLine,
  FaBolt,
  FaBullseye,
  FaPaperPlane,
} from "react-icons/fa";

const PremiumLandingPage = () => {
  const [timeLeft, setTimeLeft] = useState(60);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [extraPhone, setExtraPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setTimeLeft((prev) => Math.max(prev - 1, 0)),
      1000
    );
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const testimonialTimer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(testimonialTimer);
  }, []);

  const formatPhoneNumber = (value) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length === 0) return "";

    let formatted = "+998";
    const afterCode = numbers.startsWith("998") ? numbers.slice(3) : numbers;

    if (afterCode.length > 0) formatted += " " + afterCode.slice(0, 2);
    if (afterCode.length > 2) formatted += " " + afterCode.slice(2, 5);
    if (afterCode.length > 5) formatted += " " + afterCode.slice(5, 7);
    if (afterCode.length > 7) formatted += " " + afterCode.slice(7, 9);

    return formatted;
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    if (value === "" || value === "+") {
      setPhone("");
      return;
    }
    const formatted = formatPhoneNumber(value);
    setPhone(formatted);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const phoneNumbers = phone.replace(/\D/g, "");

    if (!name.trim() || phoneNumbers.length !== 12 || !extraPhone.trim()) {
      alert(
        "Iltimos barcha maydonlarni to'ldiring va to'liq telefon raqam kiriting"
      );
      return;
    }

    setLoading(true);

    try {
      // Firebase logic here
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

  const features = [
    {
      icon: <FaUsers className="w-8 h-8" />,
      title: "200+ O'quvchi",
      desc: "Muvaffaqiyatli bitiruvchilar",
    },
    {
      icon: <FaAward className="w-8 h-8" />,
      title: "Sertifikat",
      desc: "Rasmiy sertifikat beriladi",
    },
    { icon: <FaClock className="w-8 h-8" />, title: "60 Kun", desc: "Intensiv dastur" },
    {
      icon: <FaBullseye className="w-8 h-8" />,
      title: "100% Natija",
      desc: "Kafolatlangan o'rganish",
    },
  ];

  const testimonials = [
    {
      name: "Dilshod Karimov",
      text: "60 kun ichida haqiqatan ham gapirishni o'rgandim! Ajoyib kurs!",
      rating: 5,
    },
    {
      name: "Malika Azimova",
      text: "O'qituvchilar juda professional. Har bir dars qiziqarli!",
      rating: 5,
    },
    {
      name: "Javohir Tursunov",
      text: "Endi rus tilida erkin muloqot qila olaman. Rahmat!",
      rating: 5,
    },
  ];

  const benefits = [
    "Jonli online darslar",
    "Kichik guruhlar (8-10 kishi)",
    "Kunlik amaliy mashg'ulotlar",
    "24/7 ustoz yordami",
    "Bepul qo'shimcha materiallar",
    "Darslarni qayta ko'rish imkoniyati",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-indigo-100">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div
          className="absolute top-40 right-10 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-20 left-1/3 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10">
        {/* Logo */}
        <div className="pt-8 pb-4 text-center">
          <div className="inline-block px-8 py-3 transform hover:scale-105 transition-transform duration-300">
            <img className="w-[250px]" src="/logotip.png" alt="" />
          </div>
        </div>

        {/* Main Hero */}
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <div className="inline-block bg-yellow-400 text-gray-900 px-6 py-2 rounded-full font-semibold text-sm mb-6 animate-bounce shadow-lg">
              ⚡ Chegirma muddati tugaydi!
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 mb-6 leading-tight">
              60 Kunda Noldan<br />
              <span className="text-indigo-600">Razgovorgacha</span> O'rganing!
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Professional ustozlar bilan intensiv online kurs. Amaliy darslar va
              jonli suhbatlar orqali tezkor natijaga erishing!
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
              {features.map((feature, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-indigo-400"
                >
                  <div className="text-indigo-600 mb-3 flex justify-center">
                    {feature.icon}
                  </div>
                  <div className="font-bold text-lg text-gray-800">
                    {feature.title}
                  </div>
                  <div className="text-sm text-gray-600">{feature.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Registration Form & Countdown */}
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-start">
            {/* Form */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 border-4 border-indigo-100 transform hover:scale-105 transition-all duration-300">
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  🎯 Ro'yxatdan O'ting
                </h2>
                <p className="text-gray-600">Va bepul sovg'a oling!</p>
              </div>

              {/* Countdown Timer */}
              <div className="bg-gradient-to-r from-indigo-500 to-blue-600 rounded-2xl p-6 mb-6 shadow-lg">
                <div className="flex justify-center gap-4">
                  {[
                    { val: Math.floor(timeLeft / 3600), label: "Soat" },
                    { val: Math.floor((timeLeft % 3600) / 60), label: "Minut" },
                    { val: timeLeft % 60, label: "Secund" },
                  ].map((item, idx) => (
                    <div key={idx} className="flex flex-col items-center">
                      <div className="bg-white text-indigo-600 rounded-xl px-4 py-3 font-mono font-bold text-3xl shadow-lg min-w-[70px]">
                        {String(item.val).padStart(2, "0")}
                      </div>
                      <span className="text-white text-xs mt-2 font-semibold">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="relative group">
                  <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500 w-5 h-5 group-focus-within:scale-110 transition-transform" />
                  <input
                    type="text"
                    placeholder="Ismingiz"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all text-lg"
                  />
                </div>

                <div className="relative group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl">
                    🇺🇿
                  </span>
                  <input
                    type="tel"
                    placeholder="+998 99 999 99 99"
                    value={phone}
                    onChange={handlePhoneChange}
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all text-lg"
                  />
                </div>

                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 flex gap-1">
                    <FaWhatsapp className="text-green-500 w-4 h-4" />
                    <FaTelegramPlane className="text-blue-400 w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    placeholder="WhatsApp / Telegram"
                    value={extraPhone}
                    onChange={(e) => setExtraPhone(e.target.value)}
                    className="w-full pl-14 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 outline-none transition-all text-lg"
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className={`w-full py-4 rounded-xl font-bold text-lg text-white transition-all duration-300 transform hover:scale-105 shadow-xl ${
                    success
                      ? "bg-gradient-to-r from-green-500 to-emerald-600"
                      : "bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700"
                  } disabled:opacity-50 flex items-center justify-center gap-2`}
                >
                  {loading ? (
                    <>
                      <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                      Yuborilmoqda...
                    </>
                  ) : success ? (
                    <>
                      <FaCheckCircle className="w-6 h-6" />
                      Muvaffaqiyatli!
                    </>
                  ) : (
                    <>
                      <FaPaperPlane className="w-6 h-6" />
                      Ro'yxatdan O'tish
                    </>
                  )}
                </button>

                {success && (
                  <div className="bg-green-50 border-2 border-green-500 rounded-xl p-4 text-center">
                    <p className="text-green-700 font-semibold">
                      ✅ Ma'lumot muvaffaqiyatli yuborildi!
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Benefits Card */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-indigo-500 to-blue-600 rounded-3xl p-8 shadow-2xl text-white transform hover:scale-105 transition-all duration-300">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <FaBolt className="w-8 h-8" />
                  Kurs Afzalliklari:
                </h3>
                <ul className="space-y-3">
                  {benefits.map((benefit, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-3 text-lg"
                    >
                      <div className="bg-white text-indigo-600 rounded-full p-1.5">
                        <FaCheckCircle className="w-4 h-4" />
                      </div>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Gift Card */}
              <div className="bg-gradient-to-r from-indigo-500 to-blue-600 rounded-3xl p-0 shadow-2xl text-white transform hover:scale-105 transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="p-0">
                    <img
                      src="/book3.png"
                      alt="Bepul kitob"
                      className="w-36 h-36 object-contain"
                    />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">BEPUL SOVG'A!</h4>
                    <p className="text-sm">
                      Hoziroq ro'yxatdan o'ting va "Ko'chada gaplashamiz" audio kitobini bepul qo'lga kiriting
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonials */}
          <div className="mt-20 max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
              💬 O'quvchilar Fikrlari
            </h2>
            <div className="relative">
              {testimonials.map((testimonial, idx) => (
                <div
                  key={idx}
                  className={`transition-all duration-500 ${
                    idx === activeTestimonial
                      ? "opacity-100 transform scale-100"
                      : "opacity-0 absolute inset-0 transform scale-95 pointer-events-none"
                  }`}
                >
                  <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-indigo-100">
                    <div className="flex gap-1 mb-4 justify-center">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <FaStar key={i} className="w-6 h-6 text-indigo-400" />
                      ))}
                    </div>
                    <p className="text-xl text-gray-700 text-center mb-4 italic">
                      "{testimonial.text}"
                    </p>
                    <p className="text-center font-bold text-indigo-600">
                      — {testimonial.name}
                    </p>
                  </div>
                </div>
              ))}
              <div className="flex justify-center gap-2 mt-6">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveTestimonial(idx)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      idx === activeTestimonial
                        ? "bg-indigo-600 w-8"
                        : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="mt-20 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-3xl p-12 shadow-2xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
              {[
                { num: "200+", label: "O'quvchilar" },
                { num: "60", label: "Kun davom etadi" },
                { num: "98%", label: "Qoniqish darajasi" },
                { num: "24/7", label: "Yordam" },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="transform hover:scale-110 transition-transform"
                >
                  <div className="text-5xl font-black mb-2">{stat.num}</div>
                  <div className="text-lg opacity-90">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumLandingPage;
