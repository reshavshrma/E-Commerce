import React from 'react';

const BookingRow = ({ booking }) => {
  const {
    user,
    vendor,
    product,
    category,
    quantity,
    totalPrice,
    status,
    bookingDate,
  } = booking;

  return (
    <tr className="border-b">
      <td className="px-4 py-2">{user?.name}</td>
      <td className="px-4 py-2">{vendor?.name}</td>
      <td className="px-4 py-2">{product?.title}</td>
      <td className="px-4 py-2">{category?.title}</td>
      <td className="px-4 py-2">{quantity}</td>
      <td className="px-4 py-2">₹{totalPrice}</td>
      <td className="px-4 py-2 capitalize">
        <span
          className={`px-2 py-1 rounded-full text-white text-sm ${
            status === 'completed'
              ? 'bg-green-600'
              : status === 'cancelled'
              ? 'bg-red-500'
              : status === 'confirmed'
              ? 'bg-blue-500'
              : 'bg-yellow-500'
          }`}
        >
          {status}
        </span>
      </td>
      <td className="px-4 py-2">
        {new Date(bookingDate).toLocaleDateString()}
      </td>
    </tr>
  );
};

export default BookingRow;
