import React, { useState, useEffect } from "react";

/* ─── Telegram Config ─── */
const TELEGRAM_BOT_TOKEN = "8573291587:AAGcEh78eDRYnNhuiayfVkGA-XwOF8Ij1ks";          // ← o'zgartiring
const TELEGRAM_CHAT_IDS  = ["7671368706", "1613281789"];    // ← chat ID lar

async function sendToTelegram({ name, phone, contactType, username, lang, formLocation }) {
  const contactIcon = contactType === "telegram" ? "📱 Telegram" : "💬 WhatsApp";
  const usernameLine = username ? `${contactIcon}: @${username.replace(/^@/, "")}` : `${contactIcon}: —`;
  const langLabel = lang === "uz" ? "🇺🇿 O'zbekcha" : "🇷🇺 Русский";

  const text =
    `🔥 *YANGI LEAD — RuSpeak*\n` +
    `━━━━━━━━━━━━━━━━━━━━\n` +
    `👤 *Ism:* ${name}\n` +
    `📞 *Telefon:* ${phone}\n` +
    `${usernameLine}\n` +
    `🌐 *Til:* ${langLabel}\n` +
    `📍 *Forma:* ${formLocation}\n` +
    `🕐 *Vaqt:* ${new Date().toLocaleString("uz-UZ")}\n` +
    `━━━━━━━━━━━━━━━━━━━━`;

  await Promise.all(
    TELEGRAM_CHAT_IDS.map(async (chat_id) => {
      const res = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id, text, parse_mode: "Markdown" }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(`[${chat_id}] ${err.description || "Telegram xato"}`);
      }
    })
  );
}

/* ─── Translations ─── */
const T = {
  uz: {
    schoolName: "Online rus tili maktabi",
    heading1: "RUS TILI",
    heading2: "ni o'rganmoqchimisiz?",
    subheading: "U holda raqamingizni qoldiring va biz barcha savollaringizga javob beramiz.",
    namePlaceholder: "Ismingiz",
    phonePlaceholder: "Telefon raqami",
    extraContact: "Qo'shimcha aloqa",
    additionalLabel: "Qo'shimcha aloqa:",
    optional: "Majburiy emas",
    submit: "Yuborish",
    sending: "Yuborilmoqda...",
    successBtn: "Muvaffaqiyatli!",
    callback: "Siz bilan tez orada bog'lanamiz!",
    alertName: "Ismingizni kiriting",
    alertPhone: "To'liq telefon raqam kiriting (+998 XX XXX XX XX)",
    alertError: "Xato yuz berdi, qayta urinib ko\u2019ring.",
    slideLabels: [
      { label: "UZOQDAGILAR", sub: "UCHUN" },
      { label: "OFISDAGILAR", sub: "UCHUN" },
      { label: "OTA-ONALAR",  sub: "UCHUN" },
      { label: "TALABALAR",   sub: "UCHUN" },
    ],
    slides: [
      { title: "TALABALARIMIZNING", subtitle: "NATIJALARI", big: "B2",  bigSub: "Darajasi" },
      { title: "0 DAN RAZGOVORGACHA", subtitle: "ATIGI",     big: "60",  bigSub: "Kunda"    },
      { title: "MAMNUN O'QUVCHILAR",  subtitle: "BIZDA",     big: "95%", bigSub: "Natija"   },
    ],
  },
  ru: {
    schoolName: "Онлайн школа русского языка",
    heading1: "РУССКИЙ ЯЗЫК",
    heading2: "хотите выучить?",
    subheading: "Оставьте номер телефона, и мы ответим на все ваши вопросы.",
    namePlaceholder: "Ваше имя",
    phonePlaceholder: "Номер телефона",
    extraContact: "Дополнительная связь",
    additionalLabel: "Доп. связь:",
    optional: "Не обязательно",
    submit: "Отправить",
    sending: "Отправляется...",
    successBtn: "Успешно!",
    callback: "Мы свяжемся с вами в ближайшее время!",
    alertName: "Введите ваше имя",
    alertPhone: "Введите полный номер телефона (+998 XX XXX XX XX)",
    alertError: "Произошла ошибка, попробуйте ещё раз.",
    slideLabels: [
      { label: "ДЛЯ ТЕХ,",     sub: "КТО ДАЛЕКО"  },
      { label: "ДЛЯ",          sub: "ОФИСНЫХ"      },
      { label: "ДЛЯ",          sub: "РОДИТЕЛЕЙ"    },
      { label: "ДЛЯ",          sub: "СТУДЕНТОВ"    },
    ],
    slides: [
      { title: "РЕЗУЛЬТАТЫ НАШИХ",    subtitle: "УЧЕНИКОВ", big: "B2",  bigSub: "Уровень"   },
      { title: "С НУЛЯ ДО РАЗГОВОРА", subtitle: "ВСЕГО ЗА", big: "60",  bigSub: "Дней"      },
      { title: "ДОВОЛЬНЫХ УЧЕНИКОВ",  subtitle: "У НАС",    big: "95%", bigSub: "Результат" },
    ],
  },
};

const SLIDE_IMAGES         = ["/slide1.jpg", "/slide2.jpg", "/slide3.jpg"];
const SLIDE_BGS            = [
  "linear-gradient(160deg,#2d2d2d 0%,#1a1a2e 100%)",
  "linear-gradient(160deg,#1a3a5c 0%,#0d1b2a 100%)",
  "linear-gradient(160deg,#1d3c2f 0%,#0a1f14 100%)",
];
const MOBILE_IMAGES        = ["/slide1.jpg", "/slide2.jpg", "/slide3.jpg", "/slide4.jpg"];
const MOBILE_FALLBACK_BGS  = [
  "linear-gradient(160deg,#2d2d2d,#1a1a2e)",
  "linear-gradient(160deg,#1a3a5c,#0d1b2a)",
  "linear-gradient(160deg,#1d3c2f,#0a1f14)",
  "linear-gradient(160deg,#3c1d1d,#1f0a0a)",
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

/* ─── Icons ─── */
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
const IconCheck = ({ color = "#fff", size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const IconChevron = ({ dir = "right" }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
    style={{ transform: dir === "left" ? "rotate(180deg)" : "none" }}>
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);
const IconChevronDown = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);
const FlagUZ = ({ w = 20 }) => (
  <svg width={w} height={Math.round(w * 0.7)} viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg" style={{ borderRadius: 2, flexShrink: 0 }}>
    <rect width="60" height="40" fill="#1EB53A"/>
    <rect width="60" height="13.3" fill="#0099B5"/>
    <rect y="13.3" width="60" height="2" fill="#fff"/>
    <rect y="24.7" width="60" height="2" fill="#fff"/>
    <circle cx="14" cy="6.5" r="4" fill="#fff"/>
    <circle cx="16" cy="6.5" r="3.1" fill="#0099B5"/>
    <g fill="#fff">
      {[0,1,2].map(i => <polygon key={i} points="0,-1.2 0.35,-0.48 1.14,-0.37 0.57,0.18 0.7,0.97 0,0.6 -0.7,0.97 -0.57,0.18 -1.14,-0.37 -0.35,-0.48" style={{ transform: `translate(${21+i*4}px,5px) scale(1.5)` }} />)}
      {[0,1,2,3].map(i => <polygon key={i+3} points="0,-1.2 0.35,-0.48 1.14,-0.37 0.57,0.18 0.7,0.97 0,0.6 -0.7,0.97 -0.57,0.18 -1.14,-0.37 -0.35,-0.48" style={{ transform: `translate(${19+i*4}px,8.5px) scale(1.5)` }} />)}
      {[0,1,2].map(i => <polygon key={i+7} points="0,-1.2 0.35,-0.48 1.14,-0.37 0.57,0.18 0.7,0.97 0,0.6 -0.7,0.97 -0.57,0.18 -1.14,-0.37 -0.35,-0.48" style={{ transform: `translate(${21+i*4}px,12px) scale(1.5)` }} />)}
    </g>
  </svg>
);
const FlagRU = ({ w = 20 }) => (
  <svg width={w} height={Math.round(w * 0.7)} viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg" style={{ borderRadius: 2, flexShrink: 0 }}>
    <rect width="60" height="40" fill="#fff"/>
    <rect y="13.3" width="60" height="13.4" fill="#0039A6"/>
    <rect y="26.7" width="60" height="13.3" fill="#D52B1E"/>
  </svg>
);

/* ─── Spinner ─── */
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

/* ─── LangSwitcher (compact, for header) ─── */
function LangSwitcherHeader({ lang, setLang }) {
  return (
    <div style={{ display: "flex", gap: 6 }}>
      {[
        { code: "uz", Flag: FlagUZ, label: "" },
        { code: "ru", Flag: FlagRU, label: "" },
      ].map(l => (
        <button key={l.code} onClick={() => setLang(l.code)} style={{
          padding: "7px 10px", borderRadius: 10,
          fontFamily: "inherit", fontSize: 13, fontWeight: 700, cursor: "pointer",
          background: lang === l.code ? "#111" : "#f3f4f6",
          color: lang === l.code ? "#fff" : "#555",
          border: lang === l.code ? "1.5px solid #111" : "1.5px solid #e2e8f0",
          display: "flex", alignItems: "center", gap: 5, transition: "all 0.18s",
        }}>
          <l.Flag w={18} /> {l.label}
        </button>
      ))}
    </div>
  );
}

/* ─── LangSwitcher (full width, for below form on desktop) ─── */
function LangSwitcherFull({ lang, setLang }) {
  return (
    <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
      {[
        { code: "uz", Flag: FlagUZ, label: "O'zbekcha" },
        { code: "ru", Flag: FlagRU, label: "Русский" },
      ].map(l => (
        <button key={l.code} onClick={() => setLang(l.code)} style={{
          flex: 1, padding: "11px 10px", borderRadius: 12,
          fontFamily: "inherit", fontSize: 14, fontWeight: 700, cursor: "pointer",
          background: lang === l.code ? "#111" : "#fff",
          color: lang === l.code ? "#fff" : "#333",
          border: lang === l.code ? "1.5px solid #111" : "1.5px solid #e2e8f0",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
          transition: "all 0.18s",
        }}>
          <l.Flag w={20} /> {l.label}
        </button>
      ))}
    </div>
  );
}

/* ─── Desktop LeadForm ─── */
function LeadFormDesktop({ lang, setLang, formLocation }) {
  const t = T[lang];
  const [name, setName]         = useState("");
  const [phone, setPhone]       = useState("");
  const [contact, setContact]   = useState("telegram");
  const [username, setUsername] = useState("");
  const [loading, setLoading]   = useState(false);
  const [success, setSuccess]   = useState(false);

  const handlePhone = (e) => {
    const v = e.target.value;
    if (v === "" || v === "+") { setPhone(""); return; }
    setPhone(formatPhone(v));
  };

  const submit = async () => {
    if (name.trim().length < 2) { alert(t.alertName); return; }
    const nums = phone.replace(/\D/g, "");
    if (!nums || nums.length !== 12) { alert(t.alertPhone); return; }
    setLoading(true);
    try {
      await sendToTelegram({
        name: name.trim(),
        phone,
        contactType: contact,
        username: username.trim(),
        lang,
        formLocation,
      });
      if (window.fbq) window.fbq("track", "Lead");
      setSuccess(true);
      setName(""); setPhone(""); setUsername("");
      setTimeout(() => setSuccess(false), 4000);
    } catch (err) { console.error(err); alert(t.alertError); }
    finally { setLoading(false); }
  };

  const inp = {
    width: "100%", boxSizing: "border-box",
    padding: "13px 16px 13px 46px",
    border: "1.5px solid #e2e8f0", borderRadius: 12,
    fontSize: 15, fontFamily: "inherit", color: "#1e293b",
    background: "#f8fafc", outline: "none",
    transition: "border 0.2s, box-shadow 0.2s",
  };
  const iconWrap = {
    position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)",
    color: "#94a3b8", display: "flex", alignItems: "center", pointerEvents: "none",
  };

  return (
    <div>
      {/* Name */}
      <div style={{ position: "relative", marginBottom: 12 }}>
        <span style={iconWrap}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
          </svg>
        </span>
        <input className="desk-inp" style={inp} type="text" placeholder={t.namePlaceholder}
          value={name} onChange={e => setName(e.target.value)} />
      </div>

      {/* Phone */}
      <div style={{ position: "relative", marginBottom: 12 }}>
        <span style={{ ...iconWrap, display: "flex", alignItems: "center" }}><FlagUZ /></span>
        <input className="desk-inp" style={inp} type="tel" placeholder="+998 90 555 55 55"
          value={phone} onChange={handlePhone} />
      </div>

      {/* Contact type */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
        <span style={{ fontSize: 13, color: "#94a3b8" }}>{t.additionalLabel}</span>
        {["telegram", "whatsapp"].map(c => (
          <button key={c} onClick={() => setContact(c)} style={{
            border: contact === c ? "1.5px solid #1d6fe5" : "1.5px solid #e2e8f0",
            borderRadius: 20, padding: "4px 12px", fontSize: 12, fontFamily: "inherit",
            color: contact === c ? "#1d6fe5" : "#64748b",
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
        <span style={iconWrap}>{contact === "telegram" ? <IconTelegram /> : <IconWhatsApp />}</span>
        <input className="desk-inp" style={inp} type="text" placeholder="@username"
          value={username} onChange={e => setUsername(e.target.value)} />
      </div>
      <div style={{ textAlign: "right", fontSize: 12, color: "#94a3b8", marginBottom: 16 }}>{t.optional}</div>

      {/* Submit */}
      <button onClick={submit} disabled={loading} style={{
        width: "100%", padding: "15px", border: "none", borderRadius: 12,
        background: success ? "linear-gradient(135deg,#22c55e,#15803d)" : "linear-gradient(135deg,#1d6fe5,#1045a8)",
        color: "#fff", fontSize: 16, fontWeight: 800, fontFamily: "inherit",
        cursor: loading ? "not-allowed" : "pointer",
        boxShadow: "0 4px 20px rgba(29,111,229,0.35)",
        display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
        opacity: loading ? 0.75 : 1, transition: "all 0.2s",
      }}>
        {loading ? <><Spinner />{t.sending}</> : success ? <><IconCheck />{t.successBtn}</> : t.submit}
      </button>

      {/* Lang switcher — desktop only, BELOW submit */}
      <LangSwitcherFull lang={lang} setLang={setLang} />

      {/* Success */}
      {success && (
        <div style={{
          marginTop: 12, background: "#eff6ff",
          border: "1.5px solid #1d6fe5", borderRadius: 12,
          padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
        }}>
          <IconPhone />
          <span style={{ color: "#1d6fe5", fontWeight: 700, fontSize: 14 }}>{t.callback}</span>
        </div>
      )}
    </div>
  );
}

/* ─── Mobile LeadForm ─── */
function LeadFormMobile({ lang, formLocation }) {
  const t = T[lang];
  const [name, setName]         = useState("");
  const [phone, setPhone]       = useState("");
  const [contact, setContact]   = useState("telegram");
  const [username, setUsername] = useState("");
  const [loading, setLoading]   = useState(false);
  const [success, setSuccess]   = useState(false);
  const [showExtra, setShowExtra] = useState(false);

  const submit = async () => {
    if (name.trim().length < 2) { alert(t.alertName); return; }
    const nums = phone.replace(/\D/g, "");
    if (!nums || nums.length !== 12) { alert(t.alertPhone); return; }
    setLoading(true);
    try {
      await sendToTelegram({
        name: name.trim(),
        phone,
        contactType: contact,
        username: username.trim(),
        lang,
        formLocation,
      });
      if (window.fbq) window.fbq("track", "Lead");
      setSuccess(true);
      setName(""); setPhone(""); setUsername("");
      setTimeout(() => setSuccess(false), 4000);
    } catch (err) { console.error(err); alert(t.alertError); }
    finally { setLoading(false); }
  };

  const fieldBase = {
    width: "100%", boxSizing: "border-box",
    border: "1.5px solid #e8eaed", borderRadius: 14,
    fontSize: 15, fontFamily: "inherit", color: "#111",
    background: "#f9fafb", outline: "none",
  };

  return (
    <div>
      {/* Name */}
      <div style={{ marginBottom: 12 }}>
        <input className="mob-inp" style={{ ...fieldBase, padding: "16px 18px" }}
          type="text" placeholder={t.namePlaceholder}
          value={name} onChange={e => setName(e.target.value)} />
      </div>

      {/* Phone */}
      <div style={{ marginBottom: 12 }}>
        <div style={{ display: "flex", alignItems: "center", border: "1.5px solid #e8eaed", borderRadius: 14, background: "#f9fafb", overflow: "hidden" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 5, padding: "0 12px", borderRight: "1px solid #e8eaed", height: 52, flexShrink: 0 }}>
            <FlagUZ /><span style={{ fontSize: 14, fontWeight: 700, color: "#111" }}>+998</span>
            <IconChevronDown />
          </div>
          <input className="mob-inp"
            style={{ flex: 1, border: "none", outline: "none", padding: "0 14px", height: 52, fontSize: 15, fontFamily: "inherit", color: "#111", background: "transparent" }}
            type="tel" placeholder={t.phonePlaceholder}
            value={phone.replace(/^\+998\s?/, "")}
            onChange={e => { const raw = "998" + e.target.value.replace(/\D/g, ""); setPhone(formatPhone(raw)); }}
          />
        </div>
      </div>

      {/* Extra toggle */}
      <div style={{ marginBottom: 12 }}>
        <button onClick={() => setShowExtra(v => !v)} style={{
          width: "100%", padding: "15px 18px",
          border: "1.5px solid #e8eaed", borderRadius: 14,
          background: "#f9fafb", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          fontSize: 15, fontFamily: "inherit", color: "#94a3b8",
        }}>
          <span>{t.extraContact}</span>
          <span style={{ display: "flex", transform: showExtra ? "rotate(180deg)" : "none", transition: "0.2s" }}>
            <IconChevronDown />
          </span>
        </button>
      </div>

      {/* Extra: username */}
      {showExtra && (
        <div style={{ marginBottom: 12 }}>
          <div style={{ display: "flex", alignItems: "center", border: "1.5px solid #e8eaed", borderRadius: 14, background: "#f9fafb", overflow: "hidden" }}>
            <button
              onClick={() => setContact(c => c === "telegram" ? "whatsapp" : "telegram")}
              style={{ display: "flex", alignItems: "center", gap: 6, padding: "0 12px", height: 52, flexShrink: 0, background: "none", cursor: "pointer", borderRight: "1px solid #e8eaed", border: "none", borderRight: "1px solid #e8eaed" }}
            >
              {contact === "telegram" ? <IconTelegram /> : <IconWhatsApp />}
              <span style={{ fontSize: 14, fontWeight: 700, color: "#111" }}>{contact === "telegram" ? "Telegram" : "WhatsApp"}</span>
              <IconChevronDown />
            </button>
            <input className="mob-inp"
              style={{ flex: 1, border: "none", outline: "none", padding: "0 14px", height: 52, fontSize: 15, fontFamily: "inherit", color: "#94a3b8", background: "transparent" }}
              type="text" placeholder="@exampleusername"
              value={username} onChange={e => setUsername(e.target.value)}
            />
          </div>
          <div style={{ textAlign: "right", fontSize: 12, color: "#94a3b8", marginTop: 5 }}>{t.optional}</div>
        </div>
      )}

      {/* Submit */}
      <button onClick={submit} disabled={loading} style={{
        width: "100%", padding: "17px", border: "none", borderRadius: 14,
        background: success ? "linear-gradient(135deg,#22c55e,#15803d)" : "linear-gradient(135deg,#1d6fe5,#1045a8)",
        color: "#fff", fontSize: 17, fontWeight: 800, fontFamily: "inherit",
        cursor: loading ? "not-allowed" : "pointer",
        display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
        opacity: loading ? 0.8 : 1, transition: "all 0.2s",
        boxShadow: "0 4px 20px rgba(29,111,229,0.35)",
      }}>
        {loading ? <><Spinner />{t.sending}</> : success ? <><IconCheck />{t.successBtn}</> : t.submit}
      </button>

      {/* Success */}
      {success && (
        <div style={{
          marginTop: 12, background: "#eff6ff",
          border: "1.5px solid #1d6fe5", borderRadius: 14,
          padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
        }}>
          <IconPhone />
          <span style={{ color: "#1d6fe5", fontWeight: 700, fontSize: 14 }}>{t.callback}</span>
        </div>
      )}
    </div>
  );
}

/* ─── Desktop HeroSlider ─── */
function HeroSlider({ lang }) {
  const [active, setActive] = useState(0);
  const slides = T[lang].slides;
  const total  = slides.length;

  useEffect(() => {
    const timer = setInterval(() => setActive(p => (p + 1) % total), 4500);
    return () => clearInterval(timer);
  }, [total]);

  const s = slides[active];

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", minHeight: 480, overflow: "hidden", background: SLIDE_BGS[active], transition: "background 0.6s", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <img key={`${lang}-${active}`} src={SLIDE_IMAGES[active]} alt=""
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.35, animation: "fadeIn 0.6s ease" }}
        onError={e => { e.target.style.display = "none"; }} />
      <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "40px 32px", color: "#fff", animation: "slideUp 0.5s ease" }}>
        <p style={{ fontSize: 14, fontWeight: 700, letterSpacing: 2, color: "rgba(255,255,255,0.7)", marginBottom: 12, textTransform: "uppercase" }}>{s.title}</p>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", marginBottom: 20, textTransform: "uppercase", letterSpacing: 1 }}>{s.subtitle}</p>
        <div style={{ fontSize: 96, fontWeight: 900, lineHeight: 1, color: "#fff", marginBottom: 8, textShadow: "0 4px 24px rgba(0,0,0,0.5)" }}>{s.big}</div>
        <div style={{ fontSize: 22, fontWeight: 700, color: "rgba(255,255,255,0.85)" }}>{s.bigSub}</div>
      </div>
      <button onClick={() => setActive((active - 1 + total) % total)} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.15)", border: "none", borderRadius: "50%", width: 36, height: 36, cursor: "pointer", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(4px)" }}>
        <IconChevron dir="left" />
      </button>
      <button onClick={() => setActive((active + 1) % total)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.15)", border: "none", borderRadius: "50%", width: 36, height: 36, cursor: "pointer", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(4px)" }}>
        <IconChevron dir="right" />
      </button>
      <div style={{ position: "absolute", bottom: 16, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 6 }}>
        {slides.map((_, i) => (
          <button key={i} onClick={() => setActive(i)} style={{ width: i === active ? 24 : 8, height: 8, borderRadius: 4, background: i === active ? "#fff" : "rgba(255,255,255,0.4)", border: "none", cursor: "pointer", padding: 0, transition: "all 0.3s" }} />
        ))}
      </div>
    </div>
  );
}

/* ─── Mobile Carousel ─── */
function MobileCarousel({ lang }) {
  const [active, setActive] = useState(0);
  const labels = T[lang].slideLabels;
  const total  = labels.length;

  useEffect(() => {
    const timer = setInterval(() => setActive(p => (p + 1) % total), 4500);
    return () => clearInterval(timer);
  }, [total]);

  const s = labels[active];

  return (
    <div style={{ position: "relative", width: "100%", borderRadius: 18, overflow: "hidden", height: 260, background: MOBILE_FALLBACK_BGS[active], transition: "background 0.6s" }}>
      <img key={`${lang}-${active}`} src={MOBILE_IMAGES[active]} alt={s.label}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.55, animation: "fadeIn 0.5s ease" }}
        onError={e => { e.target.style.display = "none"; }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)" }} />
      <div style={{ position: "absolute", bottom: 40, left: 0, right: 0, textAlign: "center", animation: "slideUp 0.4s ease" }}>
        <div style={{ color: "#fff", fontSize: 20, fontWeight: 900, letterSpacing: 1 }}>{s.label}</div>
        <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, fontWeight: 700, letterSpacing: 2 }}>{s.sub}</div>
      </div>
      <button onClick={() => setActive((active - 1 + total) % total)} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.18)", border: "none", borderRadius: "50%", width: 34, height: 34, cursor: "pointer", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(4px)" }}>
        <IconChevron dir="left" />
      </button>
      <button onClick={() => setActive((active + 1) % total)} style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.18)", border: "none", borderRadius: "50%", width: 34, height: 34, cursor: "pointer", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(4px)" }}>
        <IconChevron dir="right" />
      </button>
      <div style={{ position: "absolute", bottom: 12, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 6 }}>
        {labels.map((_, i) => (
          <button key={i} onClick={() => setActive(i)} style={{ width: i === active ? 22 : 8, height: 8, borderRadius: 4, background: i === active ? "#fff" : "rgba(255,255,255,0.45)", border: "none", cursor: "pointer", padding: 0, transition: "all 0.3s" }} />
        ))}
      </div>
    </div>
  );
}

/* ─── Main ─── */
const PremiumLandingPage = () => {
  const [lang, setLang] = useState("uz");

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

  const t = T[lang];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Nunito', sans-serif; background: #fff; -webkit-font-smoothing: antialiased; }
        input::placeholder { color: #94a3b8; }
        input:focus { outline: none; }
        @keyframes spin    { to { transform: rotate(360deg); } }
        @keyframes fadeIn  { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        button { transition: opacity 0.2s, transform 0.15s; font-family: 'Nunito', sans-serif; }
        button:hover:not(:disabled) { opacity: 0.9; }
        .desk-inp:focus { border-color: #1d6fe5 !important; box-shadow: 0 0 0 3px rgba(29,111,229,0.12) !important; }
        .mob-inp:focus  { border-color: #1d6fe5 !important; box-shadow: 0 0 0 3px rgba(29,111,229,0.12) !important; }

        /* ── visibility ── */
        .only-desktop { display: block; }
        .only-mobile  { display: none;  }
        @media (max-width: 768px) {
          .only-desktop { display: none !important; }
          .only-mobile  { display: block !important; }
        }
        @media (min-width: 769px) {
          .hero-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 768px) {
          .card-wrap   { padding: 16px !important; }
          .section-pad { padding: 28px 20px !important; }
        }
      `}</style>

      {/* ════ DESKTOP ════ */}
      <div className="only-desktop">
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", padding: "24px 12px 48px", background: "#fff" }}>
          <div style={{ width: "100%", maxWidth: 980, background: "#fff", borderRadius: 24, overflow: "hidden" }}>

            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", padding: "12px 28px", borderBottom: "1px solid #f1f5f9" }}>
              <img src="/logotip.png" alt="RuSpeak" style={{ height: 48, width: "auto", objectFit: "contain", display: "block" }} />
            </div>

            {/* Hero 2-col */}
            <div className="hero-grid" style={{ display: "grid" }}>
              <div className="card-wrap" style={{ padding: "40px 36px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <h1 style={{ fontSize: 28, fontWeight: 900, color: "#111", lineHeight: 1.25, marginBottom: 10 }}>
                  <span style={{ color: "#1d6fe5" }}>{t.heading1}</span> {t.heading2}
                </h1>
                <p style={{ fontSize: 14, color: "#64748b", marginBottom: 28, lineHeight: 1.65 }}>{t.subheading}</p>
                <LeadFormDesktop lang={lang} setLang={setLang} formLocation="top" />
              </div>
              <div style={{ minHeight: 480 }}>
                <HeroSlider lang={lang} />
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ════ MOBILE ════ */}
      <div className="only-mobile">
        <div style={{ minHeight: "100vh", background: "#fff", maxWidth: 480, margin: "0 auto" }}>

          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 18px", borderBottom: "1px solid #f1f5f9" }}>
            <img src="/logotip.png" alt="RuSpeak" style={{ height: 38, width: "auto", objectFit: "contain", display: "block" }} />
            <LangSwitcherHeader lang={lang} setLang={setLang} />
          </div>

          {/* Carousel */}
          <div style={{ padding: "14px 16px 0" }}>
            <MobileCarousel lang={lang} />
          </div>

          {/* Text + Form */}
          <div style={{ padding: "18px 16px 40px" }}>
            <h1 style={{ fontSize: 27, fontWeight: 900, color: "#111", lineHeight: 1.2, marginBottom: 9 }}>
              <span style={{ color: "#1d6fe5" }}>{t.heading1}</span> {t.heading2}
            </h1>
            <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.65, marginBottom: 22 }}>{t.subheading}</p>
            <LeadFormMobile lang={lang} formLocation="top" />
          </div>

        </div>
      </div>
    </>
  );
};

export default PremiumLandingPage;