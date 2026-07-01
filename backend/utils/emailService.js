import transporter from '../config/email.js';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Send order notification email to business
 */
export const sendOrderToBusinessEmail = async (orderData) => {
  const htmlContent = `
    <html style="font-family: Arial, sans-serif;">
      <body style="background: linear-gradient(135deg, #E8F5F0 0%, #F0EBF8 100%); padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 20px; padding: 30px; box-shadow: 0 10px 40px rgba(0,0,0,0.1);">
          <h2 style="color: #7DC4A4; text-align: center; margin-bottom: 30px;">🌿 NEW ORDER REQUEST - PENDING PAYMENT</h2>
          
          <div style="background: #F5FAF7; padding: 20px; border-radius: 15px; margin-bottom: 20px;">
            <h3 style="color: #3D6B52; margin-top: 0;">👤 Customer Details</h3>
            <p><strong>Name:</strong> ${orderData.fullName}</p>
            <p><strong>Phone:</strong> ${orderData.mobile}</p>
            <p><strong>Email:</strong> ${orderData.email}</p>
          </div>
          
          <div style="background: #F0EBF8; padding: 20px; border-radius: 15px; margin-bottom: 20px;">
            <h3 style="color: #6B5A80; margin-top: 0;">📍 Delivery Address</h3>
            <p>${orderData.address}</p>
            ${orderData.landmark ? `<p><strong>Landmark:</strong> ${orderData.landmark}</p>` : ''}
            <p><strong>City:</strong> ${orderData.city}</p>
            <p><strong>State:</strong> ${orderData.state}</p>
            <p><strong>PIN:</strong> ${orderData.pincode}</p>
          </div>
          
          <div style="background: #FDF8E8; padding: 20px; border-radius: 15px; margin-bottom: 20px;">
            <h3 style="color: #7B6020; margin-top: 0;">📦 Order Details</h3>
            <p><strong>Product:</strong> ${orderData.product}</p>
            <p><strong>Quantity:</strong> ${orderData.quantity}</p>
            ${orderData.notes ? `<p><strong>Special Notes:</strong> ${orderData.notes}</p>` : ''}
          </div>

          <div style="background: #FFF0E8; padding: 20px; border-radius: 15px; margin-bottom: 20px; border: 2px solid #E8A87C;">
            <h3 style="color: #E8A87C; margin-top: 0;">⏳ Payment Status: PENDING</h3>
            <p>This order requires manual payment verification. Send payment link or QR code to the customer's email before confirming.</p>
          </div>
          
          <div style="background: #F5FAF7; padding: 20px; border-radius: 15px;">
            <h3 style="color: #3D6B52; margin-top: 0;">⏰ Order Date & Time</h3>
            <p>${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
          </div>
          
          <hr style="border: none; border-top: 2px solid #E8F5F0; margin: 30px 0;">
          <p style="text-align: center; color: #999; font-size: 12px;">This is an automated email from NAV AIR order system</p>
        </div>
      </body>
    </html>
  `;

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: 'air.navpure@gmail.com',
      subject: `🌿 New Order Request - ${orderData.fullName} [PENDING PAYMENT]`,
      html: htmlContent,
    });
    console.log('✅ Business email sent');
    return true;
  } catch (error) {
    console.error('❌ Failed to send business email:', error);
    throw new Error('Could not send business email');
  }
};

/**
 * Send pending-payment confirmation email to customer
 */
export const sendOrderConfirmationToCustomer = async (orderData) => {
  const htmlContent = `
    <html style="font-family: Arial, sans-serif;">
      <body style="background: linear-gradient(135deg, #E8F5F0 0%, #F0EBF8 100%); padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 20px; padding: 30px; box-shadow: 0 10px 40px rgba(0,0,0,0.1);">
          <h2 style="color: #7DC4A4; text-align: center; margin-bottom: 30px;">🌿 Order Request Received - NAV AIR</h2>
          
          <p style="font-size: 16px; line-height: 1.6; color: #333;">
            Hi <strong>${orderData.fullName}</strong>,
          </p>
          
          <div style="background: #FFF0E8; padding: 20px; border-radius: 15px; margin: 20px 0; border-left: 4px solid #E8A87C;">
            <h3 style="color: #E8A87C; margin-top: 0;">⏳ Your order is NOT yet confirmed</h3>
            <p style="font-size: 15px; line-height: 1.7; color: #333; margin: 0;">
              Thank you for your order request! We have received your order details successfully.<br><br>
              Our team will review your order and send you a <strong>secure payment link or QR code</strong> to your email address.<br><br>
              After we verify your payment, we will confirm your order and begin processing it.
            </p>
          </div>
          
          <div style="background: #F5FAF7; padding: 20px; border-radius: 15px; margin: 20px 0;">
            <h3 style="color: #3D6B52; margin-top: 0;">📦 Your Order Summary</h3>
            <p><strong>Product:</strong> ${orderData.product}</p>
            <p><strong>Quantity:</strong> ${orderData.quantity}</p>
            <p><strong>Delivery City:</strong> ${orderData.city}</p>
            <p><strong>Status:</strong> <span style="color: #E8A87C; font-weight: bold;">PENDING PAYMENT</span></p>
          </div>

          <div style="background: #F0EBF8; padding: 20px; border-radius: 15px; margin: 20px 0;">
            <h3 style="color: #6B5A80; margin-top: 0;">🔮 What happens next?</h3>
            <ol style="color: #333; line-height: 1.8;">
              <li>Our team reviews your order request</li>
              <li>We send you a secure payment link or QR code via email</li>
              <li>You complete the payment</li>
              <li>We confirm your order and begin processing</li>
            </ol>
          </div>
          
          <hr style="border: none; border-top: 2px solid #E8F5F0; margin: 30px 0;">
          <p style="text-align: center; color: #999; font-size: 12px;">
            <strong>NAV AIR</strong><br>
            Questions? Email us at <a href="mailto:air.navpure@gmail.com" style="color: #7DC4A4;">air.navpure@gmail.com</a>
          </p>
        </div>
      </body>
    </html>
  `;

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: orderData.email,
      subject: 'Order Request Received - NAV AIR',
      html: htmlContent,
    });
    console.log('✅ Customer confirmation email sent');
    return true;
  } catch (error) {
    console.error('❌ Failed to send customer email:', error);
    throw new Error('Could not send confirmation email');
  }
};
