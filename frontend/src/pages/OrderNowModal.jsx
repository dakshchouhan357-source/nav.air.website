import { useState } from "react";
import {
  X,
  CheckCircle,
  AlertCircle,
} from "@phosphor-icons/react";
import { toast } from "sonner";

export default function OrderNowModal({ product, color, onClose }) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    landmark: "",
    city: "",
    state: "",
    pin: "",
    quantity: "1",
    notes: "",
  });
  const [orderData, setOrderData] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) return "Full name required";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) return "Valid email required";
    if (!formData.phone.trim() || formData.phone.length !== 10) return "10-digit phone required";
    if (!formData.address.trim()) return "Address required";
    if (!formData.city.trim()) return "City required";
    if (!formData.state.trim()) return "State required";
    if (!formData.pin.trim() || formData.pin.length !== 6) return "6-digit PIN required";
    return null;
  };

  const handleSubmit = async () => {
    const error = validateForm();
    if (error) {
      toast.error(error);
      return;
    }

    setLoading(true);
    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
      const response = await fetch(`${backendUrl}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          mobile: formData.phone,
          address: formData.address,
          landmark: formData.landmark,
          city: formData.city,
          state: formData.state,
          pincode: formData.pin,
          quantity: formData.quantity,
          notes: formData.notes,
          product,
          color,
        }),
      });

      if (!response.ok) throw new Error("Order failed");
      const data = await response.json();
      setOrderData(data);
      setStep(2);
      toast.success("Order placed successfully!");
    } catch (err) {
      toast.error("Failed to place order. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="relative w-full max-w-md bg-gradient-to-b from-[#111111] to-[#0a0a0a] rounded-3xl border border-white/[0.06] shadow-2xl" onClick={(e) => e.stopPropagation()}>
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors z-10"
        >
          <X size={18} weight="bold" className="text-white/60" />
        </button>

        {/* Step 1: Order Form */}
        {step === 1 && (
          <div className="p-8">
            <h2 className="text-2xl font-bold text-white mb-1">Order {product}</h2>
            <p className="text-white/40 text-sm mb-6">
              {color ? `Color: ${color}` : "Complete your order"}
            </p>

            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#c8a97e] focus:ring-1 focus:ring-[#c8a97e] transition-all"
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#c8a97e] focus:ring-1 focus:ring-[#c8a97e] transition-all"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone (10 digits)"
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#c8a97e] focus:ring-1 focus:ring-[#c8a97e] transition-all"
              />
              <input
                type="text"
                name="address"
                placeholder="Full Address"
                value={formData.address}
                onChange={handleChange}
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#c8a97e] focus:ring-1 focus:ring-[#c8a97e] transition-all"
              />
              <input
                type="text"
                name="landmark"
                placeholder="Landmark (optional)"
                value={formData.landmark}
                onChange={handleChange}
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#c8a97e] focus:ring-1 focus:ring-[#c8a97e] transition-all"
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#c8a97e] focus:ring-1 focus:ring-[#c8a97e] transition-all"
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleChange}
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#c8a97e] focus:ring-1 focus:ring-[#c8a97e] transition-all"
              />
              <input
                type="text"
                name="pin"
                placeholder="PIN Code (6 digits)"
                value={formData.pin}
                onChange={handleChange}
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#c8a97e] focus:ring-1 focus:ring-[#c8a97e] transition-all"
              />
              <select
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#c8a97e] focus:ring-1 focus:ring-[#c8a97e] transition-all"
              >
                {[1, 2, 3, 4, 5].map((q) => (
                  <option key={q} value={q} className="bg-black">
                    Quantity: {q}
                  </option>
                ))}
              </select>
              <textarea
                name="notes"
                placeholder="Order notes (optional)"
                value={formData.notes}
                onChange={handleChange}
                rows="3"
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#c8a97e] focus:ring-1 focus:ring-[#c8a97e] transition-all resize-none"
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full mt-6 bg-gradient-to-r from-[#c8a97e] to-[#a08050] text-black font-bold py-3.5 rounded-full transition-all duration-300 hover:shadow-lg disabled:opacity-50"
            >
              {loading ? "Processing..." : "Place Order"}
            </button>
          </div>
        )}

        {/* Step 2: Success */}
        {step === 2 && orderData && (
          <div className="p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={32} weight="fill" className="text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Order Confirmed!</h2>
            <p className="text-white/60 text-sm mb-6">Your order has been placed successfully.</p>
            <div className="bg-white/[0.02] rounded-2xl p-4 mb-6 text-left">
              <p className="text-white/40 text-xs mb-1">Order ID</p>
              <p className="text-white font-mono text-sm break-all">{orderData.orderId}</p>
            </div>
            <button
              onClick={onClose}
              className="w-full bg-gradient-to-r from-[#c8a97e] to-[#a08050] text-black font-bold py-3.5 rounded-full transition-all duration-300 hover:shadow-lg"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
