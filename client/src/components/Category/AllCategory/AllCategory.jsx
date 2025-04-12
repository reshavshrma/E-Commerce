import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CategoryCard from "./CategoryCard";
import ToggleGender from "../../ToggleGender/ToggleGender";

const AllCategories = () => {
  const [categories, setCategories] = useState([]);
  const [selectedGender, setSelectedGender] = useState("male");
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

  const filteredCategories = categories.filter(
    (category) => category.tag.toLowerCase() === selectedGender
  );

  return (
    <section className="py-12 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-3">
          Explore Categories
        </h2>
        <p className="text-base sm:text-lg text-gray-600 mb-6">
          Find products by your interest
        </p>

        <ToggleGender onToggle={(gender) => setSelectedGender(gender)} />
      </div>

      {loading && (
        <p className="text-center text-gray-600 text-lg">Loading categories...</p>
      )}
      {error && (
        <p className="text-center text-red-500 text-lg font-medium">{error}</p>
      )}

      {/* Responsive Category Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto mb-12 px-2 sm:px-0">
        {filteredCategories.map((category) => (
          <CategoryCard key={category._id} category={category} />
        ))}
      </div>

      <div className="text-center">
        <button
          onClick={() => navigate("/categories")}
          className="inline-block px-6 py-3 rounded-full bg-green-600 text-white text-base sm:text-lg font-semibold hover:bg-green-700 transition-all duration-300 shadow-md"
        >
          View All Categories
        </button>
      </div>
    </section>
  );
};

export default AllCategories;
