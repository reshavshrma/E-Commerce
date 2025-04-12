import React from "react";

const AdminInfo = ({ user }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg px-6 py-5 sm:px-10 sm:py-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
        Welcome Back, <span className="text-blue-600">{user?.name || "Admin"}</span> 👋
      </h1>
      <p className="text-gray-600 text-base sm:text-lg mt-1">
        Here's an overview of everything happening on your platform.
      </p>
    </div>
  );
};

export default AdminInfo;
