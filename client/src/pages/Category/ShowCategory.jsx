// Filename: CategoryProductList.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/Products/ProductCard.jsx/ProductCard"; // Adjust path if needed

const ShowCategory = () => {
  const { id, tag } = useParams();
  const [category, setCategory] = useState({});
  const [products, setProducts] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/category/${id}/${tag}/products`,
          { withCredentials: true }
        );
        setCategory(data.data.category);
        setProducts(data.data.products);
        setErrorMsg("");
      } catch (error) {
        console.error("Error fetching products:", error);
        setErrorMsg(
          error.response?.data?.message || "Something went wrong!"
        );
      } finally {
        setLoading(false);
      }
    };

    if (id && tag) {
      fetchProducts();
    }
  }, [id, tag]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {loading ? (
        <p className="text-center text-gray-600">Loading products...</p>
      ) : errorMsg ? (
        <p className="text-center text-red-600">{errorMsg}</p>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-4">
            Products in "{category?.title}" for {tag}
          </h2>
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600">No products found.</p>
          )}
        </>
      )}
    </div>
  );
};

export default ShowCategory;
