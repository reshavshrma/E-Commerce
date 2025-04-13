import React from "react";
import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <div className="text-center mt-24 mb-20" data-aos="fade-down">
     <h3 className="text-2xl font-bold text-gray-700 mb-4">
  Discover Local Products, Book Instantly
</h3>
<p className="text-base text-gray-600 leading-relaxed max-w-3xl mx-auto">
  Dive into a wide selection of categorized products from verified local vendors. Explore online, book your favorites, and experience the joy of offline shopping with The Shopzo.
</p>
<Link to="/">
  <button className="mt-6 bg-gradient-to-b from-purple-600 to-red-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-teal-500 transition duration-300 transform hover:cursor-pointer hover:scale-105">
    Browse Categories
  </button>
</Link>

    </div>
  );
};

export default CallToAction;
