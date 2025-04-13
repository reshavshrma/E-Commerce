import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/Products/ProductCard.jsx/ProductCard";

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
        setErrorMsg(error.response?.data?.message || "Something went wrong!");
      } finally {
        setLoading(false);
      }
    };

    if (id && tag) {
      fetchProducts();
    }
  }, [id, tag]);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-[60vh]">
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <span className="text-gray-500 text-lg animate-pulse">Loading products...</span>
        </div>
      ) : errorMsg ? (
        <div className="text-center py-10">
          <p className="text-red-600 text-lg font-medium">{errorMsg}</p>
        </div>
      ) : (
        <>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">
              Products in <span className="text-green-600">{category?.title}</span>
            </h2>
            <p className="text-gray-600 mt-2 capitalize">For {tag}</p>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 transition-all duration-300">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 text-lg mt-12">
              No products found in this category.
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default ShowCategory;
