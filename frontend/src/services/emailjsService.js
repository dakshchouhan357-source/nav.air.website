import emailjs from "@emailjs/browser";

const SERVICE_ID        = import.meta.env.VITE_EMAILJS_SERVICE_ID   || "service_2k3w6db";
const BUSINESS_TEMPLATE = import.meta.env.VITE_EMAILJS_BIZ_TEMPLATE  || "template_hhb7lh4";
const CUSTOMER_TEMPLATE = import.meta.env.VITE_EMAILJS_CUST_TEMPLATE || "template_bfgfhxp";
const PUBLIC_KEY        = import.meta.env.VITE_EMAILJS_PUBLIC_KEY    || "_o9dslQ73LPF7xmsU";
const SITE_URL          = "https://www.getnavair.com";
const UPI_ID            = "9653820143@ptyes";
const SUPPORT_EMAIL     = "air.navpure@gmail.com";
const INSTAGRAM         = "https://www.instagram.com/shopnavair";

emailjs.init({ publicKey: PUBLIC_KEY });

/** Build a scannable UPI QR image URL (via qrserver.com) for the exact order total.
 *  This URL works immediately in emails — no static file dependency. */
function makeQrUrl(amount) {
  const upiStr = "upi://pay?pa=" + UPI_ID + "&pn=NAVAIR&am=" + amount + "&cu=INR";
  return (
    "https://api.qrserver.com/v1/create-qr-code/" +
    "?size=300x300&margin=12&color=3D6B52&bgcolor=F0FAF6" +
    "&data=" + encodeURIComponent(upiStr)
  );
}

export async function sendOrderEmails(orderData) {
  const {
    full_name, mobile, email, product, quantity,
    total_price, address, city, state, pincode,
    notes, order_id, payment_method, color,
  } = orderData;

  const total        = "Rs. " + (total_price || 0);
  const isCOD        = (payment_method || "").toLowerCase().includes("cod");
  const pmLabel      = isCOD ? "Cash on Delivery (COD)" : "Online Payment (QR / UPI)";
  const colorLabel   = color || "Not specified";
  const deliveryAddr = address + ", " + city + ", " + state + " - " + pincode;
  // Dynamic QR encodes exact amount — always accessible, no Vercel deploy required
  const qrUrl        = isCOD ? "" : makeQrUrl(total_price || 0);

  const orderMsg =
    "===== NEW ORDER RECEIVED =====\n" +
    "Order ID       : " + (order_id || "N/A") + "\n" +
    "Customer       : " + full_name + "\n" +
    "Mobile         : " + mobile + "\n" +
    "Email          : " + email + "\n" +
    "Product        : " + product + "\n" +
    "Color          : " + colorLabel + "\n" +
    "Quantity       : " + quantity + "\n" +
    "Total Amount   : " + total + "\n" +
    "Payment Method : " + pmLabel + "\n" +
    "Payment Status : " + (isCOD ? "COD CONFIRMED" : "PENDING PAYMENT") + "\n" +
    "Address        : " + deliveryAddr + "\n" +
    "Notes          : " + (notes || "None") + "\n" +
    "==============================";

  const sharedParams = {
    order_id         : order_id || "N/A",
    customer_name    : full_name,
    name             : full_name,
    customer_email   : email,
    customer_mobile  : mobile,
    mobile           : mobile,
    product_name     : product,
    product          : product,
    color            : colorLabel,
    quantity         : String(quantity),
    total_amount     : total,
    payment_method   : pmLabel,
    delivery_address : deliveryAddr,
    address          : address,
    city             : city,
    state            : state,
    pincode          : pincode,
    special_notes    : notes || "None",
    payment_status   : isCOD ? "COD CONFIRMED" : "PENDING PAYMENT",
    qr_image_url     : qrUrl,
    upi_id           : UPI_ID,
    support_email    : SUPPORT_EMAIL,
    instagram_url    : INSTAGRAM,
    site_url         : SITE_URL,
    message          : orderMsg,
  };

  /* Admin notification */
  const businessParams = {
    ...sharedParams,
    to_email  : SUPPORT_EMAIL,
    email     : SUPPORT_EMAIL,
    to_name   : "NavAir Admin",
    from_name : full_name,
    from_email: email,
    reply_to  : email,
    subject   : "New Order #" + (order_id || "N/A") + " — " + product,
    title     : "New Order #" + (order_id || "N/A"),
    time      : new Date().toLocaleString("en-IN"),
  };

  /* Customer email — Payment Pending for online, COD Confirmed for cash */
  const customerParams = {
    ...sharedParams,
    to_email  : email,
    email     : email,
    to_name   : full_name,
    from_name : "NAV AIR",
    from_email: SUPPORT_EMAIL,
    reply_to  : SUPPORT_EMAIL,
    subject   : isCOD
      ? "Your NAVAIR COD Order is Confirmed!"
      : "Payment Pending — Complete Your NAVAIR Order",
    title     : isCOD ? "Order Confirmed" : "Payment Pending",
    message:
      isCOD
        ? "Thank you for your order! We have received your COD order for " +
          product + " (" + colorLabel + "), qty " + quantity + ". " +
          "Total payable on delivery: " + total + ". We will dispatch it shortly."
        : "Thank you for your interest in NAVAIR!\n\n" +
          "Your order for " + product + " (" + colorLabel + ") x" + quantity +
          " has been reserved, but payment is still pending.\n\n" +
          "Total amount to pay: " + total + "\n\n" +
          "Please scan the QR code in this email with any UPI app " +
          "(PhonePe, GPay, Paytm, etc.) to pay.\n\n" +
          "UPI ID (manual entry): " + UPI_ID + "\n\n" +
          "Once our team verifies your payment, your order will be confirmed " +
          "and prepared for shipping.\n\n" +
          "Questions? Contact us at " + SUPPORT_EMAIL,
  };

  let adminOk = false, customerOk = false;

  try {
    const r = await emailjs.send(SERVICE_ID, BUSINESS_TEMPLATE, businessParams);
    adminOk = true;
    console.log("Admin email sent:", r.status);
  } catch (err) {
    console.error("Admin email FAILED:", err);
  }

  try {
    const r = await emailjs.send(SERVICE_ID, CUSTOMER_TEMPLATE, customerParams);
    customerOk = true;
    console.log("Customer email sent:", r.status);
  } catch (err) {
    console.error("Customer email FAILED:", err);
  }

  if (!adminOk && !customerOk) {
    throw new Error("Both emails failed. Contact @shopnavair on Instagram.");
  }
}
