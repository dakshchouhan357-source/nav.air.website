# EmailJS Customer Email Template

## Template ID: `template_bfgfhxp`

Copy the HTML below and paste it into your EmailJS dashboard for the customer email template.

---

## HTML Template

```html
<!DOCTYPE html>
<html lang="en" style="font-family: 'Segoe UI', 'Arial', sans-serif; margin: 0; padding: 0;">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Request - NAV AIR</title>
</head>
<body style="background: linear-gradient(135deg, #E8F5F0 0%, #F0EBF8 50%, #FFF4EB 100%); padding: 20px; margin: 0; min-height: 100vh;">

  <!-- Main Container -->
  <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 24px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.12);">

    <!-- Header with gradient -->
    <div style="background: linear-gradient(135deg, #7DC4A4 0%, #9ED4B8 100%); padding: 32px 24px; text-align: center;">
      <!-- Decorative dots -->
      <div style="position: absolute; top: 10px; left: 15px; width: 8px; height: 8px; background: rgba(255,255,255,0.3); border-radius: 50%;"></div>
      <div style="position: absolute; top: 20px; left: 25px; width: 6px; height: 6px; background: rgba(255,255,255,0.2); border-radius: 50%;"></div>

      <!-- Logo/Brand -->
      <h1 style="color: white; font-size: 28px; font-weight: 800; margin: 0; letter-spacing: 2px;">NAV AIR</h1>
      <p style="color: rgba(255,255,255,0.9); font-size: 14px; margin: 8px 0 0 0; letter-spacing: 1px;">Premium Peripherals</p>
    </div>

    <!-- Main Content -->
    <div style="padding: 32px 24px;">

      <!-- Greeting -->
      <p style="font-size: 18px; color: #2D3B2D; margin: 0 0 24px 0; line-height: 1.6;">
        Hi <span style="font-weight: 700; color: #7DC4A4;">{{customer_name}}</span>,
      </p>

      <!-- Pending Payment Banner -->
      <div style="background: linear-gradient(135deg, #FFF5EB 0%, #FFECD9 100%); border: 2px solid #E8A87C; border-radius: 16px; padding: 24px; margin: 24px 0; text-align: center;">

        <!-- Animated pending indicator -->
        <div style="display: inline-flex; align-items: center; gap: 8px; background: rgba(232,168,124,0.15); padding: 8px 16px; border-radius: 50px; margin-bottom: 16px;">
          <span style="width: 10px; height: 10px; background: #E8A87C; border-radius: 50%; display: inline-block;"></span>
          <span style="color: #8B4E2A; font-weight: 700; font-size: 13px; letter-spacing: 1px;">PENDING PAYMENT</span>
        </div>

        <h2 style="color: #8B4E2A; font-size: 20px; font-weight: 700; margin: 0 0 12px 0;">
          Your Order Request is Received!
        </h2>

        <p style="color: #5A3E2B; font-size: 15px; line-height: 1.7; margin: 0;">
          Please scan the QR code below to complete your payment.<br>
          Your order will be confirmed after payment verification.
        </p>
      </div>

      <!-- QR Code Section -->
      <div style="background: linear-gradient(135deg, #E8F5F0 0%, #F0EBF8 100%); border-radius: 20px; padding: 32px; text-align: center; margin: 24px 0;">

        <!-- QR Code -->
        <div style="background: white; border-radius: 16px; padding: 20px; box-shadow: 0 8px 24px rgba(125,196,164,0.15); display: inline-block; margin-bottom: 16px;">
          <img src="https://kommodo.ai/i/eqArG0WiPcliQ2hStW8q" alt="Payment QR Code" style="width: 220px; height: 220px; display: block; border-radius: 8px;" />
        </div>

        <!-- UPI ID -->
        <div style="margin-top: 20px;">
          <p style="color: #6B7B6B; font-size: 13px; margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: 1px;">UPI ID</p>
          <p style="background: white; color: #3D6B52; font-size: 18px; font-weight: 700; padding: 12px 24px; border-radius: 12px; display: inline-block; margin: 0; border: 2px dashed #7DC4A4;">
            9653820143@ptyes
          </p>
        </div>

        <!-- Amount to Pay -->
        <div style="margin-top: 24px; background: linear-gradient(135deg, #7DC4A4 0%, #5BAA88 100%); border-radius: 12px; padding: 16px; display: inline-block;">
          <span style="color: rgba(255,255,255,0.8); font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Amount to Pay</span>
          <div style="color: white; font-size: 28px; font-weight: 800; margin-top: 4px;">{{total_amount}}</div>
        </div>
      </div>

      <!-- Important Note -->
      <div style="background: #FFF9F0; border-left: 4px solid #E8A87C; padding: 16px 20px; border-radius: 0 12px 12px 0; margin: 24px 0;">
        <p style="color: #8B4E2A; font-size: 14px; margin: 0; line-height: 1.6;">
          <strong>Important:</strong> After making payment, please share the screenshot/transaction ID with us on Instagram <strong>@shopnavair</strong> or email at <strong>air.navpure@gmail.com</strong> for quick verification.
        </p>
      </div>

      <!-- Order Details -->
      <div style="background: linear-gradient(135deg, #F5FAF7 0%, #F0F8F4 100%); border-radius: 16px; padding: 24px; margin: 24px 0;">
        <h3 style="color: #3D6B52; font-size: 16px; font-weight: 700; margin: 0 0 20px 0; padding-bottom: 12px; border-bottom: 2px solid rgba(125,196,164,0.2);">
          Your Order Details
        </h3>

        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr>
            <td style="color: #6B7B6B; padding: 10px 0;">Order ID</td>
            <td style="color: #2D3B2D; font-weight: 600; text-align: right; padding: 10px 0;">{{order_id}}</td>
          </tr>
          <tr>
            <td style="color: #6B7B6B; padding: 10px 0; border-top: 1px solid rgba(125,196,164,0.1);">Product</td>
            <td style="color: #2D3B2D; font-weight: 600; text-align: right; padding: 10px 0; border-top: 1px solid rgba(125,196,164,0.1);">{{product_name}}</td>
          </tr>
          <tr>
            <td style="color: #6B7B6B; padding: 10px 0; border-top: 1px solid rgba(125,196,164,0.1);">Color</td>
            <td style="color: #2D3B2D; font-weight: 600; text-align: right; padding: 10px 0; border-top: 1px solid rgba(125,196,164,0.1);">{{color}}</td>
          </tr>
          <tr>
            <td style="color: #6B7B6B; padding: 10px 0; border-top: 1px solid rgba(125,196,164,0.1);">Quantity</td>
            <td style="color: #2D3B2D; font-weight: 600; text-align: right; padding: 10px 0; border-top: 1px solid rgba(125,196,164,0.1);">{{quantity}}</td>
          </tr>
          <tr>
            <td style="color: #6B7B6B; padding: 10px 0; border-top: 1px solid rgba(125,196,164,0.1);">Payment Method</td>
            <td style="color: #2D3B2D; font-weight: 600; text-align: right; padding: 10px 0; border-top: 1px solid rgba(125,196,164,0.1);">{{payment_method}}</td>
          </tr>
          <tr style="background: rgba(125,196,164,0.1);">
            <td style="color: #3D6B52; font-weight: 700; padding: 14px 0; border-top: 2px solid rgba(125,196,164,0.3);">Total</td>
            <td style="color: #3D6B52; font-weight: 800; font-size: 18px; text-align: right; padding: 14px 0; border-top: 2px solid rgba(125,196,164,0.3);">{{total_amount}}</td>
          </tr>
        </table>
      </div>

      <!-- Delivery Address -->
      <div style="background: linear-gradient(135deg, #F0EBF8 0%, #F8F4FC 100%); border-radius: 16px; padding: 24px; margin: 24px 0;">
        <h3 style="color: #6B5A80; font-size: 16px; font-weight: 700; margin: 0 0 16px 0;">
          Delivery Address
        </h3>
        <p style="color: #2D3B2D; font-size: 14px; line-height: 1.7; margin: 0;">
          {{delivery_address}}
        </p>
      </div>

      <!-- What Happens Next -->
      <div style="background: linear-gradient(135deg, #E8F5F0 0%, #D8F0E8 100%); border-radius: 16px; padding: 24px; margin: 24px 0;">
        <h3 style="color: #3D6B52; font-size: 16px; font-weight: 700; margin: 0 0 16px 0;">
          What Happens Next?
        </h3>
        <ol style="color: #2D3B2D; font-size: 14px; line-height: 2; margin: 0; padding-left: 20px;">
          <li>Scan the QR code and complete your payment</li>
          <li>Share payment screenshot with us on Instagram or email</li>
          <li>We verify your payment within 24 hours</li>
          <li>Your order is confirmed and dispatched!</li>
        </ol>
      </div>

      <!-- Contact Button -->
      <div style="text-align: center; margin: 32px 0;">
        <a href="https://www.instagram.com/shopnavair" target="_blank" style="display: inline-block; background: linear-gradient(135deg, #E1306C 0%, #833AB4 50%, #F77737 100%); color: white; text-decoration: none; padding: 14px 32px; border-radius: 50px; font-weight: 700; font-size: 14px; box-shadow: 0 6px 20px rgba(225,48,108,0.35);">
          DM us on Instagram @shopnavair
        </a>
      </div>

    </div>

    <!-- Footer -->
    <div style="background: linear-gradient(135deg, #F5FAF7 0%, #F8F8F8 100%); padding: 24px; text-align: center; border-top: 1px solid rgba(125,196,164,0.15);">
      <p style="color: #6B7B6B; font-size: 13px; margin: 0 0 8px 0;">
        Questions? Reach out to us at
        <a href="mailto:air.navpure@gmail.com" style="color: #7DC4A4; text-decoration: none; font-weight: 600;">air.navpure@gmail.com</a>
      </p>
      <p style="color: #9AA99A; font-size: 12px; margin: 0;">
        NAV AIR - Premium Peripherals
      </p>
    </div>

  </div>

</body>
</html>
```

---

## Template Variables Used

| Variable | Description |
|----------|-------------|
| `{{customer_name}}` | Customer's full name |
| `{{order_id}}` | Order ID (e.g., ORD-ABC123) |
| `{{product_name}}` | Product name |
| `{{color}}` | Selected color |
| `{{quantity}}` | Quantity ordered |
| `{{payment_method}}` | Payment method (Online/COD) |
| `{{total_amount}}` | Total amount (e.g., Rs. 849) |
| `{{delivery_address}}` | Full delivery address |

---

## Setup Instructions

1. Go to [EmailJS Dashboard](https://dashboard.emailjs.com/)
2. Navigate to **Email Templates**
3. Find template `template_bfgfhxp` (Customer Template)
4. Click **Edit** and replace the content with the HTML above
5. Click **Save**

---

## QR Code Image

The QR code is hosted at: `https://kommodo.ai/i/eqArG0WiPcliQ2hStW8q`

**UPI ID:** `9653820143@ptyes`

---

## Notes

- The email uses inline CSS for maximum email client compatibility
- The design matches your website's kawaii aesthetic with pastel gradients
- "PENDING PAYMENT" is clearly displayed before any confirmation message
- Includes direct link to Instagram for easy customer communication
