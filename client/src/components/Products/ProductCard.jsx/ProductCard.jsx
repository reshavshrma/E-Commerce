import React from "react";
import { FaShoppingCart } from "react-icons/fa";

const ProductCard = ({  title ="hoodies", inStock=true, oldPrice=1245, newPrice=888 }) => {
  return (
    <div className="relative group w-full max-w-xs md:max-w-sm lg:max-w-md bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out">
      {/* Product Image */}
      <div className="relative w-full h-64 overflow-hidden">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmF2jNtgxOyCxkdiyOLX9b9abyWQKlBd2aug&s"
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Stock Badge */}
        <div className={`absolute top-4 left-4 px-3 py-1 text-sm font-semibold rounded-full ${inStock ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
          {inStock ? "In Stock" : "Out of Stock"}
        </div>
      </div>
      
      {/* Product Info */}
      <div className="p-5 text-gray-900">
        <h3 className="text-lg font-semibold tracking-wide mb-2">{title}</h3>
        
        {/* Prices */}
        <div className="flex items-center space-x-2 mb-3">
          <span className="text-lg font-bold text-gray-900">${newPrice}</span>
          <span className="text-sm text-gray-500 line-through">${oldPrice}</span>
        </div>
        
        {/* View Button */}
        <button className="w-full flex items-center justify-center px-4 py-2 bg-gray-900 text-white font-semibold rounded-full shadow-md hover:bg-gray-800 transition-all duration-300">
          <FaShoppingCart className="mr-2" /> View Now
        </button>
      </div>
    </div>
  );
};

export default ProductCard;