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

/* PRODUCT DATA */
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

/* UI COMPONENTS */
function ColorSwatch({ colorVariant, selected, onSelect }) {
  return (
    <button
      type="button"
      title={colorVariant.name}
      onClick={() => onSelect(colorVariant)}
      className={`w-7 h-7 rounded-full border-2 transition-all duration-200 hover:scale-110 ${
        selected
          ? "border-black scale-110 shadow-md"
          : "border-white/80 hover:border-gray-400"
      }`}
      style={{ backgroundColor: colorVariant.hex, boxShadow: selected ? "0 0 0 2px rgba(0,0,0,0.3)" : "0 1px 3px rgba(0,0,0,0.15)" }}
    />
  );
}

function ProductCard({ product, onOpenOrder, featured }) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [imgIdx, setImgIdx] = useState(0);

  const imgs = product.images || [product.image];
  const activeImage = selectedColor.image || imgs[imgIdx];
  const activeThumb = selectedColor.image2 || product.image2;

  return (
    <div
      className={`relative rounded-2xl border overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${
        featured
          ? "border-gray-200 bg-white shadow-xl"
          : "border-gray-100 bg-white shadow-lg"
      }`}
      data-testid={`product-card-${product.key}`}
    >
      <div className="absolute top-5 right-5 flex flex-col items-end gap-2 z-10">
        {featured && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black text-white text-xs font-bold">
            <Star size={11} weight="fill" /> Premium
          </div>
        )}
        <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-500 text-white text-xs font-bold animate-pulse">
          🔥 Only {product.stock} left!
        </div>
      </div>

      <div className="p-6 sm:p-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-xs font-semibold text-gray-700 mb-4">
          ✓ {product.badge}
        </div>
        <h3 className="mt-4 text-2xl sm:text-3xl font-bold text-black">{product.name}</h3>

        <div className="mt-3 flex items-baseline gap-2 flex-wrap">
          {product.price.includes("/") ? (
            <>
              <span className="text-lg text-gray-500 line-through">₹{product.mrp}</span>
              <span className="text-3xl font-bold text-black">₹{product.launchPrice}</span>
              <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full font-semibold">Launch Offer</span>
            </>
          ) : (
            <span className="text-4xl sm:text-5xl font-bold text-black">{product.price}</span>
          )}
        </div>

        <div className="mt-6 grid sm:grid-cols-2 gap-5 items-start">
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-gray-200 bg-gray-50 shadow-md">
              <img src={activeImage} alt={`${product.name} - ${selectedColor.name}`} className="w-full h-full object-cover transition-all duration-300" loading="lazy" />
            </div>
            <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-2xl overflow-hidden border-2 border-white shadow-lg">
              <img src={activeThumb} alt={`${product.name} detail`} className="w-full h-full object-cover transition-all duration-300" loading="lazy" />
            </div>
          </div>

          <div>
            <p className="text-gray-700 leading-relaxed text-sm">{product.desc}</p>
            <ul className="mt-4 space-y-2">
              {product.bullets.map((b, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                  <span className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <CheckCircle size={13} weight="fill" className="text-black" />
                  </span>
                  {b}
                </li>
              ))}
            </ul>

            <div className="mt-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold text-black uppercase tracking-wider">Color:</span>
                <span className="text-xs font-semibold text-gray-700">{selectedColor.name}</span>
              </div>
              <div className="flex flex-wrap gap-2">
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

            <button
              type="button"
              onClick={() => onOpenOrder({ product: product.modalProduct, color: selectedColor.name })}
              className={`mt-5 w-full inline-flex items-center justify-center gap-2 rounded-full py-3.5 text-sm font-bold transition-all duration-300 hover:-translate-y-0.5 ${
                featured
                  ? "bg-black text-white shadow-lg hover:shadow-xl hover:bg-gray-900"
                  : "bg-gray-100 text-black border border-gray-200 hover:bg-gray-200"
              }`}
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
    { id: "products", label: "Products" },
    { id: "faq", label: "FAQ" },
  ], []);

  return (
    <header
      data-testid="site-header"
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-xl bg-white/95 border-b border-gray-200 shadow-sm"
          : "bg-white"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-10 h-16 sm:h-20 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2 group" data-testid="brand-logo">
          <span className="relative inline-flex">
            <span className="absolute inset-0 rounded-full bg-black/30 blur-sm dot-pulse" />
            <span className="relative w-2.5 h-2.5 rounded-full bg-black" />
          </span>
          <span className="text-xl font-bold text-black tracking-tight">NAV AIR</span>
          <span className="text-sm">✦</span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              data-testid={`nav-link-${l.id}`}
              className="text-sm text-gray-600 hover:text-black transition-colors font-medium"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => onOpenOrder({ product: "NAV AIR Cloud Headphones Pro", color: "" })}
          data-testid="header-cta-button"
          className="hidden sm:inline-flex items-center gap-2 text-sm font-bold text-white bg-black hover:bg-gray-900 rounded-full px-6 py-2.5 transition-all"
        >
          Shop Now
          <ArrowRight size={14} weight="bold" />
        </button>

        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden w-9 h-9 rounded-lg border border-gray-200 bg-white flex flex-col items-center justify-center gap-1.5"
        >
          <span className="w-4 h-0.5 bg-black rounded" />
          <span className="w-4 h-0.5 bg-black rounded" />
          <span className="w-4 h-0.5 bg-black rounded" />
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-6 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <a key={l.id} href={`#${l.id}`} className="text-sm font-medium text-black" onClick={() => setMobileOpen(false)}>
              {l.label}
            </a>
          ))}
          <button
            type="button"
            onClick={() => { onOpenOrder({ product: "NAV AIR Cloud Headphones Pro", color: "" }); setMobileOpen(false); }}
            className="w-full text-center py-3 rounded-full bg-black text-white text-sm font-bold"
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
    >
      <div className="absolute inset-0 opacity-50">
        <div className="aurora bg-gray-400/30" style={{ width: 550, height: 550, top: -80, left: -80 }} />
        <div className="aurora bg-purple-300/20" style={{ width: 500, height: 500, bottom: -100, right: -80 }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center animate-fade-in">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 text-xs font-semibold text-gray-700 mb-6">
          ✨ Premium Audio & Accessories
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.0] text-black">
          Elevate
          <br />
          <span className="gradient-kawaii-text italic font-bold">Every Moment</span>
        </h1>

        <p className="mt-8 text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
          Premium wireless headphones, keyboards, mice, and tumblers designed for those who demand the best.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-in-up">
          <button
            type="button"
            onClick={() => onOpenOrder({ product: "NAV AIR Cloud Headphones Pro", color: "" })}
            className="group inline-flex items-center gap-3 bg-black text-white hover:bg-gray-900 rounded-full pl-7 pr-2.5 py-3 font-bold transition-all"
          >
            <span className="text-base">Explore Collection</span>
            <span className="w-10 h-10 rounded-full bg-white/20 inline-flex items-center justify-center transition-transform group-hover:translate-x-0.5">
              <ArrowRight size={15} weight="bold" />
            </span>
          </button>
        </div>
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
      bullets: ["Wireless Bluetooth 5.3", "Deep Bass + Clear Audio", "Soft Ear Cushions", "Foldable Design", "Long Battery Life"],
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
      price: "₹879 / ₹899",
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
    <section id="products" data-testid="products-section" className="relative py-20 sm:py-28 px-6 sm:px-10 overflow-hidden border-t border-gray-200">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-black leading-[1.1]">
            Our Collection
          </h2>
        </div>

        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {products.map((p, idx) => (
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
    { q: "What products are available?", a: "NAV AIR Cloud Headphones Pro (₹1,299 Launch Offer), Bloom Keyboard+Mouse (₹849), Glow Mouse (₹459), and Bloom Tumblers (₹879)." },
    { q: "How does ordering work?", a: "Fill in your details in our order form, review your order, and confirm. No account creation required." },
    { q: "Do you accept Cash on Delivery?", a: "Yes! COD is available. You pay when your package arrives." },
    { q: "What's your shipping timeline?", a: "We'll share shipping timelines after your order is processed." },
    { q: "How can I contact you?", a: "Email us at air.navpure@gmail.com or DM us on Instagram @shopnavair." },
  ];

  return (
    <section
      id="faq"
      data-testid="faq-section"
      className="relative py-24 sm:py-32 px-6 sm:px-10 overflow-hidden"
    >
      <div className="max-w-3xl mx-auto relative">
        <div className="text-center mb-10">
          <h2 className="text-4xl sm:text-5xl font-bold text-black">Questions?</h2>
          <p className="mt-4 text-gray-600">Everything you need to know</p>
        </div>

        <div className="mt-10 space-y-3">
          {faqs.map((f, i) => {
            const open = openIdx === i;
            return (
              <div
                key={i}
                className={`rounded-xl border transition-all duration-300 overflow-hidden ${
                  open
                    ? "border-black bg-gray-50"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(open ? -1 : i)}
                  className="w-full flex items-center justify-between text-left px-6 py-5 transition-all"
                  aria-expanded={open}
                >
                  <span className={`font-semibold text-base transition-colors ${
                    open ? "text-black" : "text-gray-900"
                  }`}>
                    {f.q}
                  </span>
                  <span
                    className={`ml-4 shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${
                      open
                        ? "border-black bg-black text-white rotate-45"
                        : "border-gray-300 text-gray-600"
                    }`}
                  >
                    <Plus size={14} weight="bold" />
                  </span>
                </button>

                <div className={`grid transition-all duration-400 ease-out ${
                  open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}>
                  <div className="overflow-hidden">
                    <p className="text-gray-600 leading-relaxed px-6 pb-5 text-sm">{f.a}</p>
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
      className="relative border-t border-gray-200 px-6 sm:px-10 py-14 bg-black text-white"
      data-testid="site-footer"
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-10">
        <div className="md:col-span-5">
          <div className="flex items-center gap-2.5">
            <span className="relative">
              <span className="absolute inset-0 rounded-full bg-white/40 blur-md dot-pulse" />
              <span className="relative w-3 h-3 rounded-full bg-white" />
            </span>
            <span className="text-xl font-bold tracking-tight">NAV AIR</span>
            <span className="text-lg">✦</span>
          </div>
          <p className="mt-4 text-gray-400 max-w-sm text-sm leading-relaxed">
            Premium audio, keyboards, mice, and lifestyle products designed for excellence.
          </p>
          <div className="mt-5 flex flex-col gap-2">
            <a
              href="mailto:air.navpure@gmail.com"
              className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
            >
              <EnvelopeSimple size={15} weight="bold" />
              air.navpure@gmail.com
            </a>
            <a
              href="https://instagram.com/shopnavair"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
            >
              <InstagramLogo size={15} weight="fill" />
              @shopnavair
            </a>
          </div>
        </div>

        <div className="md:col-span-7 grid grid-cols-3 gap-8 text-sm">
          {[
            { h: "Products", l: [{ label: "Cloud Headphones Pro", href: "#products" }, { label: "Bloom", href: "#products" }, { label: "Glow", href: "#products" }, { label: "Tumblers", href: "#products" }] },
            { h: "Explore", l: [{ label: "FAQ", href: "#faq" }, { label: "Email", href: "mailto:air.navpure@gmail.com" }] },
            { h: "Follow", l: [{ label: "Instagram", href: "https://instagram.com/shopnavair" }] },
          ].map((col, i) => (
            <div key={i}>
              <div className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-4">{col.h}</div>
              <ul className="space-y-2.5">
                {col.l.map((item, j) => (
                  <li key={j}>
                    <a
                      href={item.href}
                      className="text-gray-300 hover:text-white transition-colors text-sm"
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

      <div className="max-w-6xl mx-auto mt-12 pt-6 border-t border-gray-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-gray-400">
        <div>© {new Date().getFullYear()} NAV AIR. All rights reserved.</div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
        </div>
      </div>
    </footer>
  );
}

export default function NavAirLanding() {
  const [openModalFor, setOpenModalFor] = useState(null);
  const [showLookup, setShowLookup] = useState(false);

  return (
    <div id="top" className="relative min-h-screen bg-white overflow-x-hidden">
      <Header onOpenOrder={setOpenModalFor} />
      <main>
        <Hero onOpenOrder={setOpenModalFor} />
        <ProductSection onOpenOrder={setOpenModalFor} />
        <FAQ />
      </main>
      <Footer />

      {openModalFor && (
        <OrderNowModal
          product={openModalFor.product}
          initialColor={openModalFor.color}
          onClose={() => setOpenModalFor(null)}
        />
      )}
    </div>
  );
}
