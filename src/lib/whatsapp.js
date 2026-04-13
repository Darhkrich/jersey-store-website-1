import { clearCart } from "./cartStore";

// WhatsApp business number - should be stored in environment variables
const WHATSAPP_PHONE = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+233 50 327 4574";

/**
 * Formats a cart item into a readable string for WhatsApp message.
 * @param {Object} item - Cart item.
 * @param {number} index - Item position.
 * @returns {string} Formatted item string.
 */
const formatCartItem = (item, index) => {
  const itemTotal = (item.price * item.quantity).toFixed(2);
  return `*${index + 1}. ${item.name}*
   • Size: ${item.size}
   • Qty: ${item.quantity} × GH₵${item.price} = GH₵${itemTotal}`;
};

/**
 * Generates a professional WhatsApp order message.
 * @param {Array} cart - Array of cart items.
 * @returns {string} Formatted message.
 */
const generateOrderMessage = (cart) => {
  const itemsText = cart.map(formatCartItem).join("\n\n");
  
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = subtotal >= 500 ? 0 : 30;
  const total = subtotal + deliveryFee;

  const deliveryNote = deliveryFee === 0 
    ? " *FREE Delivery* (orders over GH₵500)" 
    : ` Delivery: GH₵${deliveryFee}`;

  return ` *Hello I want to place an order*

${itemsText}

──────────────────
 *Subtotal:* GH₵${subtotal.toFixed(2)}
${deliveryNote}
 *TOTAL:* GH₵${total.toFixed(2)}
──────────────────


 *Please confirm availability and total amount.*`;

};

/**
 * Initiates WhatsApp checkout with the current cart.
 * @param {Array} cart - Array of cart items.
 * @param {Object} options - Optional configuration.
 * @param {boolean} options.clearAfterCheckout - Whether to clear cart after opening WhatsApp (default: true).
 * @param {string} options.customPhone - Override default WhatsApp number.
 */
export const checkoutWhatsApp = (cart, options = {}) => {
  const { 
    clearAfterCheckout = true, 
    customPhone 
  } = options;

  const phone = customPhone || WHATSAPP_PHONE;

  // Validation
  if (!Array.isArray(cart) || cart.length === 0) {
    alert("🛒 Your cart is empty. Add some jerseys first!");
    return;
  }

  // Remove any non-numeric characters from phone number
  const cleanPhone = phone.replace(/\D/g, "");
  if (!cleanPhone || cleanPhone.length < 10) {
    console.error("Invalid WhatsApp phone number");
    alert("Sorry, we're having trouble connecting to WhatsApp. Please try again later.");
    return;
  }

  const message = generateOrderMessage(cart);
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedMessage}`;

  // Optional: Ask for confirmation before clearing cart
  if (clearAfterCheckout) {
    // You could add a confirmation dialog here if desired
    clearCart();
  }

  // Open WhatsApp in a new tab (better UX than redirecting current page)
  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
};

/**
 * Quick checkout for a single product (bypasses cart).
 * @param {Object} product - Product object.
 * @param {string} size - Selected size.
 * @param {number} quantity - Quantity (default: 1).
 */
export const checkoutSingleProduct = (product, size, quantity = 1) => {
  if (!product || !size) {
    alert("Please select a size");
    return;
  }

  const cartItem = {
    ...product,
    size,
    quantity,
  };

  checkoutWhatsApp([cartItem], { clearAfterCheckout: false });
};

// Optional: Export phone number getter for display
export const getWhatsAppNumber = () => WHATSAPP_PHONE;