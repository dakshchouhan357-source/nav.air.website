import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import {
  Wind,
  DeviceMobile,
  Microphone,
  WaveSine,
  Sparkle,
  ArrowRight,
  CheckCircle,
  Lightning,
  ShieldCheck,
  CircleNotch,
  Drop,
  CaretRight,
  Heart,
  X,
  Phone,
  EnvelopeSimple,
  ShieldStar,
  Plus,
} from "@phosphor-icons/react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

/* ============================================================
   HEADER
============================================================ */
const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { id: "products", label: "Combos" },
    { id: "comparison", label: "Compare" },
    { id: "air-purification", label: "Air Series" },
    { id: "roadmap", label: "Roadmap" },
    { id: "about", label: "About" },
    { id: "faq", label: "FAQ" },
  ];

  return (
    <header
      data-testid="site-header"
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-2xl bg-black/60 border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 h-16 sm:h-20 flex items-center justify-between">
        <a
          href="#top"
          data-testid="brand-logo"
          className="flex items-center gap-2 group"
        >
          <span className="relative inline-flex">
            <span className="absolute inset-0 rounded-full bg-cyan-400/40 blur-md dot-pulse" />
            <span className="relative w-2.5 h-2.5 rounded-full bg-cyan-400" />
          </span>
          <span className="font-display text-xl tracking-tight font-medium">
            NavAir
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              data-testid={`nav-link-${l.id}`}
              className="text-sm text-zinc-400 hover:text-white transition-colors duration-300"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#products"
          data-testid="header-cta-button"
          className="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-black bg-cyan-400 hover:bg-cyan-300 rounded-full pl-5 pr-2 py-2 transition-all duration-300 shadow-[0_0_30px_rgba(0,240,255,0.25)] hover:shadow-[0_0_50px_rgba(0,240,255,0.45)]"
        >
          Reserve
          <span className="w-7 h-7 rounded-full bg-black/90 inline-flex items-center justify-center">
            <ArrowRight size={14} weight="bold" className="text-cyan-300" />
          </span>
        </a>
      </div>
    </header>
  );
};

/* ============================================================
   HERO
============================================================ */
const Hero = () => {
  return (
    <section
      id="top"
      data-testid="hero-section"
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 pt-32 pb-24"
    >
      {/* Aurora backdrop */}
      <div className="absolute inset-0 bg-grid pointer-events-none" />
      <div
        className="aurora bg-cyan-500"
        style={{ width: 520, height: 520, top: -120, left: -120 }}
      />
      <div
        className="aurora bg-blue-600"
        style={{ width: 600, height: 600, bottom: -180, right: -160, opacity: 0.35 }}
      />

      {/* Rotating tech rings around product */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative w-[680px] h-[680px] max-w-[90vw] max-h-[90vw]">
          <div className="absolute inset-0 rounded-full border border-cyan-400/10 spin-slow" />
          <div className="absolute inset-12 rounded-full border border-white/5 spin-slow-rev" />
          <div className="absolute inset-24 rounded-full border border-cyan-400/5" />
        </div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <div
          data-testid="hero-eyebrow"
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-xl mb-8"
        >
          <span className="relative inline-flex">
            <span className="absolute inset-0 rounded-full bg-cyan-400/50 blur-md dot-pulse" />
            <span className="relative w-1.5 h-1.5 rounded-full bg-cyan-400" />
          </span>
          <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-cyan-300/90">
            Keyboard & Mouse Combos · Pre-Orders Open
          </span>
        </div>

        <h1
          data-testid="hero-headline"
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[88px] font-light tracking-[-0.04em] leading-[0.95] text-white"
        >
          Premium tech for
          <br />
          <span className="italic font-extralight bg-gradient-to-r from-white via-cyan-200 to-emerald-300 bg-clip-text text-transparent">
            modern living.
          </span>
        </h1>

        <p
          data-testid="hero-subhead"
          className="mt-8 text-base sm:text-lg text-zinc-400 leading-relaxed max-w-2xl mx-auto"
        >
          Beautifully designed keyboards and mice — built for productivity,
          comfort, and the way you actually work. Our first generation is now
          open for pre-booking.
        </p>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#products"
            data-testid="hero-cta-button"
            className="group relative inline-flex items-center gap-3 bg-cyan-400 text-black hover:bg-cyan-300 rounded-full pl-7 pr-2 py-2 font-semibold transition-all duration-300 shadow-[0_0_40px_rgba(0,240,255,0.35)] hover:shadow-[0_0_60px_rgba(0,240,255,0.6)]"
          >
            <span className="text-[15px] tracking-tight">
              Explore the Combos
            </span>
            <span className="w-10 h-10 rounded-full bg-black inline-flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5">
              <ArrowRight size={16} weight="bold" className="text-cyan-300" />
            </span>
          </a>

          <a
            href="#air-purification"
            data-testid="hero-secondary-cta"
            className="inline-flex items-center gap-2 text-sm text-zinc-300 hover:text-white border border-white/15 hover:border-white/30 rounded-full px-6 py-3.5 transition-colors"
          >
            <Sparkle size={16} weight="bold" className="text-emerald-300" />
            Air Purification — Coming Soon
          </a>
        </div>

        {/* Brand pillars row */}
        <div className="mt-20 grid grid-cols-3 max-w-3xl mx-auto gap-6 sm:gap-10 border-t border-white/5 pt-10">
          {[
            { v: "Productivity", l: "Designed to perform" },
            { v: "Comfort", l: "Built for long sessions" },
            { v: "Premium", l: "Materials that last" },
          ].map((s, i) => (
            <div key={i} className="text-left sm:text-center">
              <div className="font-display text-2xl sm:text-3xl tracking-tight text-white">
                {s.v}
              </div>
              <div className="mt-1 text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   TRUST STRIP / MARQUEE
============================================================ */
const TrustStrip = () => {
  const items = [
    "PREMIUM BUILD",
    "MODERN DESIGN",
    "COMFORT FIRST",
    "WIRELESS FREEDOM",
    "EVERYDAY RELIABILITY",
    "THOUGHTFUL CRAFT",
    "FUTURE-READY",
  ];
  const row = [...items, ...items, ...items];
  return (
    <section
      data-testid="trust-strip"
      className="relative border-y border-white/5 py-8 overflow-hidden bg-black"
    >
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
      <div className="flex marquee gap-16 whitespace-nowrap">
        {row.map((t, i) => (
          <span
            key={i}
            className="font-display text-zinc-500/70 hover:text-cyan-300 transition-colors text-sm tracking-[0.35em]"
          >
            {t}
          </span>
        ))}
      </div>
    </section>
  );
};

/* ============================================================
   FEATURES — Why NavAir
============================================================ */
const Features = () => {
  return (
    <section
      id="features"
      data-testid="features-section"
      className="relative py-28 sm:py-36 px-6 sm:px-10"
    >
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mb-14 sm:mb-20">
          <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-cyan-400 mb-5">
            <span data-testid="features-label">— Why NavAir</span>
          </div>
          <h2
            data-testid="features-headline"
            className="font-display text-4xl sm:text-5xl md:text-6xl font-light tracking-[-0.03em] text-white leading-[1.05]"
          >
            Designed for the way you{" "}
            <span className="italic bg-gradient-to-r from-cyan-200 to-emerald-300 bg-clip-text text-transparent">
              actually work.
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6">
          {/* Wireless Freedom (wide) */}
          <div
            data-testid="feature-card-wireless"
            className="md:col-span-7 group relative bg-white/[0.02] border border-white/5 rounded-3xl p-8 sm:p-10 backdrop-blur-2xl overflow-hidden hover:border-cyan-400/30 transition-all duration-500 min-h-[420px] flex flex-col justify-between"
          >
            <div className="absolute -top-32 -right-32 w-72 h-72 rounded-full bg-cyan-500/10 blur-3xl group-hover:bg-cyan-500/20 transition-all duration-700" />

            <div className="flex items-center gap-2 z-10">
              <DeviceMobile
                size={18}
                weight="duotone"
                className="text-cyan-400"
              />
              <span className="text-[11px] uppercase tracking-[0.22em] text-cyan-400 font-bold">
                Wireless Freedom
              </span>
            </div>

            <div className="relative z-10 mt-8 flex justify-center">
              <div className="relative w-full max-w-[420px] aspect-[4/3] rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900 via-black to-zinc-950 overflow-hidden float">
                <div className="absolute inset-0 bg-grid opacity-30" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-[78%] aspect-[16/5] rounded-xl bg-gradient-to-b from-zinc-700 via-zinc-800 to-zinc-900 shadow-[0_30px_80px_-20px_rgba(0,240,255,0.25)] border border-white/10">
                    <div className="absolute inset-2 grid grid-cols-14 gap-[3px]">
                      {Array.from({ length: 56 }).map((_, k) => (
                        <span
                          key={k}
                          className="rounded-sm bg-zinc-700/80 border border-white/5"
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-4 right-4 w-12 h-16 rounded-2xl bg-gradient-to-b from-zinc-700 to-zinc-900 border border-white/10 shadow-[0_15px_30px_-10px_rgba(0,240,255,0.2)]">
                  <div className="absolute top-1 left-1 right-1 h-1 rounded-full bg-cyan-400/60" />
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-6">
              <h3 className="font-display text-2xl sm:text-3xl font-light tracking-tight text-white">
                Cable-free. Clutter-free.
              </h3>
              <p className="mt-3 text-zinc-400 max-w-md">
                Reliable wireless connectivity that just works — desk to desk,
                room to room, lap to lap. Designed for modern setups.
              </p>
            </div>
          </div>

          {/* Comfort */}
          <div
            data-testid="feature-card-comfort"
            className="md:col-span-5 group relative bg-white/[0.02] border border-white/5 rounded-3xl p-8 sm:p-10 backdrop-blur-2xl overflow-hidden hover:border-cyan-400/30 transition-all duration-500 min-h-[420px] flex flex-col justify-between"
          >
            <div className="absolute -bottom-40 -left-32 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl group-hover:bg-emerald-500/20 transition-all duration-700" />
            <div className="flex items-center gap-2 z-10">
              <Heart size={18} weight="duotone" className="text-emerald-300" />
              <span className="text-[11px] uppercase tracking-[0.22em] text-emerald-300 font-bold">
                Built for Long Sessions
              </span>
            </div>

            <div className="relative flex-1 flex items-center justify-center z-10 my-6">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-emerald-400/10 blur-3xl" />
                <div className="relative font-display text-6xl sm:text-7xl tracking-tighter text-white leading-none">
                  All-day
                  <div className="mt-2 font-display text-xl text-zinc-500 italic">
                    comfort.
                  </div>
                </div>
              </div>
            </div>

            <div className="z-10">
              <h3 className="font-display text-2xl sm:text-3xl font-light tracking-tight text-white">
                Comfort, considered.
              </h3>
              <p className="mt-2 text-zinc-400">
                Thoughtful ergonomics for students, professionals, and creators
                who spend their day at the desk.
              </p>
            </div>
          </div>

          {/* Productivity */}
          <div
            data-testid="feature-card-productivity"
            className="md:col-span-4 group relative bg-white/[0.02] border border-white/5 rounded-3xl p-8 backdrop-blur-2xl overflow-hidden hover:border-cyan-400/30 transition-all duration-500 min-h-[300px] flex flex-col justify-between"
          >
            <div className="flex items-center gap-2">
              <Lightning
                size={18}
                weight="duotone"
                className="text-cyan-400"
              />
              <span className="text-[11px] uppercase tracking-[0.22em] text-cyan-400 font-bold">
                Productivity First
              </span>
            </div>

            <div className="flex items-end gap-1.5 h-20 my-6">
              {[0.3, 0.6, 0.85, 1, 0.7, 0.45, 0.9, 0.55, 0.75, 0.4, 0.65, 0.9].map(
                (h, i) => (
                  <span
                    key={i}
                    className="eq-bar w-1.5 bg-gradient-to-t from-cyan-500/40 to-cyan-300 rounded-full"
                    style={{
                      height: `${h * 100}%`,
                      animationDelay: `${i * 0.12}s`,
                    }}
                  />
                ),
              )}
            </div>

            <div>
              <h3 className="font-display text-2xl font-light tracking-tight text-white">
                Flow without friction.
              </h3>
              <p className="mt-2 text-sm text-zinc-400">
                Responsive typing. Precise tracking. Quiet operation. Designed
                to keep you in the zone.
              </p>
            </div>
          </div>

          {/* Reliability */}
          <div
            data-testid="feature-card-reliable"
            className="md:col-span-4 group relative bg-white/[0.02] border border-white/5 rounded-3xl p-8 backdrop-blur-2xl overflow-hidden hover:border-cyan-400/30 transition-all duration-500 min-h-[300px] flex flex-col justify-between"
          >
            <div className="flex items-center gap-2">
              <ShieldCheck size={18} weight="duotone" className="text-cyan-400" />
              <span className="text-[11px] uppercase tracking-[0.22em] text-cyan-400 font-bold">
                Everyday Reliability
              </span>
            </div>

            <div className="my-6">
              <div className="font-display text-5xl tracking-tighter text-white leading-none">
                Built
              </div>
              <div className="mt-2 font-display text-xl text-zinc-500 italic">
                to last.
              </div>
            </div>

            <div>
              <h3 className="font-display text-2xl font-light tracking-tight text-white">
                Made to keep up.
              </h3>
              <p className="mt-2 text-sm text-zinc-400">
                Durable materials and a quality-first approach — for years of
                consistent use, not just months.
              </p>
            </div>
          </div>

          {/* Design / luxury */}
          <div
            data-testid="feature-card-design"
            className="md:col-span-4 group relative bg-gradient-to-br from-cyan-500/10 via-white/[0.02] to-emerald-500/10 border border-cyan-400/20 rounded-3xl p-8 backdrop-blur-2xl overflow-hidden hover:border-cyan-400/40 transition-all duration-500 min-h-[300px] flex flex-col justify-between"
          >
            <div className="absolute inset-0 bg-grid opacity-40" />
            <div className="relative flex items-center gap-2">
              <Sparkle size={18} weight="duotone" className="text-cyan-400" />
              <span className="text-[11px] uppercase tracking-[0.22em] text-cyan-300 font-bold">
                Premium Design
              </span>
            </div>

            <div className="relative my-6 flex justify-center">
              <div className="relative w-28 h-20">
                <div className="absolute inset-0 rounded-2xl bg-cyan-400/10 blur-2xl" />
                <div className="relative w-full h-full rounded-2xl bg-gradient-to-b from-zinc-200 via-zinc-400 to-zinc-700 shadow-[inset_0_0_20px_rgba(255,255,255,0.3)]" />
                <div className="absolute -inset-2 rounded-2xl border border-cyan-400/30" />
              </div>
            </div>

            <div className="relative">
              <h3 className="font-display text-2xl font-light tracking-tight text-white">
                Looks the part.
              </h3>
              <p className="mt-2 text-sm text-zinc-300/80">
                Clean lines, considered materials, and a finish that elevates
                any desk.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


/* ============================================================
   FLAGSHIP SHOWCASE — Performance Combo
============================================================ */
const Showcase = () => {
  return (
    <section
      id="showcase"
      data-testid="showcase-section"
      className="relative py-28 sm:py-36 px-6 sm:px-10 overflow-hidden"
    >
      <div
        className="aurora bg-cyan-500/40"
        style={{ width: 500, height: 500, top: "20%", left: "-10%" }}
      />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 relative">
          <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden border border-white/10 bg-gradient-to-b from-zinc-900 to-black">
            <img
              data-testid="showcase-image"
              src="https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=1200&q=80"
              alt="NavAir Performance Keyboard & Mouse Combo"
              className="w-full h-full object-cover opacity-90 mix-blend-luminosity hover:mix-blend-normal transition-all duration-1000"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
              <div>
                <div className="text-[10px] uppercase tracking-[0.22em] text-cyan-300 font-bold">
                  NavAir Performance · Most Popular
                </div>
                <div className="font-display text-2xl text-white mt-1">
                  The hero of the lineup
                </div>
              </div>
              <span className="w-10 h-10 rounded-full bg-cyan-400/90 inline-flex items-center justify-center">
                <CaretRight size={16} weight="bold" className="text-black" />
              </span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-cyan-400 mb-5">
            — The flagship pair
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-light tracking-[-0.03em] text-white leading-[1.05]">
            Designed to be{" "}
            <span className="italic bg-gradient-to-r from-cyan-200 to-emerald-300 bg-clip-text text-transparent">
              picked up.
            </span>
          </h2>
          <p className="mt-6 text-zinc-400 leading-relaxed max-w-lg">
            Our NavAir Performance combo is built around a single belief —
            premium tech should feel as good as it looks. A considered keyboard,
            a refined mouse, and the kind of finish that earns a second glance.
          </p>

          <div className="mt-10 grid sm:grid-cols-2 gap-5">
            {[
              {
                t: "Wireless freedom.",
                d: "Reliable connectivity, designed for modern desks and on-the-move setups.",
                i: DeviceMobile,
              },
              {
                t: "Comfort-first design.",
                d: "Crafted for long sessions — students, professionals, and creators alike.",
                i: Heart,
              },
              {
                t: "Quietly responsive.",
                d: "Soft, satisfying input — designed to disappear into your flow.",
                i: WaveSine,
              },
              {
                t: "Premium materials.",
                d: "A clean, modern finish built to keep up with everyday use.",
                i: Sparkle,
              },
            ].map((it, i) => (
              <div
                key={i}
                data-testid={`showcase-feature-${i}`}
                className="p-5 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-cyan-400/20 transition-colors"
              >
                <it.i size={20} weight="duotone" className="text-cyan-400" />
                <div className="mt-3 font-medium text-white">{it.t}</div>
                <div className="mt-1 text-sm text-zinc-400">{it.d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   COMPARISON TABLE
============================================================ */
const Comparison = () => {
  const rows = [
    ["Connectivity", "Wireless", "Wireless", "Wireless"],
    ["Designed for", "Students & everyday use", "Modern professionals", "Power users & creators"],
    ["Build quality", "Reliable", "Enhanced", "Premium"],
    ["Comfort focus", "Standard", "Improved", "Flagship"],
    ["Styling", "Clean", "Premium", "Flagship"],
    ["Status", "Pre-Orders Open", "Pre-Orders Open", "Pre-Orders Open"],
  ];
  const cols = [
    { name: "NavAir Essential", price: "₹1,799", badge: "Best Value", popular: false },
    { name: "NavAir Performance", price: "₹2,499", badge: "Most Popular", popular: true },
    { name: "NavAir Pro", price: "₹3,299", badge: "Flagship", popular: false },
  ];
  return (
    <section
      id="comparison"
      data-testid="comparison-section"
      className="relative py-28 sm:py-36 px-6 sm:px-10 border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mb-14 sm:mb-20 text-center mx-auto">
          <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-cyan-400 mb-5">
            — Compare the combos
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-light tracking-[-0.03em] text-white leading-[1.05]">
            Find the combo that{" "}
            <span className="italic bg-gradient-to-r from-cyan-200 to-emerald-300 bg-clip-text text-transparent">
              fits you.
            </span>
          </h2>
          <p className="mt-6 text-zinc-400 max-w-xl mx-auto">
            Three considered tiers. One simple promise — premium tech you&apos;ll
            love using every day.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl overflow-hidden">
          {/* Header row */}
          <div className="grid grid-cols-4 border-b border-white/5">
            <div className="p-5 sm:p-7 text-[11px] uppercase tracking-[0.22em] text-zinc-500 font-bold">
              Feature
            </div>
            {cols.map((c, i) => (
              <div
                key={i}
                data-testid={`comparison-col-${i}`}
                className={`p-5 sm:p-7 text-center relative ${
                  c.popular
                    ? "bg-gradient-to-b from-cyan-500/10 to-transparent"
                    : ""
                }`}
              >
                {c.popular && (
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.22em] text-cyan-300 font-bold px-3 py-1 rounded-full border border-cyan-400/30 bg-cyan-400/5 whitespace-nowrap">
                    {c.badge}
                  </div>
                )}
                {!c.popular && (
                  <div className="text-[10px] uppercase tracking-[0.22em] text-zinc-500 font-bold mb-1">
                    {c.badge}
                  </div>
                )}
                <div className="mt-4 font-display text-base sm:text-lg text-white tracking-tight">
                  {c.name}
                </div>
                <div className="mt-2 font-display text-2xl sm:text-3xl text-white tracking-tighter">
                  {c.price}
                </div>
              </div>
            ))}
          </div>
          {/* Body rows */}
          <div className="divide-y divide-white/5">
            {rows.map(([label, ...vals], i) => (
              <div
                key={i}
                data-testid={`comparison-row-${i}`}
                className="grid grid-cols-4 items-center"
              >
                <div className="p-4 sm:p-5 text-[11px] uppercase tracking-[0.16em] text-zinc-500">
                  {label}
                </div>
                {vals.map((v, j) => (
                  <div
                    key={j}
                    className={`p-4 sm:p-5 text-center text-sm ${
                      j === 1
                        ? "bg-gradient-to-b from-cyan-500/[0.04] to-transparent text-white"
                        : "text-zinc-300"
                    }`}
                  >
                    {v}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-zinc-500 max-w-xl mx-auto">
          Final detailed specifications will be shared as we approach launch.
        </p>
      </div>
    </section>
  );
};

/* ============================================================
   PRE-BOOK OTP MODAL
============================================================ */
const PrebookModal = ({ onClose, product }) => {
  const [channel, setChannel] = useState("email"); // 'email' | 'sms'
  const [step, setStep] = useState(1); // 1=identifier, 2=otp, 3=success
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [demoCode, setDemoCode] = useState(null);
  const [bookingId, setBookingId] = useState(null);
  const [position, setPosition] = useState(null);
  const [resendIn, setResendIn] = useState(0);

  // Resend countdown
  useEffect(() => {
    if (resendIn <= 0) return;
    const t = setTimeout(() => setResendIn((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [resendIn]);

  // Esc to close
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const sendOtp = async () => {
    setLoading(true);
    try {
      if (channel === "email") {
        if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim())) {
          toast.error("Enter a valid email address");
          setLoading(false);
          return;
        }
        const res = await axios.post(`${API}/prebook/send-email-otp`, {
          email: email.trim(),
          product,
        });
        if (res.data?.demo_code) {
          setDemoCode(res.data.demo_code);
          toast.success(`Demo OTP: ${res.data.demo_code}`);
        } else {
          toast.success("OTP sent to your email");
        }
      } else {
        const trimmed = phone.trim();
        if (!trimmed || trimmed.replace(/\D/g, "").length < 10) {
          toast.error("Enter a valid mobile number");
          setLoading(false);
          return;
        }
        const res = await axios.post(`${API}/prebook/send-otp`, {
          phone: trimmed,
          product,
        });
        if (res.data?.demo_code) {
          setDemoCode(res.data.demo_code);
          toast.success(`Demo OTP: ${res.data.demo_code}`);
        } else {
          toast.success("OTP sent via SMS");
        }
      }
      setStep(2);
      setResendIn(30);
    } catch (err) {
      toast.error(err?.response?.data?.detail || "Could not send OTP");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (!/^\d{4,6}$/.test(code)) {
      toast.error("Enter the 6-digit code");
      return;
    }
    setLoading(true);
    try {
      const url =
        channel === "email"
          ? `${API}/prebook/verify-email-otp`
          : `${API}/prebook/verify-otp`;
      const payload =
        channel === "email"
          ? { email: email.trim(), code, product, name: name || null }
          : { phone, code, product, name: name || null };
      const res = await axios.post(url, payload);
      setBookingId(res.data?.booking_id);
      setPosition(res.data?.position);
      setStep(3);
      toast.success("Pre-booking confirmed");
    } catch (err) {
      toast.error(err?.response?.data?.detail || "Invalid code");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      data-testid="prebook-modal"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-xl"
        onClick={onClose}
      />
      {/* Card */}
      <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-gradient-to-b from-zinc-900/95 to-black/95 p-6 sm:p-8 shadow-[0_0_80px_-10px_rgba(0,240,255,0.35)]">
        {/* Glow */}
        <div className="absolute -top-24 -right-16 w-56 h-56 rounded-full bg-cyan-400/20 blur-3xl pointer-events-none" />

        <button
          data-testid="prebook-modal-close"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/5 transition"
          aria-label="Close"
        >
          <X size={18} weight="bold" />
        </button>

        <div className="relative">
          <div className="text-[10px] uppercase tracking-[0.22em] text-cyan-400 font-bold">
            Pre-book · {product}
          </div>

          {step === 1 && (
            <div data-testid="prebook-step-phone" className="mt-3">
              <h3 className="font-display text-2xl sm:text-3xl text-white tracking-tight leading-tight">
                Reserve with a{" "}
                <span className="italic bg-gradient-to-r from-cyan-200 to-cyan-400 bg-clip-text text-transparent">
                  one-tap OTP.
                </span>
              </h3>
              <p className="mt-2 text-sm text-zinc-400">
                {channel === "email"
                  ? "Enter your email. We'll send you a 6-digit code to confirm your spot."
                  : "Enter your mobile number. We'll text you a 6-digit code to confirm your spot."}
              </p>

              {/* Channel tabs */}
              <div className="mt-5 inline-flex p-1 rounded-full border border-white/10 bg-white/[0.03]">
                <button
                  data-testid="prebook-channel-email"
                  onClick={() => setChannel("email")}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide flex items-center gap-1.5 transition ${
                    channel === "email"
                      ? "bg-cyan-400 text-black shadow-[0_0_20px_rgba(0,240,255,0.35)]"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  <EnvelopeSimple size={14} weight="bold" />
                  Email
                </button>
                <button
                  data-testid="prebook-channel-sms"
                  onClick={() => setChannel("sms")}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide flex items-center gap-1.5 transition ${
                    channel === "sms"
                      ? "bg-cyan-400 text-black shadow-[0_0_20px_rgba(0,240,255,0.35)]"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  <Phone size={14} weight="bold" />
                  SMS
                </button>
              </div>

              <label className="mt-5 block text-[11px] uppercase tracking-[0.22em] text-zinc-500 mb-2">
                Your name (optional)
              </label>
              <input
                data-testid="prebook-name-input"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ananya"
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20 transition"
              />

              {channel === "email" ? (
                <>
                  <label className="mt-4 block text-[11px] uppercase tracking-[0.22em] text-zinc-500 mb-2">
                    Email address
                  </label>
                  <input
                    data-testid="prebook-email-input"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20 transition"
                  />
                </>
              ) : (
                <>
                  <label className="mt-4 block text-[11px] uppercase tracking-[0.22em] text-zinc-500 mb-2">
                    Mobile number
                  </label>
                  <div className="flex items-stretch gap-2">
                    <div className="flex items-center px-4 rounded-xl border border-white/10 bg-white/[0.03] text-zinc-300 text-sm font-mono">
                      +91
                    </div>
                    <input
                      data-testid="prebook-phone-input"
                      type="tel"
                      inputMode="numeric"
                      value={phone}
                      onChange={(e) =>
                        setPhone(e.target.value.replace(/[^\d+ ]/g, ""))
                      }
                      placeholder="98765 43210"
                      className="flex-1 bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20 transition tracking-wide"
                    />
                  </div>
                </>
              )}

              <button
                data-testid="prebook-send-otp-button"
                onClick={sendOtp}
                disabled={loading}
                className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-full bg-cyan-400 text-black hover:bg-cyan-300 disabled:opacity-50 px-6 py-3 font-semibold transition shadow-[0_0_40px_rgba(0,240,255,0.35)]"
              >
                {loading ? (
                  <CircleNotch size={16} weight="bold" className="animate-spin" />
                ) : (
                  <>
                    Send OTP
                    {channel === "email" ? (
                      <EnvelopeSimple size={16} weight="bold" />
                    ) : (
                      <Phone size={16} weight="bold" />
                    )}
                  </>
                )}
              </button>

              <p className="mt-4 text-[11px] text-zinc-500 flex items-center justify-center gap-1.5">
                <ShieldStar size={12} weight="duotone" className="text-cyan-400" />
                Your details are encrypted and never shared.
              </p>
            </div>
          )}

          {step === 2 && (
            <div data-testid="prebook-step-otp" className="mt-3">
              <h3 className="font-display text-2xl sm:text-3xl text-white tracking-tight leading-tight">
                Enter the{" "}
                <span className="italic bg-gradient-to-r from-cyan-200 to-cyan-400 bg-clip-text text-transparent">
                  6-digit code.
                </span>
              </h3>
              <p className="mt-2 text-sm text-zinc-400">
                Sent to{" "}
                <span className="text-white font-medium">
                  {channel === "email" ? email : phone}
                </span>
                .{" "}
                <button
                  data-testid="prebook-change-number"
                  onClick={() => setStep(1)}
                  className="text-cyan-400 hover:text-cyan-300 underline-offset-4 hover:underline"
                >
                  Change
                </button>
              </p>

              {demoCode && (
                <div className="mt-4 p-3 rounded-xl border border-cyan-400/30 bg-cyan-400/5 text-xs text-cyan-200 font-mono">
                  Demo mode — your code is{" "}
                  <span className="font-bold tracking-widest">{demoCode}</span>
                </div>
              )}

              <input
                data-testid="prebook-otp-input"
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={code}
                onChange={(e) =>
                  setCode(e.target.value.replace(/\D/g, "").slice(0, 6))
                }
                placeholder="••••••"
                className="mt-6 w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-4 text-center text-white text-2xl tracking-[0.5em] font-mono placeholder-zinc-700 focus:outline-none focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20 transition"
              />

              <button
                data-testid="prebook-verify-button"
                onClick={verifyOtp}
                disabled={loading || code.length < 4}
                className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-full bg-cyan-400 text-black hover:bg-cyan-300 disabled:opacity-50 px-6 py-3 font-semibold transition shadow-[0_0_40px_rgba(0,240,255,0.35)]"
              >
                {loading ? (
                  <CircleNotch size={16} weight="bold" className="animate-spin" />
                ) : (
                  <>
                    Verify & reserve
                    <ArrowRight size={16} weight="bold" />
                  </>
                )}
              </button>

              <div className="mt-4 text-center text-xs text-zinc-500">
                Didn&apos;t get it?{" "}
                {resendIn > 0 ? (
                  <span className="text-zinc-400">Resend in {resendIn}s</span>
                ) : (
                  <button
                    data-testid="prebook-resend-button"
                    onClick={sendOtp}
                    className="text-cyan-400 hover:text-cyan-300 underline-offset-4 hover:underline"
                  >
                    Resend OTP
                  </button>
                )}
              </div>
            </div>
          )}

          {step === 3 && (
            <div data-testid="prebook-step-success" className="mt-3 text-center">
              <div className="mx-auto w-16 h-16 rounded-full bg-cyan-400/15 border border-cyan-400/40 flex items-center justify-center shadow-[0_0_30px_rgba(0,240,255,0.35)]">
                <CheckCircle size={28} weight="duotone" className="text-cyan-300" />
              </div>
              <h3 className="mt-5 font-display text-2xl sm:text-3xl text-white tracking-tight leading-tight">
                You&apos;re in the{" "}
                <span className="italic bg-gradient-to-r from-cyan-200 to-cyan-400 bg-clip-text text-transparent">
                  first wave.
                </span>
              </h3>
              <p className="mt-3 text-sm text-zinc-400">
                {name ? `${name}, your` : "Your"} {product} is reserved.
                {position ? ` You're #${position} on the list.` : ""}
              </p>
              {bookingId && (
                <div className="mt-5 mx-auto inline-block px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] font-mono text-[11px] text-zinc-400">
                  Booking · {bookingId.slice(0, 8).toUpperCase()}
                </div>
              )}
              <button
                data-testid="prebook-done-button"
                onClick={onClose}
                className="mt-7 w-full inline-flex items-center justify-center gap-2 rounded-full border border-white/15 text-white hover:bg-white/5 px-6 py-3 font-medium transition"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* ============================================================
   PRODUCTS — K&M COMBOS · Pre-Order
============================================================ */
const Pricing = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const openModal = (tier) => {
    setSelected(tier);
    setModalOpen(true);
  };
  return (
    <section
      id="products"
      data-testid="pricing-section"
      className="relative py-28 sm:py-36 px-6 sm:px-10 overflow-hidden"
    >
      <div
        className="aurora bg-blue-600/40"
        style={{ width: 600, height: 600, top: "10%", right: "-15%" }}
      />
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center max-w-3xl mx-auto">
          <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-cyan-400 mb-5">
            — Pre-Orders Open
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-light tracking-[-0.03em] text-white leading-[1.05]">
            Keyboards & Mice,{" "}
            <span className="italic bg-gradient-to-r from-cyan-200 to-emerald-300 bg-clip-text text-transparent">
              done right.
            </span>
          </h2>
          <p className="mt-6 text-zinc-400 max-w-xl mx-auto">
            Reserve your NavAir combo today. No charges, no card details — just
            your spot in the first wave.
          </p>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-5 sm:gap-6">
          {[
            {
              tier: "NavAir Essential",
              size: "Best Value",
              price: "₹1,799",
              popular: false,
              accent: "zinc",
              desc: "A reliable wireless keyboard and mouse combo for students, office work, online learning, and everyday productivity.",
              perks: [
                "Reliable wireless connectivity",
                "Comfort-first key layout",
                "Clean, modern design",
                "Everyday durability",
              ],
              cta: "Pre-Book Now",
            },
            {
              tier: "NavAir Performance",
              size: "Most Popular",
              price: "₹2,499",
              popular: true,
              accent: "cyan",
              desc: "Enhanced comfort, premium styling, and improved wireless performance for modern users who spend their day at the desk.",
              perks: [
                "Improved wireless performance",
                "Enhanced comfort & ergonomics",
                "Premium styling & materials",
                "Designed for long sessions",
              ],
              cta: "Pre-Book Now",
            },
            {
              tier: "NavAir Pro",
              size: "Flagship",
              price: "₹3,299",
              popular: false,
              accent: "emerald",
              desc: "The flagship NavAir keyboard and mouse combo — built for professionals, creators, and productivity enthusiasts.",
              perks: [
                "Flagship wireless experience",
                "Premium finish & build",
                "Considered ergonomics",
                "Built for power users",
              ],
              cta: "Pre-Book Now",
            },
          ].map((p, i) => (
            <div
              key={i}
              data-testid={`pricing-card-${i}`}
              className={`relative p-8 rounded-3xl border backdrop-blur-2xl transition-all duration-500 hover:-translate-y-1 ${
                p.popular
                  ? "bg-gradient-to-b from-cyan-500/10 to-transparent border-cyan-400/40 shadow-[0_0_60px_-15px_rgba(0,240,255,0.4)]"
                  : "bg-white/[0.02] border-white/5 hover:border-white/15"
              }`}
            >
              <div
                data-testid={`pricing-badge-${i}`}
                className={`absolute top-5 right-5 text-[10px] uppercase tracking-[0.22em] font-bold px-3 py-1 rounded-full ${
                  p.popular
                    ? "text-cyan-300 border border-cyan-400/40 bg-cyan-400/10"
                    : p.accent === "emerald"
                      ? "text-emerald-300 border border-emerald-400/40 bg-emerald-400/5"
                      : "text-zinc-300 border border-white/15 bg-white/5"
                }`}
              >
                {p.size}
              </div>
              <div className="text-[11px] uppercase tracking-[0.22em] text-zinc-500">
                Pre-Orders Open
              </div>
              <div className="font-display text-2xl text-white mt-1">
                {p.tier}
              </div>
              <div className="mt-6 flex items-baseline gap-3">
                <span className="font-display text-5xl text-white tracking-tighter">
                  {p.price}
                </span>
              </div>
              <p className="mt-4 text-sm text-zinc-400 leading-relaxed">
                {p.desc}
              </p>
              <ul className="mt-6 space-y-2.5">
                {p.perks.map((perk, j) => (
                  <li
                    key={j}
                    className="flex items-center gap-2 text-sm text-zinc-300"
                  >
                    <CheckCircle
                      size={16}
                      weight="duotone"
                      className={
                        p.popular
                          ? "text-cyan-400 flex-shrink-0"
                          : p.accent === "emerald"
                            ? "text-emerald-300 flex-shrink-0"
                            : "text-zinc-400 flex-shrink-0"
                      }
                    />
                    {perk}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => openModal(p.tier)}
                data-testid={`pricing-cta-${i}`}
                className={`mt-8 w-full inline-flex items-center justify-center gap-2 rounded-full py-3 text-sm font-medium transition-all ${
                  p.popular
                    ? "bg-cyan-400 text-black hover:bg-cyan-300 shadow-[0_0_30px_rgba(0,240,255,0.3)]"
                    : "border border-white/15 text-white hover:bg-white/5"
                }`}
              >
                {p.cta}
                <ArrowRight size={14} weight="bold" />
              </button>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-zinc-500">
          Pre-booking secures your spot. No charges, no card details. Final
          pricing locks when units ship.
        </p>
      </div>

      {modalOpen && (
        <PrebookModal
          key={selected || "default"}
          onClose={() => setModalOpen(false)}
          product={selected || "NavAir Performance"}
        />
      )}
    </section>
  );
};

/* ============================================================
   AIR PURIFICATION SERIES — Coming Soon
============================================================ */
const AirPurificationSeries = () => {
  const [joined, setJoined] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const notifyMe = async (e) => {
    e.preventDefault();
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      toast.error("Please enter a valid email.");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(`${API}/waitlist`, {
        email,
        source: "air-purification-series",
      });
      setJoined(true);
      toast.success(res.data?.message || "You're on the list.");
    } catch (err) {
      toast.error("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="air-purification"
      data-testid="air-purification-section"
      className="relative py-28 sm:py-36 px-6 sm:px-10 overflow-hidden border-t border-white/5"
    >
      <div
        className="aurora bg-emerald-500/30"
        style={{ width: 700, height: 700, top: "-20%", right: "-10%" }}
      />
      <div className="max-w-7xl mx-auto relative">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left: copy */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-emerald-300">
                Future Product Line · Coming Soon
              </span>
            </div>
            <h2 className="mt-6 font-display text-4xl sm:text-5xl md:text-6xl font-light tracking-[-0.03em] text-white leading-[1.05]">
              NavAir Air{" "}
              <span className="italic bg-gradient-to-r from-emerald-200 to-cyan-300 bg-clip-text text-transparent">
                Purification Series.
              </span>
            </h2>
            <p className="mt-6 text-zinc-400 leading-relaxed max-w-xl">
              The NavAir Air Purification Series is currently under
              development. Our upcoming air purification products will focus on
              premium design, smart technology, and healthier indoor
              environments — a core part of the NavAir vision.
            </p>

            <div className="mt-10 grid sm:grid-cols-3 gap-4">
              {[
                { i: Sparkle, l: "Premium Design" },
                { i: Lightning, l: "Smart Technology" },
                { i: Heart, l: "Healthier Indoors" },
              ].map((it, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl border border-white/5 bg-white/[0.02]"
                >
                  <it.i
                    size={20}
                    weight="duotone"
                    className="text-emerald-300"
                  />
                  <div className="mt-2 text-sm text-white font-medium">
                    {it.l}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              {!joined ? (
                <form
                  onSubmit={notifyMe}
                  data-testid="air-notify-form"
                  className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto"
                >
                  <input
                    data-testid="air-notify-email-input"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@home.com"
                    className="flex-1 sm:w-72 bg-white/[0.03] border border-white/10 rounded-full px-5 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/20 transition-all"
                  />
                  <button
                    data-testid="air-notify-button"
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center justify-center gap-2 bg-emerald-400 text-black hover:bg-emerald-300 disabled:opacity-50 rounded-full px-6 py-3 font-semibold transition-all shadow-[0_0_40px_rgba(52,211,153,0.35)]"
                  >
                    {loading ? (
                      <CircleNotch
                        size={16}
                        weight="bold"
                        className="animate-spin"
                      />
                    ) : (
                      <>
                        Notify Me
                        <ArrowRight size={14} weight="bold" />
                      </>
                    )}
                  </button>
                  <button
                    type="submit"
                    data-testid="air-join-waitlist"
                    className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium border border-white/15 text-white hover:bg-white/5 transition-all"
                  >
                    Join Waitlist
                  </button>
                </form>
              ) : (
                <div
                  data-testid="air-notify-success"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-emerald-400/30 bg-emerald-400/5 text-emerald-200 text-sm"
                >
                  <CheckCircle size={18} weight="duotone" />
                  You&apos;re on the list. We&apos;ll be in touch.
                </div>
              )}

              <a
                href="#faq"
                data-testid="air-learn-more"
                className="inline-flex items-center gap-2 text-sm text-zinc-300 hover:text-white px-5 py-3 transition-colors"
              >
                Learn More
                <CaretRight size={14} weight="bold" />
              </a>
            </div>

            <p className="mt-5 text-xs text-zinc-500">
              No purchases or pre-orders for the Air Purification Series yet —
              just a quiet hello when it&apos;s ready.
            </p>
          </div>

          {/* Right: futuristic visual placeholder */}
          <div className="lg:col-span-5">
            <div className="relative aspect-square rounded-[2rem] border border-white/10 bg-gradient-to-br from-emerald-500/10 via-zinc-900/40 to-black overflow-hidden backdrop-blur-xl">
              <div className="absolute inset-0 bg-grid opacity-30" />
              <div className="absolute -top-32 -right-32 w-72 h-72 rounded-full bg-emerald-500/20 blur-3xl" />
              <div className="absolute -bottom-32 -left-32 w-72 h-72 rounded-full bg-cyan-500/15 blur-3xl" />

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <div className="w-44 h-64 sm:w-52 sm:h-72 rounded-[2.5rem] bg-gradient-to-b from-zinc-700 via-zinc-800 to-zinc-950 shadow-[0_30px_80px_-20px_rgba(52,211,153,0.4)] border border-white/10 float">
                    <div className="absolute top-6 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full border-2 border-emerald-400/40 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-b from-emerald-300/40 to-emerald-500/10 backdrop-blur" />
                    </div>
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.22em] text-emerald-300/80 font-bold">
                      Concept
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute top-5 left-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/15 bg-black/40 backdrop-blur-xl">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] uppercase tracking-[0.22em] text-zinc-300 font-bold">
                  In Development
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   ROADMAP — Coming Soon from NavAir
============================================================ */
const Roadmap = () => {
  const items = [
    { t: "Wireless Gaming Mouse", s: "Coming Soon", i: DeviceMobile },
    { t: "Mechanical Keyboards", s: "Coming Soon", i: WaveSine },
    { t: "Premium Desk Accessories", s: "Coming Soon", i: Sparkle },
    { t: "Smart Productivity Devices", s: "Coming Soon", i: Lightning },
    { t: "Air Purification Series", s: "In Development", i: Heart },
  ];
  return (
    <section
      id="roadmap"
      data-testid="roadmap-section"
      className="relative py-28 sm:py-36 px-6 sm:px-10 border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl text-center mx-auto mb-14 sm:mb-20">
          <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-cyan-400 mb-5">
            — The journey ahead
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-light tracking-[-0.03em] text-white leading-[1.05]">
            Coming soon from{" "}
            <span className="italic bg-gradient-to-r from-cyan-200 to-emerald-300 bg-clip-text text-transparent">
              NavAir.
            </span>
          </h2>
          <p className="mt-6 text-zinc-400 max-w-xl mx-auto">
            A growing ecosystem of premium technology — designed to enhance the
            way you work, create, and live.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {items.map((it, i) => {
            const dev = it.s === "In Development";
            return (
              <div
                key={i}
                data-testid={`roadmap-item-${i}`}
                className={`relative p-6 rounded-2xl border backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 ${
                  dev
                    ? "bg-gradient-to-b from-emerald-500/10 to-transparent border-emerald-400/30"
                    : "bg-white/[0.02] border-white/5 hover:border-white/15"
                }`}
              >
                <it.i
                  size={28}
                  weight="duotone"
                  className={dev ? "text-emerald-300" : "text-cyan-400"}
                />
                <div className="mt-5 font-display text-lg text-white tracking-tight">
                  {it.t}
                </div>
                <div
                  className={`mt-2 text-[11px] uppercase tracking-[0.22em] font-bold ${
                    dev ? "text-emerald-300" : "text-zinc-500"
                  }`}
                >
                  {it.s}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   ABOUT — Brand story
============================================================ */
const About = () => {
  const ecosystem = [
    "Wireless Keyboards",
    "Wireless Mice",
    "Desk Accessories",
    "Smart Devices",
    "Future Air Purification Solutions",
  ];
  return (
    <section
      id="about"
      data-testid="about-section"
      className="relative py-28 sm:py-36 px-6 sm:px-10 border-t border-white/5 overflow-hidden"
    >
      <div
        className="aurora bg-blue-600/30"
        style={{ width: 600, height: 600, bottom: "-30%", right: "-15%" }}
      />
      <div className="max-w-6xl mx-auto relative grid lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-7">
          <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-cyan-400 mb-5">
            — About NavAir
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-light tracking-[-0.03em] text-white leading-[1.05]">
            A premium tech startup, built for{" "}
            <span className="italic bg-gradient-to-r from-cyan-200 to-emerald-300 bg-clip-text text-transparent">
              modern living.
            </span>
          </h2>
          <p className="mt-6 text-zinc-400 leading-relaxed max-w-xl">
            NavAir is a premium technology startup focused on creating products
            that enhance productivity, comfort, and modern digital lifestyles.
            We believe great tech should feel as good as it looks — and earn a
            place on your desk for years, not months.
          </p>
          <p className="mt-4 text-zinc-400 leading-relaxed max-w-xl">
            Our goal: combine innovation, premium design, and reliability into
            products people genuinely enjoy using every day.
          </p>
        </div>

        <div className="lg:col-span-5">
          <div className="p-7 sm:p-9 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl">
            <div className="text-[11px] uppercase tracking-[0.22em] text-cyan-400 font-bold">
              Our Growing Ecosystem
            </div>
            <ul className="mt-5 space-y-3">
              {ecosystem.map((e, i) => (
                <li
                  key={i}
                  data-testid={`about-ecosystem-${i}`}
                  className="flex items-center gap-3 text-white"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  {e}
                </li>
              ))}
            </ul>
            <div className="mt-7 pt-5 border-t border-white/5 text-xs text-zinc-500">
              Get in touch ·{" "}
              <a
                href="mailto:nav.purify@gmail.com"
                className="text-cyan-300 hover:text-cyan-200"
              >
                nav.purify@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   FAQ — Premium answers, no signup
============================================================ */
const Faq = () => {
  const [openIdx, setOpenIdx] = useState(0);
  const faqs = [
    {
      q: "What products is NavAir launching first?",
      a: "Our first generation is the NavAir Keyboard & Mouse Combo lineup — Essential, Performance, and Pro. Each is designed for productivity, comfort, and modern living.",
    },
    {
      q: "How does pre-booking work?",
      a: "Pick a combo, verify with a quick OTP (email or SMS), and you're in. No charges, no card details — just your spot in the first wave.",
    },
    {
      q: "What happened to the NavAir Air Purifier?",
      a: "The NavAir Air Purification Series is now part of our future product line and is under active development. It remains a core part of our long-term vision.",
    },
    {
      q: "What else is on the NavAir roadmap?",
      a: "We're exploring wireless gaming mice, mechanical keyboards, premium desk accessories, smart productivity devices, and the Air Purification Series. See the roadmap section for more.",
    },
    {
      q: "When will units ship?",
      a: "We're finalising production timelines now. Pre-booking unlocks our launch updates — you'll be the first to know.",
    },
    {
      q: "What's the return and warranty policy?",
      a: "Every NavAir product is backed by a hassle-free return window and a manufacturer warranty. Final terms will accompany your shipping confirmation.",
    },
    {
      q: "How can I get in touch?",
      a: "Reach us anytime at nav.purify@gmail.com — we read every message.",
    },
  ];

  return (
    <section
      id="faq"
      data-testid="faq-section"
      className="relative py-28 sm:py-36 px-6 sm:px-10 overflow-hidden border-t border-white/5"
    >
      <div
        className="aurora bg-cyan-500/30"
        style={{ width: 600, height: 600, bottom: "-30%", left: "20%" }}
      />
      <div className="max-w-4xl mx-auto relative">
        <div className="text-center">
          <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-cyan-400 mb-5">
            — The Quiet Details
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-light tracking-[-0.03em] text-white leading-[1.05]">
            Answered,{" "}
            <span className="italic bg-gradient-to-r from-cyan-200 to-cyan-400 bg-clip-text text-transparent">
              honestly.
            </span>
          </h2>
          <p className="mt-6 text-zinc-400 max-w-xl mx-auto">
            Everything worth knowing before you reserve.
          </p>
        </div>

        <div
          data-testid="faq-list"
          className="mt-14 divide-y divide-white/5 border-y border-white/5"
        >
          {faqs.map((f, i) => {
            const open = openIdx === i;
            return (
              <div key={i} data-testid={`faq-item-${i}`}>
                <button
                  data-testid={`faq-question-${i}`}
                  onClick={() => setOpenIdx(open ? -1 : i)}
                  className="group w-full flex items-center justify-between text-left py-6 sm:py-7 transition-colors"
                  aria-expanded={open}
                >
                  <span
                    className={`font-display text-lg sm:text-xl tracking-tight transition-colors ${
                      open ? "text-white" : "text-zinc-300 group-hover:text-white"
                    }`}
                  >
                    {f.q}
                  </span>
                  <span
                    className={`ml-6 shrink-0 w-9 h-9 rounded-full border flex items-center justify-center transition-all ${
                      open
                        ? "border-cyan-400/60 bg-cyan-400/10 text-cyan-300 rotate-45"
                        : "border-white/10 text-zinc-400 group-hover:border-white/20"
                    }`}
                  >
                    <Plus size={14} weight="bold" />
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-500 ease-out ${
                    open
                      ? "grid-rows-[1fr] opacity-100 pb-7"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p
                      data-testid={`faq-answer-${i}`}
                      className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-3xl"
                    >
                      {f.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-6 p-6 sm:p-8 rounded-3xl border border-white/10 bg-white/[0.02]">
          <div>
            <div className="text-[11px] uppercase tracking-[0.22em] text-cyan-400 font-bold">
              Still curious?
            </div>
            <div className="mt-2 font-display text-2xl text-white tracking-tight">
              We&apos;re a message away.
            </div>
          </div>
          <a
            href="mailto:nav.purify@gmail.com"
            data-testid="faq-contact-cta"
            className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-400/10 hover:bg-cyan-400/20 text-cyan-100 px-6 py-3 text-sm font-semibold transition-all"
          >
            <EnvelopeSimple size={16} weight="bold" />
            nav.purify@gmail.com
          </a>
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   FOOTER
============================================================ */
const Footer = () => {
  return (
    <footer
      data-testid="site-footer"
      className="relative border-t border-white/5 px-6 sm:px-10 py-16 bg-black"
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-10">
        <div className="md:col-span-5">
          <div className="flex items-center gap-2">
            <span className="relative inline-flex">
              <span className="absolute inset-0 rounded-full bg-cyan-400/40 blur-md dot-pulse" />
              <span className="relative w-2.5 h-2.5 rounded-full bg-cyan-400" />
            </span>
            <span className="font-display text-xl tracking-tight">NavAir</span>
          </div>
          <p className="mt-4 text-zinc-500 max-w-sm text-sm">
            Premium technology, thoughtfully designed for productivity,
            comfort, and modern living.
          </p>
          <a
            href="mailto:nav.purify@gmail.com"
            data-testid="footer-contact-email"
            className="mt-5 inline-flex items-center gap-2 text-sm text-cyan-300 hover:text-cyan-200 transition-colors"
          >
            nav.purify@gmail.com
          </a>
        </div>
        <div className="md:col-span-7 grid grid-cols-3 gap-8 text-sm">
          {[
            {
              h: "Products",
              l: ["NavAir Essential", "NavAir Performance", "NavAir Pro", "Air Series (Soon)"],
            },
            {
              h: "Company",
              l: ["About", "Roadmap", "Careers"],
            },
            {
              h: "Support",
              l: [
                { label: "Contact", href: "mailto:nav.purify@gmail.com" },
                { label: "Warranty" },
                { label: "Help center" },
              ],
            },
          ].map((c, i) => (
            <div key={i}>
              <div className="text-[11px] uppercase tracking-[0.22em] text-zinc-500 font-bold mb-4">
                {c.h}
              </div>
              <ul className="space-y-2.5">
                {c.l.map((it, j) => {
                  const isObj = typeof it === "object";
                  const label = isObj ? it.label : it;
                  const href = isObj ? it.href : "#";
                  return (
                    <li key={j}>
                      <a
                        href={href || "#"}
                        data-testid={`footer-link-${c.h.toLowerCase()}-${j}`}
                        className="text-zinc-300 hover:text-cyan-300 transition-colors"
                      >
                        {label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-14 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-zinc-500">
        <div>© {new Date().getFullYear()} NavAir. All rights reserved.</div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-zinc-300">
            Privacy
          </a>
          <a href="#" className="hover:text-zinc-300">
            Terms
          </a>
          <a href="#" className="hover:text-zinc-300">
            Cookies
          </a>
        </div>
      </div>
    </footer>
  );
};

/* ============================================================
   PAGE
============================================================ */
export default function NavAirLanding() {
  return (
    <main className="relative bg-[#0a0a0a] text-white min-h-screen overflow-x-hidden">
      <Header />
      <Hero />
      <TrustStrip />
      <Features />
      <Showcase />
      <Comparison />
      <Pricing />
      <AirPurificationSeries />
      <Roadmap />
      <About />
      <Faq />
      <Footer />
    </main>
  );
}
