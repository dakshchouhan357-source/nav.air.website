'use client'

import { useMemo, useState } from 'react'
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  ChevronRight,
  Headphones,
  Menu,
  Minus,
  Plus,
  ShoppingBag,
  Sparkles,
  X,
} from 'lucide-react'

type Product = {
  id: string
  name: string
  shortName: string
  price: number
  description: string
  image: string
  accent: string
}

type Variant = {
  name: string
  image: string
  tone: string
  note: string
}

const imageRoot = 'https://www.getnavair.com'

const variants: Variant[] = [
  { name: 'Blue Floral', image: `${imageRoot}/images/tumblers/tumbler-blue-floral.png`, tone: 'blue', note: 'Cool, calm, collected' },
  { name: 'White Floral', image: `${imageRoot}/images/tumblers/tumbler-white-floral.png`, tone: 'white', note: 'A soft everyday classic' },
  { name: 'Purple Floral', image: `${imageRoot}/images/tumblers/tumbler-purple-floral.png`, tone: 'purple', note: 'A little extra magic' },
  { name: 'Pink Floral', image: `${imageRoot}/images/tumblers/tumbler-pink-floral.png`, tone: 'pink', note: 'Make every sip bloom' },
]

const products: Product[] = [
  {
    id: 'bloom',
    name: 'NAV AIR Bloom Tumbler',
    shortName: 'Bloom Tumbler',
    price: 749,
    description: '1200 ml of good energy, finished with our signature floral print.',
    image: variants[0].image,
    accent: 'lilac',
  },
  {
    id: 'cloud',
    name: 'NAV AIR Cloud Headphones',
    shortName: 'Cloud Headphones',
    price: 799,
    description: 'Lightweight sound, soft-touch comfort, and your own little cloud.',
    image: `${imageRoot}/images/headphones/headphones-pink.jpg`,
    accent: 'peach',
  },
]

const formatPrice = (value: number) => `₹${value.toLocaleString('en-IN')}`

export function NavAirStorefront() {
  const [activeVariant, setActiveVariant] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [cart, setCart] = useState<Record<string, number>>({})
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const cartItems = useMemo(
    () => Object.entries(cart).map(([id, quantity]) => ({ product: products.find((product) => product.id === id)!, quantity })).filter((item) => item.product),
    [cart],
  )
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0)
  const subtotal = cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0)
  const shipping = cartCount ? 99 : 0
  const total = subtotal + shipping

  function addToCart(productId: string) {
    setCart((current) => ({ ...current, [productId]: (current[productId] || 0) + 1 }))
    setCartOpen(true)
  }

  function changeQuantity(productId: string, amount: number) {
    setCart((current) => {
      const next = Math.max(0, (current[productId] || 0) + amount)
      const updated = { ...current }
      if (next === 0) delete updated[productId]
      else updated[productId] = next
      return updated
    })
  }

  return (
    <div className="nav-air-site">
      <div className="promo-bar">
        <span>NAV AIR BLOOM · 1200 ML TUMBLER · ONLY ₹749</span>
        <a href="#shop">Shop now <ArrowUpRight size={14} /></a>
      </div>

      <header className="site-header">
        <a className="brand-lockup" href="#top" aria-label="NAV AIR home"><span>NAV</span><i /> <span>AIR</span></a>
        <nav className={`desktop-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Primary navigation">
          <a href="#shop" onClick={() => setMenuOpen(false)}>Shop</a>
          <a href="#bloom" onClick={() => setMenuOpen(false)}>Bloom Tumbler</a>
          <a href="#cloud" onClick={() => setMenuOpen(false)}>Cloud Headphones</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
        </nav>
        <div className="header-actions">
          <button className="cart-button" type="button" onClick={() => setCartOpen(true)} aria-label={`Open cart, ${cartCount} items`}><ShoppingBag size={18} /><span>Cart</span>{cartCount > 0 && <b>{cartCount}</b>}</button>
          <button className="menu-button" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X size={22} /> : <Menu size={22} />}</button>
        </div>
      </header>

      <main id="top">
        <section className="hero-section section-shell">
          <div className="hero-copy">
            <p className="eyebrow"><Sparkles size={14} /> Everyday objects, elevated</p>
            <h1>Small rituals.<br /><em>Big mood.</em></h1>
            <p className="hero-description">Beautifully made essentials for the in-between moments that make your day feel like yours.</p>
            <div className="hero-actions"><a className="button button-dark" href="#shop">Shop the edit <ArrowUpRight size={16} /></a><a className="text-link" href="#bloom">Meet Bloom <ChevronRight size={16} /></a></div>
            <div className="hero-proof"><div className="avatar-stack"><span>n</span><span>n</span><span>n</span></div><span>4.9/5 from 1,000+ happy sippers</span></div>
          </div>
          <div className="hero-art" aria-label="NAV AIR Bloom tumbler in blue floral">
            <div className="hero-sun" />
            <span className="hero-sticker">new<br /><strong>drop</strong></span>
            <img src={variants[activeVariant].image} alt={`${variants[activeVariant].name} NAV AIR Bloom tumbler`} />
            <div className="hero-caption"><span>01 / 04</span><strong>{variants[activeVariant].name}</strong><span>{variants[activeVariant].note}</span></div>
            <div className="variant-dots">{variants.map((variant, index) => <button key={variant.name} className={activeVariant === index ? 'selected' : ''} onClick={() => setActiveVariant(index)} aria-label={`Show ${variant.name}`}><span className={`dot dot-${variant.tone}`} /></button>)}</div>
          </div>
        </section>

        <section className="marquee-band" aria-label="NAV AIR benefits"><div><span>FEEL GOOD</span><i>✦</i><span>LOOK GOOD</span><i>✦</i><span>DO MORE</span><i>✦</i><span>FEEL GOOD</span><i>✦</i></div></section>

        <section className="shop-section section-shell" id="shop">
          <div className="section-heading"><div><p className="eyebrow">The NAV AIR edit</p><h2>Things you&apos;ll<br /><em>reach for daily.</em></h2></div><p>Designed to add a little more joy to your desk, your commute, and everywhere in between.</p></div>
          <div className="product-grid">
            {products.map((product, index) => <article className={`product-card product-${product.accent}`} key={product.id}><div className="product-image-wrap"><span className="product-index">0{index + 1}</span><img src={product.image} alt={product.name} /><button className="quick-add" onClick={() => addToCart(product.id)} aria-label={`Add ${product.name} to cart`}><Plus size={18} /></button></div><div className="product-meta"><div><h3>{product.name}</h3><p>{product.description}</p></div><strong>{formatPrice(product.price)}</strong></div><button className="card-link" onClick={() => addToCart(product.id)}>Add to cart <ArrowUpRight size={16} /></button></article>)}
          </div>
        </section>

        <section className="bloom-feature section-shell" id="bloom"><div className="feature-copy"><p className="eyebrow">01 · Bloom Tumbler</p><h2>Hydration,<br /><em>but make it art.</em></h2><p>Meet your new sidekick. A generous 1200 ml tumbler with a leak-resistant lid, reusable straw, and a floral print that refuses to be boring.</p><a className="button button-light" href="#variants">Explore Bloom <ArrowUpRight size={16} /></a></div><div className="feature-stats"><span><b>1200</b><small>ML CAPACITY</small></span><span><b>HOT + COLD</b><small>ALL-DAY READY</small></span><span><b>100%</b><small>LEAK-RESISTANT</small></span><span><b>01</b><small>REUSABLE STRAW</small></span></div><div className="feature-image"><img src={variants[activeVariant].image} alt="NAV AIR Bloom floral tumbler" /></div></section>

        <section className="variants-section section-shell" id="variants"><div className="section-heading centered"><p className="eyebrow">Find your flower</p><h2>Which one<br /><em>is yours?</em></h2><p>Four moods. One very good tumbler.</p></div><div className="variant-grid">{variants.map((variant, index) => <button className={`variant-card variant-card-${variant.tone} ${activeVariant === index ? 'active' : ''}`} key={variant.name} onClick={() => setActiveVariant(index)}><span className="variant-number">0{index + 1}</span><img src={variant.image} alt={variant.name} /><div><strong>{variant.name}</strong><small>{variant.note}</small></div>{activeVariant === index && <span className="variant-check"><Check size={14} /></span>}</button>)}</div></section>

        <section className="cloud-section section-shell" id="cloud"><div className="cloud-art"><div className="cloud-ring" /><img src={products[1].image} alt="NAV AIR Cloud pink headphones" /><span className="cloud-label">soft sound<br />for loud days</span></div><div className="cloud-copy"><p className="eyebrow"><Headphones size={14} /> 02 · Cloud Headphones</p><h2>Your own<br /><em>little cloud.</em></h2><p>Sink into soft-touch comfort and crisp, easy listening. Your everyday soundtrack just got an upgrade.</p><div className="cloud-details"><span>Wireless</span><span>Soft-touch finish</span><span>All-day comfort</span></div><div className="cloud-buy"><strong>{formatPrice(products[1].price)}</strong><button className="button button-dark" onClick={() => addToCart('cloud')}>Add to cart <ArrowUpRight size={16} /></button></div></div></section>

        <section className="about-section section-shell" id="about"><div className="about-mark">na<span>✦</span></div><div><p className="eyebrow">Why NAV AIR</p><h2>Make room for<br /><em>more little joys.</em></h2><p>We believe the things you use every day should feel as good as the moments they hold. NAV AIR is a growing edit of playful, practical design for a life in full colour.</p></div><div className="about-note"><span>01</span><p>Good design is not extra. It is a daily reminder to enjoy the ordinary.</p></div></section>

        <section className="faq-section section-shell"><div><p className="eyebrow">Good to know</p><h2>Questions,<br /><em>answered.</em></h2></div><div className="faq-list">{['How much is shipping?', 'What is the Bloom tumbler made for?', 'Can I change my colour after ordering?'].map((question, index) => <div className={`faq-item ${openFaq === index ? 'open' : ''}`} key={question}><button onClick={() => setOpenFaq(openFaq === index ? null : index)}><span>{question}</span><ChevronDown size={18} /></button>{openFaq === index && <p>{index === 0 ? 'Shipping is a flat ₹99 per order across India.' : index === 1 ? 'Bloom is built for hot and cold drinks, with a 1200 ml capacity and a reusable straw.' : 'Send us a note as soon as possible and our team will help you with the next best step.'}</p>}</div>)}</div></section>
      </main>

      <footer className="site-footer"><div className="footer-top"><a className="brand-lockup" href="#top"><span>NAV</span><i /><span>AIR</span></a><p>Everyday essentials,<br /><em>with a little lift.</em></p><a className="button button-dark" href="#shop">Shop everything <ArrowUpRight size={16} /></a></div><div className="footer-bottom"><span>© 2025 NAV AIR</span><span>Made for the everyday</span><span>Instagram&nbsp;&nbsp; Contact</span></div></footer>

      {cartOpen && <div className="drawer-backdrop" onClick={() => setCartOpen(false)}><aside className="cart-drawer" onClick={(event) => event.stopPropagation()} aria-label="Shopping cart"><div className="drawer-header"><div><p className="eyebrow">Your bag</p><h2>{cartCount ? `${cartCount} ${cartCount === 1 ? 'item' : 'items'}` : 'It is quiet in here'}</h2></div><button onClick={() => setCartOpen(false)} aria-label="Close cart"><X size={20} /></button></div>{cartItems.length ? <><div className="drawer-items">{cartItems.map(({ product, quantity }) => <div className="drawer-item" key={product.id}><img src={product.image} alt="" /><div><strong>{product.shortName}</strong><span>{formatPrice(product.price)}</span><div className="quantity"><button onClick={() => changeQuantity(product.id, -1)} aria-label="Decrease quantity"><Minus size={13} /></button><span>{quantity}</span><button onClick={() => changeQuantity(product.id, 1)} aria-label="Increase quantity"><Plus size={13} /></button></div></div></div>)}</div><div className="drawer-summary"><div><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></div><div><span>Shipping</span><strong>{formatPrice(shipping)}</strong></div><div className="total"><span>Total</span><strong>{formatPrice(total)}</strong></div><button className="button button-dark checkout-button">Continue to checkout <ArrowUpRight size={16} /></button><small>Secure checkout · Shipping calculated at ₹99 per order</small></div></> : <div className="empty-cart"><ShoppingBag size={32} /><p>Your future favourites are waiting.</p><button className="button button-dark" onClick={() => setCartOpen(false)}>Keep browsing</button></div>}</aside></div>}
    </div>
  )
}

export default NavAirStorefront
