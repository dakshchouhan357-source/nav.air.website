import { useEffect, useMemo, useState, useRef } from "react";
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
  Desktop,
  SmileySticker,
  CaretLeft,
  CaretRight,
  Package,
  Quotes,
  MagnifyingGlass,
} from "@phosphor-icons/react";
import { toast } from "sonner";
import OrderNowModal from "@/pages/OrderNowModal";

/* ═══════════════════════════════════════════════════════════════════
   PRODUCT DATA — DO NOT MODIFY (prices, images, colors preserved)
   ═══════════════════════════════════════════════════════════════════ */
const CLOUD_HEADPHONES_COLORS = [
  { name: "Pink", hex: "#F4B8C0", image: "/images/headphones/headphones-pink.jpg", image2: "/images/headphones/headphones-all.jpg" },
  { name: "Green", hex: "#7DC4A4", image: "/images/headphones/headphones-green.jpg", image2: "/images/headphones/headphones-all.jpg" },
  { name: "Black", hex: "#2A2A2A", image: "/images/headphones/headphones-all.jpg", image2: "/images/headphones/headphones-all.jpg" },
  { name: "Blue", hex: "#6B8EC8", image: "/images/headphones/headphones-blue.jpg", image2: "/images/headphones/headphones-all.jpg" },
  { name: "Silver", hex: "#C8C8D0", image: "/images/headphones/headphones-silver.jpg", image2: "/images/headphones/headphones-silver2.jpg" },
];

const BLOOM_COLORS = [
  { name: "White", hex: "#F5F5F5", image: "/images/bloom 1.jpeg", image2: "/images/bloom 2.jpeg" },
  { name: "Black", hex: "#2A2A2A", image: "/images/bloom-colors.jpg", image2: "/images/bloom 3.jpeg" },
  { name: "Pink", hex: "#F4A8B0", image: "/images/bloom 2.jpeg", image2: "/images/bloom 1.jpeg" },
  { name: "Teal", hex: "#6EC8C8", image: "/images/bloom-colors.jpg", image2: "/images/bloom 4.jpeg" },
  { name: "Light Green", hex: "#98D9A0", image: "/images/bloom 3.jpeg", image2: "/images/bloom-colors.jpg" },
  { name: "Dark Teal", hex: "#2E8B84", image: "/images/bloom-colors.jpg", image2: "/images/bloom 4.jpeg" },
  { name: "Blue", hex: "#7B8EC8", image: "/images/bloom 4.jpeg", image2: "/images/bloom-colors.jpg" },
  { name: "Sage", hex: "#8FAE9A", image: "/images/bloom-colors.jpg", image2: "/images/bloom 3.jpeg" },
  { name: "Navy", hex: "#3D5A8A", image: "/images/bloom-colors.jpg", image2: "/images/bloom 2.jpeg" },
  { name: "Yellow", hex: "#F0D87A", image: "/images/bloom-colors.jpg", image2: "/images/bloom 1.jpeg" },
];

const GLOW_COLORS = [
  { name: "White", hex: "#F5F5F5", image: "/images/glow 2.jpeg", image2: "/images/glow 3.jpeg" },
  { name: "Pink", hex: "#F4A8B0", image: "/images/glow 3.jpeg", image2: "/images/glow-colors.jpg" },
  { name: "Teal", hex: "#6EC8C8", image: "/images/glow-colors.jpg", image2: "/images/glow 2.jpeg" },
  { name: "Black", hex: "#2A2A2A", image: "/images/glow-colors.jpg", image2: "/images/glow 3.jpeg" },
];

const TUMBLER_COLORS = [
  { name: "Blue Floral", hex: "#9BC4E2", image: "/images/tumblers/tumbler-blue-floral.png", image2: "/images/tumblers/tumbler-blue-floral.png" },
  { name: "White Floral", hex: "#FBF6F0", image: "/images/tumblers/tumbler-white-floral.png", image2: "/images/tumblers/tumbler-white-floral.png" },
  { name: "Purple Floral", hex: "#C9B3D9", image: "/images/tumblers/tumbler-purple-floral.png", image2: "/images/tumblers/tumbler-purple-floral.png" },
  { name: "Pink Floral", hex: "#F0A0B0", image: "/images/tumblers/tumbler-pink-floral.png", image2: "/images/tumblers/tumbler-pink-floral.png" },
];

/* ═══════════════════════════════════════════════════════════════════
   UI COMPONENTS — Cinematic Luxury Redesign
   ═══════════════════════════════════════════════════════════════════ */

function ColorSwatch({ colorVariant, selected, onSelect }) {
  return (
    <button
      type="button"
      title={colorVariant.name}
      onClick={() => onSelect(colorVariant)}
      className={`w-8 h-8 rounded-full border-2 transition-all duration-300 hover:scale-125 ${
        selected
          ? "border-[#c8a97e] scale-110 ring-2 ring-[#c8a97e]/30"
          : "border-white/20 hover:border-white/50"
      }`}
      style={{ 
        backgroundColor: colorVariant.hex, 
        boxShadow: selected 
          ? "0 0 20px rgba(200,169,126,0.3), 0 4px 12px rgba(0,0,0,0.3)" 
          : "0 2px 8px rgba(0,0,0,0.3)" 
      }}
    />
  );
}

function ProductCard({ product, onOpenOrder, featured }) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [imgIdx, setImgIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const imgs = product.images || [product.image];
  const activeImage = selectedColor.image || imgs[imgIdx];
  const activeThumb = selectedColor.image2 || product.image2;

  const isTumbler = product.key === "tumbler";

  return (
    <div
      className={`relative rounded-3xl overflow-hidden transition-all duration-700 hover:-translate-y-3 ${isTumbler ? "pastel-card" : "dark-card"}`}
      data-testid={`product-card-${product.key}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Ambient glow on hover */}
      <div 
        className="absolute inset-0 opacity-0 transition-opacity duration-700 pointer-events-none rounded-3xl"
        style={{ 
          opacity: isHovered ? 0.4 : 0,
          background: "radial-gradient(ellipse at 50% 0%, rgba(200,169,126,0.08) 0%, transparent 70%)" 
        }}
      />

      {/* Tags */}
      <div className="absolute top-5 right-5 flex flex-col items-end gap-2 z-10">
        {featured && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#c8a97e]/10 border border-[#c8a97e]/20 text-xs font-bold text-[#e8c998]">
            <Star size={11} weight="fill" /> Premium
          </div>
        )}
        <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold">
          🔥 Only {product.stock} left!
        </div>
      </div>

      <div className="p-6 sm:p-8">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.06] text-xs font-semibold text-white/60 mb-4">
          <CheckCircle size={12} weight="fill" className="text-[#c8a97e]" />
          {product.badge}
        </div>

        {/* Product name */}
        <h3 className="mt-4 text-2xl sm:text-3xl font-bold text-white tracking-tight">{product.name}</h3>

        {/* Price */}
        <div className="mt-3 flex items-baseline gap-3 flex-wrap">
          {product.price.includes("/") ? (
            <>
              <span className="text-lg line-through text-white/30">₹{product.mrp}</span>
              <span className="text-3xl font-bold text-[#e8c998]">₹{product.launchPrice}</span>
              <span className="text-[10px] bg-[#c8a97e]/10 border border-[#c8a97e]/20 text-[#e8c998] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">Launch Offer</span>
            </>
          ) : (
            <span className="text-4xl sm:text-5xl font-bold text-white">{product.price}</span>
          )}
        </div>

        {/* Product content grid */}
        <div className="mt-8 grid sm:grid-cols-2 gap-6 items-start">
          {/* Image section */}
          <div className="relative group">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-white/[0.06] bg-black/30">
              <img 
                src={activeImage} 
                alt={`${product.name} - ${selectedColor.name}`} 
                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105" 
                loading="lazy" 
              />
              {/* Cinematic overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-60" />
            </div>
            {/* Thumbnail */}
            <div className="absolute -bottom-3 -left-3 w-16 h-16 rounded-xl overflow-hidden border border-white/10 shadow-2xl ring-2 ring-black/50">
              <img src={activeThumb} alt={`${product.name} detail`} className="w-full h-full object-cover" loading="lazy" />
            </div>
          </div>

          {/* Details section */}
          <div>
            <p className="text-white/50 leading-relaxed text-sm">{product.desc}</p>
            <ul className="mt-4 space-y-2.5">
              {product.bullets.map((b, i) => (
                <li key={i} className="flex items-center gap-2.5 text-sm text-white/70">
                  <span className="w-5 h-5 rounded-full bg-[#c8a97e]/10 flex items-center justify-center flex-shrink-0">
                    <CheckCircle size={12} weight="fill" className="text-[#c8a97e]" />
                  </span>
                  {b}
                </li>
              ))}
            </ul>

            {/* Color picker */}
            <div className="mt-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/40">Color</span>
                <span className="text-xs font-medium text-[#c8a97e]">{selectedColor.name}</span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {product.colors.map((c) => (
                  <ColorSwatch
                    key={c.name}
                    colorVariant={c}
                    selected={selectedColor.name === c.name}
                    onSelect={setSelectedColor}
                  />
                ))}
              </div>
            </div>

            {/* CTA */}
            <button
              type="button"
              onClick={() => onOpenOrder({ product: product.modalProduct, color: selectedColor.name })}
              className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-full py-3.5 text-sm font-bold transition-all duration-300 hover:-translate-y-0.5 bg-gradient-to-r from-[#c8a97e] to-[#a08050] text-black hover:shadow-[0_8px_30px_rgba(200,169,126,0.3)]"
            >
              Order Now
              <ArrowRight size={16} weight="bold" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Header({ onOpenOrder }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = useMemo(() => [
    { id: "products", label: "Collection" },
    { id: "faq", label: "FAQ" },
  ], []);

  return (
    <header
      data-testid="site-header"
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-700 ${
        scrolled 
          ? "backdrop-blur-2xl bg-black/80 border-b border-white/[0.04] shadow-[0_4px_30px_rgba(0,0,0,0.3)]" 
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 h-16 sm:h-20 flex items-center justify-between">
        {/* Logo */}
        <a href="#top" className="flex items-center gap-3 group" data-testid="brand-logo">
          <span className="relative inline-flex">
            <span className="absolute inset-0 rounded-full bg-[#c8a97e]/40 blur-md dot-pulse" />
            <span className="relative w-2 h-2 rounded-full bg-[#c8a97e]" />
          </span>
          <span className="text-lg font-bold text-white tracking-[0.1em] uppercase">NAV AIR</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              data-testid={`nav-link-${l.id}`}
              className="text-[13px] text-white/50 hover:text-[#c8a97e] transition-colors duration-300 font-medium uppercase tracking-wider"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* CTA button */}
        <button
          type="button"
          onClick={() => onOpenOrder({ product: "NAV AIR Cloud Headphones Pro", color: "" })}
          data-testid="header-cta-button"
          className="hidden sm:inline-flex items-center gap-2 text-[13px] font-bold text-black bg-gradient-to-r from-[#c8a97e] to-[#a08050] rounded-full px-6 py-2.5 transition-all duration-300 hover:shadow-[0_4px_20px_rgba(200,169,126,0.3)] hover:-translate-y-0.5"
        >
          Shop Now
          <ArrowRight size={13} weight="bold" />
        </button>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden w-9 h-9 rounded-lg border border-white/10 bg-transparent flex flex-col items-center justify-center gap-1.5"
        >
          <span className="w-4 h-0.5 bg-white/70 rounded" />
          <span className="w-4 h-0.5 bg-white/70 rounded" />
          <span className="w-4 h-0.5 bg-white/70 rounded" />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-2xl border-b border-white/[0.04] px-6 py-6 flex flex-col gap-5">
          {links.map((l) => (
            <a key={l.id} href={`#${l.id}`} className="text-sm font-medium text-white/80 uppercase tracking-wider" onClick={() => setMobileOpen(false)}>
              {l.label}
            </a>
          ))}
          <button
            type="button"
            onClick={() => { onOpenOrder({ product: "NAV AIR Cloud Headphones Pro", color: "" }); setMobileOpen(false); }}
            className="w-full text-center py-3.5 rounded-full bg-gradient-to-r from-[#c8a97e] to-[#a08050] text-black text-sm font-bold"
          >
            Shop Now
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
      style={{ background: "linear-gradient(180deg, #000000 0%, #050505 50%, #0a0a0a 100%)" }}
    >
      {/* Cinematic ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, rgba(200,169,126,0.06) 0%, transparent 70%)" }}
      />
      <div className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{ background: "linear-gradient(to top, #0a0a0a, transparent)" }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Tagline pill */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.06] text-[11px] font-semibold text-white/50 mb-8 uppercase tracking-[0.2em] animate-fade-in">
          <span className="w-1.5 h-1.5 rounded-full bg-[#c8a97e] animate-pulse" />
          Premium Audio & Lifestyle
        </div>

        {/* Main heading */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tighter leading-[0.9] text-white animate-fade-in">
          Elevate
          <br />
          <span className="font-['Playfair_Display'] italic font-normal text-[#c8a97e]/90">Every Moment</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-8 text-base sm:text-lg text-white/40 leading-relaxed max-w-2xl mx-auto font-light animate-fade-in">
          Premium wireless headphones, keyboards, mice, and tumblers 
          designed for those who demand excellence.
        </p>

        {/* CTA buttons */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-in-up">
          <button
            type="button"
            onClick={() => onOpenOrder({ product: "NAV AIR Cloud Headphones Pro", color: "" })}
            className="group inline-flex items-center gap-3 bg-gradient-to-r from-[#c8a97e] to-[#a08050] text-black rounded-full pl-7 pr-3 py-3.5 font-bold transition-all duration-300 hover:shadow-[0_8px_40px_rgba(200,169,126,0.3)] hover:-translate-y-1"
          >
            <span className="text-sm">Explore Collection</span>
            <span className="w-9 h-9 rounded-full bg-black/10 inline-flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5">
              <ArrowRight size={14} weight="bold" />
            </span>
          </button>

          <a
            href="#products"
            className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-[#c8a97e] transition-colors duration-300 font-medium"
          >
            View Products
            <ArrowRight size={13} weight="bold" />
          </a>
        </div>

        {/* Decorative line */}
        <div className="mt-20 cinematic-divider w-32 mx-auto" />
      </div>
    </section>
  );
}

function ProductSection({ onOpenOrder }) {
  const products = [
    {
      key: "cloud-headphones-pro",
      name: "NAV AIR Cloud Headphones Pro",
      mrp: "2,499",
      launchPrice: "1,299",
      price: "₹2,499 / ₹1,299",
      badge: "Launch Offer",
      stock: 8,
      image: "/images/headphones/headphones-all.jpg",
      image2: "/images/headphones/headphones-silver.jpg",
      images: ["/images/headphones/headphones-all.jpg", "/images/headphones/headphones-silver.jpg", "/images/headphones/headphones-blue.jpg", "/images/headphones/headphones-green.jpg"],
      colors: CLOUD_HEADPHONES_COLORS,
      desc: "Premium wireless headphones with deep bass and all-day comfort. Crystal-clear sound for music, gaming, and everything in between.",
      bullets: ["Wireless Bluetooth 5.3", "Deep Bass + Clear Audio", "Soft Ear Cushions", "Foldable Design", "Long Battery Life", "Crystal-Clear Audio", "All-Day Comfort", "Travel Ready"],
      modalProduct: "NAV AIR Cloud Headphones Pro",
      featured: true,
    },
    {
      key: "bloom",
      name: "NAV AIR Bloom",
      price: "₹849",
      badge: "Available Now",
      stock: 7,
      image: "/images/bloom 1.jpeg",
      image2: "/images/bloom 2.jpeg",
      images: ["/images/bloom 1.jpeg", "/images/bloom 2.jpeg", "/images/bloom 3.jpeg", "/images/bloom 4.jpeg"],
      colors: BLOOM_COLORS,
      desc: "A complete wireless keyboard + mouse combo for the ultimate desk setup. Soft, smooth, and made for long sessions.",
      bullets: ["Keyboard & Mouse Combo", "Wireless — no cables", "Comfort-first layout", "Soft finish"],
      modalProduct: "NAV AIR Bloom (Keyboard + Mouse Combo)",
    },
    {
      key: "glow",
      name: "NAV AIR Glow",
      price: "₹459",
      badge: "Available Now",
      stock: 12,
      image: "/images/glow 2.jpeg",
      image2: "/images/glow 3.jpeg",
      images: ["/images/glow 2.jpeg", "/images/glow 3.jpeg", "/images/nav air bloob glow 1.jpeg"],
      colors: GLOW_COLORS,
      desc: "A refined wireless mouse designed for calm, precise control — perfectly styled to elevate your desk aesthetic.",
      bullets: ["Mouse only", "Quiet & precise", "Ergonomic comfort", "Aesthetic design"],
      modalProduct: "NAV AIR Glow (Mouse)",
    },
    {
      key: "tumbler",
      name: "NAV AIR Bloom Tumbler",
      price: "₹749",
      badge: "New",
      stock: 15,
      image: "/images/tumblers/tumbler-pink-floral.png",
      image2: "/images/tumblers/tumbler-purple-floral.png",
      images: ["/images/tumblers/tumbler-pink-floral.png", "/images/tumblers/tumbler-blue-floral.png", "/images/tumblers/tumbler-purple-floral.png", "/images/tumblers/tumbler-white-floral.png"],
      colors: TUMBLER_COLORS,
      desc: "Stay Hydrated. Stay Aesthetic. A 1200ml premium insulated tumbler designed for cute desk setups.",
      bullets: ["1200ml capacity", "Double wall insulated", "Keeps hot & cold", "Leak-resistant lid"],
      modalProduct: "NAV AIR Bloom Tumbler",
    },
  ];

  return (
    <section id="products" data-testid="products-section" className="relative py-24 sm:py-32 px-6 sm:px-10 overflow-hidden bg-[#0a0a0a]">
      {/* Section ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[300px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center top, rgba(200,169,126,0.04) 0%, transparent 70%)" }}
      />

      <div className="max-w-7xl mx-auto relative">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#c8a97e]/60 block mb-4">Our Products</span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-white leading-[1.0]">
            The Collection
          </h2>
          <div className="mt-6 cinematic-divider w-24 mx-auto" />
        </div>

        {/* Product grid */}
        <div className="mt-16 grid md:grid-cols-2 gap-6 sm:gap-8">
          {products.map((p) => (
            <ProductCard key={p.key} product={p} onOpenOrder={onOpenOrder} featured={p.featured} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [openIdx, setOpenIdx] = useState(0);
  const faqs = [
    { q: "What products are available?", a: "NAV AIR Cloud Headphones Pro (₹1,299 Launch Offer), Bloom Keyboard+Mouse (₹849), Glow Mouse (₹459), and Bloom Tumblers (₹749)." },
    { q: "How does ordering work?", a: "Fill in your details in our order form, review your order, and confirm. No account creation required." },
    { q: "Do you accept Cash on Delivery?", a: "Yes! COD is available. You pay when your package arrives." },
    { q: "What's your shipping timeline?", a: "We'll share shipping timelines after your order is processed." },
    { q: "How can I contact you?", a: "Email us at air.navpure@gmail.com or DM us on Instagram @shopnavair." },
  ];

  return (
    <section
      id="faq"
      data-testid="faq-section"
      className="relative py-24 sm:py-32 px-6 sm:px-10 overflow-hidden bg-[#0a0a0a]"
    >
      <div className="max-w-3xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#c8a97e]/60 block mb-4">Support</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tighter">Questions?</h2>
          <p className="mt-4 text-white/40 text-sm">Everything you need to know</p>
          <div className="mt-6 cinematic-divider w-20 mx-auto" />
        </div>

        {/* FAQ items */}
        <div className="mt-12 space-y-3">
          {faqs.map((f, i) => {
            const open = openIdx === i;
            return (
              <div
                key={i}
                className={`rounded-2xl border transition-all duration-500 overflow-hidden ${
                  open
                    ? "border-[#c8a97e]/20 bg-white/[0.02]"
                    : "border-white/[0.04] bg-transparent hover:border-white/[0.08]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(open ? -1 : i)}
                  className="w-full flex items-center justify-between text-left px-6 py-5 transition-all"
                  aria-expanded={open}
                >
                  <span className={`font-medium text-[15px] transition-colors ${open ? "text-white" : "text-white/70"}`}>
                    {f.q}
                  </span>
                  <span
                    className={`ml-4 shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-500 ${
                      open
                        ? "border-[#c8a97e] bg-[#c8a97e] text-black rotate-45"
                        : "border-white/10 text-white/40"
                    }`}
                  >
                    <Plus size={13} weight="bold" />
                  </span>
                </button>

                <div className={`grid transition-all duration-500 ease-out ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                  <div className="overflow-hidden">
                    <p className="text-white/50 leading-relaxed px-6 pb-5 text-sm">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer
      className="relative border-t border-white/[0.04] px-6 sm:px-10 py-16 bg-black text-white"
      data-testid="site-footer"
    >
      {/* Ambient glow at top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px"
        style={{ background: "linear-gradient(90deg, transparent 0%, rgba(200,169,126,0.3) 50%, transparent 100%)" }}
      />

      <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12">
        {/* Brand column */}
        <div className="md:col-span-5">
          <div className="flex items-center gap-3">
            <span className="relative">
              <span className="absolute inset-0 rounded-full bg-[#c8a97e]/40 blur-md dot-pulse" />
              <span className="relative w-2.5 h-2.5 rounded-full bg-[#c8a97e]" />
            </span>
            <span className="text-lg font-bold tracking-[0.1em] uppercase">NAV AIR</span>
          </div>
          <p className="mt-5 text-white/30 max-w-sm text-sm leading-relaxed">
            Premium audio, keyboards, mice, and lifestyle products designed for those who expect nothing less.
          </p>
          <div className="mt-6 flex flex-col gap-3">
            <a
              href="mailto:air.navpure@gmail.com"
              className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-[#c8a97e] transition-colors duration-300"
            >
              <EnvelopeSimple size={15} weight="bold" />
              air.navpure@gmail.com
            </a>
            <a
              href="https://instagram.com/shopnavair"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-[#c8a97e] transition-colors duration-300"
            >
              <InstagramLogo size={15} weight="fill" />
              @shopnavair
            </a>
          </div>
        </div>

        {/* Links */}
        <div className="md:col-span-7 grid grid-cols-3 gap-8 text-sm">
          {[
            { h: "Products", l: [{ label: "Cloud Headphones Pro", href: "#products" }, { label: "Bloom", href: "#products" }, { label: "Glow", href: "#products" }, { label: "Tumblers", href: "#products" }] },
            { h: "Explore", l: [{ label: "FAQ", href: "#faq" }, { label: "Email", href: "mailto:air.navpure@gmail.com" }] },
            { h: "Follow", l: [{ label: "Instagram", href: "https://instagram.com/shopnavair" }] },
          ].map((col, i) => (
            <div key={i}>
              <div className="text-[10px] uppercase tracking-[0.2em] text-[#c8a97e]/50 font-bold mb-5">{col.h}</div>
              <ul className="space-y-3">
                {col.l.map((item, j) => (
                  <li key={j}>
                    <a
                      href={item.href}
                      className="text-white/35 hover:text-white transition-colors duration-300 text-sm"
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

      {/* Copyright */}
      <div className