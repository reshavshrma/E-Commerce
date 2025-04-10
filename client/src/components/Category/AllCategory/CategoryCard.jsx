import React from "react";

const CategoryCard = ({  title = "Hoodies" }) => {
  return (
    <div className="relative group w-full max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out">
      {/* Category Image */}
      <div className="relative w-full h-64 md:h-72 lg:h-80 overflow-hidden">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmF2jNtgxOyCxkdiyOLX9b9abyWQKlBd2aug&s"
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>
      
      {/* Category Info */}
      <div className=" absolute bottom-5 left-5 text-white">
        <h3 className="text-2xl font-bold tracking-wide">{title}</h3>
        <button className="mt-3 px-4 py-2 bg-white text-gray-900 font-semibold rounded-full shadow-md hover:bg-gray-100 transition-all duration-300">
          View Now
        </button>
      </div>
    </div>
  );
};

export default CategoryCard;
