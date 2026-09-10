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