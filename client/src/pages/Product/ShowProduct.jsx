import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import DeleteProduct from "./DeleteProduct";
const ShowProduct = () => {
  const { id } = useParams(); // Get product ID from URL
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

  if (loading) return <p className="text-center text-lg">Loading...</p>;

  if (!product) return <p className="text-center text-red-500">Product not found.</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">{product.title}</h2>
      <p className="text-gray-600 mb-2">{product.description}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        {product.images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Product ${index + 1}`}
            className="rounded-lg shadow-md"
          />
        ))}
      </div>

      <div className="mb-2">
        <strong>Price:</strong> ₹{product.price}
      </div>

      <div className="mb-2">
        <strong>Sizes:</strong>{" "}
        {product.sizes && product.sizes.length > 0
          ? product.sizes.join(", ")
          : "N/A"}
      </div>

      <div className="mb-2">
        <strong>Tag:</strong> {product.tag}
      </div>

      <div className="mb-2">
        <strong>Category:</strong> {product.category?.title} ({product.category?.tag})
      </div>
      <DeleteProduct productId={product._id} />

    </div>
  );
};

export default ShowProduct;
