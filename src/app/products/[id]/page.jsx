"use client";

import Navbar from "@/components/Navbar";
import { products } from "@/data/products";
import { addToCart } from "@/lib/cartStore";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ChevronRight, Share2, Ruler, Truck, Shield, ArrowRight } from "lucide-react";
import ProductCard from "@/components/ProductCard";

export default function ProductDetails() {
  const { id } = useParams();

  const product = products.find((p) => p.id === id);
  const [size, setSize] = useState("M");
  const [added, setAdded] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);

  // Find related products (same league or club)
  useEffect(() => {
    if (product) {
      const related = products
        .filter(
          (p) =>
            p.id !== product.id &&
            (p.league === product.league || p.club === product.club)
        )
        .slice(0, 4);
      setRelatedProducts(related);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold text-white mb-2">Product Not Found</h2>
          <p className="text-gray-400 mb-6">The jersey you're looking for doesn't exist.</p>
          <Link
            href="/products"
            className="inline-block bg-green-500 text-black px-6 py-3 rounded-lg font-medium hover:bg-green-400 transition"
          >
            Browse All Jerseys
          </Link>
        </div>
      </div>
    );
  }

  const handleAdd = () => {
    addToCart({ ...product, size, quantity });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleWhatsAppOrder = () => {
    const message = `Hi! I'd like to order:%0A%0A*${product.name}*%0ASize: ${size}%0AQuantity: ${quantity}%0APrice: GH₵${product.price}%0A%0ACan you confirm availability?`;
    const phone = "233XXXXXXXXX"; // Replace with actual WhatsApp number
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
  };

  // Determine stock status based on available sizes
  const stockStatus = product.sizes.length > 2 ? "In Stock" : "Low Stock";
  const stockColor = product.sizes.length > 2 ? "text-green-400" : "text-amber-400";

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      {/* Breadcrumb */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <nav className="flex items-center gap-2 text-sm text-gray-400">
            <Link href="/" className="hover:text-green-400 transition">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/products" className="hover:text-green-400 transition">
              Jerseys
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link
              href={`/products?league=${encodeURIComponent(product.league)}`}
              className="hover:text-green-400 transition"
            >
              {product.league}
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white truncate max-w-[200px]">
              {product.name}
            </span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative group overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-[#1a1a1a] to-[#0f0f0f]">
              <img
                src={product.image}
                alt={`${product.name} - ${product.club || product.league} football jersey`}
                className="w-full aspect-[3/4] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Product Tag Overlay */}
              {product.tag && (
                <div className="absolute top-4 left-4">
                  <span className={`
                    text-xs font-bold px-3 py-1 rounded-full shadow-lg backdrop-blur-sm
                    ${product.tag === "New" && "bg-blue-500/90 text-white"}
                    ${product.tag === "Sale" && "bg-red-500/90 text-white"}
                    ${product.tag === "Best Seller" && "bg-amber-500/90 text-black"}
                    ${product.tag === "Popular" && "bg-purple-500/90 text-white"}
                    ${product.tag === "Champions" && "bg-yellow-500/90 text-black"}
                    ${product.tag === "National" && "bg-emerald-600/90 text-white"}
                  `}>
                    {product.tag}
                  </span>
                </div>
              )}
              {/* Share Button */}
              <button
                onClick={() => {
                  navigator.share?.({
                    title: product.name,
                    text: `Check out this ${product.name} on JerseyHub!`,
                    url: window.location.href,
                  });
                }}
                className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-green-500 hover:text-black transition-colors"
                aria-label="Share product"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column - Product Info */}
          <div className="space-y-6">
            {/* Club/League Info */}
            <div>
              <p className="text-green-400 text-sm uppercase tracking-wider font-semibold mb-1">
                {product.club || product.league}
              </p>
              <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
                {product.name}
              </h1>
            </div>

            {/* Price Section */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-green-400">
                GH₵{product.price}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <>
                  <span className="text-lg text-gray-500 line-through">
                    GH₵{product.originalPrice}
                  </span>
                  <span className="text-sm font-semibold bg-red-500/20 text-red-400 px-2 py-0.5 rounded">
                    Save GH₵{product.originalPrice - product.price}
                  </span>
                </>
              )}
            </div>

            {/* Product Description */}
            <div className="prose prose-invert">
              <p className="text-gray-300 leading-relaxed">
                {product.description || 
                  "Premium quality authentic football jersey. Engineered with breathable fabric for maximum comfort on and off the pitch. Features official club branding and moisture-wicking technology."}
              </p>
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-4 text-sm">
              <div className={`flex items-center gap-1.5 ${stockColor}`}>
                <div className={`w-2 h-2 rounded-full ${stockColor} animate-pulse`} />
                <span className="font-medium">{stockStatus}</span>
              </div>
              <button
                onClick={() => setShowSizeGuide(true)}
                className="flex items-center gap-1 text-gray-400 hover:text-white transition"
              >
                <Ruler className="w-4 h-4" />
                <span>Size Guide</span>
              </button>
            </div>

            {/* Size Selector */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-gray-300">
                  Select Size: <span className="text-green-400">{size}</span>
                </label>
                {product.sizes.length < 3 && (
                  <span className="text-xs text-amber-400">Only few left in stock</span>
                )}
              </div>
              <div className="grid grid-cols-5 gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`
                      py-3 rounded-lg font-medium border transition-all duration-200
                      ${size === s
                        ? "bg-green-500 text-black border-green-500 shadow-sm shadow-green-500/30 scale-[1.02]"
                        : "bg-[#111] text-gray-300 border-white/10 hover:border-green-400 hover:text-white"
                      }
                    `}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">
                Quantity
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-lg bg-[#111] border border-white/10 text-white text-xl hover:border-green-400 transition"
                >
                  -
                </button>
                <span className="text-white text-lg font-medium w-8 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-lg bg-[#111] border border-white/10 text-white text-xl hover:border-green-400 transition"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                onClick={handleAdd}
                disabled={added}
                className={`
                  flex-1 py-4 rounded-xl font-bold text-lg transition-all duration-200
                  ${added
                    ? "bg-green-400 text-black"
                    : "bg-green-500 hover:bg-green-400 text-black hover:shadow-lg hover:shadow-green-500/30"
                  }
                `}
              >
                {added ? "✓ Added to Cart" : "Add to Cart"}
              </button>
              <button
                onClick={handleWhatsAppOrder}
                className="flex-1 py-4 rounded-xl font-bold text-lg bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20 transition-all duration-200"
              >
                Order via WhatsApp
              </button>
            </div>

            {/* Delivery & Returns Info */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/10">
              <div className="flex items-start gap-3">
                <Truck className="w-5 h-5 text-green-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-white">Fast Delivery</p>
                  <p className="text-xs text-gray-400">1-3 business days across Ghana</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-green-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-white">Quality Guarantee</p>
                  <p className="text-xs text-gray-400">100% authentic merchandise</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <section className="mt-16 sm:mt-20 border-t border-white/10 pt-12 sm:pt-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">
                  You May Also Like
                </h2>
                <p className="text-gray-400 mt-1">More jerseys from {product.club || product.league}</p>
              </div>
              <Link
                href={`/products?${product.club ? `club=${encodeURIComponent(product.club)}` : `league=${encodeURIComponent(product.league)}`}`}
                className="text-green-400 hover:text-green-300 text-sm font-medium flex items-center gap-1"
              >
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Size Guide Modal */}
      {showSizeGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#111] border border-white/20 rounded-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">Size Guide</h3>
              <button
                onClick={() => setShowSizeGuide(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4 text-sm">
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="font-semibold text-green-400">Size</div>
                <div className="font-semibold text-green-400">Chest (in)</div>
                <div className="font-semibold text-green-400">Length (in)</div>
                <div>S</div><div>36-38</div><div>27</div>
                <div>M</div><div>38-40</div><div>28</div>
                <div>L</div><div>40-42</div><div>29</div>
                <div>XL</div><div>42-44</div><div>30</div>
                <div>XXL</div><div>44-46</div><div>31</div>
              </div>
              <p className="text-gray-400 text-xs mt-4">
                * Measurements are approximate. For the best fit, we recommend choosing your regular size.
              </p>
            </div>
            <button
              onClick={() => setShowSizeGuide(false)}
              className="mt-6 w-full py-2 bg-green-500 text-black rounded-lg font-medium hover:bg-green-400 transition"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
}