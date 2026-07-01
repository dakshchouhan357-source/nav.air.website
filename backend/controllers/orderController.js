import { v4 as uuidv4 } from 'uuid';
import { validateOrderData } from '../middleware/validation.js';
import { sendOrderToBusinessEmail, sendOrderConfirmationToCustomer } from '../utils/emailService.js';

/**
 * Create new order
 */
export const createOrder = async (req, res) => {
  try {
    const orderData = req.body;

    // Validate order data
    const validation = validateOrderData(orderData);
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validation.errors,
      });
    }

    // Generate unique order ID
    const orderId = `ORD-${Date.now()}-${uuidv4().slice(0, 8).toUpperCase()}`;

    console.log('📦 Processing order:', orderId);
    console.log('👤 Customer:', orderData.fullName);

    // Send email to business
    try {
      await sendOrderToBusinessEmail(orderData);
    } catch (emailError) {
      console.error('⚠️ Business email failed:', emailError.message);
      // Don't fail the order if business email fails
    }

    // Send confirmation email to customer
    try {
      await sendOrderConfirmationToCustomer(orderData);
    } catch (emailError) {
      console.error('⚠️ Customer email failed:', emailError.message);
      // Don't fail the order if customer email fails
    }

    // Return success response
    res.status(201).json({
      success: true,
      message: 'Order placed successfully!',
      orderId,
      orderData: {
        ...orderData,
        mobile: orderData.mobile.replace(/\D/g, ''),
        quantity: parseInt(orderData.quantity),
      },
      timestamp: new Date().toISOString(),
    });

    console.log('✅ Order created successfully:', orderId);
  } catch (error) {
    console.error('❌ Order creation failed:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create order',
      error: process.env.NODE_ENV === 'production' ? 'Internal server error' : error.message,
    });
  }
};