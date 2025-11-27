import React, { useState, useEffect } from "react";
import {
  FaUser,
  FaPhone,
  FaWhatsapp,
  FaTelegramPlane,
  FaCheckCircle,
  FaStar,
  FaPaperPlane,
} from "react-icons/fa";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "ruspeak-5c210.firebaseapp.com",
  projectId: "ruspeak-5c210",
  storageBucket: "ruspeak-5c210.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef12345",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const PremiumLandingPage = () => {
  const [timeLeft, setTimeLeft] = useState(60);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [extraPhone, setExtraPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Bottom form states
  const [bottomName, setBottomName] = useState("");
  const [bottomPhone, setBottomPhone] = useState("");
  const [bottomExtraPhone, setBottomExtraPhone] = useState("");
  const [bottomLoading, setBottomLoading] = useState(false);
  const [bottomSuccess, setBottomSuccess] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const testimonialTimer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(testimonialTimer);
  }, []);

  // Meta Pixel
  useEffect(() => {
    // Load Facebook Pixel
    !(function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod
          ? n.callMethod.apply(n, arguments)
          : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = "2.0";
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(
      window,
      document,
      "script",
      "https://connect.facebook.net/en_US/fbevents.js"
    );
    window.fbq("init", "1543301330183143");
    window.fbq("track", "PageView");
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

  const handleBottomPhoneChange = (e) => {
    const value = e.target.value;
    if (value === "" || value === "+") {
      setBottomPhone("");
      return;
    }
    const formatted = formatPhoneNumber(value);
    setBottomPhone(formatted);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const phoneNumbers = phone.replace(/\D/g, "");

    if (name.trim().length < 4) {
      alert("Ism kamida 4 ta harfdan iborat bo'lishi kerak");
      return;
    }

    if (!phoneNumbers || phoneNumbers.length !== 12 || !extraPhone.trim()) {
      alert(
        "Iltimos barcha maydonlarni to'ldiring va to'liq telefon raqam kiriting"
      );
      return;
    }

    setLoading(true);

    try {
      const now = new Date();
      const date = now.toLocaleDateString("uz-UZ");
      const time = now.toLocaleTimeString("uz-UZ");

      await addDoc(collection(db, "registrations"), {
        name: name.trim(),
        phone: phone,
        extraPhone: extraPhone.trim(),
        date: date,
        time: time,
        timestamp: now.toISOString(),
        formLocation: "top",
      });

      // Track Facebook Pixel event
      if (window.fbq) {
        window.fbq("track", "Lead");
      }

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

  const handleBottomSubmit = async (e) => {
    e.preventDefault();
    const phoneNumbers = bottomPhone.replace(/\D/g, "");

    if (bottomName.trim().length < 4) {
      alert("Ism kamida 4 ta harfdan iborat bo'lishi kerak");
      return;
    }

    if (
      !phoneNumbers ||
      phoneNumbers.length !== 12 ||
      !bottomExtraPhone.trim()
    ) {
      alert(
        "Iltimos barcha maydonlarni to'ldiring va to'liq telefon raqam kiriting"
      );
      return;
    }

    setBottomLoading(true);

    try {
      const now = new Date();
      const date = now.toLocaleDateString("uz-UZ");
      const time = now.toLocaleTimeString("uz-UZ");

      await addDoc(collection(db, "registrations"), {
        name: bottomName.trim(),
        phone: bottomPhone,
        extraPhone: bottomExtraPhone.trim(),
        date: date,
        time: time,
        timestamp: now.toISOString(),
        formLocation: "bottom",
      });

      // Track Facebook Pixel event
      if (window.fbq) {
        window.fbq("track", "Lead");
      }

      setBottomSuccess(true);
      setBottomName("");
      setBottomPhone("");
      setBottomExtraPhone("");
      setTimeout(() => setBottomSuccess(false), 3000);
    } catch (error) {
      console.error("Xato yuz berdi:", error);
      alert("Ma'lumot yuborilmadi, qayta urinib ko'ring.");
    } finally {
      setBottomLoading(false);
    }
  };

  const benefits = [
    "Jonli online darslar",
    "Kichik guruhlar (8-10 kishi)",
    "Kunlik amaliy mashg'ulotlar",
    "24/7 ustoz yordami",
    "Bepul qo'shimcha materiallar",
    "Darslarni qayta ko'rish imkoniyati",
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

  const stats = [
    { num: "200+", label: "O'quvchilar" },
    { num: "60", label: "Kun davom etadi" },
    { num: "95%", label: "Mamnun o'quvchilar" },
    { num: "24/7", label: "Yordam" },
  ];

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="min-h-screen flex items-center justify-center p-0">
      <div className="w-full max-w-md bg-white rounded-3xl  overflow-hidden">
        {/* Hero Section */}
        <div className="relative rounded-lg overflow-hidden">
          <div
            className="absolute inset-0 bg-no-repeat bg-center bg-cover"
            style={{
              backgroundImage: "url('/background-img.jpg')",
            }}
          ></div>
          <div className="absolute "></div>

          <div className="relative z-10 px-6 pt-12 pb-8">
            <div className="text-center text-blue-600 mb-8">
              <h1
                className="text-3xl font-bold mb-2"
                style={{ textShadow: "0px 3px 5px rgba(255,255,255,0.6)" }}
              >
                0 Dan Razgovorgacha
              </h1>

              <h2
                className="text-5xl font-black"
                style={{ textShadow: "0px 4px 6px rgba(255,255,255,0.7)" }}
              >
                Atigi 60 Kunda!
              </h2>
            </div>

            {/* Registration Card */}
            <div className="backdrop-blur-sm rounded-3xl shadow-2xl p-6 mb-6 border-2 border-blue-600">
              {/* Countdown Timer */}
              <div className="bg-gradient-to-r from-blue-400 to-blue-500 rounded-2xl p-6 mb-6 shadow-lg">
                <p
                  className="text-white text-center text-sm font-semibold mb-3"
                  style={{ textShadow: "0px 2px 4px rgba(0,0,0,0.6)" }}
                >
                  Hoziroq Ro'yxatdan O'ting
                </p>

                <p
                  className="text-white/90 text-center text-xs mb-4"
                  style={{ textShadow: "0px 2px 4px rgba(0,0,0,0.5)" }}
                >
                  Va Bebul Sovg'ani Qo'lga Kiriting!
                </p>

                <div className="flex justify-center gap-3">
                  {[
                    { val: hours, label: "Soat" },
                    { val: minutes, label: "Minut" },
                    { val: seconds, label: "Sekund" },
                  ].map((item, idx) => (
                    <div key={idx} className="flex flex-col items-center">
                      <div className="bg-white text-blue-600 rounded-xl px-4 py-3 font-mono font-bold text-2xl shadow-lg min-w-[60px] text-center">
                        {String(item.val).padStart(2, "0")}
                      </div>

                      <span
                        className="text-white text-xs mt-2 font-semibold"
                        style={{ textShadow: "0px 2px 4px rgba(0,0,0,0.6)" }}
                      >
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Form */}
              <div className="space-y-4">
                <div className="relative">
                  <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Ismingiz"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all text-lg"
                  />
                </div>

                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">
                    🇺🇿
                  </span>
                  <input
                    type="tel"
                    placeholder="+998 90 555 55 55"
                    value={phone}
                    onChange={handlePhoneChange}
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all text-lg"
                  />
                </div>

                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 flex gap-1">
                    <FaTelegramPlane className="text-blue-400 w-4 h-4" />
                    <FaWhatsapp className="text-green-500 w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    placeholder="Telegram/WhatsApp"
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
                      : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
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
                      Ro'yxatdan O'ting
                      <span className="text-2xl">→</span>
                    </>
                  )}
                </button>

                {success && (
                  <div className="bg-blue-50 border-2 border-blue-500 rounded-xl p-4 text-center flex items-center justify-center gap-2">
                    <FaPhone className="text-blue-600 w-5 h-5" />
                    <p className="text-blue-700 font-semibold text-sm">
                      Siz bilan tez orada bog'lanamiz
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Yordam (help) */}
        <div className="px-6 py-8 bg-gradient-to-br from-blue-50 to-indigo-100 my-5 rounded-2xl border-2 border-blue-200 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-500 p-3 rounded-full">
              <FaCheckCircle className="text-white w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">
              Ro'yxatdan o'tish tartibi
            </h3>
          </div>

          <div className="space-y-4">
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-blue-100 hover:shadow-md transition-all">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2.5 rounded-lg">
                  <FaUser className="text-blue-600 w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500 font-medium">Ismi</p>
                  <p className="text-lg font-semibold text-gray-800">Aziz</p>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-blue-100 hover:shadow-md transition-all">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2.5 rounded-lg">
                  <FaPhone className="text-green-600 w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500 font-medium">Tel raqam</p>
                  <p className="text-lg font-semibold text-gray-800">
                    +998 93 277 90 90
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-blue-100 hover:shadow-md transition-all">
              <div className="flex items-center gap-3">
                <div className="bg-indigo-100 p-2.5 rounded-lg">
                  <FaTelegramPlane className="text-indigo-600 w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500 font-medium">
                    Tg/WhatsApp
                  </p>
                  <p className="text-lg font-semibold text-gray-800">
                    @azizbek
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="px-6 py-8 bg-gradient-to-br my-5 rounded-lg from-blue-500 to-blue-600">
          <h3 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
            ⚡ Kurs Afzalliklari:
          </h3>
          <ul className="space-y-3">
            {benefits.map((benefit, idx) => (
              <li
                key={idx}
                className="flex items-center gap-3 text-base text-white"
              >
                <div className="bg-white text-blue-600 rounded-full p-1 flex-shrink-0">
                  <FaCheckCircle className="w-4 h-4" />
                </div>
                {benefit}
              </li>
            ))}
          </ul>
        </div>

        {/* Gift Section */}
        <section className="bg-blue-200 py-12 rounded-md">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 pl-36 border border-gray/60 shadow-lg relative overflow-visible">
              <div className="flex items-center">
                <img
                  className="absolute left-[-20px] w-44 h-auto drop-shadow-2xl transform hover:scale-105 transition-transform"
                  src="book3.png"
                  alt="Bepul kitob"
                />
                <div className="flex-1 text-left pl-0 sm:pl-6">
                  <h4 className="text-xl font-bold mb-1 text-gray-800">
                    BEPUL SOVG'A!
                  </h4>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Hoziroq ro'yxatdan o'ting va{" "}
                    <span className="font-bold text-blue-600">
                      "Ko'chada gaplashamiz"
                    </span>{" "}
                    audio kitobini bepul qo'lga kiriting
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <div className="px-6 py-8 bg-gray-50 rounded-md my-5">
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-center text-white shadow-xl"
              >
                <div className="text-3xl font-black mb-2">{stat.num}</div>
                <div className="text-sm opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="px-6 py-8 bg-white">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            💬 O'quvchilar Fikrlari
          </h2>
          <div className="relative min-h-[200px]">
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className={`transition-all duration-500 ${
                  idx === activeTestimonial
                    ? "opacity-100 transform scale-100"
                    : "opacity-0 absolute inset-0 transform scale-95 pointer-events-none"
                }`}
              >
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 shadow-lg">
                  <div className="flex gap-1 mb-3 justify-center">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FaStar key={i} className="w-5 h-5 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-lg text-gray-700 text-center mb-3 italic">
                    "{testimonial.text}"
                  </p>
                  <p className="text-center font-bold text-blue-600">
                    — {testimonial.name}
                  </p>
                </div>
              </div>
            ))}
            <div className="flex justify-center gap-2 mt-4">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTestimonial(idx)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    idx === activeTestimonial
                      ? "bg-blue-600 w-8"
                      : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <section
          style={{
            backgroundImage: "url('/form-background2.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className=" rounded-xl py-12 px-4"
        >
          <div className="px-6 py-8 rounded-2xl bg-white/20 backdrop-blur-sm border border-blue-600 shadow-lg">
            <h3 className="text-2xl font-bold text-center mb-6 text-blue-600 drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
              🎁 Chegirmani qo'lga kiritish uchun
            </h3>

            <div className="space-y-4">
              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 w-5 h-5 z-10 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Ismingiz"
                  value={bottomName}
                  onChange={(e) => setBottomName(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white backdrop-blur-sm border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all text-lg placeholder:text-gray-600 relative z-0"
                />
              </div>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl z-10 pointer-events-none">
                  🇺🇿
                </span>
                <input
                  type="tel"
                  placeholder="+998 90 555 55 55"
                  value={bottomPhone}
                  onChange={handleBottomPhoneChange}
                  className="w-full pl-12 pr-4 py-4 bg-white backdrop-blur-sm border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all text-lg placeholder:text-gray-600 relative z-0"
                />
              </div>

              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 flex gap-1 z-10 pointer-events-none">
                  <FaTelegramPlane className="text-blue-500 w-4 h-4" />
                  <FaWhatsapp className="text-green-600 w-4 h-4" />
                </div>
                <input
                  type="text"
                  placeholder="Telegram/WhatsApp"
                  value={bottomExtraPhone}
                  onChange={(e) => setBottomExtraPhone(e.target.value)}
                  className="w-full pl-14 pr-4 py-4 bg-white backdrop-blur-sm border-2 border-gray-300 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 outline-none transition-all text-lg placeholder:text-gray-600 relative z-0"
                />
              </div>

              <button
                onClick={handleBottomSubmit}
                disabled={bottomLoading}
                className={`w-full py-4 rounded-xl font-bold text-lg text-white transition-all duration-300 transform hover:scale-105 shadow-xl ${
                  bottomSuccess
                    ? "bg-gradient-to-r from-green-500 to-emerald-600"
                    : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                } disabled:opacity-50 flex items-center justify-center gap-2`}
              >
                {bottomLoading ? (
                  <>
                    <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                    Yuborilmoqda...
                  </>
                ) : bottomSuccess ? (
                  <>
                    <FaCheckCircle className="w-6 h-6" />
                    Muvaffaqiyatli!
                  </>
                ) : (
                  <>
                    Ro'yxatdan O'ting
                    <span className="text-2xl">→</span>
                  </>
                )}
              </button>

              {bottomSuccess && (
                <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 text-center flex items-center justify-center gap-2 border border-white/80">
                  <FaPhone className="text-blue-600 w-5 h-5" />
                  <p className="text-blue-600 font-semibold text-sm">
                    Siz bilan tez orada bog'lanamiz
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PremiumLandingPage;
