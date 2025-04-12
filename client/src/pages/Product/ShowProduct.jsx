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
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/product/${id}`);
      setProduct(data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching product:", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProduct();
  }, [id]);
  

  if (loading) return <p className="text-center text-lg font-medium py-10 text-gray-600">Loading product details...</p>;

  if (!product) return <p className="text-center text-red-500 font-semibold py-10">Product not found.</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Title */}
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4 border-b-4 border-blue-600 inline-block pb-2">
        {product.title}
      </h2>

      {/* Description */}
      <p className="text-gray-600 text-lg leading-relaxed mb-6 max-w-3xl">
        {product.description}
      </p>

      {/* Image Gallery */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mb-8">
        {product.images.map((img, index) => (
          <div key={index} className="rounded-lg overflow-hidden shadow-md">
            <img
              src={img}
              alt={`Product ${index + 1}`}
              className="h-64 w-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        ))}
      </div>

      {/* Product Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Price */}
        <div className="border rounded-md p-4 shadow-sm bg-gray-50">
          <p className="text-gray-500 text-sm mb-1">Price</p>
          <p className="text-xl font-semibold text-gray-800">₹{product.price}</p>
        </div>

        {/* Sizes */}
        <div className="border rounded-md p-4 shadow-sm bg-gray-50">
          <p className="text-gray-500 text-sm mb-1">Sizes</p>
          <p className="text-base font-medium text-gray-700">
            {product.sizes?.length > 0 ? product.sizes.join(", ") : "N/A"}
          </p>
        </div>

        {/* Tag */}
        <div className="border rounded-md p-4 shadow-sm bg-gray-50">
          <p className="text-gray-500 text-sm mb-1">Tag</p>
          <span className="inline-block px-2 py-1 text-sm bg-blue-100 text-blue-700 font-semibold rounded">
            {product.tag}
          </span>
        </div>

        {/* Category */}
        <div className="border rounded-md p-4 shadow-sm bg-gray-50">
          <p className="text-gray-500 text-sm mb-1">Category</p>
          <p className="text-base font-medium text-gray-700">
            {product.category?.title}{" "}
            <span className="text-sm text-gray-500">({product.category?.tag})</span>
          </p>
        </div>
      </div>

      {/* Delete Button */}
      <div className="mt-6">
        <DeleteProduct productId={product._id} />
      </div>


    </div>
  );
};

export default ShowProduct;
