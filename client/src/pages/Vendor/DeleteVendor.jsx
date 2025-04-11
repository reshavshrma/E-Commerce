import React from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const DeleteVendor = () => {
    const {id} = useParams();
    const navigate = useNavigate();
  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this vendor?");
    if (!confirmed) return;

    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/vendor/${id}/account/delete`, {
        withCredentials: true,
      });

      navigate('/');
      // Optionally redirect or reload
    } catch (error) {
      console.error("Error deleting vendor:", error);
      alert("Failed to delete vendor.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow text-center">
      <h2 className="text-lg font-semibold mb-4">Delete Vendor</h2>
      <button onClick={handleDelete} className="bg-red-600 text-white px-4 py-2 rounded">
        Delete Vendor
      </button>
    </div>
  );
};

export default DeleteVendor;
