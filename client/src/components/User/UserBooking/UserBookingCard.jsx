// components/User/UserBookings/UserBookingCard.jsx

import React from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaShoppingBag } from "react-icons/fa";
import ShareBtn from "../../ShareBtn/ShareBtn";
import LikeBtn from "../../LikeBtn/LikeBtn";
import { useUser } from "../../UserContext/userContext";

const UserBookingCard = ({ product }) => {
  const { user } = useUser();

  return (
    <div
      className="bg-white shadow-lg border rounded-xl w-full hover:shadow-xl transition duration-300 ease-in-out"
      data-aos="fade-up"
    >
      <div className="relative">
        {/* Share + Like */}
        <div className="absolute top-3 left-3 z-10">
          <ShareBtn
            hotelName={product.title}
            hotelLink={`${import.meta.env.VITE_FRONTEND_URL}/product/${product._id}`}
          />
        </div>
        <div className="absolute top-3 right-3 z-10 text-white">
          <LikeBtn id={user?._id} productId={product._id} />
        </div>

        <img
          src={product.images?.[0]}
          alt={product.title}
          className="w-full h-52 object-cover rounded-t-xl"
        />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 truncate">{product.title}</h3>
        <p className="text-sm text-gray-500 mt-1">{product.category?.title}</p>

        <p className="text-base text-gray-700 font-bold mt-2">
          ₹{product.price}{" "}
          <span className="text-xs text-gray-400 font-normal">+ 18% GST</span>
        </p>

        <div className="mt-4 flex gap-3">
          <Link to={`/product/${product._id}`} className="w-full">
            <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all">
              View <FaHeart />
            </button>
          </Link>
          <Link to={`/product/${product._id}/buy`} className="w-full">
            <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all">
              Book Again <FaShoppingBag />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserBookingCard;
