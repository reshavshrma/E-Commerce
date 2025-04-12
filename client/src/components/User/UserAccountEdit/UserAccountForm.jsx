import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const UserAccountForm = ({ userData, handleChange, handleSubmit, isLoading }) => {
  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-6">
      {["name", "phone", "email"].map((field) => (
        <div key={field}>
          <label htmlFor={field} className="block text-sm font-medium text-gray-700 capitalize">
            {field}
          </label>
          <input
            type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
            name={field}
            id={field}
            value={userData[field]}
            onChange={handleChange}
            required
            className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-3"
          />
        </div>
      ))}

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full font-semibold py-3 px-6 rounded-lg text-white transition-all ${
          isLoading
            ? "bg-gradient-to-r from-indigo-400 to-purple-400 cursor-not-allowed"
            : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-purple-600 hover:to-indigo-600"
        } flex items-center justify-center gap-2`}
      >
        {isLoading ? (
          <>
            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Saving...
          </>
        ) : (
          <>
            <FaCheckCircle />
            Save Changes
          </>
        )}
      </button>
    </form>
  );
};

export default UserAccountForm;
