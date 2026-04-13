"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";
import {
  getCart,
  removeFromCart,
  updateQuantity,
  clearCart,
} from "@/lib/cartStore";
import { checkoutWhatsApp } from "@/lib/whatsapp";
import { useEffect, useState } from "react";
import { Trash2, ArrowLeft, ShoppingBag, Truck, ChevronRight } from "lucide-react";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [isClient, setIsClient] = useState(false);

  const loadCart = () => {
    const data = getCart();
    setCart(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    setIsClient(true);
    loadCart();

    const handleUpdate = () => loadCart();
    window.addEventListener("cartUpdated", handleUpdate);
    window.addEventListener("storage", handleUpdate);

    return () => {
      window.removeEventListener("cartUpdated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const subtotal = total;
  const deliveryFee = total >= 500 ? 0 : 30;
  const finalTotal = subtotal + deliveryFee;

  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleClearCart = () => {
    
      clearCart();
    
  };

  // Prevent hydration mismatch
  if (!isClient) {
    return (
      <div className="min-h-screen bg-black">
        <Navbar />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
          <div className="animate-pulse">
            <div className="h-8 w-48 bg-gray-800 rounded mb-10"></div>
            <div className="h-64 bg-gray-800 rounded-2xl"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
          <Link href="/" className="hover:text-green-400 transition">
            Home
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/products" className="hover:text-green-400 transition">
            Shop
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-white">Cart ({itemCount})</span>
        </nav>

        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-8 sm:mb-10 flex items-center gap-3">
          <ShoppingBag className="w-8 h-8 text-green-400" />
          Your Cart
          {itemCount > 0 && (
            <span className="text-lg font-normal text-gray-400 ml-2">
              ({itemCount} {itemCount === 1 ? "item" : "items"})
            </span>
          )}
        </h1>

        {cart.length === 0 ? (
          /* Empty Cart State */
          <div className="text-center py-16 sm:py-24">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-green-500/10 rounded-full mb-6">
              <ShoppingBag className="w-12 h-12 text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">Your cart is empty</h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              Looks like you haven't added any jerseys yet. Browse our collection and find your perfect kit!
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-green-500 text-black px-6 py-3 rounded-xl font-semibold hover:bg-green-400 transition-all duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {/* Cart Header */}
              <div className="hidden sm:grid grid-cols-12 gap-4 px-4 py-2 text-xs text-gray-500 uppercase tracking-wider border-b border-white/10">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Total</div>
              </div>

              {/* Cart Items List */}
              <div className="space-y-4">
                {cart.map((item) => {
                  const itemTotal = item.price * item.quantity;
                  return (
                    <div
                      key={`${item.id}-${item.size}`}
                      className="group relative bg-gradient-to-b from-[#1a1a1a] to-[#111] rounded-2xl border border-white/10 hover:border-green-500/30 transition-all duration-300 p-4 sm:p-5"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                        {/* Product Info */}
                        <div className="sm:col-span-6 flex gap-4">
                          <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 rounded-xl overflow-hidden bg-gray-900">
                            <img
                              src={item.image || "/placeholder.png"}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <Link
                              href={`/products/${item.id}`}
                              className="font-semibold text-white hover:text-green-400 transition line-clamp-2"
                            >
                              {item.name}
                            </Link>
                            <p className="text-sm text-gray-400 mt-0.5">
                              {item.club || item.league}
                            </p>
                            <div className="flex items-center gap-3 mt-2">
                              <span className="text-xs px-2 py-1 bg-white/5 rounded-full text-gray-300">
                                Size: {item.size}
                              </span>
                              <button
                                onClick={() => removeFromCart(item.id, item.size)}
                                className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 transition"
                                aria-label={`Remove ${item.name}`}
                              >
                                <Trash2 className="w-3 h-3" />
                                <span className="hidden sm:inline">Remove</span>
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="sm:col-span-2 flex sm:block items-center justify-between">
                          <span className="sm:hidden text-sm text-gray-400">Price:</span>
                          <span className="text-white font-medium">
                            GH₵{item.price}
                          </span>
                        </div>

                        {/* Quantity */}
                        <div className="sm:col-span-2 flex sm:block items-center justify-between">
                          <span className="sm:hidden text-sm text-gray-400">Quantity:</span>
                          <div className="flex items-center justify-center sm:justify-center gap-1">
                            <button
                              onClick={() => updateQuantity(item.id, item.size, -1)}
                              className="w-8 h-8 rounded-lg bg-[#222] border border-white/10 text-white hover:border-green-400 transition"
                              aria-label="Decrease quantity"
                            >
                              -
                            </button>
                            <span className="w-8 text-center text-white font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.size, 1)}
                              className="w-8 h-8 rounded-lg bg-[#222] border border-white/10 text-white hover:border-green-400 transition"
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* Total */}
                        <div className="sm:col-span-2 flex sm:block items-center justify-between">
                          <span className="sm:hidden text-sm text-gray-400">Total:</span>
                          <span className="text-green-400 font-bold sm:text-right">
                            GH₵{itemTotal}
                          </span>
                        </div>
                      </div>

                      {/* Mobile Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.id, item.size)}
                        className="sm:hidden absolute top-4 right-4 text-gray-400 hover:text-red-400 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Cart Actions */}
              <div className="flex flex-col sm:flex-row justify-between gap-4 pt-4">
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center gap-2 text-gray-400 hover:text-white transition"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Continue Shopping
                </Link>
                <button
                  onClick={handleClearCart}
                  className="text-red-400 hover:text-red-300 text-sm transition flex items-center justify-center gap-1"
                >
                  <Trash2 className="w-4 h-4" />
                  Clear Cart
                </button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-gradient-to-b from-[#1a1a1a] to-[#111] p-6 sm:p-7 rounded-2xl border border-white/10 shadow-xl">
                <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>

                <div className="space-y-4">
                  <div className="flex justify-between text-gray-300">
                    <span>Subtotal ({itemCount} items)</span>
                    <span>GH₵{subtotal.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-gray-300">
                    <span className="flex items-center gap-2">
                      Delivery
                      <span className="text-xs text-gray-500">(Accra & regions)</span>
                    </span>
                    {deliveryFee === 0 ? (
                      <span className="text-green-400">FREE</span>
                    ) : (
                      <span>GH₵{deliveryFee.toFixed(2)}</span>
                    )}
                  </div>

                  {subtotal < 500 && subtotal > 0 && (
                    <div className="text-xs text-amber-400 bg-amber-400/10 p-2 rounded-lg border border-amber-400/20">
                      Add GH₵{(500 - subtotal).toFixed(2)} more for FREE delivery!
                    </div>
                  )}

                  <div className="pt-4 border-t border-white/10">
                    <div className="flex justify-between text-lg font-bold">
                      <span className="text-white">Total</span>
                      <span className="text-green-400">GH₵{finalTotal.toFixed(2)}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">VAT included where applicable</p>
                  </div>
                </div>

                {/* Delivery Estimate */}
                <div className="mt-6 flex items-start gap-3 p-3 bg-green-500/5 rounded-xl border border-green-500/20">
                  <Truck className="w-5 h-5 text-green-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-white">Fast Delivery</p>
                    <p className="text-xs text-gray-400">Expected delivery: 1-3 business days</p>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={() => checkoutWhatsApp(cart)}
                  className="mt-6 w-full bg-green-500 text-black py-4 rounded-xl font-bold text-lg hover:bg-green-400 transition-all duration-200 shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/40 transform hover:-translate-y-0.5"
                >
                  Checkout via WhatsApp
                </button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  Secure checkout • No payment needed upfront
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}