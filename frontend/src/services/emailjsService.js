import emailjs from "@emailjs/browser";

  const SERVICE_ID        = "service_2k3w6db";
  const BUSINESS_TEMPLATE = "template_hhb7lh4";
  const CUSTOMER_TEMPLATE = "template_bfgfhxp";
  const PUBLIC_KEY        = "_o9dslQ73LPF7xmsU";

  // Initialize EmailJS once when the module loads
  emailjs.init({ publicKey: PUBLIC_KEY });

  export async function sendOrderEmails(orderData) {
    const {
      full_name, mobile, email, product, quantity,
      total_price, address, city, state, pincode,
      notes, order_id, payment_method, color,
    } = orderData;

    const total      = "Rs. " + (total_price || 0);
    const isCOD      = (payment_method || "").toLowerCase().includes("cod");
    const pmLabel    = isCOD ? "Cash on Delivery (COD)" : "Online Payment (QR / Link)";
    const deliveryAddr = address + ", " + city + ", " + state + " - " + pincode;
    const colorLabel = color || "Not specified";
    const orderMsg   =
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
      "Payment Status : PENDING PAYMENT\n" +
      "Address        : " + deliveryAddr + "\n" +
      "Notes          : " + (notes || "None") + "\n" +
      "==============================";

    const sharedParams = {
      order_id        : order_id || "N/A",
      customer_name   : full_name,
      name            : full_name,
      customer_email  : email,
      customer_mobile : mobile,
      mobile          : mobile,
      product_name    : product,
      product         : product,
      color           : colorLabel,
      quantity        : String(quantity),
      total_amount    : total,
      payment_method  : pmLabel,
      delivery_address: deliveryAddr,
      address         : address,
      city            : city,
      state           : state,
      pincode         : pincode,
      special_notes   : notes || "None",
      payment_status  : "PENDING PAYMENT",
      message         : orderMsg,
    };

    // Admin email params — to_email AND email both set to admin address
    // In EmailJS dashboard, set Contact Us template "To Email" to air.navpure@gmail.com directly
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

    // Customer email params — to_email AND email both set to customer address
    const customerParams = {
      ...sharedParams,
      to_email  : email,
      email     : email,
      to_name   : full_name,
      from_name : "NAV AIR",
      from_email: "air.navpure@gmail.com",
      reply_to  : "air.navpure@gmail.com",
      message:
        "Thank you for your order request.\n\n" +
        "We have received your order details successfully.\n\n" +
        "Our team will review your order and send you a secure payment link or QR code to your email address.\n\n" +
        "After we verify your payment, we will confirm your order and begin processing it.",
    };

    let adminOk = false;
    let customerOk = false;

    // Send admin email
    try {
      const r = await emailjs.send(SERVICE_ID, BUSINESS_TEMPLATE, businessParams);
      adminOk = true;
      console.log("✅ Admin email sent:", r.status, r.text);
    } catch (adminErr) {
      console.error("❌ Admin email FAILED:", adminErr);
    }

    // Send customer email
    try {
      const r = await emailjs.send(SERVICE_ID, CUSTOMER_TEMPLATE, customerParams);
      customerOk = true;
      console.log("✅ Customer email sent:", r.status, r.text);
    } catch (customerErr) {
      console.error("❌ Customer email FAILED:", customerErr);
    }

    // If both fail, throw so the UI shows an error
    if (!adminOk && !customerOk) {
      throw new Error("Both emails failed to send. Please contact us on Instagram @shopnavair.");
    }
  }
  