/**
 * Validate order data
 */
export const validateOrderData = (orderData) => {
  const errors = [];

  // Full Name
  if (!orderData.fullName || !orderData.fullName.trim()) {
    errors.push('Full name is required');
  }

  // Mobile
  const mobileRegex = /^[0-9]{10}$/;
  if (!mobileRegex.test(orderData.mobile?.replace(/\D/g, ''))) {
    errors.push('Mobile number must be 10 digits');
  }

  // Email
  const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  if (!emailRegex.test(orderData.email)) {
    errors.push('Invalid email address');
  }

  // Address
  if (!orderData.address || !orderData.address.trim()) {
    errors.push('Delivery address is required');
  }

  // City
  if (!orderData.city || !orderData.city.trim()) {
    errors.push('City is required');
  }

  // State
  if (!orderData.state || !orderData.state.trim()) {
    errors.push('State is required');
  }

  // PIN Code
  const pinRegex = /^[0-9]{6}$/;
  if (!pinRegex.test(orderData.pincode)) {
    errors.push('PIN code must be 6 digits');
  }

  // Product
  const validProducts = ['NAV AIR Bloom', 'NAV AIR Glow'];
  if (!validProducts.includes(orderData.product)) {
    errors.push('Invalid product selected');
  }

  // Quantity
  const quantity = parseInt(orderData.quantity);
  if (!Number.isFinite(quantity) || quantity < 1 || quantity > 10) {
    errors.push('Quantity must be between 1 and 10');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};