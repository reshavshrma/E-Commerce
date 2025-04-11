import React from "react";
import { useNavigate } from "react-router-dom";

const CategoryCard = ({ category }) => {
  const navigate = useNavigate();

  return (
    <div className="relative group w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300">
      {/* Image Section */}
      <div className="relative w-full h-64 sm:h-72 lg:h-80 overflow-hidden">
        <img
          src={category.image}
          alt={category.title}
          className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />

        {/* Content on Image */}
        <div className=" absolute inset-0 z-20 flex flex-col justify-end p-6">
          <h3 className="text-2xl font-bold text-white drop-shadow ml-3 mb-3">{category.title}</h3>
          <button
            onClick={() => navigate(`/category/${category._id}/${category.tag}/products`)}
            className="w-fit px-5 py-2 rounded-full bg-white text-gray-900 font-semibold shadow hover:bg-gray-100 transition"
          >
            View Products
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
