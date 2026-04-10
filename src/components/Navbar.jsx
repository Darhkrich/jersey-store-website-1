"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getCart } from "@/lib/cartStore";

export default function Navbar() {
  const [count, setCount] = useState(0);

  const updateCart = () => {
    const cart = getCart();
    const total = cart.reduce((sum, i) => sum + i.quantity, 0);
    setCount(total);
  };

  useEffect(() => {
    updateCart();
    window.addEventListener("cartUpdated", updateCart);
    return () =>
      window.removeEventListener("cartUpdated", updateCart);
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-black/60 backdrop-blur-xl border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.6)] px-6 py-4 flex justify-between items-center">

      <Link href="/" className="text-xl font-bold">
        Jersey<span className="text-green-400 font-extrabold">Hub</span>
      </Link>

      <div className="flex gap-6 items-center">

        <Link href="/products" className="hover:text-green-400">
          Shop
        </Link>

        <Link href="/cart" className="relative text-xl">
          🛒
          {count > 0 && (
            <span className="absolute -top-2 -right-3 bg-green-500 text-black text-xs px-2 py-[2px] rounded-full">
              {count}
            </span>
          )}
        </Link>

      </div>
    </nav>
  );
}