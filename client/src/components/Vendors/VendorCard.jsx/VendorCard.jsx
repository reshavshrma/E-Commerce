import React from "react";
import { Link } from "react-router-dom";
import { FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

const VendorCard = ({ vendor }) => {
  return (
    <div className="bg-white shadow-xl rounded-2xl overflow-hidden transition-transform transform hover:-translate-y-1 hover:shadow-2xl duration-300 w-full max-w-sm mx-auto">
      <img
        src={vendor.image}
        alt={vendor.name}
        className="w-full h-48 object-cover"
      />

      <div className="p-5 space-y-2">
        <h2 className="text-xl font-semibold text-gray-800">{vendor.name}</h2>

        <div className="flex items-center text-sm text-gray-600">
          <FaPhoneAlt className="mr-2 text-blue-500" />
          <span>{vendor.phone}</span>
        </div>

        <div className="flex items-center text-sm text-gray-600">
          <FaMapMarkerAlt className="mr-2 text-red-500" />
          <span>{vendor?.address?.city}, {vendor?.address?.state}</span>
        </div>

        <Link
          to={`/vendor/${vendor._id}/account`}
          className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300 text-sm"
        >
          View Now
        </Link>
      </div>
    </div>
  );
};

export default VendorCard;
