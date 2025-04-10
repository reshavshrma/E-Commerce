import React, { useEffect, useState } from "react";
import axios from "axios";
import CategoryCard from "./CategoryCard";

const AllCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/category`,
          { withCredentials: true }
        );

        if (res.data && res.data.data && res.data.data.categories) {
          setCategories(res.data.data.categories);
        } else {
          setError("No categories found.");
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError("Failed to load categories.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="py-10 px-4 md:px-8 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-8">Shop by Category</h2>

      {loading && <p className="text-center text-gray-600">Loading categories...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {categories.map((category) => (
          <CategoryCard
            key={category._id}
            title={category.title}
            // Optionally pass image={category.image} if available
          />
        ))}
      </div>
    </div>
  );
};

export default AllCategories;
