"use client";

import Link from "next/link";
import { useState } from "react";
import { addToCart } from "@/lib/cartStore";

export default function ProductCard({ product }) {
  const [added, setAdded] = useState(false);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || "M");

  // Determine if product is on sale
  const isOnSale = product.originalPrice && product.originalPrice > product.price;
  const discountPercentage = isOnSale
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAdd = (e) => {
    e.preventDefault(); // Prevents navigation when clicking the button

    addToCart({
      ...product,
      size: selectedSize,
      quantity: 1,
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleSizeSelect = (e, size) => {
    e.preventDefault(); // Prevent link navigation
    setSelectedSize(size);
  };

  return (
    <Link href={`/products/${product.id}`} className="block h-full  rounded-2xl">
      <div className="group relative h-full bg-gradient-to-b from-[#1a1a1a] to-[#0f0f0f] rounded-2xl overflow-hidden border border-white/10 hover:border-green-500/50 shadow-lg hover:shadow-[0_20px_40px_rgba(34,197,94,0.15)] transition-all duration-300 flex flex-col">
        
        {/* Product Tag Badge */}
        {product.tag && (
          <div className="absolute top-3 left-3 z-10">
            <span
              className={`
                text-xs font-bold px-3 py-1 rounded-full shadow-md backdrop-blur-sm
                ${product.tag === "New" && "bg-blue-500/90 text-white"}
                ${product.tag === "Sale" && "bg-red-500/90 text-white"}
                ${product.tag === "Best Seller" && "bg-amber-500/90 text-black"}
                ${product.tag === "Popular" && "bg-purple-500/90 text-white"}
                ${product.tag === "Champions" && "bg-yellow-500/90 text-black"}
                ${product.tag === "National" && "bg-emerald-600/90 text-white"}
                ${!["New", "Sale", "Best Seller", "Popular", "Champions", "National"].includes(product.tag) && "bg-gray-700/90 text-white"}
              `}
            >
              {product.tag}
            </span>
          </div>
        )}

        {/* Discount Badge (if on sale) */}
        {isOnSale && (
          <div className="absolute top-3 right-3 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
            -{discountPercentage}%
          </div>
        )}

        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-b from-gray-900 to-black">
          <img
            src={product.image}
            alt={`${product.name} - ${product.club || product.league} football jersey`}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            loading="lazy"
          />
          {/* Subtle overlay gradient on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-1">
          {/* Club / League */}
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
            {product.club || product.league}
          </p>

          {/* Product Name */}
          <h3 className="font-semibold text-white text-base sm:text-lg leading-tight mb-2 line-clamp-2">
            {product.name}
          </h3>

         

          {/* Price Section */}
          <div className="mt-auto flex items-baseline gap-2 mb-3">
            <span className="text-xl font-bold text-green-400">
              GH₵{product.price}
            </span>
            {isOnSale && (
              <span className="text-sm text-gray-500 line-through">
                GH₵{product.originalPrice}
              </span>
            )}
          </div>

          {/* Description (hidden on mobile, visible on hover for larger screens) */}
          {product.description && (
            <p className="hidden sm:block text-xs text-gray-400 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {product.description.length > 60
                ? product.description.slice(0, 60) + "…"
                : product.description}
            </p>
          )}

          {/* Add to Cart Button */}
          <button
            onClick={handleAdd}
            disabled={added}
            className={`
              w-full py-2.5 rounded-lg text-sm font-bold transition-all duration-200 transform
              
              disabled:cursor-default
              ${added
                ? "bg-green-400 text-black scale-[0.98]"
                : "bg-green-500 hover:bg-green-400 text-black hover:shadow-lg hover:shadow-green-500/30 hover:-translate-y-0.5 active:translate-y-0"
              }
            `}
            aria-label={`Add ${product.name} to cart`}
          >
            {added ? "✓ Added to Cart" : "Add to Cart"}
          </button>
        </div>
      </div>
    </Link>
  );
}