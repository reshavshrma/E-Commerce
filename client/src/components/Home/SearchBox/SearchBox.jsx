import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchBox = () => {
  return (
    <div className="relative w-full max-w-lg mx-auto">
      <input
        type="text"
        placeholder="Search for products..."
        className="w-full py-3 pl-5 pr-12 text-gray-900 bg-white border border-gray-300 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent transition-all duration-300"
      />
      <button className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-900 text-white p-2 rounded-full hover:bg-gray-700 transition-all duration-300">
        <FaSearch size={18} />
      </button>
    </div>
  );
};

export default SearchBox;