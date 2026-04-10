import Navbar from "@/components/Navbar";
import Link from "next/link";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";

export default function Home() {
  return (
    <div>

      <Navbar />

      {/* 🔥 HERO SECTION */}
      <section className="relative h-[65vh] flex items-center justify-center text-center overflow-hidden">

        <img
          src="/hero-2.jpg"
          className="absolute inset-0 w-full h-full object-cover scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black" />

        <div className="relative z-10 px-6 max-w-3xl">

          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
            Rep Your Club.
            <span className="text-green-400"> Own The Game.</span>
          </h1>

          <p className="mt-4 text-gray-300 text-lg">
            Premium football jerseys for real fans. Delivered fast.
          </p>

          <Link href="/products">
            <button className="mt-8 bg-green-500 text-black px-8 py-3 rounded-lg font-medium hover:bg-green-400 hover:scale-105 transition">
              Shop Jerseys
            </button>
          </Link>

        </div>
      </section>

      {/* 🔥 TRUST STRIP */}
      <section className="border-t border-white/10 py-10">

        <div className="max-w-5xl mx-auto grid grid-cols-3 text-center text-sm text-gray-300">

          <p>⚡ Fast Delivery</p>
          <p>🔥 Latest Kits</p>
          <p>💬 WhatsApp Orders</p>

        </div>

      </section>

      {/* 🔥 NEW SEASON KITS */}
      <section className="max-w-7xl mx-auto px-4 py-10">

        <h2 className="text-3xl font-bold mb-10">
          New Season Kits 🔥
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-10">

          {products.slice(0, 8).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}

        </div>

      </section>

      {/* 🔥 SHOP BY CLUB */}
      <section className="max-w-6xl mx-auto px-6 py-10">

        <h2 className="text-2xl font-bold mb-8">
          Shop By Club
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

          {["Arsenal", "Chelsea", "Man United", "Barcelona"].map((club) => (
            <div
              key={club}
              className="bg-[#111] p-6 rounded-xl text-center hover:bg-[#1a1a1a] cursor-pointer transition"
            >
              <p className="font-medium">{club}</p>
            </div>
          ))}

        </div>

      </section>

      {/* 🔥 BEST SELLERS */}
      <section className="max-w-6xl mx-auto px-6 py-20">

        <h2 className="text-3xl font-bold mb-10">
          Popular Right Now 🔥
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-10">

          {products.slice(9, 66).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}

        </div>

      </section>

      {/* 🔥 CTA */}
      <section className="bg-green-500 text-black text-center py-16 mt-10">

        <h2 className="text-3xl font-bold">
          Ready to Get Your Jersey?
        </h2>

        <p className="mt-2">
          Order instantly via WhatsApp
        </p>

        <Link href="/cart">
          <button className="mt-8 bg-black text-white px-8 py-3 rounded-lg hover:scale-105 transition">
            Order Now
          </button>
        </Link>

      </section>

      {/* 🔥 FOOTER */}
      <footer className="text-center py-8 text-gray-500 text-sm">
        JerseyHub © {new Date().getFullYear()} — Built for fast WhatsApp ordering
      </footer>

    </div>
  );
}