"use client";

import Link from "next/link";
import { useState } from "react";
import { addToCart } from "@/lib/cartStore";

export default function ProductCard({ product }) {
  const [added, setAdded] = useState(false);

  const handleAdd = (e) => {
    e.preventDefault(); // 🔥 VERY IMPORTANT (prevents navigation when clicking button)

    addToCart({
      ...product,
      size: "M", // default size for now
      quantity: 1,
    });

    setAdded(true);

    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <Link href={`/products/${product.id}`}>

      <div className="group cursor-pointer bg-[#111] rounded-2xl overflow-hidden border border-white/5 hover:border-green-500/40 hover:shadow-[0_10px_40px_rgba(34,197,94,0.2)] transition">

        {/* IMAGE */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full aspect-[3/4] object-cover group-hover:scale-110 transition duration-700"
        />

        {/* CONTENT */}
        <div className="p-4">

          <h3 className="font-medium mb-1">
            {product.name}
          </h3>

          <p className="text-green-400 font-semibold">
            GH₵{product.price}
          </p>

          {/* BUTTON */}
          <button
            onClick={handleAdd}
            className={`mt-4 w-full py-2 rounded-lg text-sm font-semibold transition ${
              added
                ? "bg-green-400 text-black"
                : "bg-green-500 hover:bg-green-400 text-black"
            }`}
          >
            {added ? "Added ✓" : "Add to Cart"}
          </button>

        </div>

      </div>

    </Link>
  );
}