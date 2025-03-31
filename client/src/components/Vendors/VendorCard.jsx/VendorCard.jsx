import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

const VendorCard = ({  title="My Vendor", location="Noida , Uttar Pradesh , India" }) => {
  return (
    <div className="relative group w-full max-w-xs md:max-w-sm lg:max-w-md bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out">
      {/* Vendor Image */}
      <div className="relative w-full h-64 overflow-hidden">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmF2jNtgxOyCxkdiyOLX9b9abyWQKlBd2aug&s"
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      </div>
      
      {/* Vendor Info */}
      <div className="absolute bottom-5 left-5 text-white">
        <h3 className="text-2xl font-bold tracking-wide">{title}</h3>
        <p className="flex items-center text-sm text-gray-300 mt-1">
          <FaMapMarkerAlt className="mr-1" /> {location}
        </p>
        <button className="mt-3 px-4 py-2 bg-white text-gray-900 font-semibold rounded-full shadow-md hover:bg-gray-100 transition-all duration-300">
          View Now
        </button>
      </div>
    </div>
  );
};

export default VendorCard;