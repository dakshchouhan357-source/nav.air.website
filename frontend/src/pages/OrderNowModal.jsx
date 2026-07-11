import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { sendOrderEmails } from "@/services/emailjsService";
import {
  ArrowRight, CheckCircle, CircleNotch, X, ShoppingCart, Heart, Sparkle,
} from "@phosphor-icons/react";

/* ── Products catalogue ───────────────────────────────────────────── */
/* Cloud Headphones & Bloom Tumbler have separate prepaid vs COD pricing;
   Bloom & Glow keep a single flat price. */
const PRODUCTS = [
  { label: "NAV AIR Bloom (Keyboard + Mouse Combo)", price: 849, colors: null },
  { label: "NAV AIR Glow (Mouse)",                   price: 459, colors: null },
  {
    label: "NAVAIR Cloud Headphones",
    pricePrepaid: 579,
    priceCod: 599,
    colors: [
      { name: "Pink",   hex: "#F4B8C0" },
      { name: "Green",  hex: "#7DC4A4" },
      { name: "Black",  hex: "#2A2A2A" },
      { name: "Blue",   hex: "#6B8EC8" },
      { name: "Silver", hex: "#C8C8D0" },
    ],
  },
  {
    label: "NAVAIR Bloom Tumbler",
    pricePrepaid: 779,
    priceCod: 799,
    colors: [
      { name: "Blue Floral",   hex: "#9BC4E2" },
      { name: "White Floral",  hex: "#FBF6F0" },
      { name: "Purple Floral", hex: "#C9B3D9" },
      { name: "Pink Floral",   hex: "#F0A0B0" },
    ],
  },
];

/** Unit price for a product given the selected payment method. */
function priceFor(product, paymentMethod) {
  if (product.price != null) return product.price;
  return paymentMethod === "cod" ? product.priceCod : product.pricePrepaid;
}

/** Human-readable price label for the product dropdown. */
function priceLabel(product) {
  if (product.price != null) return "Rs. " + product.price;
  return "Rs. " + product.pricePrepaid + " Prepaid / Rs. " + product.priceCod + " COD";
}

const INSTAGRAM_URL = "https://www.instagram.com/shopnavair";
const SHIPPING_COST = 99;
const PAYMENT_QR_IMAGE = "/images/payment-qr.png";

function isValidEmail(v) { return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test((v || "").trim()); }
function normalizeMobile(v) { return (v || "").replace(/\D/g, ""); }
function isValidMobile(v) { return normalizeMobile(v).length >= 10; }
function isValidPin(v) { return /^\d{6}$/.test((v || "").trim()); }

function KawaiiInput({ label, required, children }) {
  return (
    <label className="block">
      <span className="text-xs font-bold font-cute text-[#3D6B52] uppercase tracking-wider mb-1.5 block">
        {label} {required && <span className="text-[#E8A87C]">*</span>}
      </span>
      {children}
    </label>
  );
}

const base = "w-full rounded-2xl px-4 py-3 text-[#2D3B2D] placeholder-[#A8B8A8] focus:outline-none focus:ring-2 transition font-cute text-sm";
const inp   = base + " bg-white/80 border border-[#7DC4A4]/40 focus:border-[#7DC4A4] focus:ring-[#7DC4A4]/20";
const inpP  = base + " bg-white/80 border border-[#B8A9CC]/40 focus:border-[#B8A9CC] focus:ring-[#B8A9CC]/20";
const inpY  = base + " bg-white/80 border border-[#F5DFA0]/60 focus:border-[#D4A830] focus:ring-[#D4A830]/20";
const txtaP = inpP + " resize-none min-h-[80px]";

const mintCard   = { background: "linear-gradient(135deg,rgba(232,245,240,0.85) 0%,rgba(208,238,227,0.50) 100%)", border: "1px solid rgba(125,196,164,0.35)" };
const lavCard    = { background: "linear-gradient(135deg,rgba(240,235,248,0.85) 0%,rgba(224,214,240,0.45) 100%)", border: "1px solid rgba(184,169,204,0.40)" };
const peachCard  = { background: "linear-gradient(135deg,rgba(253,248,232,0.90) 0%,rgba(255,240,220,0.55) 100%)", border: "1px solid rgba(245,223,160,0.55)" };
const orangeCard = { background: "linear-gradient(135deg,rgba(255,236,200,0.85) 0%,rgba(255,220,180,0.55) 100%)", border: "1.5px solid rgba(232,168,124,0.50)" };
const greenCard  = { background: "linear-gradient(135deg,rgba(200,240,220,0.95) 0%,rgba(175,225,205,0.70) 100%)", border: "2px solid rgba(125,196,164,0.60)" };

function InstagramIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  );
}

export default function OrderNowModal({ onClose, product, initialColor }) {
  const defaultProduct = useMemo(
    () => PRODUCTS.find((p) => p.label === product)?.label || PRODUCTS[0].label, [product]
  );
  const [step, setStep] = useState(1);
  const [placing, setPlacing] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(defaultProduct);
  const [selectedColor, setSelectedColor] = useState(initialColor || "");
  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [notes, setNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("online");

  const currentProductData = useMemo(
    () => PRODUCTS.find((p) => p.label === selectedProduct) || PRODUCTS[0], [selectedProduct]
  );
  const unitPrice = priceFor(currentProductData, paymentMethod);
  const totalPrice = unitPrice * quantity + SHIPPING_COST;
  const hasColors = currentProductData.colors && currentProductData.colors.length > 0;

  // Reset color when product changes
  useEffect(() => { setSelectedColor(""); }, [selectedProduct]);

  useEffect(() => {
    const fn = (e) => { if (e.key === "Escape" && !placing) onClose?.(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose, placing]);

  const validate = () => {
    if (!fullName.trim())       { toast.error("Please enter your full name"); return false; }
    if (!isValidMobile(mobile)) { toast.error("Please enter a valid 10-digit mobile number"); return false; }
    if (!isValidEmail(email))   { toast.error("Please enter a valid email address"); return false; }
    if (hasColors && !selectedColor) { toast.error("Please select a color"); return false; }
    if (!address.trim())        { toast.error("Please enter your full address"); return false; }
    if (!city.trim())           { toast.error("Please enter your city"); return false; }
    if (!state.trim())          { toast.error("Please enter your state"); return false; }
    if (!isValidPin(pincode))   { toast.error("Please enter a valid 6-digit PIN code"); return false; }
    return true;
  };

  const placeOrder = async () => {
    if (!validate()) return;
    setPlacing(true);
    try {
      const id = "ORD-" + Date.now().toString(36).toUpperCase();
      setOrderId(id);
      await sendOrderEmails({
        full_name: fullName.trim(),
        mobile: normalizeMobile(mobile),
        email: email.trim(),
        address: address.trim(),
        city: city.trim(),
        state: state.trim(),
        pincode: pincode.trim(),
        product: selectedProduct,
        color: selectedColor || "Not specified",
        quantity: Number(quantity),
        notes: notes?.trim() || "",
        total_price: totalPrice,
        order_id: id,
        payment_method: paymentMethod === "cod" ? "Cash on Delivery (COD)" : "Online Payment (QR / UPI)",
      });
      try {
        localStorage.setItem("navair_order_" + id, JSON.stringify({
          order_id: id, product: selectedProduct, color: selectedColor || "Not specified",
          quantity: Number(quantity), total_price: totalPrice,
          payment_method: paymentMethod, timestamp: new Date().toISOString(),
        }));
      } catch (_) {}
      setStep(3);
      toast.success("Order request sent!");
    } catch (err) {
      const msg = err?.text || err?.status || err?.message || String(err);
      toast.error("Could not send order (" + msg + "). DM @shopnavair on Instagram or email air.navpure@gmail.com");
    } finally {
      setPlacing(false);
    }
  };

  const isOnline = paymentMethod === "online";
  const selectedColorData = hasColors ? currentProductData.colors.find(c => c.name === selectedColor) : null;

  return (
    <div data-testid="order-now-modal" className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div
        className="absolute inset-0 backdrop-blur-sm"
        style={{ background: "linear-gradient(135deg,rgba(125,196,164,0.28) 0%,rgba(184,169,204,0.22) 50%,rgba(232,168,124,0.20) 100%)" }}
        onClick={() => !placing && onClose?.()}
      />
      <div
        className="relative w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl"
        style={{ background: "linear-gradient(150deg,#E8F6F1 0%,#F2EBF9 40%,#FFF4EB 80%,#FEFAF0 100%)", border: "1.5px solid rgba(125,196,164,0.40)" }}
      >
        <div className="absolute -top-12 -right-12 w-44 h-44 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle,rgba(184,169,204,0.35) 0%,transparent 70%)" }} />
        <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle,rgba(125,196,164,0.30) 0%,transparent 70%)" }} />

        {/* Header */}
        <div className="relative p-6 sm:p-8" style={{ borderBottom: "1px solid rgba(125,196,164,0.22)", background: "linear-gradient(135deg,rgba(224,244,236,0.75) 0%,rgba(240,233,252,0.55) 100%)" }}>
          <button onClick={() => !placing && onClose?.()} type="button" aria-label="Close"
            className="absolute top-5 right-5 p-2 rounded-full text-[#6B7B6B] hover:text-[#3D6B52] hover:bg-white/60 transition">
            <X size={18} weight="bold" />
          </button>
          <div className="flex items-center gap-3 mb-1">
            {step === 3 ? <Heart size={22} weight="fill" className="text-[#7DC4A4]" />
                        : <ShoppingCart size={22} weight="duotone" className="text-[#7DC4A4]" />}
            <h3 className="font-display text-2xl font-extrabold text-[#2D3B2D]">
              {step === 1 && "Place Your Order ✨"}
              {step === 2 && "Review Your Order 🌿"}
              {step === 3 && "Order Request Sent! 💚"}
            </h3>
          </div>
          <p className="text-sm text-[#6B7B6B] font-cute ml-9">
            {step === 1 && "Fill in your details — no account needed!"}
            {step === 2 && "Everything look right? Confirm to send your order."}
            {step === 3 && "We have received your order. Our team will be in touch shortly ✨"}
          </p>
          <div className="flex gap-2 mt-5 ml-9">
            {[1, 2, 3].map(s => (
              <div key={s} className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${s <= step ? "bg-gradient-to-r from-[#7DC4A4] to-[#B8A9CC]" : "bg-white/50"}`} />
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="relative p-6 sm:p-8 max-h-[62vh] overflow-y-auto">

          {/* ── STEP 1 ── */}
          {step === 1 && (
            <div className="space-y-4">

              {/* Personal info */}
              <div className="p-4 rounded-2xl space-y-4" style={mintCard}>
                <h4 className="text-xs font-bold font-cute text-[#3D6B52] uppercase tracking-widest">🌱 Personal Info</h4>
                <KawaiiInput label="Full Name" required>
                  <input data-testid="order-fullname" value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Your full name" className={inp} autoComplete="name" />
                </KawaiiInput>
                <KawaiiInput label="Mobile Number" required>
                  <input data-testid="order-mobile" value={mobile} onChange={e => setMobile(e.target.value.replace(/\D/g,"").slice(0,10))} placeholder="10-digit mobile number" maxLength="10" className={inp} inputMode="numeric" autoComplete="tel" />
                </KawaiiInput>
                <KawaiiInput label="Email Address" required>
                  <input data-testid="order-email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" className={inp} autoComplete="email" />
                </KawaiiInput>
              </div>

              {/* Delivery address */}
              <div className="p-4 rounded-2xl space-y-4" style={lavCard}>
                <h4 className="text-xs font-bold font-cute text-[#6B5A80] uppercase tracking-widest">🏠 Delivery Address</h4>
                <KawaiiInput label="Complete Address" required>
                  <textarea data-testid="order-address" value={address} onChange={e => setAddress(e.target.value)} placeholder="House no., street, area, landmark..." className={txtaP} />
                </KawaiiInput>
                <div className="grid grid-cols-2 gap-3">
                  <KawaiiInput label="City" required>
                    <input data-testid="order-city" value={city} onChange={e => setCity(e.target.value)} placeholder="Mumbai" className={inpP} />
                  </KawaiiInput>
                  <KawaiiInput label="State" required>
                    <input data-testid="order-state" value={state} onChange={e => setState(e.target.value)} placeholder="Maharashtra" className={inpP} />
                  </KawaiiInput>
                </div>
                <KawaiiInput label="PIN Code" required>
                  <input data-testid="order-pin" value={pincode} onChange={e => setPincode(e.target.value.replace(/\D/g,"").slice(0,6))} placeholder="6-digit PIN" maxLength="6" className={inpP} inputMode="numeric" />
                </KawaiiInput>
              </div>

              {/* Order details */}
              <div className="p-4 rounded-2xl space-y-4" style={peachCard}>
                <h4 className="text-xs font-bold font-cute text-[#7B6020] uppercase tracking-widest">📦 Order Details</h4>

                {/* Product selector */}
                <KawaiiInput label="Product" required>
                  <div className="relative">
                    <select value={selectedProduct} onChange={e => setSelectedProduct(e.target.value)} className={inpY + " appearance-none"}>
                      {PRODUCTS.map(p => (
                        <option key={p.label} value={p.label}>{p.label} — {priceLabel(p)}</option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                      <span className="text-[#D4A830] text-xs">▾</span>
                    </div>
                  </div>
                </KawaiiInput>

                {/* Color selector — buttons for products with defined colors, text input otherwise */}
                {hasColors ? (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold font-cute text-[#7B6020] uppercase tracking-wider">
                        Color <span className="text-[#E8A87C]">*</span>
                      </span>
                      {selectedColor && selectedColorData && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/80 border border-[#F5DFA0]/60 text-xs font-bold font-cute text-[#7B6020]">
                          <span className="w-3 h-3 rounded-full inline-block border border-white/60 shadow-sm" style={{ backgroundColor: selectedColorData.hex }} />
                          {selectedColor}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {currentProductData.colors.map(c => (
                        <button
                          key={c.name}
                          type="button"
                          onClick={() => setSelectedColor(c.name)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border-2 text-xs font-bold font-cute transition-all ${
                            selectedColor === c.name
                              ? "border-[#7DC4A4] bg-white/90 text-[#2D3B2D] scale-105 shadow-md"
                              : "border-white/60 bg-white/50 text-[#6B7B6B] hover:border-[#7DC4A4]/50 hover:bg-white/70"
                          }`}
                        >
                          <span className="w-4 h-4 rounded-full flex-shrink-0 border border-white/60 shadow-sm" style={{ backgroundColor: c.hex }} />
                          {c.name}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <KawaiiInput label="Color (Optional)">
                    <input
                      value={selectedColor}
                      onChange={e => setSelectedColor(e.target.value)}
                      placeholder="e.g. White, Pink, Teal, Black…"
                      className={inpY}
                    />
                  </KawaiiInput>
                )}

                {/* Quantity + total */}
                <div className="flex gap-3 items-end">
                  <div className="flex-1">
                    <KawaiiInput label="Quantity" required>
                      <input data-testid="order-qty" type="number" value={quantity} min="1" max="10"
                        onChange={e => setQuantity(Math.max(1, Number(e.target.value || 1)))} className={inpY} />
                    </KawaiiInput>
                  </div>
                  <div className="px-4 py-3 rounded-2xl text-center min-w-[110px]"
                    style={{ background: "rgba(255,255,255,0.80)", border: "1px solid rgba(245,223,160,0.55)" }}>
                    <div className="text-xs text-[#6B7B6B] font-cute mb-0.5">Total Amount</div>
                    <div className="text-xs text-[#6B7B6B] font-cute mt-1">(incl. ₹99 shipping)</div>
                    <div className="font-display text-2xl font-extrabold text-[#3D6B52]">Rs. {totalPrice}</div>
                  </div>
                </div>

                {currentProductData.price == null && (
                  <p className="text-xs font-cute text-[#7B6020]">
                    Rs. {currentProductData.pricePrepaid} on Online Payment · Rs. {currentProductData.priceCod} on COD
                  </p>
                )}

                <KawaiiInput label="Notes (Optional)">
                  <input data-testid="order-notes" value={notes} onChange={e => setNotes(e.target.value)} placeholder="Special delivery instructions..." className={inpY} />
                </KawaiiInput>
              </div>

              {/* Payment Method */}
              <div className="p-4 rounded-2xl space-y-3"
                style={{ background: "linear-gradient(135deg,rgba(245,250,247,0.95) 0%,rgba(240,245,255,0.80) 100%)", border: "1.5px solid rgba(125,196,164,0.35)" }}>
                <h4 className="text-xs font-bold font-cute text-[#3D6B52] uppercase tracking-widest">💳 Payment Method</h4>

                <button type="button" onClick={() => setPaymentMethod("online")}
                  className={`w-full text-left p-4 rounded-2xl transition-all ${isOnline ? "ring-2 ring-[#7DC4A4]" : "hover:bg-white/60"}`}
                  style={isOnline ? greenCard : { background: "rgba(255,255,255,0.60)", border: "1px solid rgba(125,196,164,0.25)" }}>
                  <div className="flex items-start gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 mt-0.5 flex-shrink-0 flex items-center justify-center ${isOnline ? "border-[#7DC4A4] bg-[#7DC4A4]" : "border-[#B8C8B8]"}`}>
                      {isOnline && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-cute font-bold text-[#2D3B2D] text-sm">Online Payment</span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold font-cute bg-[#7DC4A4] text-white">Recommended</span>
                      </div>
                      <p className="font-cute text-xs text-[#4A5E4A] mt-1">Scan the QR below, pay via UPI, we verify &amp; dispatch</p>
                    </div>
                    <span className="text-xl flex-shrink-0">📲</span>
                  </div>
                </button>

                {isOnline && (
                  <div className="p-4 rounded-2xl flex flex-col items-center gap-2 text-center" style={greenCard}>
                    <img src={PAYMENT_QR_IMAGE} alt="Scan to pay via UPI" className="w-40 h-40 rounded-xl object-contain bg-white p-1.5 shadow-sm" />
                    <p className="font-cute text-xs text-[#3D6B52]">
                      Scan &amp; pay <strong>Rs. {totalPrice}</strong> with any UPI app, then fill in your address &amp; phone below.
                    </p>
                  </div>
                )}

                <button type="button" onClick={() => setPaymentMethod("cod")}
                  className={`w-full text-left p-4 rounded-2xl transition-all ${!isOnline ? "ring-2 ring-[#B8A9CC]" : "hover:bg-white/60"}`}
                  style={!isOnline ? lavCard : { background: "rgba(255,255,255,0.60)", border: "1px solid rgba(184,169,204,0.25)" }}>
                  <div className="flex items-start gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 mt-0.5 flex-shrink-0 flex items-center justify-center ${!isOnline ? "border-[#B8A9CC] bg-[#B8A9CC]" : "border-[#C8B8D8]"}`}>
                      {!isOnline && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                    <div className="flex-1">
                      <span className="font-cute font-bold text-[#2D3B2D] text-sm">Cash on Delivery (COD)</span>
                      <p className="font-cute text-xs text-[#6B5A80] mt-1">Pay in cash when your order arrives</p>
                    </div>
                    <span className="text-xl flex-shrink-0">💵</span>
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* ── STEP 2: REVIEW ── */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl space-y-3" style={mintCard}>
                <h4 className="font-cute font-bold text-[#3D6B52] text-sm">🌱 Personal Details</h4>
                <div className="space-y-1.5 text-sm font-cute">
                  <div className="flex justify-between"><span className="text-[#6B7B6B]">Name</span><span className="font-semibold text-[#2D3B2D]">{fullName}</span></div>
                  <div className="flex justify-between"><span className="text-[#6B7B6B]">Mobile</span><span className="font-semibold text-[#2D3B2D]">{mobile}</span></div>
                  <div className="flex justify-between"><span className="text-[#6B7B6B]">Email</span><span className="font-semibold text-[#2D3B2D] text-right max-w-[60%] break-all">{email}</span></div>
                </div>
              </div>

              <div className="p-5 rounded-2xl space-y-3" style={lavCard}>
                <h4 className="font-cute font-bold text-[#6B5A80] text-sm">🏠 Delivery Address</h4>
                <div className="text-sm font-cute text-[#4A5E4A]">
                  <p>{address}</p>
                  <p>{city}, {state} — {pincode}</p>
                </div>
              </div>

              <div className="p-5 rounded-2xl space-y-3" style={peachCard}>
                <h4 className="font-cute font-bold text-[#7B6020] text-sm">📦 Order Summary</h4>
                <div className="space-y-1.5 text-sm font-cute">
                  <div className="flex justify-between">
                    <span className="text-[#6B7B6B]">Product</span>
                    <span className="font-semibold text-[#2D3B2D] text-right max-w-[55%]">{selectedProduct}</span>
                  </div>
                  {selectedColor && (
                    <div className="flex justify-between items-center">
                      <span className="text-[#6B7B6B]">Color</span>
                      <span className="inline-flex items-center gap-1.5 font-semibold text-[#2D3B2D]">
                        {selectedColorData && (
                          <span className="w-3.5 h-3.5 rounded-full inline-block border border-white/60 shadow-sm" style={{ backgroundColor: selectedColorData.hex }} />
                        )}
                        {selectedColor}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between"><span className="text-[#6B7B6B]">Quantity</span><span className="font-semibold text-[#2D3B2D]">{quantity}</span></div>
                  <div className="flex justify-between"><span className="text-[#6B7B6B]">Unit Price</span><span className="font-semibold text-[#2D3B2D]">Rs. {unitPrice}</span></div>
                  {notes && <div className="flex justify-between"><span className="text-[#6B7B6B]">Notes</span><span className="font-semibold text-[#2D3B2D] text-right max-w-[55%]">{notes}</span></div>}
                  <div className="flex justify-between"><span className="text-[#6B7B6B]">Shipping</span><span className="font-semibold text-[#2D3B2D]">₹99</span></div>
                  <div className="flex justify-between pt-2 border-t border-[#F5DFA0]/40 font-bold text-base">
                    <span className="text-[#3D6B52]">Total Amount</span>
                    <span className="text-[#3D6B52] font-display text-xl">Rs. {totalPrice}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl flex items-center gap-3" style={isOnline ? greenCard : lavCard}>
                <span className="text-2xl">{isOnline ? "📲" : "💵"}</span>
                <div>
                  <div className="font-cute font-bold text-sm text-[#2D3B2D]">{isOnline ? "Online Payment" : "Cash on Delivery (COD)"}</div>
                  <div className="font-cute text-xs text-[#6B7B6B]">{isOnline ? "Pay via the QR code shown at checkout" : "Pay cash on delivery"}</div>
                </div>
              </div>
            </div>
          )}

          {/* ── STEP 3: SUCCESS ── */}
          {step === 3 && (
            <div className="text-center space-y-5 py-2">
              <div className="flex justify-center">
                <div className="w-24 h-24 rounded-full flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg,#B8E8D4 0%,#D4EAF5 50%,#E8D8F0 100%)", border: "2.5px solid rgba(125,196,164,0.55)" }}>
                  <CheckCircle size={44} weight="fill" className="text-[#5BAA88]" />
                </div>
              </div>

              <div>
                <h4 className="font-display text-2xl font-extrabold text-[#2D3B2D] mb-2">
                  {isOnline ? "Order received! 🌿" : "Order confirmed! 🎉"}
                </h4>
                <p className="text-[#6B7B6B] font-cute text-sm">We have received your order details.</p>
              </div>

              {isOnline && (
                <div className="p-5 rounded-2xl text-left" style={greenCard}>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl flex-shrink-0">✅</span>
                    <div>
                      <p className="font-cute font-bold text-[#3D6B52] text-sm mb-2">Order Placed — Verifying Your Payment</p>
                      <p className="font-cute text-sm text-[#2D3B2D]">
                        Thanks for scanning the QR and paying via UPI! Our team is now checking our bank/UPI
                        account for your payment. Once confirmed, we'll email you and dispatch your order 📦
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {!isOnline && (
                <div className="p-5 rounded-2xl text-left" style={lavCard}>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl flex-shrink-0">🚚</span>
                    <div>
                      <p className="font-cute font-bold text-[#6B5A80] text-sm mb-2">COD Order — here is what happens next:</p>
                      <ol className="space-y-1.5 font-cute text-sm text-[#4A3A60] list-none">
                        <li className="flex items-start gap-2"><span className="font-bold text-[#B8A9CC] flex-shrink-0">1.</span>We review and confirm your order</li>
                        <li className="flex items-start gap-2"><span className="font-bold text-[#B8A9CC] flex-shrink-0">2.</span>Your product is dispatched and shipped 📦</li>
                        <li className="flex items-start gap-2"><span className="font-bold text-[#B8A9CC] flex-shrink-0">3.</span>Pay cash to the delivery person on arrival 💵</li>
                      </ol>
                    </div>
                  </div>
                </div>
              )}

              <div className="p-5 rounded-2xl text-left space-y-3" style={mintCard}>
                {orderId && (
                  <div>
                    <div className="text-xs text-[#6B7B6B] font-cute uppercase tracking-wider mb-0.5">Order ID</div>
                    <div className="font-display text-lg font-bold text-[#3D6B52]">{orderId}</div>
                  </div>
                )}
                <div>
                  <div className="text-xs text-[#6B7B6B] font-cute uppercase tracking-wider mb-0.5">Product</div>
                  <div className="font-cute font-semibold text-[#2D3B2D] text-sm">{selectedProduct}</div>
                </div>
                {selectedColor && (
                  <div>
                    <div className="text-xs text-[#6B7B6B] font-cute uppercase tracking-wider mb-0.5">Color</div>
                    <div className="inline-flex items-center gap-1.5 font-cute font-semibold text-[#2D3B2D] text-sm">
                      {selectedColorData && <span className="w-4 h-4 rounded-full inline-block border border-white/60 shadow-sm" style={{ backgroundColor: selectedColorData.hex }} />}
                      {selectedColor}
                    </div>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-[#6B7B6B] font-cute uppercase tracking-wider mb-0.5">Payment Status</div>
                    <div className="inline-flex items-center gap-2 mt-1 px-3 py-1.5 rounded-full"
                      style={isOnline
                        ? { background: "rgba(232,244,255,0.90)", border: "1px solid rgba(107,163,216,0.50)" }
                        : { background: "rgba(220,240,230,0.90)", border: "1px solid rgba(125,196,164,0.50)" }}>
                      <span className={`w-2 h-2 rounded-full animate-pulse inline-block ${isOnline ? "bg-[#6BA3D8]" : "bg-[#7DC4A4]"}`} />
                      <span className={`font-cute font-bold text-sm ${isOnline ? "text-[#2C5680]" : "text-[#3D6B52]"}`}>
                        {isOnline ? "VERIFYING PAYMENT" : "COD CONFIRMED"}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-[#6B7B6B] font-cute uppercase tracking-wider mb-0.5">Total</div>
                    <div className="font-display text-2xl font-bold text-[#3D6B52]">Rs. {totalPrice}</div>
                  </div>
                </div>
              </div>

              {isOnline && (
                <div className="p-4 rounded-2xl" style={lavCard}>
                  <div className="flex items-center justify-center gap-2 text-sm font-cute text-[#6B5A80]">
                    <Sparkle size={14} weight="fill" />
                    A confirmation email will be sent to <strong>{email}</strong> once verified
                  </div>
                </div>
              )}

              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 w-full rounded-full py-3 font-bold font-cute text-sm text-white transition-all hover:-translate-y-0.5"
                style={{ background: "linear-gradient(135deg,#E1306C 0%,#833AB4 50%,#F77737 100%)", boxShadow: "0 4px 16px rgba(225,48,108,0.40)" }}>
                <InstagramIcon size={18} />
                DM us on Instagram @shopnavair
              </a>

              <p className="text-xs text-[#6B7B6B] font-cute">
                Questions? Email{" "}
                <a href="mailto:air.navpure@gmail.com" className="text-[#7DC4A4] font-semibold underline">air.navpure@gmail.com</a>
              </p>
            </div>
          )}
        </div>

        {/* Footer buttons */}
        <div className="relative px-6 sm:px-8 pb-6 sm:pb-8 pt-2">
          {step === 1 && (
            <button type="button" onClick={() => { if (validate()) setStep(2); }}
              className="w-full flex items-center justify-center gap-2 rounded-full py-4 text-white font-bold font-cute text-base transition-all hover:-translate-y-0.5"
              style={{ background: "linear-gradient(135deg,#7DC4A4 0%,#6B9B7E 100%)", boxShadow: "0 4px 20px rgba(125,196,164,0.45)" }}>
              Review Order <ArrowRight size={17} weight="bold" />
            </button>
          )}
          {step === 2 && (
            <div className="flex gap-3">
              <button type="button" onClick={() => setStep(1)} disabled={placing}
                className="flex-1 rounded-full py-4 font-bold font-cute transition hover:-translate-y-0.5 disabled:opacity-50"
                style={{ background: "rgba(255,255,255,0.70)", border: "2px solid rgba(125,196,164,0.45)", color: "#3D6B52" }}>
                Back
              </button>
              <button type="button" onClick={placeOrder} disabled={placing}
                className="flex-[2] flex items-center justify-center gap-2 rounded-full py-4 text-white font-bold font-cute transition-all hover:-translate-y-0.5 disabled:opacity-60"
                style={{ background: placing ? "rgba(125,196,164,0.60)" : "linear-gradient(135deg,#7DC4A4 0%,#6B9B7E 100%)", boxShadow: "0 4px 20px rgba(125,196,164,0.40)" }}>
                {placing ? <><CircleNotch size={17} weight="bold" className="animate-spin" /> Sending...</> : <>Confirm Order <ArrowRight size={17} weight="bold" /></>}
              </button>
            </div>
          )}
          {step === 3 && (
            <button type="button" onClick={onClose}
              className="w-full rounded-full py-4 font-bold font-cute transition hover:-translate-y-0.5"
              style={{ background: "rgba(255,255,255,0.80)", border: "2px solid rgba(125,196,164,0.45)", color: "#3D6B52" }}>
              Back to Store 🌿
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
