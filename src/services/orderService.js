import axios from 'axios';
import { toast } from 'sonner';

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000/api';

/**
 * Submit order to backend
 */
export const submitOrder = async (orderData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/orders/create`, {
      fullName: orderData.fullName.trim(),
      mobile: orderData.mobile.replace(/\D/g, ''),
      email: orderData.email.trim(),
      address: orderData.address.trim(),
      landmark: orderData.landmark?.trim() || '',
      city: orderData.city.trim(),
      state: orderData.state.trim(),
      pincode: orderData.pincode.replace(/\D/g, ''),
      product: orderData.product,
      quantity: parseInt(orderData.quantity),
      notes: orderData.notes?.trim() || '',
    });

    if (response.data.success) {
      toast.success('✅ Order placed successfully!');
      return {
        success: true,
        orderId: response.data.orderId,
        message: response.data.message,
      };
    }
  } catch (error) {
    const errorMessage = error.response?.data?.errors?.[0] || error.response?.data?.message || 'Failed to place order';
    toast.error(`❌ ${errorMessage}`);
    
    return {
      success: false,
      error: errorMessage,
      errors: error.response?.data?.errors || [],
    };
  }
};

/**
 * Check backend health
 */
export const checkBackendHealth = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/health`, {
      timeout: 5000,
    });
    return response.data.success !== false;
  } catch (error) {
    console.warn('⚠️ Backend health check failed:', error.message);
    return false;
  }
};