import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/Products/ProductCard.jsx/ProductCard";
import SkeletonList from "../../components/LoadingSkeleton/SkeletonList";
import NotAvailable from "../Loaders/NotAvailable";
import Navbar from "../../components/Navbars/Navbar/Navbar";
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
    <>
    <div className="bg-gray-100">
<Navbar/>
    </div>
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-[60vh]">
      {loading ? (
        <div className="flex justify-center items-center mt-10">
          <SkeletonList/>
        </div>
      ) : errorMsg ? (
        <div className="col-span-full text-center text-lg font-semibold text-gray-700 mt-10">
        <NotAvailable 
  content="No Product Found"
  tagline="Oops! It looks like no product is no found in this category . Why not explore our amazing collection and add something special to your list?"
/>
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
            <div className="col-span-full text-center text-lg font-semibold text-gray-700">
        <NotAvailable 
  content="No Product Found"
  tagline="Oops! It looks like no product is no found in this category . Why not explore our amazing collection and add something special to your list?"
/>
          </div>
          )}
        </>
      )}
    </section>
    </>
  );
};

export default ShowCategory;
