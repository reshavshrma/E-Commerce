import React from "react";
import {useNavigate} from 'react-router-dom';
import DeleteCategory from "../../../pages/Category/DeleteCategory";
const CategoryCard = ({  category }) => {
  const navigate = useNavigate();
  return (
    <div className="relative group w-full max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out">
      {/* Category Image */}
      <div className="relative w-full h-64 md:h-72 lg:h-80 overflow-hidden">
        <img
          src={category.image}
          alt={category.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>
      
      {/* Category Info */}
      <div className=" absolute bottom-5 left-5 text-white">
        <h3 className="text-2xl font-bold tracking-wide">{category.title}</h3>
        <button className="mt-3 px-4 py-2 bg-white text-gray-900 font-semibold rounded-full shadow-md hover:bg-gray-100 transition-all duration-300">
          View Now
        </button>
         <DeleteCategory categoryId={category._id}/>
      </div>
    </div>
  );
};

export default CategoryCard;
