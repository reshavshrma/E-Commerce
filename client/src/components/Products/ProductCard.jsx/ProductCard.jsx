import React from "react";
import { useNavigate } from "react-router-dom";
import { FaRupeeSign } from "react-icons/fa";
import ShareBtn from "../../ShareBtn/ShareBtn";
import { useUser } from "../../UserContext/userContext";
import LikeBtn from "../../LikeBtn/LikeBtn";

const ProductCard = ({ product }) => {
  const { user } = useUser();
  const navigate = useNavigate();

  return (
    <div className="bg-white border border-gray-100 shadow-md hover:shadow-xl rounded-2xl overflow-hidden transition-transform duration-300 hover:scale-[1.02] group w-full sm:max-w-sm mx-auto">
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
          className="w-full h-60 object-cover group-hover:brightness-95 transition-all duration-300"
        />
      </div>

      {/* Content Section */}
      <div className="p-4 sm:p-5 space-y-2">
        {/* Title */}
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 line-clamp-1">
          {product.title}
        </h2>

        {/* Price */}
        <p className="text-md font-medium text-gray-800 flex items-center gap-1">
          <FaRupeeSign className="text-green-600" />
          {product.price}
        </p>

        {/* Category and Tag */}
        <div className="flex flex-wrap gap-2 text-sm mt-2">
          {product.category?.title && (
            <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">
              {product.category.title}
            </span>
          )}
          {product.tag && (
            <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium capitalize">
              {product.tag}
            </span>
          )}
        </div>

        {/* View Button */}
        <div className="pt-4">
          <button
            onClick={() => navigate(`/product/${product._id}`)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg shadow transition duration-200 hover:scale-[1.03]"
          >
            View Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
