import React from "react";
import { useNavigate } from "react-router-dom";

const CategoryCard = ({ category }) => {
  const navigate = useNavigate();

  return (
    <div className="relative group w-[95%] bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
      {/* Image Container */}
      <div className="relative w-full h-80 lg:h-72 xl:h-80 overflow-hidden">
        <img
          src={category.ImageURL}
          alt={category.Title}
          className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />

        {/* Content on Image */}
        <div className="absolute inset-0 z-20 flex flex-col justify-end p-4 sm:p-6">
          <h3 className="text-xl sm:text-2xl font-bold text-white drop-shadow-md ml-3 mb-3">
            {category.title}
          </h3>
          <button
            onClick={() =>
              navigate(`/category/${category._id}/${category.tag}/products`)
            }
            className="w-fit px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-white text-gray-900 font-semibold shadow hover:bg-gray-100 transition-all"
          >
            View Products
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
