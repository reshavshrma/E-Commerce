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
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
          {product.title}
        </h1>
        <p className="text-gray-600 text-lg max-w-3xl">
          {product.description}
        </p>
      </div>

      {/* Gallery */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
        {product.images.map((img, idx) => (
          <div
            key={idx}
            className="rounded-2xl overflow-hidden border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 group"
          >
            <img
              src={img}
              alt={`Product ${idx + 1}`}
              className="h-64 w-full object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
            />
          </div>
        ))}
      </div>

      {/* Product Meta Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
        {/* Price */}
        <div className="bg-gray-50 border border-gray-200 p-6 rounded-xl shadow-sm hover:shadow-md transition">
          <p className="text-gray-500 mb-1">Price</p>
          <p className="text-2xl font-bold text-indigo-600">₹{product.price}</p>
        </div>

        {/* Sizes */}
        <div className="bg-gray-50 border border-gray-200 p-6 rounded-xl shadow-sm hover:shadow-md transition">
          <p className="text-gray-500 mb-1">Sizes</p>
          <p className="text-base text-gray-700">
            {product.sizes?.length > 0 ? product.sizes.join(", ") : "N/A"}
          </p>
        </div>

        {/* Tag */}
        <div className="bg-gray-50 border border-gray-200 p-6 rounded-xl shadow-sm hover:shadow-md transition">
          <p className="text-gray-500 mb-1">Tag</p>
          <span className="inline-block bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full font-semibold capitalize">
            {product.tag}
          </span>
        </div>

        {/* Category */}
        <div className="bg-gray-50 border border-gray-200 p-6 rounded-xl shadow-sm hover:shadow-md transition">
          <p className="text-gray-500 mb-1">Category</p>
          <p className="text-base text-gray-800 font-medium">
            {product.category?.title}
            <span className="text-sm text-gray-500 ml-1">
              ({product.category?.tag})
            </span>
          </p>
        </div>
      </div>

      {/* Delete Product Button */}
      <div className="mt-12">
        <DeleteProduct productId={product._id} />
      </div>
    </section>
  );
};

export default ShowProduct;
