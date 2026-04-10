const CART_KEY = "jersey_cart";

export const getCart = () => {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem(CART_KEY)) || [];
};

const saveCart = (cart) => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  window.dispatchEvent(new Event("cartUpdated"));
};

export const addToCart = (product) => {
  const cart = getCart();

  const existing = cart.find(
    (item) => item.id === product.id && item.size === product.size
  );

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart(cart);
};

export const removeFromCart = (id, size) => {
  let cart = getCart();
  cart = cart.filter((item) => !(item.id === id && item.size === size));
  saveCart(cart);
};

export const updateQuantity = (id, size, amount) => {
  const cart = getCart();

  const item = cart.find(
    (i) => i.id === id && i.size === size
  );

  if (!item) return;

  item.quantity += amount;

  if (item.quantity <= 0) {
    removeFromCart(id, size);
    return;
  }

  saveCart(cart);
};

export const clearCart = () => {
  localStorage.removeItem(CART_KEY);
  window.dispatchEvent(new Event("cartUpdated"));
};