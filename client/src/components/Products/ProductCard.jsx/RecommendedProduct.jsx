import React from "react";
import ProductCard from "./ProductCard"; // Adjust path if needed

const RecommendedProduct = ({ allProducts, currentProduct }) => {
  if (!currentProduct || !allProducts) return null;

  // Filter similar products by category or partial title match (case insensitive), excluding current
  const recommended = allProducts.filter(
    (p) =>
      p._id !== currentProduct._id &&
      (p.category?.title === currentProduct.category?.title ||
        p.title.toLowerCase().includes(currentProduct.title.toLowerCase().split(" ")[0]))
  );

  if (recommended.length === 0) return null;

  return (
    <div className="mt-16">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 border-b-4 border-blue-600 inline-block pb-1">
        You may also like
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {recommended.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default RecommendedProduct;
