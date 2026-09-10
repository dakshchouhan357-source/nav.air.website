import { useMemo, useState } from "react";
import { ArrowRight, CaretDown, Check, List, ShoppingBag, Sparkle, X } from "@phosphor-icons/react";
import { toast } from "sonner";
import OrderNowModal from "@/pages/OrderNowModal";

const variants = [
  { name: "Blue Floral", image: "/images/tumblers/tumbler-blue-floral.png", tint: "blue" },
  { name: "White Floral", image: "/images/tumblers/tumbler-white-floral.png", tint: "cream" },
  { name: "Purple Floral", image: "/images/tumblers/tumbler-purple-floral.png", tint: "lilac" },
  { name: "Pink Floral", image: "/images/tumblers/tumbler-pink-floral.png", tint: "rose" },
];

const headphones = { name: "NAV AIR Cloud Headphones", price: 799, image: "/images/headphones/headphones-pink.jpg" };
const legacyProducts = [
  { id: "keyboard-mouse", name: "NAV AIR Bloom Keyboard + Mouse", price: 849, image: "/images/bloom 1.jpeg", description: "A soft pastel desk set for a calmer workspace." },
  { id: "mouse", name: "NAV AIR Glow Mouse", price: 459, image: "/images/glow 2.jpeg", description: "A compact wireless mouse with a little more personality." },
];

function formatPrice(value) { return `₹${value.toLocaleString("en-IN")}`; }

export default function NavAirLanding() {
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [order, setOrder] = useState(null);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal + (cart.length ? 99 : 0);

  const addToCart = (item) => {
    setCart((current) => {
      const found = current.find((entry) => entry.id === item.id);
      return found ? current.map((entry) => entry.id === item.id ? { ...entry, quantity: entry.quantity + 1 } : entry) : [...current, { ...item, quantity: 1 }];
    });
    setCartOpen(true);
    toast.success(`${item.name} added to your bag`);
  };

  const removeFromCart = (id) => setCart((current) => current.filter((item) => item.id !== id));
  const bloom = useMemo(() => ({ name: "NAV AIR Bloom Tumbler", price: 749, image: variants[selectedVariant].image, color: variants[selectedVariant].name, id: `bloom-${selectedVariant}` }), [selectedVariant]);

  return (
    <main className="nav-air-page">
      <div className="announcement"><span>NEW DROP</span> NAV AIR BLOOM · 1200 ML TUMBLER · ONLY ₹749 <a href="#shop">SHOP NOW <ArrowRight size={14} /></a></div>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="NAV AIR home"><span className="brand-mark">N</span><span>NAV AIR</span></a>
        <nav className="desktop-nav" aria-label="Main navigation"><a href="#shop">Shop</a><a href="#bloom">Bloom Tumbler</a><a href="#cloud">Cloud Headphones</a><a href="#story">About</a></nav>
        <div className="header-actions"><button className="bag-button" onClick={() => setCartOpen(true)} aria-label={`Shopping bag, ${cartCount} items`}><ShoppingBag size={20} /><span>{cartCount}</span></button><button className="menu-button" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">{mobileOpen ? <X size={22} /> : <List size={22} />}</button></div>
        {mobileOpen && <nav className="mobile-nav"><a href="#shop" onClick={() => setMobileOpen(false)}>Shop</a><a href="#bloom" onClick={() => setMobileOpen(false)}>Bloom Tumbler</a><a href="#cloud" onClick={() => setMobileOpen(false)}>Cloud Headphones</a><a href="#story" onClick={() => setMobileOpen(false)}>About</a></nav>}
      </header>

      <section className="hero" id="top">
        <div className="hero-copy"><p className="eyebrow"><Sparkle size={15} /> Everyday objects, elevated</p><h1>Carry a little<br /><em>joy.</em> Everywhere.</h1><p className="hero-description">Meet the objects that make your everyday feel more like yours. Designed to be seen, held and loved.</p><div className="hero-buttons"><a className="button button-primary" href="#shop">Shop the collection <ArrowRight size={18} /></a><a className="text-link" href="#story">Our story <ArrowRight size={15} /></a></div><div className="hero-proof"><div className="avatar-stack"><span>NA</span><span>+</span><span>4.9</span></div><p>Loved by <strong>10,000+</strong><br />everyday optimists</p></div></div>
        <div className="hero-art"><div className="art-sun" /><div className="hero-label">BLOOM<br /><span>1200 ML</span></div><img className="hero-product float" src={bloom.image} alt={`${bloom.color} NAV AIR Bloom tumbler`} /><div className="hero-note"><span>01</span><p>Designed for<br />the daily ritual.</p></div></div>
      </section>

      <section className="trust-strip"><span>FREE SHIPPING OVER ₹999</span><i /> <span>SECURE CHECKOUT</span><i /> <span>MADE FOR DAILY USE</span><i /> <span>DESIGNED IN INDIA</span></section>

      <section className="section collection" id="shop"><div className="section-heading"><div><p className="eyebrow">The collection</p><h2>Good things,<br /><em>well made.</em></h2></div><p className="section-intro">Small upgrades for the moments that make up your day. Pick your favourite and make it yours.</p></div><div className="product-grid"><article className="product-card bloom-card"><div className="product-visual"><span className="product-badge">BESTSELLER</span><img src={variants[selectedVariant].image} alt="NAV AIR Bloom tumbler" /></div><div className="product-info"><div><p className="product-kicker">01 / Hydration</p><h3>NAV AIR Bloom</h3><p>More sips. More blooms. Every day.</p></div><strong>{formatPrice(749)}</strong></div><div className="card-actions"><button className="button button-dark" onClick={() => addToCart(bloom)}>Add to bag <ShoppingBag size={17} /></button><a href="#bloom">Explore <ArrowRight size={16} /></a></div></article><article className="product-card cloud-card"><div className="product-visual"><span className="product-badge">NEW IN</span><img src={headphones.image} alt="NAV AIR Cloud headphones" /></div><div className="product-info"><div><p className="product-kicker">02 / Sound</p><h3>Cloud Headphones</h3><p>Your world, with better edges.</p></div><strong>{formatPrice(799)}</strong></div><div className="card-actions"><button className="button button-dark" onClick={() => addToCart({ ...headphones, id: "headphones" })}>Add to bag <ShoppingBag size={17} /></button><a href="#cloud">Explore <ArrowRight size={16} /></a></div></article>{legacyProducts.map((product) => <article className="product-card legacy-card" key={product.id}><div className="product-visual"><span className="product-badge">NAV AIR CLASSIC</span><img src={product.image} alt={product.name} /></div><div className="product-info"><div><p className="product-kicker">03 / Desk essentials</p><h3>{product.name}</h3><p>{product.description}</p></div><strong>{formatPrice(product.price)}</strong></div><div className="card-actions"><button className="button button-dark" onClick={() => addToCart(product)}>Add to bag <ShoppingBag size={17} /></button><a href="#shop">View product <ArrowRight size={16} /></a></div></article>)}</div></section>

      <section className="bloom-editorial" id="bloom"><div className="editorial-image"><img src="/images/nav air bloob glow 1.jpeg" alt="NAV AIR Bloom tumbler in a bright floral setting" /><span className="image-sticker">made to<br />bloom</span></div><div className="editorial-copy"><p className="eyebrow">The everyday icon</p><h2>Good hydration<br />looks <em>good.</em></h2><p>Bloom is a generous 1200 ml tumbler with a leak-resistant lid, reusable straw and a floral finish that brings a little colour wherever you go.</p><div className="feature-list"><span><strong>1200</strong> ML capacity</span><span><strong>HOT + COLD</strong> all day</span><span><strong>LEAK-RESISTANT</strong> lid</span><span><strong>REUSABLE</strong> straw</span></div><button className="button button-dark" onClick={() => addToCart(bloom)}>Bring home Bloom <ArrowRight size={18} /></button></div></section>

      <section className="section variant-section"><div className="section-heading compact"><div><p className="eyebrow">Four moods, one ritual</p><h2>Which one<br /><em>is yours?</em></h2></div><p className="section-intro">Pick the colour that feels most like you. Or don&apos;t. We won&apos;t tell.</p></div><div className="variant-grid">{variants.map((variant, index) => <button key={variant.name} className={`variant-card ${variant.tint} ${selectedVariant === index ? "selected" : ""}`} onClick={() => setSelectedVariant(index)}><img src={variant.image} alt={variant.name} /><span><small>0{index + 1}</small>{variant.name}</span>{selectedVariant === index && <Check className="variant-check" size={18} />}</button>)}</div></section>

      <section className="cloud-section" id="cloud"><div className="cloud-copy"><p className="eyebrow">Coming in clear</p><h2>Meet the<br /><em>Cloud.</em></h2><p>Lightweight comfort, full-bodied sound and a colour story worth wearing. Your everyday soundtrack just got softer.</p><div className="price-row"><strong>₹799</strong><span>free shipping over ₹999</span></div><button className="button button-light" onClick={() => addToCart({ ...headphones, id: "headphones" })}>Shop Cloud <ArrowRight size={18} /></button></div><div className="cloud-image"><div className="cloud-ring" /><img src="/images/headphones/headphones-all.jpg" alt="NAV AIR Cloud headphones in multiple colours" /></div></section>

      <section className="story-section" id="story"><p className="eyebrow">Why NAV AIR</p><h2>Objects with a little<br /><em>more feeling.</em></h2><p>We believe the things you use every day should do more than work. They should make you pause, smile and feel a little more like yourself.</p><a className="text-link" href="mailto:hello@getnavair.com">Say hello <ArrowRight size={16} /></a></section>

      <footer className="site-footer"><div className="footer-brand"><a className="brand" href="#top"><span className="brand-mark">N</span><span>NAV AIR</span></a><p>Everyday, elevated.</p></div><div className="footer-links"><div><strong>Explore</strong><a href="#shop">Shop all</a><a href="#bloom">Bloom Tumbler</a><a href="#cloud">Cloud Headphones</a></div><div><strong>Help</strong><a href="mailto:hello@getnavair.com">Contact us</a><a href="#story">Our story</a><a href="#top">Shipping & returns</a></div></div><p className="copyright">© 2025 NAV AIR. Made for your everyday. <span className="creator-credit">Designed &amp; built by Daksh Chouhan</span></p></footer>

      {cartOpen && <div className="drawer-backdrop" onClick={() => setCartOpen(false)}><aside className="cart-drawer" onClick={(event) => event.stopPropagation()}><div className="drawer-header"><div><p className="eyebrow">Your edit</p><h2>Your bag <span>{cartCount}</span></h2></div><button className="icon-button" onClick={() => setCartOpen(false)} aria-label="Close cart"><X size={21} /></button></div>{cart.length === 0 ? <div className="empty-cart"><ShoppingBag size={40} /><p>Your bag is waiting for something good.</p><button className="button button-dark" onClick={() => setCartOpen(false)}>Continue shopping</button></div> : <><div className="cart-lines">{cart.map((item) => <div className="cart-line" key={item.id}><img src={item.image} alt="" /><div><strong>{item.name}</strong><small>{item.color || "NAV AIR"} · Qty {item.quantity}</small><button onClick={() => removeFromCart(item.id)}>Remove</button></div><b>{formatPrice(item.price * item.quantity)}</b></div>)}</div><div className="cart-summary"><div><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></div><div><span>Shipping</span><strong>{formatPrice(99)}</strong></div><div className="total"><span>Total</span><strong>{formatPrice(total)}</strong></div><button className="button button-dark checkout-button" onClick={() => { setOrder(cart[0]); setCartOpen(false); }}>Continue to checkout <ArrowRight size={18} /></button><small>Secure checkout · Shipping charged once per order</small></div></>}</aside></div>}
      {order && <OrderNowModal product={order.name} color={order.color} onClose={() => setOrder(null)} />}
    </main>
  );
}
