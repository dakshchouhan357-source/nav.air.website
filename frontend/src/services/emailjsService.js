import emailjs from "@emailjs/browser";

const SERVICE_ID          = import.meta.env.VITE_EMAILJS_SERVICE_ID   || "service_2k3w6db";
const BUSINESS_TEMPLATE   = import.meta.env.VITE_EMAILJS_BIZ_TEMPLATE  || "template_hhb7lh4";
const CUSTOMER_TEMPLATE   = import.meta.env.VITE_EMAILJS_CUST_TEMPLATE || "template_bfgfhxp";
const PUBLIC_KEY          = import.meta.env.VITE_EMAILJS_PUBLIC_KEY    || "_o9dslQ73LPF7xmsU";
const SITE_URL            = "https://www.getnavair.com";
const QR_IMAGE_URL        = SITE_URL + "/payment-qr.png";

emailjs.init({ publicKey: PUBLIC_KEY });

export async function sendOrderEmails(orderData) {
  const {
    full_name, mobile, email, product, quantity,
    total_price, address, city, state, pincode,
    notes, order_id, payment_method, color,
  } = orderData;

  const total        = "Rs. " + (total_price || 0);
  const isCOD        = (payment_method || "").toLowerCase().includes("cod");
  const pmLabel      = isCOD ? "Cash on Delivery (COD)" : "Online Payment (QR / Link)";
  const colorLabel   = color || "Not specified";
  const deliveryAddr = address + ", " + city + ", " + state + " - " + pincode;

  const paymentNextStep = isCOD
    ? "Pay in cash to the delivery person when it arrives"
    : "We will email you a payment QR code — scan and pay to confirm your order";

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
    payment_next_step: paymentNextStep,
    delivery_address : deliveryAddr,
    address          : address,
    city             : city,
    state            : state,
    pincode          : pincode,
    special_notes    : notes || "None",
    payment_status   : isCOD ? "COD CONFIRMED" : "PENDING PAYMENT",
    qr_image_url     : isCOD ? "" : QR_IMAGE_URL,
    upi_id           : "9653820143@ptyes",
    support_email    : "air.navpure@gmail.com",
    site_url         : SITE_URL,
    message          : orderMsg,
  };

  // Business notification
  const businessParams = {
    ...sharedParams,
    to_email  : "air.navpure@gmail.com",
    email     : "air.navpure@gmail.com",
    to_name   : "NavAir Admin",
    from_name : full_name,
    from_email: email,
    reply_to  : email,
    title     : "New Order #" + (order_id || "N/A"),
    time      : new Date().toLocaleString("en-IN"),
  };

  // Customer confirmation — Payment Pending message
  const customerMessage = isCOD
    ? "Thank you for your order! We have received your COD order and will dispatch it shortly."
    : "Thank you for shopping with NAVAIR!\n\n" +
      "We have received your order request successfully.\n\n" +
      "Your order is currently reserved, but payment is still pending.\n\n" +
      "Please complete your payment using the QR code below.\n\n" +
      "Once our team manually verifies your payment, your order will be confirmed and prepared for shipping.\n\n" +
      "If the QR does not work, pay using UPI ID: 9653820143@ptyes\n\n" +
      "Support: air.navpure@gmail.com";

  const customerParams = {
    ...sharedParams,
    to_email  : email,
    email     : email,
    to_name   : full_name,
    from_name : "NAV AIR",
    from_email: "air.navpure@gmail.com",
    reply_to  : "air.navpure@gmail.com",
    title     : isCOD ? "COD Order Confirmed" : "Payment Pending",
    message   : customerMessage,
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
