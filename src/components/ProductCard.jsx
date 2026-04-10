"use client";

import { useState } from "react";
import { addToCart } from "@/lib/cartStore";
import Link from  "next/link";

export default function ProductCard({ product }) {
  const [size, setSize] = useState("M");
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart({ ...product, size });
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div className="group bg-[#111] rounded-2xl overflow-hidden border border-white/5 hover:border-green-500/40 hover:shadow-[0_10px_40px_rgba(34,197,94,0.2)] transition duration-300">

      <div className="relative">
        
        <img
          src={product.image}
          className="w-full  aspect-[3/4] object-cover group-hover:scale-110 transition duration-700"
        />
        
{/* HOVER BUTTON */}
<Link href={`/products/${product.id}`}>
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition">
      <button className="bg-black text-white px-4 py-2 rounded-lg text-sm">
        view details
      </button>
    </div>
</Link>


        <span className="absolute top-3 left-3 bg-green-500 text-black text-xs px-2 py-1 rounded">
          {product.tag}
        </span>
      </div>

      <div className="p-5">

        <h3 className="text-sm font-medium">
          {product.name}
        </h3>

        <p className="text-green-400 font-bold mt-1">
          GH₵{product.price}
        </p>

       

        <button
          onClick={handleAdd}
          className={`mt-4 w-full py-2 rounded-lg text-sm font-semibold transition ${
            added
              ? "bg-green-400 text-black"
              : "bg-green-500 hover:bg-green-400  hover:shadow-lgtext-black"
          }`}
        >
          {added ? "Added ✓" : "Add to Cart"}
        </button>

      </div>
    </div>
  );
}