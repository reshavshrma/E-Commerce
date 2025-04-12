import React from "react";
import { useNavigate } from "react-router-dom";
import { FaTag, FaRupeeSign, FaShareAlt } from "react-icons/fa";
import ShareBtn from "../../ShareBtn/ShareBtn"; // Adjust path as needed
import { useUser } from "../../UserContext/UserContext";
import LikeBtn from "../../LikeBtn/LikeBtn";

const ProductCard = ({ product }) => {
  const {user} = useUser();
  const navigate = useNavigate();

  return (
    <div className="bg-white border border-gray-200 shadow-lg rounded-2xl w-full sm:w-96 md:w-80 hover:shadow-xl transition-transform transform hover:scale-[1.02]">
      <div className="relative">
        {/* Share Button */}
        <div className="absolute top-3 left-3 z-20 hover:cursor-pointer">
          <ShareBtn
            productName={product.title}
            productLink={`${import.meta.env.VITE_API_URL}/product/${product._id}`}
          />
        </div>
        <div className="absolute top-3 right-3 z-20 text-white hover:cursor-pointer">
        <LikeBtn id={user ? user._id : null} productId={product ? product._id : null} />
      </div>

        {/* Product Image */}
        <img
          src={product.images[0]}
          alt={product.title}
          className="rounded-t-2xl h-56 w-full object-cover"
        />
      </div>

      {/* Details Section */}
      <div className="p-5">
        {/* Title */}
        <h2 className="text-xl font-bold text-gray-900 truncate mb-2">
          {product.title}
        </h2>

        {/* Price */}
        <p className="text-lg font-semibold text-gray-700 flex items-center gap-1">
          <FaRupeeSign className="text-gray-600" />
          {product.price}
        </p>

        {/* Category and Tag */}
        <p className="text-sm text-gray-500 mt-1">
          Category: <span className="font-medium">{product.category?.title}</span>
        </p>
        <p className="text-sm text-gray-500">
          Tag: <span className="font-medium capitalize">{product.tag}</span>
        </p>

        {/* Button */}
        <div className="mt-5 flex justify-center">
          <button
            onClick={() => navigate(`/product/${product._id}`)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition-transform transform hover:scale-105 shadow hover:shadow-lg"
          >
            View Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
