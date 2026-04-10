"use client";

import Navbar from "@/components/Navbar";
import { products } from "@/data/products";
import { addToCart } from "@/lib/cartStore";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function ProductDetails() {
  const { id } = useParams();

  const product = products.find((p) => p.id === id);

  const [size, setSize] = useState("M");
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="text-center py-20 text-gray-400">
        Product not found
      </div>
    );
  }

  const handleAdd = () => {
    addToCart({ ...product, size });
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div>

      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12">

        {/* 🔥 IMAGE */}
        <div>
          <img
            src={product.image}
            className="w-full aspect-[3/4] object-cover rounded-xl"
          />
        </div>

        {/* 🔥 DETAILS */}
        <div>

          <h1 className="text-3xl font-bold">
            {product.name}
          </h1>

          <p className="text-green-400 text-2xl font-bold mt-2">
            GH₵{product.price}
          </p>

          {/* 🔥 DESCRIPTION */}
          <p className="text-gray-400 mt-4">
            Premium quality football jersey. Designed for comfort,
            style, and performance. Perfect for match days and casual wear.
          </p>

          {/* 🔥 SIZE SELECTOR */}
          <div className="mt-6">

            <p className="mb-2 text-sm">Select Size</p>

            <div className="flex gap-3">

              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`px-4 py-2 border rounded ${
                    size === s
                      ? "bg-green-500 text-black"
                      : "border-white/20"
                  }`}
                >
                  {s}
                </button>
              ))}

            </div>

          </div>

          {/* 🔥 STOCK URGENCY */}
          <p className="text-sm text-red-400 mt-4">
            Only few left 🔥
          </p>

          {/* 🔥 ADD TO CART */}
          <button
            onClick={handleAdd}
            className={`mt-6 w-full py-3 rounded-lg font-medium transition ${
              added
                ? "bg-green-400 text-black"
                : "bg-green-500 hover:bg-green-400 text-black"
            }`}
          >
            {added ? "Added ✓" : "Add to Cart"}
          </button>

        </div>

      </div>

    </div>
  );
}