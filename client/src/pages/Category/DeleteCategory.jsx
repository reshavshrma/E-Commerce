import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DeleteCategory = ({ categoryId }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/category/${categoryId}/delete`, {
        withCredentials: true, // needed if you're using session-based auth
      });

      navigate("/"); // redirect after successful delete
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
    >
      Delete Category
    </button>
  );
};

export default DeleteCategory;
