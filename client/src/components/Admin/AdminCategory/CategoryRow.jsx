import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const CategoryRow = ({ category }) => {
  const { _id, title, image, tag } = category;
  const navigate = useNavigate();
  return (
    <tr className="hover:bg-gray-100 text-center text-gray-900 transition-all">
      <td className="px-4 py-2 border">
        <img
          src={image}
          alt={title}
          className="w-12 h-12 md:w-14 md:h-14 rounded-full mx-auto object-cover border border-gray-300"
        />
      </td>
      <td className="px-4 py-2 border font-semibold">{title}</td>
      <td className="px-4 py-2 border text-xs break-all">{_id}</td>
      <td className="px-4 py-2 border capitalize">{tag}</td>
      <td className="px-4 py-2 border space-x-2 flex items-center justify-center">
        <button
          onClick={() => navigate('/category/${id}/edit')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md transition-all flex items-center gap-1 text-sm"
        >
          <FaEdit className="text-xs" /> Edit
        </button>
        <button
          onClick={() => navigate(`/category/${id}/delete`)}
          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md transition-all flex items-center gap-1 text-sm"
        >
          <FaTrash className="text-xs" /> Delete
        </button>
      </td>
    </tr>
  );
};

export default CategoryRow;
