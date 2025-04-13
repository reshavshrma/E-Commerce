import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import ProductCard from "../../Products/ProductCard.jsx/ProductCard"; // Adjust path as needed
import SkeletonList from "../../LoadingSkeleton/SkeletonList";
import NotAvailable from "../../../pages/Loaders/NotAvailable";
const SearchBox = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setSearched(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/navigation/search-products?query=${query}`
      );
      setResults(res.data.products);
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto px-4 py-6">
      {/* Search Bar */}
      <div className="relative w-full max-w-xl mx-auto">
        <input
          type="text"
          placeholder="Search by product name, category or tag..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="w-full py-3 pl-5 pr-12 text-gray-900 bg-white border border-gray-300 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
        />
        <button
          onClick={handleSearch}
          className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-full transition-all duration-300"
          aria-label="Search"
        >
          <FaSearch size={18} className="hover:cursor-pointer hover:scale-105" />
        </button>
      </div>

      {/* Result Section */}
      {loading && (
        <div className="flex justify-center items-center mt-10">
          <SkeletonList/>
        </div>
      )}

      {!loading && searched && results.length === 0 && (
        <div className="col-span-full text-center text-lg font-semibold text-gray-700">
        <NotAvailable 
  content="No Product Found" 
  tagline="Oops! It looks like we couldn't find any matching products. Try searching with different keywords or explore our collection to discover something amazing!" 
/>
          </div>
      )}

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {results.length > 0 &&
          results.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default SearchBox;
