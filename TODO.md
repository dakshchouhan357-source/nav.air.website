# TODO - NAV AIR premium theme + ordering + OTP + Emergent removal

## Step 1: Order Now flow (email OTP only)
- [x] Replace `PrebookModal` with `OrderNowModal` in `frontend/src/pages/NavAirLanding.jsx`

- [ ] Collect fields: Full Name, Mobile (no OTP), Email + Email OTP verify, Full Address, Landmark, City, State, PIN, Product, Quantity, Order Notes (optional)
- [ ] Replace every “Reserve/Pre-book/Pre-Orders” CTA with “Order Now”
- [ ] Remove SMS channel UI/logic (no `/prebook/send-otp` or `/prebook/verify-otp` usage from frontend)
- [ ] Add validation + error handling + success screen with Order ID
- [ ] Backend: extend to persist completed orders in MongoDB and return order id (keep existing prebook endpoints working)

## Step 2: Product catalog + copy changes
- [ ] Replace product tiers with required catalog:
  - [ ] NAV AIR Bloom (Keyboard + Mouse Combo) ₹849 Available Now
  - [ ] NAV AIR Glow (Mouse) – ₹459 Available Now
  - [ ] NAV AIR Performance 🚀 Coming in 1 Week (no ordering)
  - [ ] NAV AIR Pro ✨ Coming Soon (no ordering)
- [ ] Update comparison/table/FAQ copy to remove pre-booking references

## Step 3: Full redesign (pastel premium aesthetic)
- [ ] Update `frontend/src/index.css` + `frontend/src/App.css` for soft pastel palette
- [ ] Redesign sections: Hero (with provided images), Product Showcase/Gallery, Features/Why Choose, Customer Reviews, FAQ, Contact, Footer
- [ ] Ensure smooth animations + rounded UI + premium typography
- [ ] Ensure fully responsive layout for Windows/laptops/tablets/Android/iPhone

## Step 4: SEO + Emergent removal
- [ ] Update `frontend/public/index.html` metadata, OG tags, favicon links, title/description
- [ ] Remove Emergent branding/scripts/embeds from frontend and backend

## Step 5: Build/test/deploy safety
- [ ] Run `frontend` build
- [ ] Run `backend` tests
- [ ] Manual test order: verify email OTP demo mode works
- [ ] Confirm Render backend + MongoDB still work

