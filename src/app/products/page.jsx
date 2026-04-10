"use client";

import Navbar from "@/components/Navbar";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { useState } from "react";

export default function ProductsPage() {
  const [selectedLeague, setSelectedLeague] = useState("All");
  const [search, setSearch] = useState("");

  const leagues = [
    "All",
    "Premier League",
    "La Liga",
    "Champions League",
    "Bundesliga",
    "World Cup",
    "Serie A",
    "Ligue 1",
  ];

  const filteredProducts = products.filter((p) => {
    const matchesLeague =
      selectedLeague === "All" || p.league === selectedLeague;

    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.club.toLowerCase().includes(search.toLowerCase());

    return matchesLeague && matchesSearch;
  });

  return (
    <div>

      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-20">

        <h1 className="text-3xl font-bold mb-6">
          All Jerseys
        </h1>

        {/* 🔥 SEARCH BAR */}
        <input
          type="text"
          placeholder="Search club or jersey..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full mb-6 px-4 py-3 bg-[#111] border border-white/10 rounded-lg outline-none"
        />

        {/* 🔥 LEAGUE FILTER */}
        <div className="flex gap-3 flex-wrap mb-10">

          {leagues.map((league) => (
            <button
              key={league}
              onClick={() => setSelectedLeague(league)}
              className={`px-4 py-2 text-sm rounded-full border transition ${
                selectedLeague === league
                  ? "bg-green-500 text-black"
                  : "border-white/20 hover:border-green-400"
              }`}
            >
              {league}
            </button>
          ))}

        </div>

        {/* 🔥 RESULTS COUNT */}
        <p className="text-gray-400 mb-6">
          Showing {filteredProducts.length} products
        </p>

        {/* 🔥 GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-8">

          {filteredProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}

        </div>

      </div>

    </div>
  );
}