"use client";

import Navbar from "@/components/Navbar";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";

export default function ProductsPage() {
  const [selectedLeague, setSelectedLeague] = useState("All");
  const [selectedTag, setSelectedTag] = useState("All");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);

  // Extract unique leagues and tags from products
  const leagues = useMemo(() => {
    const uniqueLeagues = [...new Set(products.map((p) => p.league).filter(Boolean))];
    return ["All", ...uniqueLeagues.sort()];
  }, []);

  const tags = useMemo(() => {
    const uniqueTags = [...new Set(products.map((p) => p.tag).filter(Boolean))];
    return ["All", ...uniqueTags.sort()];
  }, []);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = products.filter((p) => {
      const matchesLeague = selectedLeague === "All" || p.league === selectedLeague;
      const matchesTag = selectedTag === "All" || p.tag === selectedTag;
      
      const searchTerm = search.toLowerCase().trim();
      const matchesSearch = searchTerm === "" || 
        p.name.toLowerCase().includes(searchTerm) ||
        (p.club && p.club.toLowerCase().includes(searchTerm)) ||
        (p.description && p.description.toLowerCase().includes(searchTerm));

      return matchesLeague && matchesTag && matchesSearch;
    });

    // Sorting
    switch (sortBy) {
      case "price-asc":
        return [...filtered].sort((a, b) => a.price - b.price);
      case "price-desc":
        return [...filtered].sort((a, b) => b.price - a.price);
      case "name-asc":
        return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
      case "name-desc":
        return [...filtered].sort((a, b) => b.name.localeCompare(a.name));
      case "newest":
        // For demo, assuming higher ID = newer (adjust as needed)
        return [...filtered].sort((a, b) => parseInt(b.id) - parseInt(a.id));
      default:
        // "featured" - keep original order or sort by popularity
        return filtered;
    }
  }, [products, selectedLeague, selectedTag, search, sortBy]);

  const clearFilters = () => {
    setSelectedLeague("All");
    setSelectedTag("All");
    setSearch("");
    setSortBy("featured");
  };

  const hasActiveFilters = selectedLeague !== "All" || selectedTag !== "All" || search !== "";

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      {/* Page Header */}
      <div className="border-b border-white/10 bg-gradient-to-r from-green-950/30 via-black to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">
            All Jerseys
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            Browse our complete collection of authentic football kits
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Search and Filter Bar */}
        <div className="fix top-[72px] z-40 bg-black/95 backdrop-blur-md py-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:rounded-2xl">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search by club, jersey name, or description..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-[#111] border border-white/10 rounded-xl text-white placeholder:text-gray-500  transition"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 bg-[#111] border border-white/10 rounded-xl text-white text-sm  cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
              </select>

              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="sm:hidden flex items-center gap-2 px-4 py-3 bg-[#111] border border-white/10 rounded-xl text-white"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span className="text-sm">Filter</span>
              </button>
            </div>
          </div>

          {/* Filters Section (collapsible on mobile) */}
          <div className={`${showFilters ? "block" : "hidden"} sm:block mt-4 space-y-4`}>
            {/* League Filter */}
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">League</p>
              <div className="flex flex-wrap gap-2">
                {leagues.map((league) => (
                  <button
                    key={league}
                    onClick={() => setSelectedLeague(league)}
                    className={`px-4 py-1.5 text-sm rounded-full border transition-all duration-200 ${
                      selectedLeague === league
                        ? "bg-green-500 text-black border-green-500 shadow-sm shadow-green-500/30"
                        : "border-white/20 text-gray-300 hover:border-green-400 hover:text-white"
                    }`}
                  >
                    {league}
                    {league !== "All" && (
                      <span className="ml-1 text-xs opacity-70">
                        ({products.filter(p => p.league === league).length})
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Tag Filter */}
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Category</p>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`px-4 py-1.5 text-sm rounded-full border transition-all duration-200 ${
                      selectedTag === tag
                        ? "bg-green-500 text-black border-green-500 shadow-sm shadow-green-500/30"
                        : "border-white/20 text-gray-300 hover:border-green-400 hover:text-white"
                    }`}
                  >
                    {tag}
                    {tag !== "All" && (
                      <span className="ml-1 text-xs opacity-70">
                        ({products.filter(p => p.tag === tag).length})
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Filters Summary */}
            {hasActiveFilters && (
              <div className="flex items-center justify-between pt-2 border-t border-white/10">
                <div className="flex flex-wrap gap-2">
                  {selectedLeague !== "All" && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-500/10 text-green-400 text-xs rounded-full border border-green-500/30">
                      {selectedLeague}
                      <button onClick={() => setSelectedLeague("All")}>
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  {selectedTag !== "All" && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-500/10 text-green-400 text-xs rounded-full border border-green-500/30">
                      {selectedTag}
                      <button onClick={() => setSelectedTag("All")}>
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  {search && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-500/10 text-green-400 text-xs rounded-full border border-green-500/30">
                      Search: "{search}"
                      <button onClick={() => setSearch("")}>
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                </div>
                <button
                  onClick={clearFilters}
                  className="text-sm text-gray-400 hover:text-white transition"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Results Count */}
        <div className="mt-6 mb-6 flex items-center justify-between">
          <p className="text-gray-400 text-sm">
            Showing <span className="text-white font-medium">{filteredProducts.length}</span> 
            {filteredProducts.length === 1 ? " product" : " products"}
          </p>
          {hasActiveFilters && (
            <p className="text-xs text-gray-500">
              Filtered from {products.length} total items
            </p>
          )}
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-16 sm:py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-white mb-2">No jerseys found</h3>
            <p className="text-gray-400 mb-6">Try adjusting your filters or search term</p>
            <button
              onClick={clearFilters}
              className="bg-green-500 text-black px-6 py-2 rounded-lg font-medium hover:bg-green-400 transition"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Back to Top Button (visible on scroll) */}
        <div className="text-center mt-12">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-sm text-gray-500 hover:text-green-400 transition"
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </div>
  );
}