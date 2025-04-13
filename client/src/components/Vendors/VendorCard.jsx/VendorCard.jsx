import React from "react";
import { Link } from "react-router-dom";
import { FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

const VendorCard = ({ vendor }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 w-full max-w-md mx-auto group">
      {/* Vendor Image */}
      <div className="h-52 w-full overflow-hidden">
        <img
          src={vendor.image}
          alt={vendor.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Vendor Details */}
      <div className="p-6 space-y-4">
        {/* Name */}
        <h3 className="text-2xl font-bold text-gray-800">{vendor.name}</h3>

        {/* Phone */}
        <div className="flex items-center text-gray-600 text-sm space-x-2">
          <FaPhoneAlt className="text-blue-600" />
          <span>{vendor.phone}</span>
        </div>

        {/* Location */}
        <div className="flex items-center text-gray-600 text-sm space-x-2">
          <FaMapMarkerAlt className="text-red-500" />
          <span>
            {vendor?.address?.city}, {vendor?.address?.state}
          </span>
        </div>

        {/* View Button */}
        <div className="pt-4">
          <Link
            to={`/vendor/${vendor._id}/account`}
            className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-full hover:bg-indigo-700 transition duration-300"
          >
            View Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VendorCard;
