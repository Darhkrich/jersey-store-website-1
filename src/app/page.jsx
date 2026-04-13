import Navbar from "@/components/Navbar";
import Link from "next/link";
import Image from "next/image";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";

export default function Home() {
  // Extract unique clubs from products for "Shop by Club" section
  const clubs = [...new Set(products.map((p) => p.club).filter(Boolean))].slice(0, 6);
  
  // Featured categories (leagues)
  const leagues = [
    { name: "Premier League", color: "from-purple-600/20 to-purple-900/20" },
    { name: "La Liga", color: "from-red-600/20 to-red-900/20" },
    { name: "Bundesliga", color: "from-amber-600/20 to-amber-900/20" },
    { name: "World Cup", color: "from-emerald-600/20 to-emerald-900/20" },
  ];

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative h-[75vh] sm:h-[85vh] flex items-center justify-center text-center overflow-hidden">
        {/* Hero Background */}
        <div className="absolute inset-0">
          <img
            src="/hero-2.jpg"
            alt="Football stadium atmosphere"
            className="w-full h-full object-cover object-center scale-105"
            loading="eager"
          />
        </div>
        
        {/* Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black" />
        <div className="absolute inset-0 bg-gradient-to-t from-green-900/30 via-transparent to-transparent" />

        {/* Content */}
        <div className="relative z-10 px-4 sm:px-6 max-w-4xl mx-auto">
          <span className="inline-block px-4 py-1 mb-6 text-xs sm:text-sm font-semibold tracking-wider text-green-400 bg-green-400/10 rounded-full border border-green-400/30 backdrop-blur-sm">
            2024/25 SEASON NOW AVAILABLE
          </span>
          
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold leading-tight sm:leading-tight tracking-tight text-white">
            Rep Your Club.
            <span className="text-green-400 block sm:inline"> Own The Game.</span>
          </h1>
          
          <p className="mt-4 sm:mt-6 text-gray-300 text-base sm:text-xl max-w-2xl mx-auto">
            Premium authentic football jerseys for real fans. Delivered fast across Ghana.
          </p>

          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <button className="w-full sm:w-auto bg-green-500 text-black px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-400 hover:scale-105 transition-all duration-300 shadow-lg shadow-green-500/30">
                Shop All Jerseys
              </button>
            </Link>
            <Link href="#featured">
              <button className="w-full sm:w-auto bg-white/10 backdrop-blur-sm text-white border border-white/20 px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all duration-300">
                View New Arrivals
              </button>
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce hidden sm:block">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1.5 h-3 bg-white/50 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="border-y border-white/10 bg-white/5 backdrop-blur-sm py-6 sm:py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 text-center">
            <div className="flex items-center justify-center sm:justify-start gap-3">
              <span className="text-2xl">⚡</span>
              <div className="text-left">
                <p className="font-semibold text-white">Fast Delivery</p>
                <p className="text-xs sm:text-sm text-gray-400">Accra • Kumasi • All Regions</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <span className="text-2xl">🔥</span>
              <div className="text-left">
                <p className="font-semibold text-white">Latest 24/25 Kits</p>
                <p className="text-xs sm:text-sm text-gray-400">Authentic club & national jerseys</p>
              </div>
            </div>
            <div className="flex items-center justify-center sm:justify-end gap-3">
              <span className="text-2xl">💬</span>
              <div className="text-left">
                <p className="font-semibold text-white">WhatsApp Ordering</p>
                <p className="text-xs sm:text-sm text-gray-400">Instant checkout via DM</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEW SEASON KITS (Featured) */}
      <section id="featured" className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
              New Season Kits 🔥
            </h2>
            <p className="text-gray-400 mt-1 text-sm sm:text-base">Fresh 2024/25 releases just dropped</p>
          </div>
          <Link href="/products?tag=New" className="text-green-400 hover:text-green-300 text-sm sm:text-base font-medium">
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.filter(p => p.tag === "New" || p.tag === "Best Seller").slice(0, 4).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* SHOP BY LEAGUE / CATEGORY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">Shop by League</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {leagues.map((league) => (
            <Link
              key={league.name}
              href={`/products?league=${encodeURIComponent(league.name)}`}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] p-6 sm:p-8 transition-all duration-300 hover:scale-[1.02] hover:border-green-500/50 hover:shadow-xl"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${league.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              <div className="relative z-10">
                <span className="text-4xl mb-4 block">{league.icon}</span>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{league.name}</h3>
                <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                  {products.filter(p => p.league === league.name).length}+ jerseys
                </p>
              </div>
            </Link>
            
          ))}

          
        </div>
      </section>

      {/* SHOP BY CLUB */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 border-t border-white/10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Shop by Club</h2>
            <p className="text-gray-400 mt-1 text-sm sm:text-base">Find your favorite team</p>
          </div>
          <Link href="/products" className="text-green-400 hover:text-green-300 text-sm sm:text-base font-medium">
            All Clubs →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4">
          {clubs.map((club) => (
            <Link
              key={club}
              href={`/products?club=${encodeURIComponent(club)}`}
              className="group bg-[#111] hover:bg-[#1a1a1a] border border-white/5 hover:border-green-500/30 rounded-xl p-4 sm:p-5 text-center transition-all duration-200 hover:-translate-y-1"
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                {club.charAt(0)}
              </div>
              <p className="font-medium text-white text-sm sm:text-base">{club}</p>
              <p className="text-xs text-gray-500 mt-1">
                {products.filter(p => p.club === club).length} items
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* BEST SELLERS / POPULAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Popular Right Now 🔥</h2>
            <p className="text-gray-400 mt-1 text-sm sm:text-base">Top picks from fans like you</p>
          </div>
          <Link href="/products?tag=Best Seller" className="text-green-400 hover:text-green-300 text-sm sm:text-base font-medium">
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products
            .filter(p => p.tag === "Best Seller" || p.tag === "Popular" || p.tag === "Champions")
            .slice(0, 4)
            .map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
        </div>
      </section>

      {/* NATIONAL TEAMS SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 border-t border-white/10">
        <div className="bg-gradient-to-r from-green-900/20 via-emerald-900/10 to-transparent rounded-3xl p-8 sm:p-12 border border-white/10">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <span className="text-green-400 font-semibold tracking-wider text-sm">WORLD CUP 2026</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-2 mb-4">National Team Jerseys Are Here</h2>
              <p className="text-gray-300 mb-6">Ghana, Brazil, Argentin, and more. Get ready for the biggest tournament in football.</p>
              <Link href="/products?tag=National">
                <button className="bg-white/10 backdrop-blur-sm text-white border border-white/20 px-6 py-3 rounded-xl font-semibold hover:bg-white/20 transition">
                  Explore National Kits →
                </button>
              </Link>
            </div>
            <div className="flex-1 grid grid-cols-3 gap-2">
              {products.filter(p => p.tag === "National").slice(0, 3).map(p => (
                <img key={p.id} src={p.image} alt={p.name} className="rounded-lg border border-white/10 w-full aspect-square object-cover" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* NEWSLETTER / CTA */}
      <section className="bg-gradient-to-b from-green-950/50 to-black border-t border-white/10 text-center py-16 sm:py-20 mt-10">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Get Your Jersey?
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Order instantly via WhatsApp and get free delivery on orders over GH₵500
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <button className="w-full sm:w-auto bg-green-500 text-black px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-400 transition shadow-lg shadow-green-500/30">
                Browse Collection
              </button>
            </Link>
            <Link href="/cart">
              <button className="w-full sm:w-auto bg-black text-white border border-white/20 px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition">
                Checkout via WhatsApp
              </button>
            </Link>
          </div>
          <p className="text-gray-500 text-sm mt-6">No account needed • Secure ordering • 24/7 support</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black border-t border-white/10 py-10 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8 text-center">
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Jersey<span className="text-green-400">Hub</span></h3>
              <p className="text-gray-400 text-sm">Premium football jerseys delivered across Ghana. Fast and reliable.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/products" className="hover:text-green-400 transition">All Jerseys</Link></li>
                <li><Link href="/products?tag=New" className="hover:text-green-400 transition">New Arrivals</Link></li>
                <li><Link href="/products?tag=Best Seller" className="hover:text-green-400 transition">Best Sellers</Link></li>
                <li><Link href="/products?tag=National" className="hover:text-green-400 transition">National Teams</Link></li>
              </ul>
            </div>
           
            <div>
              <h4 className="text-white font-semibold mb-4">Connect</h4>
              <p className="text-gray-400 text-sm mb-3">WhatsApp: +233 +233 50 327 4574</p>
             
            </div>
          </div>
          <div className="text-center pt-8 border-t border-white/10 text-gray-500 text-sm">
            <p>© {new Date().getFullYear()} JerseyHub — Built for fast WhatsApp ordering in Ghana</p>
          </div>
        </div>
      </footer>
    </div>
  );
}