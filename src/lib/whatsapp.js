import { getCart, clearCart } from "./cartStore";

export const checkoutWhatsApp = () => {
  const phone = "0559423149"; // replace with your number

  const cart = getCart();

  if (!cart.length) return;

  let message = "Hello, I want to order:\n\n";

  cart.forEach((item) => {
    message += `- ${item.name} (${item.size}) x${item.quantity}\n`;
  });

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  message += `\nTotal: GH₵${total}`;

  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  window.open(url, "_blank");

  clearCart();
};