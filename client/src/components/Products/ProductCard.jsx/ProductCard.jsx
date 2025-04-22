import React from "react";
import { useNavigate } from "react-router-dom";
import { FaRupeeSign } from "react-icons/fa";
import ShareBtn from "../../ShareBtn/ShareBtn";
import { useUser } from "../../UserContext/UserContext";
import LikeBtn from "../../LikeBtn/LikeBtn";

const ProductCard = ({ product }) => {
  const { user } = useUser();
  const navigate = useNavigate();

  return (
    <div className="bg-white border border-gray-200 shadow-lg hover:shadow-2xl rounded-2xl overflow-hidden transition-transform duration-300 hover:scale-[1.02] w-full sm:max-w-[320px] mx-auto">
      {/* Image Section */}
      <div className="relative">
        {/* Share Button */}
        <div className="absolute top-3 left-3 z-10">
          <ShareBtn
            productName={product.title}
            productLink={`${import.meta.env.VITE_API_URL}/product/${product._id}`}
          />
        </div>

        {/* Like Button */}
        <div className="absolute top-3 right-3 z-10">
          <LikeBtn
            id={user ? user._id : null}
            productId={product ? product._id : null}
          />
        </div>

        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-60 object-cover group-hover:brightness-90 transition-all duration-300"
        />
      </div>

      {/* Content Section */}
      <div className="p-4 sm:p-6 space-y-3">
        {/* Title */}
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 line-clamp-2">
          {product.title}
        </h2>

        {/* Price */}
        <p className="text-md font-medium text-gray-800 flex items-center gap-1">
          <FaRupeeSign className="text-green-600" />
          {product.price}
        </p>

        {/* Category and Tag */}
        <div className="flex flex-wrap gap-3 text-sm mt-2">
          {product.category?.title && (
            <span className="bg-teal-600 text-gray-100 px-3 py-1 rounded-full font-medium">
              {product.category.title}
            </span>
          )}
          {product.tag && (
            <span className="bg-cyan-600 text-gray-100 px-3 py-1 rounded-full font-medium capitalize">
              {product.tag}
            </span>
          )}
        </div>

        {/* Checkout Button */}
        <div className="pt-4">
          <button
            onClick={() => navigate(`/product/${product._id}`)}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:bg-gradient-to-r hover:from-blue-700 hover:to-indigo-800 text-white font-semibold py-2 rounded-lg shadow-md transition duration-200 transform hover:scale-105 hover:cursor-pointer"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
