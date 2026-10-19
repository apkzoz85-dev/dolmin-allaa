"use client";
import { useEffect, useState, type FormEvent } from "react";

// ===== CONFIG =====
const P = "01011162689";
const PD = "0101 116 2689";
const PI = "+201011162689";
const WN = "201011162689";
const WK = "9ccc38bd-3017-4286-a082-e3aae869c3fa"; // Web3Forms access key
const trackCall = () => window.gtag?.("event", "conversion", { send_to: "AW-XXXXXXXXXX/CALL_LABEL" });
const trackWA = () => window.gtag?.("event", "conversion", { send_to: "AW-XXXXXXXXXX/WA_LABEL" });
const trackLead = () => window.gtag?.("event", "conversion", { send_to: "AW-XXXXXXXXXX/FORM_LABEL" });

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const WA_MSG = "مرحباً، مهتم بمشروع سوتو SOTO القاهرة الجديدة من دولمن وعايز تفاصيل الأسعار والـ EOI";
const waLink = (msg = WA_MSG) => `https://wa.me/${WN}?text=${encodeURIComponent(msg)}`;

// ===== DATA =====
const NAV = [
  { id: "about", label: "عن المشروع" },
  { id: "units", label: "الوحدات والأسعار" },
  { id: "payment", label: "نظام السداد" },
  { id: "masterplan", label: "المخطط" },
  { id: "location", label: "الموقع" },
  { id: "developer", label: "المطور" },
];

const UNITS = [
  { key: "1BR", en: "1 BEDROOM", ar: "شقة غرفة نوم", area: 88, price: "4.4", priceFull: "4,400,000", img: "/images/balcony-sunset.webp" },
  { key: "2BR", en: "2 BEDROOM", ar: "شقة غرفتين نوم", area: 122, price: "5.8", priceFull: "5,800,000", img: "/images/pool-day.webp" },
  { key: "3BR", en: "3 BEDROOM", ar: "شقة 3 غرف نوم", area: 150, price: "7.2", priceFull: "7,200,000", img: "/images/facade.webp" },
  { key: "PH", en: "PENTHOUSE", ar: "بنتهاوس", area: 240, price: "12", priceFull: "12,000,000", img: "/images/rooftop-penthouse.webp" },
];

const ZONES = [
  {
    en: "HEART OF SOTO",
    ar: "قلب سوتو — الكلوب هاوس",
    img: "/images/clubhouse-sunset.webp",
    items: ["مطعم على حمام السباحة", "لاونج للسكان", "قاعة طعام خاصة", "قاعة متعددة الأغراض", "جيم وساونا", "مساحات عمل Working Pods", "غرفة ألعاب أطفال داخلية", "حمام سباحة"],
  },
  {
    en: "COMMERCIAL STRIP",
    ar: "الشريط التجاري",
    img: "/images/clubhouse-day.webp",
    items: ["سوبر ماركت", "صيدلية", "مخبز وكوفي كيوسك", "استلام وتسليم مغسلة", "صالون حلاقة وصالون سيدات"],
  },
  {
    en: "SOTO DYNAMICS",
    ar: "خدمات وتشغيل سوتو",
    img: "/images/lazy-river.webp",
    items: ["بوابتين دخول مؤمنتين", "ممرات مظللة", "حديقة ألعاب للأطفال", "مداخل ولوبيهات بتصميم خاص", "Garbage Chutes", "جراج تحت الأرض", "أمن وكاميرات مراقبة 24/7", "تطبيق SOTO App", "إدارة مرافق داخل الموقع"],
  },
];

const TYPES = [
  { en: "TYPE (A)", ar: "مباني Type A", desc: "الكتلة الرئيسية حول الـ Lazy River والممرات المائية — واجهات حجر طبيعي وزجاج بلكونات مفتوحة على اللاندسكيب.", img: "/images/type-a-1.webp" },
  { en: "TYPE (B)", ar: "مباني Type B", desc: "مباني منخفضة الكثافة على حمامات السباحة الرئيسية وسط النخيل والمسطحات الخضراء، بإطلالات مباشرة على المياه.", img: "/images/pool-lounge.webp" },
  { en: "TYPE (C)", ar: "مباني Type C", desc: "واجهات عصرية مستوحاة من عمارة البحر المتوسط، بجنينة خاصة للأدوار الأرضية وتراسات للأدوار العليا.", img: "/images/facade.webp" },
];

const LANDMARKS = [
  { n: "01", ar: "الجامعة الأمريكية AUC", en: "AUC" },
  { n: "02", ar: "كمبوند ميفيدا — إعمار", en: "Emaar Mivida" },
  { n: "03", ar: "كمبوند قطامية ديونز", en: "Katameya Dunes" },
  { n: "04", ar: "كمبوند هايد بارك", en: "Hyde Park" },
  { n: "05", ar: "النادي الأهلي — التجمع", en: "Al Ahly Club" },
  { n: "06", ar: "جروفا — حسن علام", en: "GROVA – Hassan Allam" },
  { n: "07", ar: "شارع التسعين الجنوبي", en: "South 90th Street" },
  { n: "08", ar: "الطريق الدائري الأوسط وطريق السويس", en: "Middle Ring Rd & Suez Rd" },
];

const GALLERY = [
  { src: "/images/clubhouse-sunset.webp", alt: "SOTO Clubhouse وقت الغروب" },
  { src: "/images/lazy-river.webp", alt: "الـ Lazy River بين المباني" },
  { src: "/images/pool-night.webp", alt: "حمام السباحة ليلاً" },
  { src: "/images/rooftop-penthouse.webp", alt: "تراسات البنتهاوس" },
  { src: "/images/pool-day.webp", alt: "حمام السباحة الرئيسي" },
  { src: "/images/kids-garden.webp", alt: "حديقة ألعاب الأطفال" },
  { src: "/images/clubhouse-day.webp", alt: "SOTO Clubhouse" },
  { src: "/images/balcony-sunset.webp", alt: "إطلالة من البلكونة" },
  { src: "/images/facade.webp", alt: "واجهات المباني" },
  { src: "/images/pool-lounge.webp", alt: "منطقة الاسترخاء" },
];

const PORTFOLIO = [
  { name: "THE PIER MALL", ar: "تجاري · إداري · طبي", img: "/images/pier-mall.webp" },
  { name: "AVENUE AL MAQSED", ar: "تجاري · مطاعم · خدمات", img: "/images/avenue-al-maqsed.webp" },
  { name: "MIDWAY PLAZA", ar: "تجاري · إداري", img: "/images/midway-plaza.webp" },
  { name: "AUTOZONE", ar: "مركز خدمة سيارات", img: "/images/autozone.webp" },
];

const FAQ = [
  { q: "فين مكان مشروع سوتو بالظبط؟", a: "سوتو في القاهرة الجديدة على محور محمد نجيب عند تقاطعه مع AUC Avenue، بجوار الجامعة الأمريكية وقطامية ديونز وميفيدا، ودقايق من شارع التسعين الجنوبي." },
  { q: "مين المطور؟", a: "دولمن للتطوير العقاري Dolmen Developments (تأسست 2019) — جزء من مجموعة دولمن اللي بتضم SET للمقاولات وTotal Air للأعمال الكهروميكانيكية، بقيمة محفظة مجمعة +64 مليار جنيه. المشروع بشراكة استراتيجية مع هيئة المجتمعات العمرانية الجديدة وTOREC Developments." },
  { q: "إيه هي الـ EOI وهل المبلغ مسترد؟", a: "الـ EOI (Expression of Interest) هي جدية حجز بقيمة 100,000 جنيه تضمن لك أولوية الاختيار عند الإطلاق الرسمي، والمبلغ مسترد بالكامل (Fully Refundable)." },
  { q: "إيه نظام السداد؟", a: "مقدم يبدأ من 10% وتقسيط حتى 10 سنوات، والاستلام خلال 4 سنوات. وديعة الصيانة 10%." },
  { q: "إيه مستوى التشطيب؟", a: "وحدات المرحلة الأولى بتتسلم نصف تشطيب (Semi Finished)." },
  { q: "إيه المساحات والأسعار المتاحة؟", a: "غرفة نوم بمتوسط 88م² بمتوسط سعر 4.4 مليون، غرفتين 122م² بمتوسط 5.8 مليون، 3 غرف 150م² بمتوسط 7.2 مليون، وبنتهاوس 240م² بمتوسط 12 مليون جنيه. الأسعار استرشادية وقابلة للتغيير." },
];

// ===== ICONS =====
const IconPhone = ({ c = "w-5 h-5" }: { c?: string }) => (
  <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" /></svg>
);
const IconWA = ({ c = "w-5 h-5" }: { c?: string }) => (
  <svg className={c} viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.4-.5c.2-.2.2-.3.3-.5.1-.2.1-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.3-.6-.4zM12 21.8c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4A9.8 9.8 0 1 1 12 21.8zm8.4-18.2A11.8 11.8 0 0 0 1.7 17.9L0 24l6.3-1.7A11.8 11.8 0 0 0 23.8 12c0-3.2-1.2-6.1-3.4-8.4z" /></svg>
);
const IconCheck = () => (
  <svg className="w-4 h-4 shrink-0 text-terra" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M20 6 9 17l-5-5" /></svg>
);
const IconClose = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12" /></svg>
);

// ===== LEAD FORM =====
function LeadForm({ source, compact = false }: { source: string; compact?: boolean }) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if (fd.get("botcheck")) return;
    const phone = String(fd.get("phone") || "").replace(/\s/g, "");
    if (!/^(\+?\d{8,15})$/.test(phone)) {
      setErr("من فضلك اكتب رقم موبايل صحيح");
      return;
    }
    setErr("");
    setBusy(true);
    fd.append("access_key", WK);
    fd.append("subject", `SOTO New Cairo (Dolmen) — Lead (${source})`);
    fd.append("from_name", "SOTO Landing Page");
    fd.append("source", source);
    try {
      const r = await fetch("https://api.web3forms.com/submit", { method: "POST", body: fd });
      const j = await r.json();
      if (j.success) {
        trackLead();
        window.location.href = "/thank-you";
      } else {
        setErr("حصل خطأ، حاول تاني أو كلمنا واتساب");
        setBusy(false);
      }
    } catch {
      setErr("حصل خطأ في الاتصال، حاول تاني أو كلمنا واتساب");
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />
      <input name="name" required placeholder="الاسم بالكامل" className="field" autoComplete="name" />
      <input name="phone" required type="tel" inputMode="tel" placeholder="رقم الموبايل" className="field text-right" dir="rtl" autoComplete="tel" />
      <select name="unit_type" className="field" defaultValue="">
        <option value="" disabled>نوع الوحدة المطلوبة</option>
        <option>شقة غرفة نوم — 88م²</option>
        <option>شقة غرفتين — 122م²</option>
        <option>شقة 3 غرف — 150م²</option>
        <option>بنتهاوس — 240م²</option>
      </select>
      {!compact && (
        <select name="contact_time" className="field" defaultValue="">
          <option value="" disabled>أنسب وقت للتواصل</option>
          <option>الصبح</option>
          <option>بعد الظهر</option>
          <option>بالليل</option>
        </select>
      )}
      {err && <p className="text-sm text-terra">{err}</p>}
      <button disabled={busy} className="btn-primary w-full disabled:opacity-60">
        {busy ? "جاري الإرسال..." : "سجّل اهتمامك — EOI"}
      </button>
      <p className="text-[11px] text-sand/45 leading-relaxed text-center">
        بالضغط على تسجيل أنت توافق على سياسة الخصوصية والتواصل معك بخصوص المشروع.
      </p>
    </form>
  );
}

// ===== PAGE =====
export default function Page() {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [popup, setPopup] = useState(false);
  const [privacy, setPrivacy] = useState(false);
  const [cookie, setCookie] = useState(false);
  const [zone, setZone] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [faq, setFaq] = useState<number | null>(0);

  // header + reveal
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && (e.target.classList.add("in"), io.unobserve(e.target))),
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  // popup at 55% scroll or 16s, once per session
  useEffect(() => {
    let shown = false;
    try {
      shown = sessionStorage.getItem("soto_popup") === "1";
    } catch {}
    if (shown) return;
    const open = () => {
      if (shown) return;
      shown = true;
      setPopup(true);
      try {
        sessionStorage.setItem("soto_popup", "1");
      } catch {}
      cleanup();
    };
    const onScroll = () => {
      const h = document.documentElement;
      if (h.scrollTop / (h.scrollHeight - h.clientHeight) > 0.55) open();
    };
    const t = setTimeout(open, 16000);
    window.addEventListener("scroll", onScroll, { passive: true });
    const cleanup = () => {
      clearTimeout(t);
      window.removeEventListener("scroll", onScroll);
    };
    return cleanup;
  }, []);

  // cookie consent
  useEffect(() => {
    try {
      if (!localStorage.getItem("soto_cookie")) setCookie(true);
    } catch {
      setCookie(true);
    }
  }, []);
  const acceptCookie = () => {
    setCookie(false);
    try {
      localStorage.setItem("soto_cookie", "1");
    } catch {}
  };

  // lightbox keys
  useEffect(() => {
    if (lightbox === null) return;
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowLeft") setLightbox((i) => (i! + 1) % GALLERY.length);
      if (e.key === "ArrowRight") setLightbox((i) => (i! - 1 + GALLERY.length) % GALLERY.length);
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [lightbox]);

  return (
    <>
      {/* ===== HEADER ===== */}
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "bg-ink/90 backdrop-blur border-b hairline" : "bg-gradient-to-b from-ink/80 to-transparent"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-[72px] flex items-center justify-between gap-4">
          <a href="#top" className="flex items-center gap-4">
            <img src="/images/soto-logo.webp" alt="SOTO" className="h-7 sm:h-8 w-auto" />
            <span className="hidden sm:block w-px h-7 bg-sand/25" />
            <img src="/images/dolmen-logo.png" alt="Dolmen Developments" className="hidden sm:block h-6 w-auto opacity-90" />
          </a>
          <nav className="hidden lg:flex items-center gap-7 text-sm text-sand/80">
            {NAV.map((n) => (
              <a key={n.id} href={`#${n.id}`} className="hover:text-sand transition">{n.label}</a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a href={`tel:${PI}`} onClick={trackCall} className="hidden sm:inline-flex items-center gap-2 border hairline px-4 py-2.5 text-sm hover:border-sand/60 transition">
              <IconPhone c="w-4 h-4" />
              <span className="lat text-base" dir="ltr">{PD}</span>
            </a>
            <a href="#contact" className="btn-primary !py-2.5 !px-4 text-sm">احجز EOI</a>
            <button onClick={() => setMenu(!menu)} className="lg:hidden p-2" aria-label="القائمة">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d={menu ? "M18 6 6 18M6 6l12 12" : "M4 7h16M4 12h16M4 17h16"} /></svg>
            </button>
          </div>
        </div>
        {menu && (
          <nav className="lg:hidden bg-ink border-t hairline px-4 py-4 flex flex-col">
            {NAV.map((n) => (
              <a key={n.id} href={`#${n.id}`} onClick={() => setMenu(false)} className="py-3 border-b hairline last:border-0">{n.label}</a>
            ))}
          </nav>
        )}
      </header>

      <main id="top">
        {/* ===== HERO ===== */}
        <section className="relative min-h-svh flex items-end overflow-hidden">
          <img src="/images/clubhouse-sunset.webp" alt="SOTO Clubhouse — سوتو القاهرة الجديدة" className="absolute inset-0 w-full h-full object-cover" fetchPriority="high" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/30" />
          <div className="absolute inset-0 bg-gradient-to-l from-ink/70 via-transparent to-transparent" />
          <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 pt-32 pb-14 lg:pb-20 grid lg:grid-cols-[1.25fr_0.75fr] gap-10 items-end">
            <div>
              <div className="flex items-center gap-4 mb-6 text-sand/80">
                <span className="lat text-lg sm:text-xl tracking-wide">NEW CAIRO</span>
                <span className="w-10 h-px bg-terra" />
                <span className="lat text-lg sm:text-xl tracking-wide">HERITAGE REIMAGINED</span>
              </div>
              <img src="/images/soto-logo.webp" alt="SOTO" className="w-[min(78vw,460px)] mb-6 drop-shadow-2xl" />
              <h1 className="text-3xl sm:text-5xl font-semibold leading-tight mb-5">
                سوتو القاهرة الجديدة
                <span className="block text-xl sm:text-2xl font-light text-sand/85 mt-3">مستوحى من البحر المتوسط.. ومصمم من جديد للقاهرة الجديدة</span>
              </h1>
              <p className="text-sand/75 max-w-xl leading-loose mb-7">
                أول مشروع سكني من <strong className="text-sand font-medium">دولمن للتطوير</strong> على محور محمد نجيب بجوار الجامعة الأمريكية — بشراكة استراتيجية مع هيئة المجتمعات العمرانية الجديدة، وتصميم معماري Omar Okail.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-sand/15 border hairline mb-8 max-w-2xl">
                {[
                  ["10%", "مقدم يبدأ من"],
                  ["10", "سنين تقسيط"],
                  ["4", "سنين استلام"],
                  ["100K", "EOI مسترد بالكامل"],
                ].map(([v, l]) => (
                  <div key={l} className="bg-ink/70 backdrop-blur px-4 py-4">
                    <div className="lat text-4xl leading-none text-sand">{v}</div>
                    <div className="text-xs text-sand/65 mt-2">{l}</div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <a href={waLink()} onClick={trackWA} target="_blank" rel="noopener" className="btn-primary"><IconWA /> تفاصيل على واتساب</a>
                <a href={`tel:${PI}`} onClick={trackCall} className="btn-ghost"><IconPhone /> اتصل الآن</a>
              </div>
            </div>
            <div className="hidden lg:block bg-ink/80 backdrop-blur-md border hairline p-7">
              <p className="eyebrow mb-2">EXPRESSION OF INTEREST</p>
              <h2 className="text-2xl font-semibold mb-1">سجّل اهتمامك الآن</h2>
              <p className="text-sm text-sand/65 mb-5">احجز أولويتك بـ EOI <span className="lat text-lg text-sand">100,000</span> جنيه — مسترد بالكامل</p>
              <LeadForm source="Hero" compact />
            </div>
          </div>
        </section>

        {/* ===== MARQUEE ===== */}
        <div className="bg-terra text-white overflow-hidden py-3 border-y border-black/20" dir="ltr">
          <div className="marquee flex whitespace-nowrap w-max">
            {Array.from({ length: 2 }).map((_, k) => (
              <div key={k} className="flex">
                {["SOTO NEW CAIRO", "10% DOWN PAYMENT", "UP TO 10 YEARS", "DELIVERY IN 4 YEARS", "EOI 100,000 EGP", "FULLY REFUNDABLE", "BY DOLMEN DEVELOPMENTS", "HERITAGE REIMAGINED"].map((t) => (
                  <span key={t + k} className="lat text-xl px-8 flex items-center gap-8">{t}<span className="w-1.5 h-1.5 rounded-full bg-white/70" /></span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ===== ABOUT ===== */}
        <section id="about" className="relative grain overflow-hidden py-24 sm:py-32">
          <img src="/images/texture-marble.webp" alt="" className="absolute inset-0 w-full h-full object-cover opacity-70" />
          <div className="absolute inset-0 bg-ink/40" />
          <img src="/images/sun.webp" alt="" className="hidden md:block absolute -top-6 left-[6%] w-44 opacity-80 floaty" />
          <img src="/images/orange-branch.webp" alt="" className="hidden md:block absolute bottom-10 right-[3%] w-40 opacity-70 floaty" style={{ animationDelay: "-3s" }} />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-14 items-center">
            <div className="reveal">
              <p className="eyebrow mb-4">THE NEXT CHAPTER</p>
              <h2 className="lat text-5xl sm:text-7xl leading-[0.95] text-sand mb-6" dir="ltr" style={{ textAlign: "right" }}>
                INSPIRED BY THE<br />MEDITERRANEAN.
                <span className="block text-crimson">REIMAGINED FOR<br />NEW CAIRO.</span>
              </h2>
              <p className="text-lg text-sand/85 leading-loose mb-5">
                سوتو تجربة سكنية بتخلي التراث جزء من الحياة اليومية — معمار دافي وحديث، زجاج متلطف بالحجر الطبيعي والخشب، ومدخل واحد ضخم بيفتح على عالم من النخيل والممرات المائية والـ Lazy River.
              </p>
              <p className="text-sand/70 leading-loose mb-8">
                مكان بتكبر فيه البيزنس، الناس بتتقابل، العائلات بتبدأ فصول جديدة، واللحظات اليومية بتتحول لذكريات. كلوب هاوس متكامل، شريط تجاري للخدمات اليومية، وجراجات تحت الأرض — كل ده في قلب القاهرة الجديدة.
              </p>
              <div className="grid grid-cols-3 gap-4 border-t hairline pt-6">
                {[
                  ["RESORT", "نمط حياة منتجعي"],
                  ["SEMI", "نص تشطيب — المرحلة الأولى"],
                  ["2026", "إطلاق المشروع"],
                ].map(([v, l]) => (
                  <div key={l}>
                    <div className="lat text-3xl text-sand">{v}</div>
                    <div className="text-xs text-sand/60 mt-1">{l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="reveal relative">
              <img src="/images/lazy-river.webp" alt="الممرات المائية في سوتو" className="w-full aspect-[4/3] object-cover" />
              <img src="/images/balcony-sunset.webp" alt="إطلالة البلكونة على اللاندسكيب" className="absolute -bottom-10 -left-4 sm:-left-8 w-[42%] aspect-[3/4] object-cover border-4 border-ink shadow-2xl" />
              <div className="absolute top-4 right-4 bg-ink/85 px-4 py-3 border hairline">
                <p className="eyebrow !text-[10px]">ARCHITECTURE BY</p>
                <p className="lat text-2xl">OMAR OKAIL</p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== PARTNERSHIP ===== */}
        <section className="bg-black py-16 border-y hairline">
          <div className="max-w-5xl mx-auto px-4 text-center reveal">
            <p className="lat text-3xl sm:text-4xl mb-8">STRATEGIC PARTNERSHIP</p>
            <img src="/images/partners.webp" alt="هيئة المجتمعات العمرانية الجديدة — Dolmen Developments — TOREC Developments" className="w-full max-w-3xl mx-auto" />
          </div>
        </section>

        {/* ===== UNITS & PRICES ===== */}
        <section id="units" className="py-24 sm:py-32 bg-ink">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 reveal">
              <div>
                <p className="eyebrow mb-3">PRODUCT MIX — PHASE 1 · SEMI FINISHED</p>
                <h2 className="text-3xl sm:text-5xl font-semibold">الوحدات والأسعار</h2>
              </div>
              <p className="text-sand/65 max-w-md leading-relaxed">المرحلة الأولى — شقق من غرفة لـ 3 غرف وبنتهاوس بتراسات، نص تشطيب. متوسط المساحات والأسعار:</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {UNITS.map((u, i) => (
                <article key={u.key} className="reveal group bg-char border hairline overflow-hidden flex flex-col" style={{ transitionDelay: `${i * 90}ms` }}>
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img src={u.img} alt={`${u.ar} سوتو القاهرة الجديدة`} className="w-full h-full object-cover transition duration-700 group-hover:scale-105" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-char to-transparent" />
                    <span className="absolute bottom-3 right-4 text-crimson text-xs tracking-[0.25em] font-medium" dir="ltr">{u.en}</span>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-semibold mb-5">{u.ar}</h3>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <div className="lat text-4xl leading-none" dir="ltr" style={{ textAlign: "right" }}>{u.area}<span className="text-xl"> m²</span></div>
                        <div className="text-[11px] text-sand/55 mt-2">متوسط المساحة</div>
                      </div>
                      <div>
                        <div className="lat text-4xl leading-none" dir="ltr" style={{ textAlign: "right" }}>{u.price}<span className="text-xl">M</span></div>
                        <div className="text-[11px] text-sand/55 mt-2">متوسط السعر (جنيه)</div>
                      </div>
                    </div>
                    <p className="text-sm text-sand/60 mb-5">مقدم 10% يبدأ من <span className="lat text-lg text-sand">{(Number(u.priceFull.replace(/,/g, "")) * 0.1).toLocaleString("en-US")}</span> جنيه</p>
                    <a href={waLink(`مهتم بـ ${u.ar} في سوتو القاهرة الجديدة (${u.area}م² — متوسط ${u.priceFull} جنيه)`)} onClick={trackWA} target="_blank" rel="noopener" className="mt-auto btn-ghost !py-3 text-sm group-hover:!bg-terra group-hover:!border-terra">
                      <IconWA c="w-4 h-4" /> اطلب التفاصيل
                    </a>
                  </div>
                </article>
              ))}
            </div>
            <p className="text-xs text-sand/45 mt-6">* الأسعار والمساحات المذكورة متوسطات استرشادية وفقاً لبيانات المطور وقابلة للتغيير دون إشعار مسبق.</p>
          </div>
        </section>

        {/* ===== PAYMENT PLAN ===== */}
        <section id="payment" className="relative grain overflow-hidden py-24 sm:py-28">
          <img src="/images/texture-terracotta.webp" alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/10" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-white">
            <div className="text-center mb-14 reveal">
              <p className="lat text-2xl sm:text-3xl mb-2 text-white/85">PAYMENT PLAN</p>
              <h2 className="text-3xl sm:text-5xl font-semibold">نظام السداد</h2>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-px bg-white/25 border border-white/25 reveal">
              {[
                ["10%", "مقدم", "STARTING FROM"],
                ["10", "سنين تقسيط", "UP TO"],
                ["4", "سنين للاستلام", "DELIVERY"],
                ["10%", "وديعة صيانة", "MAINTENANCE"],
                ["100K", "EOI مسترد بالكامل", "FULLY REFUNDABLE"],
              ].map(([v, l, e], i) => (
                <div key={l} className={`bg-[#c23f22]/80 backdrop-blur-sm p-6 sm:p-8 text-center ${i === 4 ? "col-span-2 lg:col-span-1" : ""}`}>
                  <div className="text-[10px] tracking-[0.25em] text-white/70 mb-3" dir="ltr">{e}</div>
                  <div className="lat text-6xl sm:text-7xl leading-none">{v}</div>
                  <div className="mt-3 font-medium">{l}</div>
                </div>
              ))}
            </div>
            <div className="mt-12 grid lg:grid-cols-[1fr_auto] gap-6 items-center bg-black/85 p-6 sm:p-8 reveal">
              <div>
                <p className="lat text-3xl mb-1">EOI — EXPRESSION OF INTEREST</p>
                <p className="text-white/75 leading-relaxed">احجز أولوية اختيار وحدتك قبل الإطلاق الرسمي بجدية حجز <strong className="text-white">100,000 جنيه</strong> — مسترد بالكامل لو غيرت رأيك.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a href="#contact" className="btn-primary">سجّل EOI الآن</a>
                <a href={waLink("عايز أعرف إجراءات الـ EOI لمشروع سوتو القاهرة الجديدة")} onClick={trackWA} target="_blank" rel="noopener" className="btn-ghost !border-white/40"><IconWA /> واتساب</a>
              </div>
            </div>
          </div>
        </section>

        {/* ===== MASTERPLAN ===== */}
        <section id="masterplan" className="py-24 sm:py-32 bg-char">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12 reveal">
              <p className="eyebrow mb-3">SOTO MASTERPLAN · RESORT LIFESTYLE</p>
              <h2 className="text-3xl sm:text-5xl font-semibold">المخطط العام والخدمات</h2>
            </div>
            <div className="reveal relative border hairline overflow-hidden mb-12">
              <img src="/images/masterplan.webp" alt="المخطط العام لمشروع سوتو" className="w-full aspect-[16/8] sm:aspect-[16/7] object-cover" loading="lazy" />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-ink/90 to-transparent p-5 sm:p-8">
                <p className="lat text-3xl sm:text-5xl">SOTO MASTERPLAN</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-8 justify-center reveal">
              {ZONES.map((z, i) => (
                <button key={z.en} onClick={() => setZone(i)} className={`px-5 py-3 text-sm border transition ${zone === i ? "bg-terra border-terra text-white" : "hairline text-sand/75 hover:text-sand"}`}>
                  {z.ar}
                </button>
              ))}
            </div>
            <div className="grid lg:grid-cols-2 gap-8 items-center reveal">
              <img key={ZONES[zone].img} src={ZONES[zone].img} alt={ZONES[zone].ar} className="w-full aspect-[16/10] object-cover" loading="lazy" />
              <div>
                <p className="lat text-4xl sm:text-5xl text-crimson mb-6" dir="ltr" style={{ textAlign: "right" }}>{ZONES[zone].en}</p>
                <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
                  {ZONES[zone].items.map((it) => (
                    <li key={it} className="flex items-center gap-3 border-b hairline pb-3 text-sand/85"><IconCheck />{it}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ===== BUILDING TYPES ===== */}
        <section className="py-24 sm:py-32 bg-ink relative overflow-hidden">
          <img src="/images/horse.webp" alt="" className="hidden lg:block absolute -left-10 top-16 w-72 opacity-25" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
            <div className="mb-12 reveal">
              <p className="eyebrow mb-3">THE ARCHITECTURE</p>
              <h2 className="text-3xl sm:text-5xl font-semibold">العمارة ونماذج المباني</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {TYPES.map((t, i) => (
                <article key={t.en} className="reveal group" style={{ transitionDelay: `${i * 100}ms` }}>
                  <div className="overflow-hidden mb-5">
                    <img src={t.img} alt={t.ar} className="w-full aspect-[4/3] object-cover transition duration-700 group-hover:scale-105" loading="lazy" />
                  </div>
                  <p className="lat text-4xl mb-2">{t.en}</p>
                  <h3 className="font-semibold mb-2">{t.ar}</h3>
                  <p className="text-sand/65 text-sm leading-loose">{t.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ===== GALLERY ===== */}
        <section className="py-24 bg-char">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-end justify-between mb-10 reveal">
              <div>
                <p className="eyebrow mb-3">GALLERY</p>
                <h2 className="text-3xl sm:text-5xl font-semibold">معرض الصور</h2>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 auto-rows-[140px] sm:auto-rows-[200px]">
              {GALLERY.map((g, i) => (
                <button
                  key={g.src}
                  onClick={() => setLightbox(i)}
                  className={`reveal relative overflow-hidden group ${i === 0 ? "col-span-2 row-span-2" : ""} ${i === 5 ? "row-span-2" : ""}`}
                  aria-label={g.alt}
                >
                  <img src={g.src} alt={g.alt} className="w-full h-full object-cover transition duration-700 group-hover:scale-105" loading="lazy" />
                  <span className="absolute inset-0 bg-ink/0 group-hover:bg-ink/25 transition" />
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ===== LOCATION ===== */}
        <section id="location" className="py-24 sm:py-32 bg-ink">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-[1.15fr_0.85fr] gap-12 items-center">
            <div className="reveal relative border hairline">
              <img src="/images/location-map.webp" alt="موقع سوتو على محور محمد نجيب — القاهرة الجديدة" className="w-full" loading="lazy" />
            </div>
            <div className="reveal">
              <p className="eyebrow mb-3">AT THE HEART OF NEW CAIRO</p>
              <h2 className="text-3xl sm:text-5xl font-semibold mb-5">في قلب القاهرة الجديدة</h2>
              <p className="text-sand/75 leading-loose mb-8">
                سوتو على <strong className="text-sand">محور محمد نجيب</strong> عند تقاطعه مع <strong className="text-sand">AUC Avenue</strong> — دقايق من شارع التسعين الجنوبي، ووسط أهم كمبوندات ومعالم التجمع الخامس.
              </p>
              <ul className="grid sm:grid-cols-2 gap-x-6">
                {LANDMARKS.map((l) => (
                  <li key={l.n} className="flex items-center gap-4 py-3.5 border-b hairline">
                    <span className="lat text-2xl text-crimson w-8">{l.n}</span>
                    <span>
                      <span className="block text-sand/90">{l.ar}</span>
                      <span className="block text-[11px] text-sand/45 tracking-wider" dir="ltr" style={{ textAlign: "right" }}>{l.en}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ===== DEVELOPER ===== */}
        <section id="developer" className="relative py-24 sm:py-32 bg-black overflow-hidden">
          <img src="/images/stone.webp" alt="" className="hidden md:block absolute -top-10 -left-16 w-80 opacity-60 floaty" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              <div className="reveal">
                <img src="/images/dolmen-stone.webp" alt="Dolmen Developments" className="w-full max-w-md mx-auto" loading="lazy" />
              </div>
              <div className="reveal">
                <p className="lat text-5xl sm:text-6xl leading-none mb-5">BUILT TO STAND</p>
                <h2 className="text-2xl sm:text-3xl font-semibold mb-5">دولمن للتطوير العقاري</h2>
                <p className="text-sand/75 leading-loose mb-4">
                  دولمن هي الذراع العقاري لمجموعة دولمن — مطور اتأسس سنة 2019 على الجودة والمصداقية والقيمة طويلة المدى. المجموعة بتجمع 3 شركات تحت رؤية واحدة: <strong className="text-sand">Dolmen Developments</strong> للتطوير، <strong className="text-sand">SET Construction</strong> (الشروق للهندسة والمقاولات) للتنفيذ، و<strong className="text-sand">Total Air</strong> للأعمال الكهروميكانيكية.
                </p>
                <p className="text-sand/65 leading-loose">من الأرض للتسليم — جهة واحدة مسؤولة من أول اسكتش لحد آخر مفتاح، بجودة متحكم فيها داخلياً في كل مرحلة. كل مشروع مرخص ومعتمد بالكامل قبل الإطلاق.</p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-sand/15 border hairline mb-16 reveal">
              {[
                ["EGP 64BN+", "قيمة محفظة المجموعة"],
                ["40+", "مشروع تم تسليمه وجاري"],
                ["15+", "مدينة في مصر"],
                ["3 ISO", "9001 · 14001 · 45001"],
              ].map(([v, l]) => (
                <div key={l} className="bg-black p-6 text-center">
                  <div className="lat text-4xl sm:text-5xl" dir="ltr">{v}</div>
                  <div className="text-xs text-sand/60 mt-2">{l}</div>
                </div>
              ))}
            </div>
            <div className="reveal">
              <p className="eyebrow mb-6 text-center">DELIVERED IN NEW CAPITAL — R3</p>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {PORTFOLIO.map((p) => (
                  <div key={p.name} className="group">
                    <div className="overflow-hidden mb-3">
                      <img src={p.img} alt={p.name} className="w-full aspect-[16/10] object-cover transition duration-700 group-hover:scale-105" loading="lazy" />
                    </div>
                    <p className="lat text-xl sm:text-2xl" dir="ltr" style={{ textAlign: "right" }}>{p.name}</p>
                    <p className="text-xs text-sand/55">{p.ar}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===== FAQ ===== */}
        <section className="py-24 bg-ink">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12 reveal">
              <p className="eyebrow mb-3">FAQ</p>
              <h2 className="text-3xl sm:text-5xl font-semibold">أسئلة شائعة عن سوتو</h2>
            </div>
            <div className="reveal">
              {FAQ.map((f, i) => (
                <div key={f.q} className="border-b hairline">
                  <button onClick={() => setFaq(faq === i ? null : i)} className="w-full flex items-center justify-between gap-4 py-5 text-right">
                    <span className="font-medium text-lg">{f.q}</span>
                    <span className={`lat text-3xl text-terra transition ${faq === i ? "rotate-45" : ""}`}>+</span>
                  </button>
                  {faq === i && <p className="pb-5 text-sand/70 leading-loose">{f.a}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== CONTACT ===== */}
        <section id="contact" className="relative grain overflow-hidden py-24 sm:py-32">
          <img src="/images/pool-night.webp" alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-ink/80" />
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-12 items-center">
            <div className="reveal">
              <img src="/images/soto-logo.webp" alt="SOTO" className="w-56 mb-8" />
              <h2 className="text-3xl sm:text-5xl font-semibold leading-tight mb-5">احجز أولويتك في المرحلة الأولى</h2>
              <p className="text-sand/75 leading-loose mb-8">سيب بياناتك وهنبعتلك البروشور الكامل، الأسعار التفصيلية، وإجراءات الـ EOI — أو كلمنا مباشرة.</p>
              <div className="space-y-3">
                <a href={`tel:${PI}`} onClick={trackCall} className="flex items-center gap-4 border hairline p-4 hover:border-sand/50 transition">
                  <span className="w-11 h-11 bg-terra flex items-center justify-center text-white"><IconPhone /></span>
                  <span>
                    <span className="block text-xs text-sand/55">اتصل بنا</span>
                    <span className="lat text-2xl" dir="ltr">{PD}</span>
                  </span>
                </a>
                <a href={waLink()} onClick={trackWA} target="_blank" rel="noopener" className="flex items-center gap-4 border hairline p-4 hover:border-sand/50 transition">
                  <span className="w-11 h-11 bg-[#25D366] flex items-center justify-center text-white"><IconWA /></span>
                  <span>
                    <span className="block text-xs text-sand/55">واتساب</span>
                    <span className="block">رد سريع على كل استفساراتك</span>
                  </span>
                </a>
              </div>
            </div>
            <div className="reveal bg-char/90 backdrop-blur border hairline p-6 sm:p-9">
              <p className="eyebrow mb-2">REGISTER YOUR INTEREST</p>
              <h3 className="text-2xl font-semibold mb-6">سجّل بياناتك</h3>
              <LeadForm source="Contact" />
            </div>
          </div>
        </section>
      </main>

      {/* ===== FOOTER ===== */}
      <footer className="bg-black border-t hairline pt-14 pb-28 lg:pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
            <div className="flex items-center gap-5">
              <img src="/images/soto-logo.webp" alt="SOTO" className="h-9" />
              <span className="w-px h-8 bg-sand/25" />
              <img src="/images/dolmen-logo.png" alt="Dolmen Developments" className="h-7" />
            </div>
            <div className="flex gap-6 text-sm text-sand/65">
              {NAV.slice(0, 4).map((n) => (
                <a key={n.id} href={`#${n.id}`} className="hover:text-sand">{n.label}</a>
              ))}
              <button onClick={() => setPrivacy(true)} className="hover:text-sand">سياسة الخصوصية</button>
            </div>
          </div>
          <div className="border-t hairline pt-6 text-xs text-sand/45 leading-loose space-y-2">
            <p>
              <strong className="text-sand/65">إفصاح:</strong> هذا الموقع يُدار بواسطة مسوّق عقاري مستقل لأغراض تسويقية وليس الموقع الرسمي لشركة دولمن للتطوير العقاري. جميع العلامات التجارية والشعارات والصور ملك لأصحابها وتُستخدم لأغراض تعريفية فقط.
            </p>
            <p>الأسعار والمساحات وأنظمة السداد المعروضة أسعار استرشادية وفقاً لآخر بيانات متاحة من المطور، وقابلة للتغيير دون إشعار مسبق. الصور تصورات معمارية (3D Renders) وقد تختلف عن الواقع.</p>
            <p className="lat text-sm">© {new Date().getFullYear()} SOTO New Cairo — Marketing Website</p>
          </div>
        </div>
      </footer>

      {/* ===== FLOATING BUTTONS (desktop) ===== */}
      <div className="hidden lg:flex fixed bottom-6 left-6 z-40 flex-col gap-3">
        <a href={waLink()} onClick={trackWA} target="_blank" rel="noopener" aria-label="واتساب" className="w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-xl hover:scale-110 transition"><IconWA c="w-7 h-7" /></a>
        <a href={`tel:${PI}`} onClick={trackCall} aria-label="اتصال" className="w-14 h-14 rounded-full bg-terra text-white flex items-center justify-center shadow-xl hover:scale-110 transition"><IconPhone c="w-6 h-6" /></a>
      </div>

      {/* ===== MOBILE BOTTOM BAR ===== */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 grid grid-cols-3 bg-ink border-t hairline">
        <a href={`tel:${PI}`} onClick={trackCall} className="flex flex-col items-center justify-center py-2.5 gap-1 text-xs"><IconPhone /> اتصال</a>
        <a href={waLink()} onClick={trackWA} target="_blank" rel="noopener" className="flex flex-col items-center justify-center py-2.5 gap-1 text-xs bg-[#25D366] text-white"><IconWA /> واتساب</a>
        <button onClick={() => setPopup(true)} className="flex flex-col items-center justify-center py-2.5 gap-1 text-xs bg-terra text-white">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M4 4h16v16H4zM8 9h8M8 13h8M8 17h5" /></svg>
          سجّل EOI
        </button>
      </div>

      {/* ===== POPUP ===== */}
      {popup && (
        <div className="fixed inset-0 z-[60] bg-black/75 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setPopup(false)}>
          <div className="relative w-full max-w-3xl grid md:grid-cols-2 bg-char border hairline overflow-hidden max-h-[92svh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setPopup(false)} className="absolute top-3 left-3 z-10 w-9 h-9 bg-ink/80 flex items-center justify-center" aria-label="إغلاق"><IconClose /></button>
            <div className="relative hidden md:block">
              <img src="/images/rooftop-penthouse.webp" alt="" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 to-ink/10" />
              <div className="absolute bottom-6 right-6 left-6">
                <img src="/images/soto-logo.webp" alt="SOTO" className="w-40 mb-4" />
                <p className="lat text-5xl leading-none">100,000 <span className="text-xl">EGP</span></p>
                <p className="text-sm text-sand/75 mt-2">EOI مسترد بالكامل — Fully Refundable</p>
              </div>
            </div>
            <div className="p-6 sm:p-8">
              <p className="eyebrow mb-2">LIMITED PRIORITY</p>
              <h3 className="text-2xl font-semibold mb-2">أولوية الاختيار في المرحلة الأولى</h3>
              <p className="text-sm text-sand/65 mb-5">مقدم 10% · تقسيط حتى 10 سنين · استلام 4 سنين</p>
              <LeadForm source="Popup" compact />
            </div>
          </div>
        </div>
      )}

      {/* ===== LIGHTBOX ===== */}
      {lightbox !== null && (
        <div className="fixed inset-0 z-[70] bg-black/95 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <button className="absolute top-4 left-4 w-11 h-11 border hairline flex items-center justify-center" aria-label="إغلاق"><IconClose /></button>
          <button onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + GALLERY.length) % GALLERY.length); }} className="absolute right-3 sm:right-6 w-11 h-11 border hairline flex items-center justify-center text-2xl" aria-label="السابق">›</button>
          <img src={GALLERY[lightbox].src} alt={GALLERY[lightbox].alt} className="max-w-full max-h-[85svh] object-contain" onClick={(e) => e.stopPropagation()} />
          <button onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % GALLERY.length); }} className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 border hairline flex items-center justify-center text-2xl" aria-label="التالي">‹</button>
          <p className="absolute bottom-6 inset-x-0 text-center text-sm text-sand/70">{GALLERY[lightbox].alt}</p>
        </div>
      )}

      {/* ===== PRIVACY MODAL ===== */}
      {privacy && (
        <div className="fixed inset-0 z-[80] bg-black/80 flex items-center justify-center p-4" onClick={() => setPrivacy(false)}>
          <div className="relative max-w-2xl w-full max-h-[85svh] overflow-y-auto bg-char border hairline p-6 sm:p-9 leading-loose text-sand/80 text-sm" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setPrivacy(false)} className="absolute top-4 left-4" aria-label="إغلاق"><IconClose /></button>
            <h3 className="text-2xl font-semibold text-sand mb-5">سياسة الخصوصية</h3>
            <p className="mb-3">نحترم خصوصيتك. البيانات اللي بتسجلها (الاسم ورقم الموبايل ونوع الوحدة) بتُستخدم فقط للتواصل معاك بخصوص مشروع سوتو والمشروعات العقارية المشابهة.</p>
            <p className="mb-3">مش بنبيع أو نأجر بياناتك لأي طرف تالت. ممكن تتم مشاركتها مع فريق المبيعات المعتمد للمشروع بغرض خدمتك فقط.</p>
            <p className="mb-3">الموقع بيستخدم ملفات تعريف الارتباط (Cookies) وأدوات قياس زي Google Ads وGoogle Analytics لتحسين الإعلانات وتجربة الاستخدام.</p>
            <p className="mb-3">تقدر تطلب تعديل أو حذف بياناتك في أي وقت عن طريق التواصل معانا على <span className="lat text-base" dir="ltr">{PD}</span>.</p>
            <p>هذا الموقع موقع تسويقي مستقل وليس الموقع الرسمي للمطور.</p>
          </div>
        </div>
      )}

      {/* ===== COOKIE CONSENT ===== */}
      {cookie && (
        <div className="fixed bottom-16 lg:bottom-6 right-4 left-4 lg:left-auto lg:max-w-md z-[55] bg-char border hairline p-5 shadow-2xl">
          <p className="text-sm text-sand/80 leading-relaxed mb-4">بنستخدم ملفات تعريف الارتباط (Cookies) لتحسين تجربتك وقياس أداء الإعلانات. <button onClick={() => setPrivacy(true)} className="underline text-sand">سياسة الخصوصية</button></p>
          <div className="flex gap-2">
            <button onClick={acceptCookie} className="btn-primary !py-2 !px-5 text-sm">موافق</button>
            <button onClick={acceptCookie} className="btn-ghost !py-2 !px-5 text-sm">إغلاق</button>
          </div>
        </div>
      )}
    </>
  );
}
