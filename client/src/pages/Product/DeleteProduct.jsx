import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DeleteProduct = ({ productId }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/product/${productId}/delete`, {
        withCredentials: true,
      });
      navigate("/"); // Redirect after successful delete
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
    >
      Delete Product
    </button>
  );
};

export default DeleteProduct;
