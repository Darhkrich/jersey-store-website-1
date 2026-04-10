export const checkoutWhatsApp = (cart) => {
  const phone = "233559423149"; // ✅ replace correctly

  if (!Array.isArray(cart) || cart.length === 0) {
    alert("Cart is empty");
    return;
  }

  const message = cart
    .map((item) => {
      return `Item: ${item.name}
Size: ${item.size}
Qty: ${item.quantity}
Price: GH₵${item.price}`;
    })
    .join("\n\n");

  const total = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const finalMessage = `${message}

Total: GH₵${total}`;

  const encoded = encodeURIComponent(finalMessage);

  const url = `https://wa.me/${phone}?text=${encoded}`;

  // 🔥 IMPORTANT (better than window.open)
  window.location.href = url;
};