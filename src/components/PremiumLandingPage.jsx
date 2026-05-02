import React, { useState, useEffect, useRef } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

/* ─── Firebase ─── */
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

/* ─── Slide data – o'zingizning rasmlaringizni qo'ying ─── */
const SLIDES = [
  {
    image: "/slide1.jpg",          // o'z rasmingiz
    title: "TALABALARIMIZNING",
    subtitle: "NATIJALARI",
    big: "B2",
    bigSub: "Darajasi",
    bg: "linear-gradient(160deg,#2d2d2d 0%,#1a1a2e 100%)",
  },
  {
    image: "/slide2.jpg",
    title: "0 DAN RAZGOVORGACHA",
    subtitle: "ATIGI",
    big: "60",
    bigSub: "Kunda",
    bg: "linear-gradient(160deg,#1a3a5c 0%,#0d1b2a 100%)",
  },
  {
    image: "/slide3.jpg",
    title: "MAMNUN O'QUVCHILAR",
    subtitle: "BIZDA",
    big: "95%",
    bigSub: "Natija",
    bg: "linear-gradient(160deg,#1d3c2f 0%,#0a1f14 100%)",
  },
];



/* ─── Helpers ─── */
function formatPhone(v) {
  const n = v.replace(/\D/g, "");
  if (!n.length) return "";
  const after = n.startsWith("998") ? n.slice(3) : n;
  let f = "+998";
  if (after.length > 0) f += " " + after.slice(0, 2);
  if (after.length > 2) f += " " + after.slice(2, 5);
  if (after.length > 5) f += " " + after.slice(5, 7);
  if (after.length > 7) f += " " + after.slice(7, 9);
  return f;
}

/* ─── Icons (inline SVG, no extra deps) ─── */
const IconUser = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);
const IconPhone = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.6 3.36a2 2 0 0 1 2-2.18h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);
const IconTelegram = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="#2AABEE">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.17 13.667l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.978.892z"/>
  </svg>
);
const IconWhatsApp = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="#25D366">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.025.507 3.934 1.397 5.61L0 24l6.554-1.374A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.8 9.8 0 0 1-5.002-1.368l-.36-.214-3.888.815.826-3.777-.235-.389A9.79 9.79 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
  </svg>
);
const IconCheck = ({ color = "#1d6fe5", size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const FlagUZ = () => (
  <svg width="20" height="14" viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg" style={{ borderRadius: 2, flexShrink: 0 }}>
    <rect width="60" height="40" fill="#1EB53A"/>
    <rect width="60" height="13.3" fill="#0099B5"/>
    <rect y="13.3" width="60" height="2" fill="#fff"/>
    <rect y="24.7" width="60" height="2" fill="#fff"/>
    {/* Crescent */}
    <circle cx="14" cy="6.5" r="4" fill="#fff"/>
    <circle cx="16" cy="6.5" r="3.1" fill="#0099B5"/>
    {/* Stars - row 1 */}
    <g fill="#fff" fontSize="2">
      {[0,1,2].map(i => (
        <polygon key={i}
          points="0,-1.2 0.35,-0.48 1.14,-0.37 0.57,0.18 0.7,0.97 0,0.6 -0.7,0.97 -0.57,0.18 -1.14,-0.37 -0.35,-0.48"
          transform={`translate(${21 + i*4},5)`}
          style={{ transform: `translate(${21 + i*4}px, 5px) scale(1.5)` }}
        />
      ))}
      {[0,1,2,3].map(i => (
        <polygon key={i+3}
          points="0,-1.2 0.35,-0.48 1.14,-0.37 0.57,0.18 0.7,0.97 0,0.6 -0.7,0.97 -0.57,0.18 -1.14,-0.37 -0.35,-0.48"
          transform={`translate(${19 + i*4},8.5)`}
          style={{ transform: `translate(${19 + i*4}px, 8.5px) scale(1.5)` }}
        />
      ))}
      {[0,1,2].map(i => (
        <polygon key={i+7}
          points="0,-1.2 0.35,-0.48 1.14,-0.37 0.57,0.18 0.7,0.97 0,0.6 -0.7,0.97 -0.57,0.18 -1.14,-0.37 -0.35,-0.48"
          transform={`translate(${21 + i*4},12)`}
          style={{ transform: `translate(${21 + i*4}px, 12px) scale(1.5)` }}
        />
      ))}
    </g>
  </svg>
);

const FlagRU = () => (
  <svg width="20" height="14" viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg" style={{ borderRadius: 2, flexShrink: 0 }}>
    <rect width="60" height="40" fill="#fff"/>
    <rect y="13.3" width="60" height="13.4" fill="#0039A6"/>
    <rect y="26.7" width="60" height="13.3" fill="#D52B1E"/>
  </svg>
);

const IconChevron = ({ dir = "right" }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
    style={{ transform: dir === "left" ? "rotate(180deg)" : "none" }}>
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);

/* ─── LeadForm ─── */
function LeadForm({ formLocation, dark = false }) {
  const [name, setName]       = useState("");
  const [phone, setPhone]     = useState("");
  const [contact, setContact] = useState("telegram");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [lang, setLang]       = useState("uz");

  const handlePhone = (e) => {
    const v = e.target.value;
    if (v === "" || v === "+") { setPhone(""); return; }
    setPhone(formatPhone(v));
  };

  const submit = async () => {
    if (name.trim().length < 2) { alert("Ismingizni kiriting"); return; }
    const nums = phone.replace(/\D/g, "");
    if (!nums || nums.length !== 12) { alert("To'liq telefon raqam kiriting (+998 XX XXX XX XX)"); return; }
    setLoading(true);
    try {
      const now = new Date();
      await addDoc(collection(db, "registrations"), {
        name: name.trim(),
        phone,
        contactType: contact,
        username: username.trim(),
        lang,
        date: now.toLocaleDateString("uz-UZ"),
        time: now.toLocaleTimeString("uz-UZ"),
        timestamp: now.toISOString(),
        createdAt: serverTimestamp(),
        formLocation,
      });
      if (window.fbq) window.fbq("track", "Lead");
      setSuccess(true);
      setName(""); setPhone(""); setUsername("");
      setTimeout(() => setSuccess(false), 4000);
    } catch (err) {
      console.error(err);
      alert("Xato yuz berdi, qayta urinib ko'ring.");
    } finally {
      setLoading(false);
    }
  };

  const inp = {
    width: "100%", boxSizing: "border-box",
    padding: "13px 16px 13px 46px",
    border: dark ? "1.5px solid rgba(255,255,255,0.22)" : "1.5px solid #e2e8f0",
    borderRadius: 12,
    fontSize: 15, fontFamily: "inherit",
    color: dark ? "#fff" : "#1e293b",
    background: dark ? "rgba(255,255,255,0.08)" : "#f8fafc",
    outline: "none", transition: "border 0.2s, box-shadow 0.2s",
  };
  const iconWrap = {
    position: "absolute", left: 14, top: "50%",
    transform: "translateY(-50%)",
    color: dark ? "rgba(255,255,255,0.5)" : "#94a3b8",
    display: "flex", alignItems: "center", pointerEvents: "none",
  };

  return (
    <div>
      {/* Name */}
      <div style={{ position: "relative", marginBottom: 12 }}>
        <span style={iconWrap}><IconUser /></span>
        <input style={inp} type="text" placeholder="Ismingiz"
          value={name} onChange={e => setName(e.target.value)} />
      </div>

      {/* Phone */}
      <div style={{ position: "relative", marginBottom: 12 }}>
        <span style={{ ...iconWrap, display: "flex", alignItems: "center" }}><FlagUZ /></span>
        <input style={inp} type="tel" placeholder="+998 90 555 55 55"
          value={phone} onChange={handlePhone} />
      </div>

      {/* Contact type label */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
        <span style={{ fontSize: 13, color: dark ? "rgba(255,255,255,0.55)" : "#94a3b8" }}>
          Qo'shimcha aloqa:
        </span>
        {["telegram","whatsapp"].map(c => (
          <button key={c} onClick={() => setContact(c)} style={{
            border: contact === c ? "1.5px solid #1d6fe5" : dark ? "1.5px solid rgba(255,255,255,0.2)" : "1.5px solid #e2e8f0",
            borderRadius: 20, padding: "4px 12px", fontSize: 12, fontFamily: "inherit",
            color: contact === c ? "#1d6fe5" : dark ? "rgba(255,255,255,0.6)" : "#64748b",
            background: "transparent", cursor: "pointer",
            display: "flex", alignItems: "center", gap: 5, fontWeight: contact === c ? 700 : 400,
          }}>
            {c === "telegram" ? <IconTelegram /> : <IconWhatsApp />}
            {c === "telegram" ? "Telegram" : "WhatsApp"}
          </button>
        ))}
      </div>

      {/* Username */}
      <div style={{ position: "relative", marginBottom: 4 }}>
        <span style={{ ...iconWrap }}>
          {contact === "telegram" ? <IconTelegram /> : <IconWhatsApp />}
        </span>
        <input style={inp} type="text" placeholder="@username"
          value={username} onChange={e => setUsername(e.target.value)} />
      </div>
      <div style={{ textAlign: "right", fontSize: 12, color: dark ? "rgba(255,255,255,0.35)" : "#94a3b8", marginBottom: 16 }}>
        Majburiy emas
      </div>

      {/* Submit */}
      <button onClick={submit} disabled={loading} style={{
        width: "100%", padding: "15px", border: "none", borderRadius: 12,
        background: success
          ? "linear-gradient(135deg,#22c55e,#15803d)"
          : "linear-gradient(135deg,#1d6fe5,#1045a8)",
        color: "#fff", fontSize: 16, fontWeight: 800, fontFamily: "inherit",
        cursor: loading ? "not-allowed" : "pointer",
        boxShadow: "0 4px 20px rgba(29,111,229,0.35)",
        display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
        opacity: loading ? 0.75 : 1, transition: "all 0.2s",
      }}>
        {loading ? (
          <><Spinner /> Yuborilmoqda...</>
        ) : success ? (
          <><IconCheck color="#fff" size={18} /> Muvaffaqiyatli!</>
        ) : "Yuborish"}
      </button>

      {/* Lang switcher (only top form) */}
      {formLocation === "top" && (
        <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
          {[{code:"uz",Flag:FlagUZ,label:"O'zbekcha"},{code:"ru",Flag:FlagRU,label:"Русский"}].map(l => (
            <button key={l.code} onClick={() => setLang(l.code)} style={{
              flex: 1, padding: "10px", borderRadius: 10, fontFamily: "inherit",
              fontSize: 14, fontWeight: 700, cursor: "pointer",
              background: lang === l.code ? "#111" : "#fff",
              color: lang === l.code ? "#fff" : "#333",
              border: lang === l.code ? "1.5px solid #111" : "1.5px solid #e2e8f0",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            }}>
              <l.Flag /> {l.label}
            </button>
          ))}
        </div>
      )}

      {success && (
        <div style={{
          marginTop: 12, background: dark ? "rgba(29,111,229,0.2)" : "#eff6ff",
          border: "1.5px solid #1d6fe5", borderRadius: 12,
          padding: "12px 16px", display: "flex", alignItems: "center",
          justifyContent: "center", gap: 8,
        }}>
          <IconPhone /><span style={{ color: "#1d6fe5", fontWeight: 700, fontSize: 14 }}>
            Siz bilan tez orada bog'lanamiz!
          </span>
        </div>
      )}
    </div>
  );
}

function Spinner() {
  return (
    <span style={{
      width: 20, height: 20, borderRadius: "50%",
      border: "3px solid rgba(255,255,255,0.35)",
      borderTop: "3px solid #fff",
      display: "inline-block",
      animation: "spin 0.7s linear infinite",
    }} />
  );
}

/* ─── Slider ─── */
function HeroSlider() {
  const [active, setActive] = useState(0);
  const total = SLIDES.length;

  useEffect(() => {
    const t = setInterval(() => setActive(p => (p + 1) % total), 4500);
    return () => clearInterval(t);
  }, []);

  const s = SLIDES[active];

  return (
    <div style={{
      position: "relative", width: "100%", height: "100%",
      minHeight: 480, overflow: "hidden",
      background: s.bg, transition: "background 0.6s",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
    }}>
      {/* Background image */}
      <img
        key={active}
        src={s.image}
        alt=""
        style={{
          position: "absolute", inset: 0, width: "100%", height: "100%",
          objectFit: "cover", opacity: 0.35,
          animation: "fadeIn 0.6s ease",
        }}
        onError={e => { e.target.style.display = "none"; }}
      />

      {/* Content */}
      <div style={{
        position: "relative", zIndex: 2, textAlign: "center",
        padding: "40px 32px", color: "#fff",
        animation: "slideUp 0.5s ease",
      }}>
        <p style={{ fontSize: 14, fontWeight: 700, letterSpacing: 2, color: "rgba(255,255,255,0.7)", marginBottom: 12, textTransform: "uppercase" }}>
          {s.title}
        </p>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", marginBottom: 20, textTransform: "uppercase", letterSpacing: 1 }}>
          {s.subtitle}
        </p>
        <div style={{
          fontSize: 96, fontWeight: 900, lineHeight: 1,
          color: "#fff", marginBottom: 8,
          textShadow: "0 4px 24px rgba(0,0,0,0.5)",
        }}>
          {s.big}
        </div>
        <div style={{ fontSize: 22, fontWeight: 700, color: "rgba(255,255,255,0.85)" }}>
          {s.bigSub}
        </div>
      </div>

      {/* Arrows */}
      <button onClick={() => setActive((active - 1 + total) % total)} style={{
        position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)",
        background: "rgba(255,255,255,0.15)", border: "none", borderRadius: "50%",
        width: 36, height: 36, cursor: "pointer", color: "#fff",
        display: "flex", alignItems: "center", justifyContent: "center",
        backdropFilter: "blur(4px)",
      }}><IconChevron dir="left" /></button>
      <button onClick={() => setActive((active + 1) % total)} style={{
        position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
        background: "rgba(255,255,255,0.15)", border: "none", borderRadius: "50%",
        width: 36, height: 36, cursor: "pointer", color: "#fff",
        display: "flex", alignItems: "center", justifyContent: "center",
        backdropFilter: "blur(4px)",
      }}><IconChevron dir="right" /></button>

      {/* Dots */}
      <div style={{
        position: "absolute", bottom: 16, left: 0, right: 0,
        display: "flex", justifyContent: "center", gap: 6,
      }}>
        {SLIDES.map((_, i) => (
          <button key={i} onClick={() => setActive(i)} style={{
            width: i === active ? 24 : 8, height: 8, borderRadius: 4,
            background: i === active ? "#fff" : "rgba(255,255,255,0.4)",
            border: "none", cursor: "pointer", padding: 0,
            transition: "all 0.3s",
          }} />
        ))}
      </div>
    </div>
  );
}

/* ─── Main ─── */
const PremiumLandingPage = () => {
  /* Meta Pixel */
  useEffect(() => {
    !(function(f,b,e,v,n,t,s){
      if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];
      t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)
    })(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
    window.fbq('init','1543301330183143');
    window.fbq('track','PageView');
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Nunito', sans-serif; background: #f1f5f9; }
        input::placeholder { color: #94a3b8; }
        input:focus { border-color: #1d6fe5 !important; box-shadow: 0 0 0 3px rgba(29,111,229,0.12) !important; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 0.35; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        button { transition: opacity 0.2s, transform 0.15s; }
        button:hover:not(:disabled) { opacity: 0.9; }

        /* Responsive */
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-slider { min-height: 300px !important; order: -1; }
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
          .benefits-grid { grid-template-columns: 1fr !important; }
          .card-wrap { padding: 16px !important; }
          .section-pad { padding: 28px 20px !important; }

        }
        @media (max-width: 480px) {
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>

      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", padding: "24px 12px 48px", background: "#f1f5f9" }}>
        <div style={{ width: "100%", maxWidth: 980, background: "#fff", borderRadius: 24, overflow: "hidden" }}>

          {/* ── HEADER ── */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 28px", borderBottom: "1px solid #f1f5f9" }}>
            <div style={{
              width: 44, height: 44, background: "#111", borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}>
              {/* logo placeholder – replace with <img src="/logo.png"> */}
              <span style={{ color: "#fff", fontSize: 10, fontWeight: 900, letterSpacing: -0.5, textAlign: "center", lineHeight: 1.2 }}>RS</span>
            </div>
            <div>
              <strong style={{ fontSize: 17, fontWeight: 900, color: "#111", display: "block" }}>RuSpeak</strong>
              <span style={{ fontSize: 11, color: "#94a3b8" }}>Online rus tili maktabi</span>
            </div>
          </div>

          {/* ── HERO: 2 columns ── */}
          <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>

            {/* LEFT: Form */}
            <div className="card-wrap" style={{ padding: "40px 36px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <h1 style={{ fontSize: 28, fontWeight: 900, color: "#111", lineHeight: 1.25, marginBottom: 10 }}>
                <span style={{ color: "#1d6fe5" }}>RUS TILI</span> ni{"\n "}
                o'rganmoqchimisiz?
              </h1>
              <p style={{ fontSize: 14, color: "#64748b", marginBottom: 28, lineHeight: 1.65 }}>
                U holda raqamingizni qoldiring va biz barcha savollaringizga javob beramiz.
              </p>
              <LeadForm formLocation="top" />
            </div>

            {/* RIGHT: Slider */}
            <div className="hero-slider" style={{ minHeight: 480 }}>
              <HeroSlider />
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default PremiumLandingPage;