// Filename: CategoryProductList.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

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
          `${import.meta.env.VITE_API_URL}/api/category/${id}/${tag}/products` , 
          {withCredentials : true},
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
                <div
                  key={product._id}
                  className="border rounded-lg shadow-md overflow-hidden"
                >
                  <img
                    src={product.images?.[0]}
                    alt={product.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold">
                      {product.title}
                    </h3>
                    <p className="text-gray-600 mb-1">
                      ₹{product.price}
                    </p>
                    <p className="text-sm text-gray-500">{product.description}</p>
                  </div>
                </div>
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
