const CART_KEY = "jerseyhub_cart";

/**
 * Retrieves the current cart from localStorage.
 * @returns {Array} Array of cart items, empty array if not found or on server.
 */
export const getCart = () => {
  if (typeof window === "undefined") return [];
  try {
    const cart = localStorage.getItem(CART_KEY);
    return cart ? JSON.parse(cart) : [];
  } catch (error) {
    console.error("Failed to parse cart from localStorage:", error);
    return [];
  }
};

/**
 * Saves the cart to localStorage and dispatches a custom event.
 * @param {Array} cart - The cart array to persist.
 */
const saveCart = (cart) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  window.dispatchEvent(new Event("cartUpdated"));
};

/**
 * Calculates the total number of items in the cart.
 * @returns {number} Total quantity of all items.
 */
export const getCartCount = () => {
  const cart = getCart();
  return cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
};

/**
 * Calculates the subtotal price of all items in the cart.
 * @returns {number} Subtotal amount.
 */
export const getCartSubtotal = () => {
  const cart = getCart();
  return cart.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 0), 0);
};

/**
 * Adds a product to the cart. If product with same ID and size exists, increments quantity.
 * @param {Object} product - Product object (must include id, size, price, name, image).
 */
export const addToCart = (product) => {
  if (!product?.id || !product?.size) {
    console.warn("addToCart: Product must have id and size", product);
    return;
  }

  const cart = getCart();
  const existingItem = cart.find(
    (item) => item.id === product.id && item.size === product.size
  );

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    // Store essential fields only to keep localStorage lean
    const cartItem = {
      id: product.id,
      name: product.name,
      club: product.club || "",
      league: product.league || "",
      price: product.price,
      image: product.image,
      size: product.size,
      quantity: 1,
    };
    cart.push(cartItem);
  }

  saveCart(cart);
};

/**
 * Updates the quantity of a specific cart item.
 * @param {string} id - Product ID.
 * @param {string} size - Selected size.
 * @param {number} change - Amount to adjust quantity by (+1 or -1).
 */
export const updateQuantity = (id, size, change) => {
  if (!id || !size) return;

  let cart = getCart();
  const itemIndex = cart.findIndex(
    (item) => item.id === id && item.size === size
  );

  if (itemIndex === -1) return;

  const newQuantity = cart[itemIndex].quantity + change;

  if (newQuantity <= 0) {
    // Remove item if quantity becomes zero or negative
    cart = cart.filter((_, index) => index !== itemIndex);
  } else {
    cart[itemIndex].quantity = newQuantity;
  }

  saveCart(cart);
};

/**
 * Removes an item completely from the cart.
 * @param {string} id - Product ID.
 * @param {string} size - Selected size.
 */
export const removeFromCart = (id, size) => {
  const cart = getCart().filter(
    (item) => !(item.id === id && item.size === size)
  );
  saveCart(cart);
};

/**
 * Clears all items from the cart.
 */
export const clearCart = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(CART_KEY);
  window.dispatchEvent(new Event("cartUpdated"));
};

/**
 * Checks if a product with a specific size is already in the cart.
 * @param {string} id - Product ID.
 * @param {string} size - Size to check.
 * @returns {boolean} True if item exists.
 */
export const isInCart = (id, size) => {
  const cart = getCart();
  return cart.some((item) => item.id === id && item.size === size);
};