import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CategoryCard from "./CategoryCard";

const AllCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/category`, {
          withCredentials: true,
        });

        if (res.data?.data?.categories) {
          setCategories(res.data.data.categories);
        } else {
          setError("No categories found.");
        }
      } catch (err) {
        setError("Failed to load categories.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="py-12 px-4 sm:px-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto text-center mb-10">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-2">Explore Categories</h2>
        <p className="text-gray-600 text-lg">Find products by your interest</p>
      </div>

      {loading && <p className="text-center text-gray-600">Loading categories...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto mb-10">
        {categories.map((category) => (
          <CategoryCard key={category._id} category={category} />
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center">
        <button
          onClick={() => navigate("/categories")}
          className="px-6 py-3 rounded-full bg-green-600 text-white font-semibold hover:bg-green-700 transition"
        >
          View All Categories
        </button>
      </div>
    </div>
  );
};

export default AllCategories;
