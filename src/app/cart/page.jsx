"use client";

import Navbar from "@/components/Navbar";
import {
  getCart,
  removeFromCart,
  updateQuantity,
} from "@/lib/cartStore";
import { checkoutWhatsApp } from "@/lib/whatsapp";
import { useEffect, useState } from "react";

export default function CartPage() {
  const [cart, setCart] = useState([]);

  const loadCart = () => {
    setCart(getCart());
  };

  useEffect(() => {
    loadCart();
    window.addEventListener("cartUpdated", loadCart);
    return () =>
      window.removeEventListener("cartUpdated", loadCart);
  }, []);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div>

      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-20">

        <h1 className="text-3xl font-bold mb-10">
          Your Cart
        </h1>

        {cart.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p>Your cart is empty</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-10">

            {/* 🔥 ITEMS */}
            <div className="md:col-span-2 space-y-6">

              {cart.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-4 bg-[#111] p-5 rounded-2xl border border-white/5 hover:border-green-500/30 transition"
                >

                  {/* IMAGE */}
                  <img
                    src={item.image}
                    className="w-24 h-24 object-cover rounded-lg"
                  />

                  {/* DETAILS */}
                  <div className="flex-1">

                    <h3 className="font-medium">
                      {item.name}
                    </h3>

                    <p className="text-green-400">
                      GH₵{item.price}
                    </p>

                    <p className="text-sm text-gray-400">
                      Size: {item.size}
                    </p>

                    {/* 🔥 QUANTITY */}
                    <div className="flex items-center gap-3 mt-3">

                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.size, -1)
                        }
                        className="px-3 py-1 bg-[#222] rounded"
                      >
                        -
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.size, 1)
                        }
                        className="px-3 py-1 bg-[#222] rounded"
                      >
                        +
                      </button>

                    </div>

                    {/* REMOVE */}
                    <button
                      onClick={() =>
                        removeFromCart(item.id, item.size)
                      }
                      className="text-red-400 text-sm mt-2"
                    >
                      Remove
                    </button>

                  </div>

                </div>
              ))}

            </div>

            {/* 🔥 SUMMARY */}
            <div className="bg-[#111] p-6 rounded-2xl h-fit border border-white/5 shadow-lg">

              <h2 className="text-xl font-bold mb-4">
                Order Summary
              </h2>

              <p className="flex justify-between mb-2">
                <span>Total:</span>
                <span className="text-green-400 font-bold">
                  GH₵{total}
                </span>
              </p>

              <button
                onClick={checkoutWhatsApp}
                className="mt-6 w-full bg-green-500 text-black py-3 rounded-lg font-medium hover:bg-green-400 transition"
              >
                Order via WhatsApp
              </button>

            </div>

          </div>
        )}

      </div>

    </div>
  );
}