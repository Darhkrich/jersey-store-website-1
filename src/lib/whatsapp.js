export const checkoutWhatsApp = (cart) => {
  const phone = "0559423149";

  // Ensure cart is an array
  const cartItems = Array.isArray(cart) ? cart : cart?.items || [];

  if (cartItems.length === 0) {
    alert("Cart is empty");
    return;
  }

  const message = cartItems
    .map(
      (item) =>
        `🛍️ ${item.name}\nSize: ${item.size}\nQty: ${item.quantity}\nPrice: GH₵${item.price}`
    )
    .join("\n\n");

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const fullMessage = `${message}\n\nTotal: GH₵${total}`;

  const url = `https://wa.me/${phone}?text=${encodeURIComponent(fullMessage)}`;

  window.open(url, "_blank");
};