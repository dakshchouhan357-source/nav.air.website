import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Sparkle,
  Heart,
  Star,
  CheckCircle,
  Plus,
  EnvelopeSimple,
  InstagramLogo,
  Wind,
  Mouse,
  Keyboard,
  Headphones,
  Coffee,
  Desktop,
  SmileySticker,
} from "@phosphor-icons/react";
import { toast } from "sonner";
import OrderNowModal from "@/pages/OrderNowModal";

/* ============================================================
   DECORATIVE ELEMENTS
   ============================================================ */
function FloatingDecorations() {
  return (
    <div className="navair-floating-decorations pointer-events-none fixed inset-0 overflow-hidden z-0" aria-hidden="true">
      <div className="absolute top-[8%] left-[5%] text-[#B8A9CC] opacity-30 sparkle" style={{ animationDelay: "0s" }}>
        <Star size={18} weight="fill" />
      </div>
      <div className="absolute top-[15%] right-[8%] text-[#7DC4A4] opacity-25 sparkle" style={{ animationDelay: "0.8s" }}>
        <Star size={12} weight="fill" />
      </div>
      <div className="absolute top-[35%] left-[3%] text-[#E8A87C] opacity-25 wiggle" style={{ animationDelay: "0.3s" }}>
        <Heart size={16} weight="fill" />
      </div>
      <div className="absolute top-[55%] right-[4%] text-[#B8A9CC] opacity-20 float" style={{ animationDelay: "1.2s" }}>
        <Sparkle size={20} weight="fill" />
      </div>
      <div className="absolute bottom-[30%] left-[6%] text-[#7DC4A4] opacity-20 bounce-soft" style={{ animationDelay: "0.6s" }}>
        <Star size={14} weight="fill" />
      </div>
      <div className="absolute bottom-[15%] right-[7%] text-[#E8A87C] opacity-25 sparkle" style={{ animationDelay: "1.5s" }}>
        <Heart size={14} weight="fill" />
      </div>
      <div className="absolute top-[70%] left-[12%] text-[#B8A9CC] opacity-15 float" style={{ animationDelay: "2s" }}>
        <Sparkle size={16} weight="fill" />
      </div>
      <div className="absolute top-[28%] right-[15%] text-[#F5DFA0] opacity-30 wiggle" style={{ animationDelay: "0.9s" }}>
        <Star size={10} weight="fill" />
      </div>
    </div>
  );
}

/* ============================================================
   UI HELPERS
   ============================================================ */
function KawaiiBadge({ text, icon: Icon, color = "mint" }) {
  const colors = {
    mint: "bg-[#E8F5F0] border-[#7DC4A4]/40 text-[#3D6B52]",
    lavender: "bg-[#F0EBF8] border-[#B8A9CC]/40 text-[#6B5A80]",
    peach: "bg-[#FDF0E8] border-[#E8A87C]/40 text-[#8B4E2A]",
    yellow: "bg-[#FDF8E8] border-[#F5DFA0]/40 text-[#7B6020]",
    sage: "bg-[#EEF5F1] border-[#6B9B7E]/40 text-[#3D6B52]",
  };
  return (
    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border font-cute font-semibold text-xs uppercase tracking-wider ${colors[color]}`}>
      {Icon && <Icon size={13} weight="fill" />}
      {text}
    </div>
  );
}

function SectionHeading({ eyebrow, title, subtitle, align = "center" }) {
  const alignClass = align === "left" ? "text-left" : "text-center";
  return (
    <div className={`${alignClass} animate-slide-in-up`}>
      <div className="text-xs font-bold uppercase tracking-widest text-[#7DC4A4] mb-4 font-cute">
        ✦ {eyebrow} ✦
      </div>
      <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#2D3B2D] leading-[1.1]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-5 text-[#6B7B6B] max-w-xl mx-auto leading-relaxed font-cute">{subtitle}</p>
      )}
    </div>
  );
}

function FeatureCard({ icon: Icon, title, body, color = "mint" }) {
  const colors = {
    mint: "from-[#E8F5F0] to-[#F0FAF6] border-[#7DC4A4]/25 hover:border-[#7DC4A4]/50 hover:shadow-[#7DC4A4]/15",
    lavender: "from-[#F0EBF8] to-[#F8F5FC] border-[#B8A9CC]/25 hover:border-[#B8A9CC]/50 hover:shadow-[#B8A9CC]/15",
    peach: "from-[#FDF0E8] to-[#FFF8F3] border-[#E8A87C]/25 hover:border-[#E8A87C]/50 hover:shadow-[#E8A87C]/15",
    yellow: "from-[#FDF8E8] to-[#FFFDF3] border-[#F5DFA0]/25 hover:border-[#F5DFA0]/50 hover:shadow-[#F5DFA0]/15",
  };
  const iconColors = {
    mint: "text-[#7DC4A4]",
    lavender: "text-[#B8A9CC]",
    peach: "text-[#E8A87C]",
    yellow: "text-[#D4A830]",
  };

  return (
    <div
      className={`group bg-gradient-to-br ${colors[color]} border rounded-3xl p-7 sm:p-8 backdrop-blur-sm hover:shadow-lg transition-all duration-400 hover:-translate-y-1`}
    >
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 bg-white shadow-sm ${iconColors[color]}`}>
        <Icon size={22} weight="duotone" />
      </div>
      <h3 className="font-display text-xl font-bold text-[#2D3B2D] mb-2">{title}</h3>
      <p className="text-[#6B7B6B] leading-relaxed font-cute text-sm">{body}</p>
    </div>
  );
}

function ProductCard({ product, onOpenOrder, featured, theme = "apple" }) {
  return (
    <div
      className={`navair-product-card navair-product-card--${theme} relative rounded-3xl border overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${
        featured
          ? "border-[#7DC4A4]/40 bg-gradient-to-br from-[#E8F5F0] via-white to-[#F0EBF8] shadow-xl shadow-[#7DC4A4]/15"
          : "border-[#B8A9CC]/30 bg-gradient-to-br from-[#F0EBF8] via-white to-[#FDF0E8] shadow-lg shadow-[#B8A9CC]/10"
      }`}
      data-testid={`product-card-${product.key}`}
    >
      {featured && (
        <div className="absolute top-5 right-5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#7DC4A4] text-white text-xs font-bold font-cute">
            <Star size={11} weight="fill" /> Best Seller
          </div>
        </div>
      )}

      <div className="p-6 sm:p-8">
        <KawaiiBadge
          text={product.badge}
          icon={CheckCircle}
          color={featured ? "mint" : "lavender"}
        />
        <h3 className="mt-4 font-display text-2xl sm:text-3xl font-bold text-[#2D3B2D]">{product.name}</h3>

        <div className="mt-3 flex items-baseline gap-2">
          <span className="font-display text-4xl sm:text-5xl font-extrabold text-[#3D6B52]">{product.price}</span>
          <span className="text-sm text-[#6B7B6B] font-cute">COD available</span>
        </div>

        <div className="mt-6 grid sm:grid-cols-2 gap-5 items-start">
          <div className="relative">
            <div className="product-visual aspect-[4/3] rounded-2xl overflow-hidden border border-[#7DC4A4]/20 bg-gradient-to-br from-[#E8F5F0] to-[#F0FAF6] shadow-md">
              {product.image ? (
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" loading="lazy" />
              ) : (
                <div className="product-icon-visual" aria-label={`${product.name} product illustration`}>
                  <product.visualIcon size={76} weight="duotone" />
                </div>
              )}
            </div>
            {product.image2 ? (
              <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-2xl overflow-hidden border-2 border-white shadow-lg">
                <img src={product.image2} alt={`${product.name} detail`} className="w-full h-full object-cover" loading="lazy" />
              </div>
            ) : (
              <div className="product-detail-chip" aria-hidden="true"><Sparkle size={18} weight="fill" /></div>
            )}
          </div>

          <div>
            <p className="text-[#4A5E4A] leading-relaxed font-cute text-sm">{product.desc}</p>
            <ul className="mt-4 space-y-2">
              {product.bullets.map((b, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-[#3D6B52] font-cute font-medium">
                  <span className="w-5 h-5 rounded-full bg-[#E8F5F0] flex items-center justify-center flex-shrink-0">
                    <CheckCircle size={13} weight="fill" className="text-[#7DC4A4]" />
                  </span>
                  {b}
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={() => product.available !== false && onOpenOrder(product.modalProduct)}
              disabled={product.available === false}
              className={`mt-6 w-full inline-flex items-center justify-center gap-2 rounded-full py-3.5 text-sm font-bold font-cute transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 ${
                featured
                  ? "bg-gradient-to-r from-[#7DC4A4] to-[#6B9B7E] text-white shadow-lg shadow-[#7DC4A4]/35 hover:shadow-[#7DC4A4]/50"
                  : "bg-gradient-to-r from-[#B8A9CC] to-[#A090BC] text-white shadow-lg shadow-[#B8A9CC]/35 hover:shadow-[#B8A9CC]/50"
              }`}
            >
              {product.available === false ? "Coming Soon" : "Order Now"}
              {product.available !== false && <ArrowRight size={16} weight="bold" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function TrustStrip() {
  const items = [
    "✦ Premium Quality",
    "✦ Cute Aesthetic",
    "✦ Wireless Freedom",
    "✦ Comfort First",
    "✦ Fast Delivery",
    "✦ COD Available",
    "✦ Kawaii Design",
    "✦ Desk Goals",
  ];
  const row = [...items, ...items];

  return (
    <section
      data-testid="trust-strip"
      className="relative border-y border-[#7DC4A4]/20 py-7 overflow-hidden bg-gradient-to-r from-[#E8F5F0] via-white to-[#F0EBF8]"
    >
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#E8F5F0] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#F0EBF8] to-transparent z-10 pointer-events-none" />
      <div className="flex marquee gap-14 whitespace-nowrap">
        {row.map((t, i) => (
          <span key={i} className="font-cute font-bold text-[#6B9B7E] text-sm tracking-wide cursor-default hover:text-[#3D6B52] transition-colors">
            {t}
          </span>
        ))}
      </div>
    </section>
  );
}

function Comparison() {
  const rows = [
    { label: "Product type", bloom: "Combo (Keyboard + Mouse)", glow: "Mouse only" },
    { label: "Price", bloom: "₹849", glow: "₹459" },
    { label: "Status", bloom: "Available Now", glow: "Available Now" },
    { label: "Comfort", bloom: "Built for long sessions", glow: "Ergonomic comfort" },
    { label: "Wireless", bloom: "Yes", glow: "Yes" },
    { label: "Design", bloom: "Cute pastel aesthetic", glow: "Cute pastel aesthetic" },
  ];

  return (
    <section
      id="comparison"
      data-testid="comparison-section"
      className="relative py-20 sm:py-28 px-6 sm:px-10 overflow-hidden"
    >
      <div className="aurora bg-[#B8A9CC]/20" style={{ width: 500, height: 500, top: "-10%", right: "-10%" }} />
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          eyebrow="Compare Bloom & Glow"
          title={<>Find your<span className="gradient-kawaii-text italic"> perfect match.</span></>}
          subtitle="Two adorable options. Same premium quality. You choose!"
        />

        <div className="mt-12 rounded-3xl border border-[#7DC4A4]/25 bg-white/80 backdrop-blur-sm overflow-hidden shadow-xl shadow-[#7DC4A4]/10">
          <div className="grid grid-cols-3 border-b border-[#7DC4A4]/20 bg-gradient-to-r from-[#E8F5F0] to-[#F0EBF8]">
            <div className="p-5 text-xs uppercase tracking-widest text-[#6B7B6B] font-bold font-cute">Feature</div>
            <div className="p-5 text-center border-r border-[#7DC4A4]/20">
              <div className="text-xs uppercase tracking-widest text-[#3D6B52] font-bold font-cute">NAV AIR Bloom</div>
              <div className="mt-1.5 font-display text-2xl font-extrabold text-[#2D3B2D]">₹849</div>
            </div>
            <div className="p-5 text-center">
              <div className="text-xs uppercase tracking-widest text-[#6B5A80] font-bold font-cute">NAV AIR Glow</div>
              <div className="mt-1.5 font-display text-2xl font-extrabold text-[#2D3B2D]">₹459</div>
            </div>
          </div>

          <div className="divide-y divide-[#7DC4A4]/12">
            {rows.map((r, i) => (
              <div key={i} className="grid grid-cols-3 items-center hover:bg-[#F5FAF7] transition-colors">
                <div className="p-4 sm:p-5 text-xs uppercase tracking-wider text-[#6B7B6B] font-cute font-semibold">{r.label}</div>
                <div className="p-4 sm:p-5 text-center text-sm text-[#2D3B2D] font-cute font-medium border-r border-[#7DC4A4]/12">{r.bloom}</div>
                <div className="p-4 sm:p-5 text-center text-sm text-[#4A5E4A] font-cute">{r.glow}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ComingSoon() {
  return (
    <section
      id="air-purifiers"
      data-testid="coming-soon-section"
      className="relative py-20 sm:py-28 px-6 sm:px-10 overflow-hidden"
    >
      <div className="aurora bg-[#7DC4A4]/20" style={{ width: 500, height: 500, bottom: "-10%", left: "-5%" }} />
      <div className="aurora bg-[#E8A87C]/15" style={{ width: 350, height: 350, top: "0%", right: "5%" }} />

      <div className="max-w-5xl mx-auto">
        <div className="rounded-3xl border border-[#7DC4A4]/30 bg-gradient-to-br from-[#E8F5F0] via-white to-[#FDF8E8] shadow-2xl shadow-[#7DC4A4]/12 p-8 sm:p-14 relative overflow-hidden">
          <div className="absolute top-6 right-6 text-[#B8A9CC] opacity-30 sparkle">
            <Star size={28} weight="fill" />
          </div>
          <div className="absolute bottom-6 left-8 text-[#E8A87C] opacity-25 wiggle">
            <Heart size={20} weight="fill" />
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-5">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#7DC4A4] text-white text-xs font-bold font-cute shadow-lg shadow-[#7DC4A4]/30 bounce-soft">
                  <Wind size={14} weight="fill" />
                  Coming Soon ✨
                </div>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#2D3B2D] leading-tight">
                Air Purifiers
                <span className="block gradient-kawaii-text italic mt-1">Breathe beautifully.</span>
              </h2>

              <p className="mt-5 text-[#6B7B6B] leading-relaxed font-cute max-w-lg">
                Premium air purification with the same adorable kawaii aesthetic you love. Smart, quiet, and designed to look gorgeous on any desk or shelf.
              </p>

              <div className="mt-7 grid sm:grid-cols-3 gap-4">
                {[
                  { icon: Wind, label: "Ultra Silent", desc: "Library-quiet operation" },
                  { icon: Star, label: "Smart Control", desc: "WiFi & app connected" },
                  { icon: Heart, label: "Kawaii Design", desc: "Fits any cute setup" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-2xl border border-[#7DC4A4]/20 bg-white/70 backdrop-blur-sm hover:border-[#7DC4A4]/40 hover:shadow-md transition-all"
                  >
                    <item.icon size={18} weight="duotone" className="text-[#7DC4A4] mb-2" />
                    <div className="font-cute font-bold text-[#3D6B52] text-sm">{item.label}</div>
                    <p className="mt-1 text-xs text-[#6B7B6B] font-cute">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <a
                  href="mailto:air.navpure@gmail.com"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-[#7DC4A4]/40 bg-white text-[#3D6B52] px-6 py-3 text-sm font-bold font-cute transition-all hover:bg-[#7DC4A4] hover:text-white hover:border-[#7DC4A4] hover:shadow-lg hover:shadow-[#7DC4A4]/25"
                >
                  <EnvelopeSimple size={16} weight="bold" />
                  Notify me when it launches
                </a>
              </div>
            </div>

            <div className="hidden md:flex flex-col items-center gap-3">
              <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-[#E8F5F0] to-[#D0EEE3] border-2 border-[#7DC4A4]/30 flex items-center justify-center shadow-lg float">
                <Wind size={48} weight="duotone" className="text-[#7DC4A4]" />
              </div>
              <div className="text-xs font-cute font-bold text-[#6B9B7E] text-center tracking-wider">AIR PURIFIER</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TumblerSpotlight({ onOpenOrder }) {
  return (
    <section
      id="tumbler"
      data-testid="tumbler-section"
      className="tumbler-zone relative py-24 sm:py-32 px-6 sm:px-10 overflow-hidden"
    >
      <div className="pastry-orbit pastry-orbit--one" aria-hidden="true" />
      <div className="pastry-orbit pastry-orbit--two" aria-hidden="true" />
      <div className="max-w-6xl mx-auto">
        <div className="tumbler-panel grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 items-center">
          <div className="tumbler-art" aria-hidden="true">
            <div className="tumbler-art__halo" />
            <div className="tumbler-art__cup">
              <Coffee size={88} weight="duotone" />
              <span>sweet<br />sips</span>
            </div>
            <span className="pastry-sticker pastry-sticker--top">freshly made</span>
            <span className="pastry-sticker pastry-sticker--bottom">take it slow</span>
          </div>

          <div>
            <div className="pastry-eyebrow">The soft landing</div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#5B3B3B] leading-[1.05]">
              Meet the
              <span className="block tumbler-gradient italic">sweet tumbler.</span>
            </h2>
            <p className="mt-6 max-w-xl text-[#805B5B] leading-relaxed font-cute">
              A pastel companion for iced coffee, chai, and every little treat between busy moments. Scroll down and let the mood get softer.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {["Pastel finish", "Easy to carry", "Made for slow sips"].map((item) => (
                <span key={item} className="pastry-pill">{item}</span>
              ))}
            </div>
            <span className="mt-9 inline-flex items-center gap-2 rounded-full border border-[#B87575]/25 bg-white/55 px-6 py-3.5 text-sm font-bold font-cute text-[#9F5E64]">
              Tumbler collection coming soon
              <Sparkle size={16} weight="fill" />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [openIdx, setOpenIdx] = useState(0);
  const faqs = [
    { q: "Which products can I order right now?", a: "NAV AIR Bloom (Keyboard + Mouse Combo) and NAV AIR Glow (Mouse) are available now. Air Purifiers are coming soon!" },
    { q: "How does the ordering process work?", a: "Fill in your details in our cute order form, review your order, and confirm. No account creation or OTP required — just simple and easy!" },
    { q: "Do you accept Cash on Delivery?", a: "Yes! COD is available. You pay when your package arrives at your door." },
    { q: "When will my order be shipped?", a: "We'll share shipping timelines after your order is processed. We'll keep you informed every step of the way." },
    { q: "When are Air Purifiers launching?", a: "Air Purifiers are coming soon! Email us at air.navpure@gmail.com to get notified when they launch." },
    { q: "How can I reach you?", a: "Email us at air.navpure@gmail.com or DM us on Instagram @shopnavair — we love hearing from you!" },
  ];

  return (
    <section
      id="faq"
      data-testid="faq-section"
      className="relative py-24 sm:py-32 px-6 sm:px-10 overflow-hidden"
    >
      <div className="aurora bg-[#B8A9CC]/15" style={{ width: 500, height: 500, bottom: "-20%", right: "-10%" }} />

      <div className="max-w-3xl mx-auto relative">
        <SectionHeading
          eyebrow="FAQ"
          title={<>Got questions?<span className="gradient-kawaii-text italic"> We've got answers.</span></>}
          subtitle="Everything you need to know before you order."
        />

        <div className="mt-10 space-y-3">
          {faqs.map((f, i) => {
            const open = openIdx === i;
            return (
              <div
                key={i}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  open
                    ? "border-[#7DC4A4]/40 bg-gradient-to-r from-[#E8F5F0] to-white shadow-md shadow-[#7DC4A4]/10"
                    : "border-[#7DC4A4]/20 bg-white/70 hover:border-[#7DC4A4]/35 hover:bg-white"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(open ? -1 : i)}
                  className="w-full flex items-center justify-between text-left px-6 py-5 transition-all"
                  aria-expanded={open}
                >
                  <span className={`font-cute font-bold text-base transition-colors ${open ? "text-[#3D6B52]" : "text-[#2D3B2D]"}`}>
                    {f.q}
                  </span>
                  <span
                    className={`ml-4 shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${
                      open
                        ? "border-[#7DC4A4] bg-[#7DC4A4] text-white rotate-45"
                        : "border-[#B8D4C4] text-[#7DC4A4]"
                    }`}
                  >
                    <Plus size={14} weight="bold" />
                  </span>
                </button>

                <div className={`grid transition-all duration-400 ease-out ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                  <div className="overflow-hidden">
                    <p className="text-[#6B7B6B] font-cute leading-relaxed px-6 pb-5 text-sm">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 p-6 sm:p-8 rounded-3xl border border-[#B8A9CC]/30 bg-gradient-to-br from-[#F0EBF8] to-white shadow-lg shadow-[#B8A9CC]/10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div>
              <div className="text-xs uppercase tracking-widest text-[#B8A9CC] font-bold font-cute mb-1">Still curious?</div>
              <div className="font-display text-xl font-bold text-[#2D3B2D]">We're just a message away. ✉️</div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="mailto:air.navpure@gmail.com"
                className="inline-flex items-center gap-2 rounded-full border border-[#7DC4A4]/40 bg-white text-[#3D6B52] px-5 py-2.5 text-sm font-bold font-cute transition-all hover:bg-[#7DC4A4] hover:text-white hover:border-[#7DC4A4]"
              >
                <EnvelopeSimple size={15} weight="bold" />
                air.navpure@gmail.com
              </a>
              <a
                href="https://instagram.com/shopnavair"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[#B8A9CC]/40 bg-white text-[#6B5A80] px-5 py-2.5 text-sm font-bold font-cute transition-all hover:bg-[#B8A9CC] hover:text-white hover:border-[#B8A9CC]"
              >
                <InstagramLogo size={15} weight="fill" />
                @shopnavair
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer
      className="relative border-t border-[#7DC4A4]/20 px-6 sm:px-10 py-14 bg-gradient-to-b from-white to-[#F0FAF6]"
      data-testid="site-footer"
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-10">
        <div className="md:col-span-5">
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <span className="absolute inset-0 rounded-full bg-[#7DC4A4]/40 blur-md dot-pulse" />
              <span className="relative w-3 h-3 rounded-full bg-[#7DC4A4] flex items-center justify-center" />
            </div>
            <span className="font-display text-xl font-extrabold text-[#2D3B2D] tracking-tight">NavAir</span>
            <span className="text-lg">🌿</span>
          </div>
          <p className="mt-4 text-[#6B7B6B] max-w-sm text-sm leading-relaxed font-cute">
            Cute, comfortable, and wireless. Designed for people who love adorable desk setups and premium tech.
          </p>
          <div className="mt-5 flex flex-col gap-2">
            <a
              href="mailto:air.navpure@gmail.com"
              className="inline-flex items-center gap-2 text-sm text-[#7DC4A4] hover:text-[#3D6B52] transition-colors font-cute font-semibold"
            >
              <EnvelopeSimple size={15} weight="bold" />
              air.navpure@gmail.com
            </a>
            <a
              href="https://instagram.com/shopnavair"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-[#B8A9CC] hover:text-[#6B5A80] transition-colors font-cute font-semibold"
            >
              <InstagramLogo size={15} weight="fill" />
              @shopnavair
            </a>
          </div>
        </div>

        <div className="md:col-span-7 grid grid-cols-3 gap-8 text-sm">
          {[
            { h: "Products", l: [{ label: "NAV AIR Bloom", href: "#products" }, { label: "NAV AIR Glow", href: "#products" }, { label: "Air Purifiers ✨", href: "#air-purifiers" }] },
            { h: "Explore", l: [{ label: "Compare", href: "#comparison" }, { label: "FAQ", href: "#faq" }, { label: "Coming Soon", href: "#air-purifiers" }] },
            { h: "Support", l: [{ label: "Email Us", href: "mailto:air.navpure@gmail.com" }, { label: "Instagram", href: "https://instagram.com/shopnavair" }, { label: "FAQ", href: "#faq" }] },
          ].map((col, i) => (
            <div key={i}>
              <div className="text-xs uppercase tracking-widest text-[#6B7B6B] font-bold font-cute mb-4">{col.h}</div>
              <ul className="space-y-2.5">
                {col.l.map((item, j) => (
                  <li key={j}>
                    <a
                      href={item.href}
                      className="text-[#4A5E4A] hover:text-[#7DC4A4] transition-colors text-sm font-cute"
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-12 pt-6 border-t border-[#7DC4A4]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#6B7B6B] font-cute">
        <div>© {new Date().getFullYear()} NavAir. All rights reserved. Made with 💚</div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-[#7DC4A4] transition-colors">Privacy</a>
          <a href="#" className="hover:text-[#7DC4A4] transition-colors">Terms</a>
        </div>
      </div>
    </footer>
  );
}

/* ============================================================
   MAIN PAGE SECTIONS
   ============================================================ */
function Header({ onOpenOrder }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = useMemo(() => [
    { id: "products", label: "Combos" },
    { id: "comparison", label: "Compare" },
    { id: "air-purifiers", label: "Air Purifiers" },
    { id: "faq", label: "FAQ" },
  ], []);

  return (
    <header
      data-testid="site-header"
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-2xl bg-white/80 border-b border-[#7DC4A4]/20 shadow-sm shadow-[#7DC4A4]/8"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-10 h-16 sm:h-20 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5 group" data-testid="brand-logo">
          <span className="relative inline-flex">
            <span className="absolute inset-0 rounded-full bg-[#7DC4A4]/50 blur-sm dot-pulse" />
            <span className="relative w-2.5 h-2.5 rounded-full bg-[#7DC4A4]" />
          </span>
          <span className="font-display text-xl font-extrabold text-[#2D3B2D] tracking-tight">NavAir</span>
          <span className="text-base">🌿</span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              data-testid={`nav-link-${l.id}`}
              className="text-sm text-[#4A5E4A] hover:text-[#3D6B52] transition-colors font-cute font-semibold"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => onOpenOrder("NAV AIR Bloom (Keyboard + Mouse Combo)")}
          data-testid="header-cta-button"
          className="hidden sm:inline-flex items-center gap-2 text-sm font-bold font-cute text-white bg-gradient-to-r from-[#7DC4A4] to-[#6B9B7E] hover:from-[#6B9B7E] hover:to-[#5A8B6E] rounded-full pl-5 pr-2 py-2 transition-all duration-300 shadow-md shadow-[#7DC4A4]/30 hover:shadow-[#7DC4A4]/45 hover:-translate-y-0.5"
        >
          Order Now
          <span className="w-7 h-7 rounded-full bg-white/20 inline-flex items-center justify-center">
            <ArrowRight size={13} weight="bold" />
          </span>
        </button>

        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden w-9 h-9 rounded-xl border border-[#7DC4A4]/30 bg-white/80 flex flex-col items-center justify-center gap-1.5"
        >
          <span className="w-4 h-0.5 bg-[#3D6B52] rounded" />
          <span className="w-4 h-0.5 bg-[#3D6B52] rounded" />
          <span className="w-4 h-0.5 bg-[#3D6B52] rounded" />
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-[#7DC4A4]/20 px-6 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <a key={l.id} href={`#${l.id}`} className="text-sm font-cute font-semibold text-[#3D6B52]" onClick={() => setMobileOpen(false)}>
              {l.label}
            </a>
          ))}
          <button
            type="button"
            onClick={() => { onOpenOrder("NAV AIR Bloom (Keyboard + Mouse Combo)"); setMobileOpen(false); }}
            className="w-full text-center py-3 rounded-full bg-gradient-to-r from-[#7DC4A4] to-[#6B9B7E] text-white text-sm font-bold font-cute"
          >
            Order Now
          </button>
        </div>
      )}
    </header>
  );
}

function Hero({ onOpenOrder }) {
  return (
    <section
      id="top"
      data-testid="hero-section"
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 pt-28 pb-20"
    >
      <div className="aurora bg-[#7DC4A4]/20" style={{ width: 550, height: 550, top: -80, left: -80 }} />
      <div className="aurora bg-[#B8A9CC]/15" style={{ width: 500, height: 500, bottom: -100, right: -80 }} />
      <div className="aurora bg-[#E8A87C]/12" style={{ width: 380, height: 380, top: "35%", right: "15%" }} />

      <div className="relative z-10 max-w-5xl mx-auto text-center animate-fade-in">
        <div className="flex items-center justify-center gap-2 mb-6">
          <KawaiiBadge text="Wireless Combos Available Now" icon={Sparkle} color="mint" />
        </div>

        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[82px] font-extrabold tracking-tight leading-[1.0] text-[#2D3B2D]">
          Cute tech for your
          <br />
          <span className="gradient-kawaii-text italic font-extrabold">
            dream desk setup.
          </span>
        </h1>

        <p className="mt-8 text-base sm:text-lg text-[#6B7B6B] leading-relaxed max-w-2xl mx-auto font-cute">
          NAV AIR Bloom, Glow & Sound — considered keyboard, mouse, and headphone essentials for a calm, beautiful desk setup.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-in-up">
          <button
            type="button"
            onClick={() => onOpenOrder("NAV AIR Bloom (Keyboard + Mouse Combo)")}
            className="group inline-flex items-center gap-3 bg-gradient-to-r from-[#7DC4A4] to-[#6B9B7E] text-white hover:from-[#6B9B7E] hover:to-[#5A8B6E] rounded-full pl-7 pr-2.5 py-3 font-bold font-cute transition-all duration-300 shadow-xl shadow-[#7DC4A4]/35 hover:shadow-[#7DC4A4]/50 hover:-translate-y-1.5"
          >
            <span className="text-base">Order Bloom Combo</span>
            <span className="w-10 h-10 rounded-full bg-white/20 inline-flex items-center justify-center transition-transform group-hover:translate-x-0.5">
              <ArrowRight size={15} weight="bold" />
            </span>
          </button>

          <a
            href="#products"
            className="inline-flex items-center gap-2 text-sm font-bold font-cute text-[#3D6B52] border-2 border-[#7DC4A4]/40 hover:border-[#7DC4A4] hover:bg-[#E8F5F0] rounded-full px-7 py-3.5 transition-all shadow-sm"
          >
            <SmileySticker size={16} weight="fill" className="text-[#7DC4A4]" />
            Explore products
          </a>
        </div>

        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 max-w-3xl mx-auto gap-6 border-t border-[#7DC4A4]/20 pt-10">
          {[
            { icon: Keyboard, v: "Wireless Keyboard", l: "Smooth & comfortable typing" },
            { icon: Mouse, v: "Wireless Mouse", l: "Precise & ergonomic feel" },
            { icon: Headphones, v: "Wireless Audio", l: "Quiet focus, richer sound" },
          ].map((s) => (
            <div key={s.v} className="text-center group">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#E8F5F0] to-[#D0EEE3] border border-[#7DC4A4]/20 flex items-center justify-center mx-auto mb-3 group-hover:shadow-md transition-all">
                <s.icon size={22} weight="duotone" className="text-[#7DC4A4]" />
              </div>
              <div className="font-display text-lg font-bold text-[#2D3B2D]">{s.v}</div>
              <div className="mt-1 text-xs font-cute text-[#6B7B6B]">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section id="features" className="relative py-20 sm:py-28 px-6 sm:px-10 overflow-hidden" data-testid="features-section">
      <div className="aurora bg-[#7DC4A4]/15" style={{ width: 450, height: 450, top: "-5%", right: "-8%" }} />
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="Why NavAir"
          title={<>Designed for the way<span className="gradient-kawaii-text italic"> you actually work.</span></>}
          align="left"
        />

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <FeatureCard
            icon={Keyboard}
            title="Wireless Freedom"
            body="No cables, no clutter. Clean desk, happy mind — go anywhere and stay connected."
            color="mint"
          />
          <FeatureCard
            icon={Heart}
            title="Comfort First"
            body="Ergonomic shapes and soft-touch materials built for long study and work sessions."
            color="peach"
          />
          <FeatureCard
            icon={Star}
            title="Kawaii Aesthetic"
            body="Soft pastel finishes and adorable design that makes your desk look like a dream."
            color="lavender"
          />
          <FeatureCard
            icon={Mouse}
            title="Smooth Precision"
            body="Responsive, quiet, and silky-smooth inputs that keep you in the zone all day."
            color="yellow"
          />
          <FeatureCard
            icon={Sparkle}
            title="Premium Materials"
            body="Quality you can feel — durable construction with a soft, premium finish."
            color="mint"
          />
          <FeatureCard
            icon={CheckCircle}
            title="Easy Ordering"
            body="No accounts, no OTP, no hassle. Fill out the form, confirm, and you're done."
            color="lavender"
          />
        </div>
      </div>
    </section>
  );
}

function ProductSection({ onOpenOrder }) {
  const products = [
    {
      key: "bloom",
      name: "NAV AIR Bloom",
      price: "₹849",
      badge: "Available Now",
      image: "/images/bloom 1.jpeg",
      image2: "/images/bloom 2.jpeg",
      desc: "A complete wireless keyboard + mouse combo for the ultimate cute desk setup. Soft, smooth, and made for long sessions.",
      bullets: ["Keyboard & mouse combo", "Wireless — no cables", "Comfort-first layout", "Soft pastel finish"],
      modalProduct: "NAV AIR Bloom (Keyboard + Mouse Combo)",
    },
    {
      key: "glow",
      name: "NAV AIR Glow",
      price: "₹459",
      badge: "Available Now",
      image: "/images/glow 2.jpeg",
      image2: "/images/glow 3.jpeg",
      desc: "A refined wireless mouse designed for calm, precise control — perfectly styled to elevate your desk aesthetic.",
      bullets: ["Mouse only", "Quiet, precise control", "Ergonomic comfort", "Cute pastel aesthetic"],
      modalProduct: "NAV AIR Glow (Mouse)",
    },
    {
      key: "sound",
      name: "NAV AIR Sound",
      price: "Coming soon",
      badge: "Next in the collection",
      visualIcon: Headphones,
      available: false,
      desc: "A quiet, considered audio piece for focused work, late-night playlists, and the cleanest desk setup.",
      bullets: ["Immersive everyday audio", "Comfort-first fit", "Clean, wireless setup", "Apple-inspired simplicity"],
      modalProduct: "NAV AIR Sound (Headphones)",
    },
  ];

  return (
    <section id="products" data-testid="products-section" className="relative py-20 sm:py-28 px-6 sm:px-10 overflow-hidden border-t border-[#7DC4A4]/15">
      <div className="aurora bg-[#B8A9CC]/15" style={{ width: 600, height: 600, top: "-5%", right: "-15%" }} />

      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="The NAV AIR collection"
          title={<>Designed to disappear into<span className="gradient-kawaii-text italic"> your day.</span></>}
          subtitle="Clean, calm tech for your desk, your commute, and everything in between."
        />

        <div className="mt-14 grid md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
          {products.map((p, idx) => (
            <ProductCard key={p.key} product={p} onOpenOrder={onOpenOrder} featured={idx === 0} theme="apple" />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   MAIN EXPORT
   ============================================================ */
export default function NavAirLanding() {
  const [openModalFor, setOpenModalFor] = useState(null);

  return (
    <main
      className="navair-page relative min-h-screen overflow-x-hidden"
      data-testid="navair-landing"
    >
      <FloatingDecorations />

      <div className="relative z-10">
        <Header onOpenOrder={(p) => setOpenModalFor(p)} />
        <div className="tech-zone">
          <Hero onOpenOrder={(p) => setOpenModalFor(p)} />
          <TrustStrip />
          <Features />
          <ProductSection onOpenOrder={(p) => setOpenModalFor(p)} />
          <Comparison />
        </div>
        <TumblerSpotlight onOpenOrder={(p) => setOpenModalFor(p)} />
        <ComingSoon />
        <FAQ />
        <Footer />
      </div>

      {openModalFor !== null && (
        <OrderNowModal
          onClose={() => setOpenModalFor(null)}
          product={openModalFor}
        />
      )}
    </main>
  );
}
