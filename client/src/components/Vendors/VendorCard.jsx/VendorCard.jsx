import React from "react";
import { Link } from "react-router-dom";
import { FaPhoneAlt, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";

const VendorCard = ({ vendor }) => {
  // Cleanly build location string without extra commas
  const locationParts = [];
  if (vendor?.address?.city) locationParts.push(vendor.address.city);
  if (vendor?.address?.state) locationParts.push(vendor.address.state);
  const location = locationParts.join(", ");

  return (
    <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 w-full mx-auto group">
      {/* Vendor Image */}
      <div className="h-64 w-full overflow-hidden rounded-t-3xl">
        <img
          src={vendor.image}
          alt={vendor.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>

      {/* Vendor Details */}
      <div className="p-6 space-y-4">
        {/* Name */}
        <h3 className="text-3xl text-center font-semibold text-gray-900">
          {vendor.name}
        </h3>

        {/* Phone */}
        <div className="flex items-center text-gray-700 text-sm space-x-2">
          <FaPhoneAlt className="text-green-500" />
          <span>{vendor.phone}</span>
        </div>

        {/* Email */}
        <div className="flex items-center text-gray-700 text-sm space-x-2">
          <FaEnvelope className="text-blue-500" />
          <span>{vendor.email}</span>
        </div>

        {/* Location */}
        <div className="flex items-center text-gray-700 text-sm space-x-2">
          <FaMapMarkerAlt className="text-red-500" />
          <span>{location || "India"}</span>
        </div>

        {/* View Products Button */}
        <div className="pt-4">
          <Link
            to={`/vendor/${vendor._id}/account`}
            className="w-full inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-indigo-600 rounded-full hover:bg-indigo-700 transition duration-300 ease-in-out"
          >
            View Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VendorCard;
