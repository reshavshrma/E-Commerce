import React from "react";

const VendorRow = ({ vendor }) => {
  const { name, username, _id, email, phone, address, image } = vendor;

  return (
    <tr className="hover:bg-gray-100 text-center text-gray-900 transition-all">
      <td className="px-4 py-2 border">
        <img
          src={image}
          alt={name}
          className="w-12 h-12 md:w-14 md:h-14 rounded-full mx-auto object-cover border border-gray-300"
        />
      </td>
      <td className="px-4 py-2 border">{name}</td>
      <td className="px-4 py-2 border">{username}</td>
      <td className="px-4 py-2 border text-xs break-all">{_id}</td>
      <td className="px-4 py-2 border">{phone}</td>
      <td className="px-4 py-2 border">{email}</td>
      <td className="px-4 py-2 border text-sm text-left">
        {address.area}, {address.city}, {address.state}, {address.country} - {address.pincode}
      </td>
    </tr>
  );
};

export default VendorRow;
