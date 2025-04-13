import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import DeleteProduct from "./DeleteProduct";

const ShowProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProduct = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/product/${id}`
      );
      setProduct(data.data);
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-gray-500 text-lg animate-pulse">Loading product details...</p>
      </div>
    );

  if (!product)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-red-600 text-lg font-medium">Product not found.</p>
      </div>
    );

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      {/* Product Title */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">{product.title}</h1>
        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
          {product.description}
        </p>
      </div>

      {/* Gallery */}
      <div className="flex justify-center items-center gap-6 mb-12">
        {product.images.map((img, idx) => (
          <div
            key={idx}
            className="rounded-xl overflow-hidden border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <img
              src={img}
              alt={`Product ${idx + 1}`}
              className="h-64 w-[30rem] object-cover hover:scale-105 transition-transform duration-300 ease-in-out"
            />
          </div>
        ))}
      </div>

      {/* Product Meta Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {/* Price */}
        <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
          <p className="text-gray-500 mb-1 text-sm">Price</p>
          <p className="text-2xl font-semibold text-indigo-600">₹{product.price}</p>
        </div>

        {/* Sizes */}
        <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
          <p className="text-gray-500 mb-1 text-sm">Sizes</p>
          <p className="text-base text-gray-700">
            {product.sizes?.length > 0 ? product.sizes.join(" , ") : "N/A"}
          </p>
        </div>

        {/* Tag */}
        <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
          <p className="text-gray-500 mb-1 text-sm">Tag</p>
          <span className="inline-block bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full font-semibold capitalize">
            {product.tag}
          </span>
        </div>

        {/* Category */}
        <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
          <p className="text-gray-500 mb-1 text-sm">Category</p>
          <p className="text-base text-gray-800 font-medium">
            {product.category?.title}
            <span className="text-sm text-gray-500 ml-1">
              ({product.category?.tag})
            </span>
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-6 mt-8">
        <button
          className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
          onClick={() => alert("Added to Cart!")} // Example, replace with actual functionality
        >
          Add to Cart
        </button>
      </div>
    </section>
  );
};

export default ShowProduct;
