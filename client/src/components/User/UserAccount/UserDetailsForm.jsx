import React from "react";

const UserDetailsForm = ({ user }) => {
  return (
    <form className="grid grid-cols-1 md:grid-cols-2 gap-6" data-aos="fade-down">
      {/* ID */}
      <div>
        <label htmlFor="id" className="block text-sm font-medium text-gray-600">User ID</label>
        <input
          id="id"
          value={user._id}
          readOnly
          className="w-full border border-gray-300 rounded-xl px-4 py-2 text-gray-800 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-600">Name</label>
        <input
          id="name"
          value={user.name}
          readOnly
          className="w-full border border-gray-300 rounded-xl px-4 py-2 text-gray-800 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-600">Phone</label>
        <input
          id="phone"
          value={user.phone}
          readOnly
          className="w-full border border-gray-300 rounded-xl px-4 py-2 text-gray-800 focus:ring-2 focus:ring-blue-500"
        />
      </div>
     

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
        <input
          id="email"
          value={user.email}
          readOnly
          className="w-full border border-gray-300 rounded-xl px-4 py-2 text-gray-800 focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </form>
  );
};

export default UserDetailsForm;
