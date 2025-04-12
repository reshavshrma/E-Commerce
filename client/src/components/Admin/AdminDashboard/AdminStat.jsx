import React from "react";
import { FaUsers, FaStore, FaTags, FaBoxOpen, FaClipboardList, FaComments } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const AdminStat = ({ adminData }) => {
  const stats = [
    { id: "users-btn", count: adminData.totalUsers, label: "Users", icon: <FaUsers className="text-cyan-600 text-4xl" />, link: "/admin/users" },
    { id: "vendors-btn", count: adminData.totalVendors, label: "Vendors", icon: <FaStore className="text-green-500 text-4xl" />, link: "/admin/vendors" },
    { id: "categories-btn", count: adminData.totalCategories, label: "Categories", icon: <FaTags className="text-indigo-500 text-4xl" />, link: "/admin/categories" },
    { id: "products-btn", count: adminData.totalProducts, label: "Products", icon: <FaBoxOpen className="text-orange-500 text-4xl" />, link: "/admin/products" },
    { id: "bookings-btn", count: adminData.totalBookings, label: "Bookings", icon: <FaClipboardList className="text-pink-500 text-4xl" />, link: "/admin/bookings" },
    { id: "feedbacks-btn", count: adminData.totalFeedbacks, label: "Feedbacks", icon: <FaComments className="text-yellow-500 text-4xl" />, link: "/admin/feedbacks" },
  ];

  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-6 mt-10 px-2 sm:px-5">
      {stats.map(({ id, count, label, icon, link }) => (
        <div
          key={id}
          id={id}
          className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition hover:scale-105 flex flex-col justify-center items-center"
        >
          <div className="bg-gray-100 p-4 rounded-full shadow">{icon}</div>
          <h2 className="text-4xl font-extrabold text-gray-900 mt-3 mb-1">
            {count !== undefined ? count : (
              <div className="flex gap-2">
                <div className="w-4 h-4 rounded-full bg-gray-300 animate-pulse"></div>
                <div className="w-4 h-4 rounded-full bg-gray-300 animate-pulse"></div>
                <div className="w-4 h-4 rounded-full bg-gray-300 animate-pulse"></div>
              </div>
            )}
          </h2>
          <p className="text-gray-600 font-medium text-lg">{label}</p>
          <NavLink to={link}>
            <button className="mt-4 bg-gradient-to-tr from-blue-500 to-purple-800 text-white px-6 py-2 rounded-full hover:scale-110 transition shadow-md">
              View All
            </button>
          </NavLink>
        </div>
      ))}
    </div>
  );
};

export default AdminStat;
