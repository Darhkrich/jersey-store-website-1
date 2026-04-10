export const checkoutWhatsApp = (cart) => {
  const phone = "233559423149";

  if (!Array.isArray(cart) || cart.length === 0) {
    alert("Cart is empty");
    return;
  }

  const itemsText = cart
    .map((item, index) => {
      return `${index + 1}. ${item.name}
   Size: ${item.size}
   Qty: ${item.quantity}
   Price: GH₵${item.price}`;
    })
    .join("\n\n");

  const total = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const message = `Hello, I want to place an order:

${itemsText}

Total Amount: GH₵${total}

Please confirm availability and delivery.`;

  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  window.location.href = url;
};